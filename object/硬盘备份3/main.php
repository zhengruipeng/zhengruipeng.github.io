<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="main.css" rel="stylesheet" type="text/css" />
    <link href="menu.css" rel="stylesheet" type="text/css" />
    <link href="notification-style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<!--
    可以随时向dataMap中添加新的信息：添加方法：
        如果添加新的数据块则复制一个已有的，按顺序换个名字
        之后__belongTo属性代表这个资源的来源，随便写
        之后在UnionMap.js中把后加的资源包引入，之后添加到数组里，其它的全自动

     可以通过鼠标右键访问工具栏。

     accessSuffix.js用于管理所有支持的后缀，如果文件后缀是支持后缀中的话，
     比较两个资源是否统一的时候会默认忽略后缀
     需要添加直接添加就行

-->
<div id="notification"></div>
<?php
/*    include_once "selectdir.php";
    $json = json_decode($_POST['path']);
    foreach($json as $add=>$name){
        echo json_encode(selectdir($name,$add));
    }
*/?>
<main>

</main>
<script type="module">
    // import {unionMap} from "./UnionMap.js"
    import {parseMap} from "./ParseMap.js"
    import {notify} from "./notification.js"
    document.addEventListener("DOMContentLoaded",function (){
        let unionMap = [
            <?php
                include_once "selectdir.php";
                include_once "handleFiles.php";

                $arr = handleFiles();

                $onlinePart = $arr[0];
                $offlinePart = $arr[1];
                $cantVisitPart = $arr[2];
            ?>
        ];

        notify.print(
            "访问硬盘：<?php echo implode(",",$onlinePart)?><br />" +
            "访问本地备份数据：<?php echo implode(",",$offlinePart)?><br />" +
            "无法访问：<?php echo implode(",",$cantVisitPart)?>")

        const main = this.querySelector("main");



        unionMap.forEach(map => {
            parseMap.parse(map,main);


            // for(let name in map){
            //     console.log(map[name].join ? map[name].join("\n"):undefined);
            // }
        })
    })
</script>
<script type="module" src="./checkFiles.js"></script>
<script type="module" src="./searchBackUp.js"></script>
<script type="module" src="./autoMatchAllBackUp.js"></script>
<script type="module">
    document.addEventListener("DOMContentLoaded",function (){
        const main = this.querySelector("main");

        const div = document.createElement("div");
        div.innerHTML = "返回上一级";
        div.onclick = function (){
            location = "./index.html";
        }

        main.appendChild(div);
    })
</script>

</body>
</html>