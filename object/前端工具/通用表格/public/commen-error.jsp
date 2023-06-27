<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath %>" />
    <meta charset="UTF-8" />
    <style>
        *{
            font-family: "sans-serif 微软雅黑";
        }
        h1{
            text-indent: .5em;
            font-size: 6em;
        }
        #message{
            text-indent: 2em;
        }
    </style>
</head>
<body>
<h1>:(</h1>
<p id="message">访问失败了，失败原因<span id="reason"></span>，三秒钟跳回员工界面，<a href="./employee/employee_index">点我跳转</a></p>
<script type="module">
	import {LocationMap} from "./employee/libs/LocationMap.js";

    document.addEventListener("DOMContentLoaded",function (){
        const reason = this.querySelector("#reason");
        let locationMap = new LocationMap(location);
		let searchMap = locationMap.getSearchMap();
        reason.innerHTML = searchMap.reason || "暂无";
		setTimeout(function (){
			location = "./employee/employee_index"
		},3000);
    })
    </script>
</body>
</html>