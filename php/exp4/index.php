<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="css/table-style.css" rel="stylesheet" type="text/css">
    <link href="css/aside-style.css" rel="stylesheet" type="text/css">
    <link href="css/indexeddb-panel.css" rel="stylesheet" type="text/css">
    <link href="css/notification-style.css" rel="stylesheet" type="text/css">
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
<!--<svg xmlns="http://www.w3.org/2000/svg">
  <path d="M 100 100 L 200 100 200 200 100 200 Z" style="fill:none;stroke:#000">
    <animate attributeType="xml" attributeName="d" begin="0s"
             during="2s" to="M 150 100 L 200 200 100 200 100 200 Z">
    </animate>
  </path>
</svg>-->
<button id="aside-logo" class="aside-logo-open">>></button>

<aside>
    <div id="aside-container">
        <ul class="menu">
            <li class="menu-item" id="delete-selected">删除所有选中</li>
            <li class="menu-item" id="add-student">添加学生信息</li>
            <li class="menu-item" id="select-all" data-select="none">全选</li>
        </ul>
        <ul class="information-form information-form-close">

        </ul>
    </div>
</aside>

<main>
  <table >
      <caption>学生信息表</caption>
      <colgroup>

      </colgroup>
    <thead>
        <tr>
          <th>选中</th>
          <th>学号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>专业</th>
          <th colspan="2">操作</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</main>

<code id="indexeddb-panel"></code>

<div id="notification"></div>

</body>

<script type="module">
    navigator.serviceWorker.register('./service-worker.js',{scope:"./"});
    navigator.serviceWorker.onmessage = function (ev){
        console.log(ev.data);
    }
</script>
<script type="module" src="javascript/fetch-remote-get-info.js"></script>
<script type="module" src="javascript/table-init.js"></script>
<script type="module" src="javascript/UI-and-network-processing.js"></script>
<script type="module" src="javascript/table-resize.js"></script>
<script type="module" src="javascript/editing-table.js"></script>
<script type="module" src="javascript/aside-UI.js"></script>
<script type="module">
    import {MyApp} from "./javascript/config.js";
    import {io} from "./javascript/output-info-into-panel.js";
    import {IndexedDBCurd} from "./javascript/indexedDB-curd.js";
    import {notify} from "./javascript/notification.js";
    window.addEventListener("dblclick",function (){
        console.log(MyApp);
    });
    window.addEventListener("dblclick",function (){
        IndexedDBCurd.getAll(function (res){
            res.forEach(res => {
                io.println(`id=${res.id},sname=${res.sname},sage=${res.sage},sdept=${res.sdept}`);
            })
        })
    });
    window.addEventListener('unload',function (){
        alert("deleted");
        MyApp.database.deleteDatabase("managerDB");
    })
</script>
</html>