<?php include_once "./MysqlOperation.php";
        $table = $_GET['table'];
?>
import {MyApp} from "./javascript/config.js";
import {notify} from "./javascript/notification.js";

(function (){
    let indexDBReq = indexedDB.open("managerDB",4);
    let db;
    let store;
    indexDBReq.onsuccess = function (){
        db = this.result;
        MyApp.database = db;
        let IDBTransaction = db.transaction("<?=$table?>","readwrite");
        let IDBObjectStore = IDBTransaction.objectStore("<?=$table?>");

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
        /*IDBObjectStore.put({
                <?php
                    for ($i=0;$i<count($columns);$i++){
                        echo $columns[$i].":\"".$columns[$i]."\",";
                        //sname:"<?=$row['sname']
                    }
                ?>
            });*/
        <?php
        while($row = $stmt->fetch_assoc()){
        ?>
            <?php
            $output_str = "console.log(\"";
            for ($i=0;$i<count($columns);$i++){
                $output_str.= $columns[$i]."=".$row[$columns[$i]]."  ";
            }
            $output_str .= "\");";
            echo $output_str;
            ?>
            IDBObjectStore.put({

                <?php
                    for ($i=0;$i<count($columns);$i++){
                        echo $columns[$i].":\"".$row[$columns[$i]]."\",";
                        //sname:"<?=$row['sname']
                    }
                ?>
            });
        <?php
        }

        ?>
        notify.println("从云端同步数据成功");
        MyApp.customEvent.dispatchEvent("databaseOnSuccess");
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
