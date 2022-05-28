<?php
/*    $mysqli = new mysqli("localhost","root","","database essential");  //连接数据库
    if(mysqli_connect_errno()){
        echo mysqli_connect_error();
        exit;
    }
    $mysqli->query("set names utf8");  //设置与数据库连接的通信方式(编码方式)
    //mysqli_connect_errno()：连接成功返回0,连接失败返回1045
    $sql = "select * from student";
    $res = $mysqli->query($sql);  //返回一个资源类型的数据信息(整型/浮点型/字符型/布尔型/数组/资源类型)
    //$res->fetch_assoc()   专门通过关联数组的方式，获取资源类型的信息

    $count = $res->num_rows; //取数据库中总条数
    while($row = $res->fetch_assoc()){
        echo "<pre>";
        print_r($row);
        echo "</pre>";
    }
    */?>

import {MyApp} from "./javascript/config.js";

(function (){
    let indexDBReq = indexedDB.open("testDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = function (){
        db = this.result;
        MyApp.database = db;
        let IDBTransaction = db.transaction("students","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("students");
        /*IDBObjectStore.add({
        id:"333",
        sname:"php",
        sage:"13",
        sdept:"均来自php"
        });*/
        <?php
        $mysqli = new mysqli("localhost","root","","database essential");  //连接数据库
        if(mysqli_connect_errno()){
            echo mysqli_connect_error();
            exit;
        }
        $mysqli->query("set names utf8");  //设置与数据库连接的通信方式(编码方式)
        //mysqli_connect_errno()：连接成功返回0,连接失败返回1045
        $sql = "select * from student";
        $res = $mysqli -> query($sql);  //返回一个资源类型的数据信息(整型/浮点型/字符型/布尔型/数组/资源类型)
        //$res->fetch_assoc()   专门通过关联数组的方式，获取资源类型的信息

        $count = $res->num_rows; //取数据库中总条数
        while($row = $res->fetch_assoc()){
        ?>
            IDBObjectStore.add({
                id:"<?=$row['id']?>",
                sname:"<?=$row['sname']?>",
                sage:"<?=$row['sage']?>",
                sdept:"<?=$row['sdept']?>"
            });
            /*console.log(`
            IDBObjectStore.add({
                id:"<?=$row['id']?>",
                sname:"<?=$row['sname']?>",
                sage:"<?=$row['sage']?>",
                sdept:"<?=$row['sdept']?>"
            });
            `)*/
        <?php
        }
        ?>

        //console.log(666);
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
