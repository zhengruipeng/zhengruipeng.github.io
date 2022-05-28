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
<%@ page import="java.util.Enumeration" %>
<%--
<%
  String name = new String((request.getParameter("sname")).getBytes("ISO-8859-1"),"UTF-8");
%>
<%=name%>--%>
<%--
<%=request.getMethod("sname")%>--%>
<%
  Enumeration pNames=request.getParameterNames();
  while(pNames.hasMoreElements()){
    String name=(String)pNames.nextElement();
    String value=request.getParameter(name);
    out.print(name + "=" + value);
  }
  out.print(112341234);

%>