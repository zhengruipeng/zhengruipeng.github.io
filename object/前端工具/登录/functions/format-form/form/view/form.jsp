<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <base href="<%=request.getContextPath()+request.getServletPath().substring(0,request.getServletPath().lastIndexOf("/")+1)%>">
    <link href="css/table-style.css" rel="stylesheet" type="text/css">
    <link href="css/aside-style.css" rel="stylesheet" type="text/css">
    <link href="css/indexeddb-panel.css" rel="stylesheet" type="text/css">
    <link href="css/notification-style.css" rel="stylesheet" type="text/css">
    <link href="css/lay-page.css" rel="stylesheet" type="text/css">
    <style>
      svg{
          position:absolute;
          top:0;
          left:0;
          height:100vh;
          width:100vw;
      }

    </style>
</head>
<body>
<%--<svg xmlns="http://www.w3.org/2000/svg">
  <path d="M 100 100 L 200 100 200 200 100 200 Z" style="fill:none;stroke:#000">
    <animate attributeType="xml" attributeName="d" begin="0s"
             during="2s" to="M 150 100 L 200 200 100 200 100 200 Z">
    </animate>
  </path>
</svg>--%>
<button id="aside-logo" class="aside-logo-open">>></button>

<aside>
    <div id="aside-container">
        <ul class="menu">
            <%--<li class="menu-item" id="delete-selected">删除所有选中</li>
            <li class="menu-item" id="add-student">添加信息</li>
            <li class="menu-item" id="select-all" data-select="none">反选</li>--%>
<%--            <li class="menu-item" id="file-import">批量导入</li>--%>
<%--            <li class="menu-item" id="update-monolog">更新日志</li>--%>
<%--            <li class="menu-item">同步到云端（还没开始做）</li>--%>
            <li class="menu-item">当前时间: <span id="datetime-display"></span></li>
            <li class="menu-item"><a href="../../../../web-pages/main.html">回到主页面</a></li>
        </ul>
        <ul class="information-form information-form-close">

        </ul>
    </div>
    <div id="aside-display" class="aside-display-close"></div>
</aside>

<main>
    <div id="previous-page"></div>
  <table >
<!--      <caption>学生信息表</caption>-->
    <colgroup>

    </colgroup>
    <thead>

    </thead>
    <tbody>

    </tbody>
  </table>
    <div id="next-page"></div>

</main>
<code id="indexeddb-panel" style="display: none"></code>

<div id="notification"></div>

</body>
<script type="module" src="javascript/vendor/fetch2.js"></script>
<script type="module">
    import {MyApp} from "../../../../public/config.js";
    MyApp.table = "<%=request.getParameter("table")%>";
    MyApp.handlePage = "<%=request.getParameter("handlePage")%>";
    // MyApp.enablePlugins = "aside-UI,file-import,update-monolog";
    // MyApp.insertPlugins = "url1,url2";
</script>
<script type="module">
    navigator.serviceWorker.register('./service-worker.js',{scope:"./"});
    navigator.serviceWorker.onmessage = function (ev){
        console.log(ev.data);
    }
</script>
<script type="module" src="javascript/control/fetch-remote-get-info.js"></script>
<script type="module" src="javascript/control/table-init.js"></script>
<script type="module" src="javascript/control/UI-and-network-processing.js"></script>
<script type="module" src="javascript/view/table-resize.js"></script>
<script type="module" src="javascript/view/editing-table.js"></script>
<script type="module" src="javascript/view/lay-page.js"></script>
<script type="module" src="javascript/view/show-time.js"></script>
<script type="module" src="javascript/view/aside-logo-button.js"></script>
<%
    String enablePlugins = request.getParameter("enablePlugins");
    if(enablePlugins != null){
        if(enablePlugins.contains("aside-UI")){
            out.println("<script type=\"module\" src=\"javascript/view/aside-UI.js\"></script>\n");
        }
        if(enablePlugins.contains("file-import")){
            out.println("<script type=\"module\" src=\"javascript/view/file-import.js\"></script>\n");
        }
        if(enablePlugins.contains("update-monolog")){
            out.println("<script type=\"module\" src=\"javascript/view/update-monolog.js\"></script>\n");
        }
        if(enablePlugins.equals("*")){
            out.println("<script type=\"module\" src=\"javascript/view/aside-UI.js\"></script>\n");
            out.println("<script type=\"module\" src=\"javascript/view/file-import.js\"></script>\n");
            out.println("<script type=\"module\" src=\"javascript/view/update-monolog.js\"></script>\n");
        }
    }
%>
<%
    String insertPlugins = request.getParameter("insertPlugins");
    if(insertPlugins != null){
        String[] pluginsUrl = insertPlugins.split(",");
        for(String url:pluginsUrl){
            out.println("<script type=\"module\" src=\"../../../../"+url+"\"></script>\n");
        }
    }
%>
<script type="module">
    import {MyApp} from "../../../../public/config.js";
    import {io} from "./javascript/view/output-info-into-panel.js";
    import {IndexedDBCurd} from "../../../../public/indexedDB-curd.js";
    import {notify} from "./javascript/view/notification.js";
    document.addEventListener("DOMContentLoaded",async function (){
        MyApp.customEvent.addListener("tableinit",function () {
            console.log(10);

            MyApp.customEvent.dispatchEvent("allDone");
            console.log(MyApp.customEvent);
        });

    })
    window.addEventListener("dblclick",async function (){
        // console.log(MyApp);
        IndexedDBCurd.getAll(function (arr){
            // console.log(arr);
        })
    });
    window.addEventListener("dblclick",function (){
        IndexedDBCurd.getAll(function (res){
            res.forEach(res => {
                for(let name in res){
                    io.print(name+"="+res[name]+"  ");
                }
                io.println(" ");
            })
        })
    });
    window.addEventListener('unload',function (){

    })
</script>
</html>