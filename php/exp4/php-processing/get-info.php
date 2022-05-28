<?php include_once "./MysqlOperation.php"?>
import {MyApp} from "./javascript/config.js";
import {notify} from "./javascript/notification.js";

(function (){
    let indexDBReq = indexedDB.open("managerDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = function (){
        db = this.result;
        MyApp.database = db;
        let IDBTransaction = db.transaction("students","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("students");

        <?php
        MysqlOperation::connect();
        $stmt = MysqlOperation::operate("select * from student");

        while($row = $stmt->fetch_assoc()){
        ?>
            console.log(`{id:"<?=$row['id']?>",sname:"<?=$row['sname']?>",sage:"<?=$row['sage']?>",sdept:"<?=$row['sdept']?>"}`)
            IDBObjectStore.put({
                id:"<?=$row['id']?>",
                sname:"<?=$row['sname']?>",
                sage:"<?=$row['sage']?>",
                sdept:"<?=$row['sdept']?>"
            });
        <?php
        }
        MysqlOperation::free();

        ?>
        notify.println("从云端同步数据成功");
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
