<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="pro.mysql.operation" %>
<%@ page import="pro.mysql.sqlEvent" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.TreeMap" %>
<%@ page import="java.sql.Array" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%
 /*
    htmlFormElement.appendChild(setupInputElement("id",id));
    htmlFormElement.appendChild(setupInputElement("sname",name));
    htmlFormElement.appendChild(setupInputElement("sage",age));
    htmlFormElement.appendChild(setupInputElement("sdept",dept));
    htmlFormElement.appendChild(setupInputElement("operation-type",type));
    htmlFormElement.appendChild(setupInputElement("table-name",MyApp.table));
    htmlFormElement.appendChild(setupInputElement("table-cols",MyApp.tableCols.join(',')));
*/

    String table_name = request.getParameter("table-name");
    String table_cols_str = request.getParameter("table-cols");
    String[] table_cols_arr = table_cols_str.split(",");
    ArrayList<String> table_cols_arrList = new ArrayList<String>(Arrays.asList(table_cols_arr));
    String key = table_cols_arr[0];

    //创造表头和值之间的映射
    TreeMap<String,String> table_maps = new TreeMap<String, String>();
    for (String cols :table_cols_arr){
//        out.println("getting"+cols);
        if(request.getParameter(cols) != null && !request.getParameter(cols).equals("")) {
            String value = request.getParameter(cols);
            value = new String(value.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
            table_maps.put(cols, value);
//            out.println("get ONE" + request.getParameter(cols));
        }else {
//            out.println("get no"+cols);
            table_maps.put(cols, "");
        }
    }
    String operation_type = request.getParameter("operation-type");

    try {
        operation.connect();
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }

    String sql = "";
    if(operation_type.equals("update")){
        sql = sqlEvent.updateSQL(table_cols_arrList,table_maps,table_name,key);
    }else if(operation_type.equals("delete")){
        sql = sqlEvent.deleteSQL(table_maps,table_name,key);
    }else if(operation_type.equals("insert")){
        sql = sqlEvent.insertSQL(table_cols_arrList,table_maps,table_name);
    }else{
        out.println("get undefined operation "+ operation_type);
    }
    int row_num = operation.update(sql);
    out.println(row_num);

    System.out.println(sql);

    try {
        operation.closeAllStatus();
    } catch (SQLException throwables) {
        throwables.printStackTrace();
    }
%>
