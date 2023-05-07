<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2022/05/24
  Time: 14:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="pro.mysql.*" %>
<%@ page import="java.sql.*" %>
<%--JavaScript document--%>
import {MyApp} from "./javascript/config.js";
//document.addEventListener("DOMContentLoaded",function (){
(function (){
    let indexDBReq = indexedDB.open("testDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = function (){
        // console.log("onsuccess");
        db = this.result;
        MyApp.database = db;
        let IDBTransaction = db.transaction("students","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("students");
    <%
        try {
            operation.connect();
            ResultSet rs = operation.select("select * from student");
            while(rs.next()){
                int id  = rs.getInt("id");
                String sname = rs.getString("sname");
                String sage = rs.getString("sage");
                String sdept = rs.getString("sdept");
    %>
                <%--console.log("<%=sname%>");--%>

                IDBObjectStore.add({
                    id:"<%=id%>",
                    sname:"<%=sname%>",
                    sage:"<%=sage%>",
                    sdept:"<%=sdept%>"
                });

    <%
            }
            operation.closeAllStatus();
        } catch (Exception e) {
            e.printStackTrace();
        }
    %>
        MyApp.customEvent.dispatchEvent("databaseOnSuccess");
    };
    indexDBReq.onerror = function (){
        document.write("database open request error")
    }
    indexDBReq.onupgradeneeded = function (){
        db = this.result;
        store = db.createObjectStore("students",{keyPath:"id"});
        // console.log("onupgradeneeded");
    };

})();