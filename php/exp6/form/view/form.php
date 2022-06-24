<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <base href="<?php echo substr($_SERVER['PHP_SELF'],0,strrpos($_SERVER['PHP_SELF'],"/")+1)?>">
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
<!--      <caption>学生信息表</caption>-->
    <colgroup>

    </colgroup>
    <thead>

    </thead>
    <tbody>

    </tbody>
  </table>
</main>

<code id="indexeddb-panel"></code>

<div id="notification"></div>

</body>
<script type="module">
    import {MyApp} from "./javascript/config/config.js";
    MyApp.table = "<?=$_POST['table']?>";
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
<script type="module" src="javascript/view/aside-UI.js"></script>
<script type="module">
    import {MyApp} from "./javascript/config/config.js";
    import {io} from "./javascript/view/output-info-into-panel.js";
    import {IndexedDBCurd} from "./javascript/config/indexedDB-curd.js";
    import {notify} from "./javascript/view/notification.js";
    document.addEventListener("DOMContentLoaded",async function (){

      /*  await new Promise(resolve => IndexedDBCurd.getAll(function (arr){
            let delPromises = [];
            arr.forEach(row => {
                let key = MyApp.tableCols[0];
                delPromises.push(new Promise(resolve =>
                    IndexedDBCurd.delete(row[key]).onsuccess = resolve;
                ));
            })
            Promise.all(delPromises).then(resolve());

        }))*/

    })
    window.addEventListener("dblclick",function (){
        console.log(MyApp);
        IndexedDBCurd.getAll(function (arr){
            console.log(arr);
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
        alert("deleted");
        // MyApp.database.deleteDatabase("managerDB");
    })
</script>
</html>