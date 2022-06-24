<?php include_once "../model/MysqlOperation.php";
        $table = $_GET['table'];
?>
import {MyApp} from "./javascript/config.js";
import {notify} from "./javascript/notification.js";
import {IndexedDBCurd} from "./javascript/indexedDB-curd.js";

(function (){
    let indexDBReq = indexedDB.open("managerDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = async function (){
        db = this.result;
        MyApp.database = db;


        //添加列信息
        <?php
            MysqlOperation::connect();

            $stmt = MysqlOperation::operate("show columns from ".$table."");
            //echo $stmt;
            $columns = Array();
            while($row = $stmt -> fetch_assoc()){
                array_push($columns,$row['Field']);
                echo "MyApp.tableCols.push('".$row['Field']."');\n";
            }

            $stmt = MysqlOperation::operate("select * from ".$table);
        ?>

        await new Promise(resolve1 => IndexedDBCurd.getAll(function (arr){
            let delPromises = [];
            arr.forEach(row => {
                let key = MyApp.tableCols[0];
                delPromises.push(new Promise(resolve2 =>
                    IndexedDBCurd.delete(row[key],resolve2)
                ));
            })
            Promise.all(delPromises).then(_ => resolve1());
        }));
        /*IDBObjectStore.put({
                <?php
                    for ($i=0;$i<count($columns);$i++){
                        echo $columns[$i].":\"".$columns[$i]."\",";
                        //sname:"<?=$row['sname']
                    }
                ?>
            });*/
        let putPromises = [];
        let IDBTransaction = db.transaction("<?=$table?>","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("<?=$table?>");
        <?php
        while($row = $stmt->fetch_assoc()){
        ?>
            //输出信息，供测试
            <?php
            $output_str = "console.log(\"";
            for ($i=0;$i<count($columns);$i++){
                $output_str.= $columns[$i]."=".$row[$columns[$i]]."  ";
            }
            $output_str .= "\");";
            echo $output_str;
            ?>
                //插入信息
            putPromises.push(new Promise(resolve => {
                IDBObjectStore.put({
                //动态生成数据
                <?php
                for ($i=0;$i<count($columns);$i++){
                    echo $columns[$i].":\"".$row[$columns[$i]]."\",";
                    //sname:"<?=$row['sname']
                }
                ?>
                }).onsuccess = function (){resolve()};
            }));

        <?php
        }
        ?>
        Promise.all(putPromises).then(arr => {
            notify.println("从云端同步数据成功");
            MyApp.customEvent.dispatchEvent("databaseOnSuccess");
        });
    };
    indexDBReq.onerror = function (){
        document.write("database open request error")
    }
    indexDBReq.onupgradeneeded = function (){
        db = this.result;
        store = db.createObjectStore("student",{keyPath:("<?php
                $stmt = MysqlOperation::operate("show columns from student");
                //echo $stmt;
                $row = $stmt -> fetch_assoc();
                echo $row['Field'];
//                array_push($columns,$row['Field']);
            ?>
        ").trim()});
        store = db.createObjectStore("course",{keyPath:("<?php
            $stmt = MysqlOperation::operate("show columns from course");
            //echo $stmt;
            $row = $stmt -> fetch_assoc();
            echo $row['Field'];
            //                array_push($columns,$row['Field']);
        ?>
        ").trim()});
        store = db.createObjectStore("studentgrade",{keyPath:("<?php
            $stmt = MysqlOperation::operate("show columns from studentgrade");
            //echo $stmt;
            $row = $stmt -> fetch_assoc();
            echo $row['Field'];
            //                array_push($columns,$row['Field']);
        ?>
        ").trim()});
        store = db.createObjectStore("exp_view",{keyPath:("<?php
            $stmt = MysqlOperation::operate("show columns from exp_view");
            //echo $stmt;
            $row = $stmt -> fetch_assoc();
            echo $row['Field'];
            //                array_push($columns,$row['Field']);
        ?>
        ").trim()});
        // console.log("onupgradeneeded");
    };
    
})();
<?php
    MysqlOperation::free();
?>
