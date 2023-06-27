
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="pro.mysql.operation" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.util.TreeMap" %>
<%
    try {
        operation.connect();
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }

    String table = request.getParameter("table");
%>
import {MyApp} from "../../../../public/config.js";
import {notify} from "./javascript/view/notification.js";
import {IndexedDBCurd} from "../../../../public/indexedDB-curd.js";

(function (){
    let indexDBReq = indexedDB.open("managerDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = async function (){
        db = this.result;
        MyApp.database = db;
        /*获取所有表的主键并存储至一个集合中*/
        <%
            ResultSet rs;
            TreeMap<String,String> tableKeysMap = null;
            try {
                rs = operation.select("SELECT TABLE_NAME,COLUMN_NAME\n" +
                        "FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE\n" +
                        "WHERE TABLE_NAME<> 'dtproperties'\n" +
                        "AND table_schema = 'database essential'");
                tableKeysMap = new TreeMap<String,String>();
                while(rs.next()){
//                    out.println(rs.getString("TABLE_NAME")+":"+rs.getString("COLUMN_NAME"));
                    tableKeysMap.put(rs.getString("TABLE_NAME"),rs.getString("COLUMN_NAME"));
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }catch (Exception e){
                e.printStackTrace();
            }


        %>
        /*添加列信息*/
        <%
            ArrayList<String> columns = new ArrayList<String>();

            try {
                rs = operation.select("show columns from "+table+"");
//                System.out.print(table);
                while(rs.next()){
                    columns.add(rs.getString("Field"));
                    out.println("MyApp.tableCols.push('"+rs.getString("Field")+"');\n");
                }
                out.println("MyApp.tableKey = \""+columns.get(0)+"\";");
            }catch (SQLException e){
                e.printStackTrace();
            }

        %>

        /*删除目前表中所有的数据，用于更新存储*/
        await new Promise(resolve1 => IndexedDBCurd.getAll(function (arr){
            let delPromises = [];
            arr.forEach(row => {
                let key = MyApp.tableCols[0];
                delPromises.push(new Promise(resolve2 =>
                    IndexedDBCurd.delete(row[key],resolve2)
                ));
            })
            Promise.all(delPromises).then(_ => resolve1());
        }));

        /*将所有的添加请求封装成Promise类并存放于一个数组中，如果所有的全部添加成功则触发一个事件*/
        let putPromises = [];

        /*indexedDB打开当前对象存储*/
        let IDBTransaction = db.transaction("<%=table%>","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("<%=table%>");

        /*从后端引入当前所需的数据*/
        <%
            try{
            ResultSet stmt = operation.select("select * from "+table);
            int counter = 0;
            while(stmt.next()){
                counter++;
        %>

            /*输出信息，供测试*/
            <%
                StringBuilder output_str = new StringBuilder("console.log(\"");
                try {
                    for (int i=0;i<columns.size();i++){
                        output_str.append(columns.get(i)).append("=").append(stmt.getString(columns.get(i))).append("  ");
                    }
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
                output_str.append("\");");
                out.println(output_str);
            %>
                /*插入信息*/
            putPromises.push(new Promise(resolve => {
                IDBObjectStore.put({
                /*动态生成数据*/
                <%
                    for(int i = 0;i<columns.size();i++){
                        out.println(columns.get(i)+":\""+stmt.getString(columns.get(i))+"\",");
                        //sname:"<?=$row['sname']
                    }
                %>
                }
                /*如果当前表找不到主键则在对象存储中生成索引值代替主键*/
                <%
//                    out.println(tableKeysMap.get("student") == null);
                    if(tableKeysMap.get(table) == null){
                        out.println(","+counter);
                    }
                %>
                ).onsuccess = function (){resolve()};
            }));

        <%
            }
            }catch (Exception e){

            }
        %>
        Promise.all(putPromises).then(arr => {
            notify.println("从云端同步数据成功");
            MyApp.customEvent.dispatchEvent("databaseOnSuccess");
        });
    };
    indexDBReq.onerror = function (){
        document.write("database open request error")
    }
/*当没有数据库的时候需要新建数据库从而触发此方法。
 *添加对象存储，并设定主键
*/

    indexDBReq.onupgradeneeded = function (){
        db = this.result;
        store = db.createObjectStore("student"<%
            if(tableKeysMap.get("student") != null) {
                out.println(",{keyPath:(`"+
                        tableKeysMap.get("student")+"`).trim()}");
            }
        %>);
        store = db.createObjectStore("course"<%
            if(tableKeysMap.get("course") != null) {
                out.println(",{keyPath:(`"+
                        tableKeysMap.get("course")+"`).trim()}");
            }
        %>);
        store = db.createObjectStore("studentgrade"<%
            if(tableKeysMap.get("studentgrade") != null) {
                out.println(",{keyPath:(`"+
                        tableKeysMap.get("studentgrade")+"`).trim()}");
            }
        %>);
        store = db.createObjectStore("exp_view"<%
            if(tableKeysMap.get("exp_view") != null) {
                out.println(",{keyPath:(`"+
                        tableKeysMap.get("exp_view")+"`).trim()}");
            }
        %>);
        /* console.log("onupgradeneeded");*/
    };
    
})();
<%
    operation.closeAllStatus();
%>
