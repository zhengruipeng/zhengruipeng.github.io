<?php
    /*
    htmlFormElement.appendChild(setupInputElement("id",id));
    htmlFormElement.appendChild(setupInputElement("sname",name));
    htmlFormElement.appendChild(setupInputElement("sage",age));
    htmlFormElement.appendChild(setupInputElement("sdept",dept));
    htmlFormElement.appendChild(setupInputElement("operation-type",type));
    htmlFormElement.appendChild(setupInputElement("table-name",MyApp.table));
    htmlFormElement.appendChild(setupInputElement("table-cols",MyApp.tableCols.join(',')));
*/
    include_once "./MysqlOperation.php";
    $table_name = $_POST['table-name'];
    $table_cols = $_POST['table-cols'];
    $table_cols = explode(",",$table_cols);
    $key = $table_cols[0];

    $operation_type = $_POST['operation-type'];

    MysqlOperation::connect();

    $sql = "";
    if($operation_type === "update"){
        $list = "";
        for($i=1;$i<count($table_cols);$i++){
            $list .= $table_cols[$i] ."='". $_POST[$table_cols[$i]] ."',";
        }
        $list = substr($list,0,strlen($list)-1);

        $sql = "update ".$table_name." set ".$list." where ".$key."='".$_POST[$key]."'";
    }else if($operation_type === "delete"){
        $sql = "delete from ".$table_name." where ".$key."='".$_POST[$key]."'";
    }else if($operation_type === "insert"){
        $list1 = "";
        $list2 = "";
        for($i=0;$i<count($table_cols);$i++){
            $list1 .= $table_cols[$i] .",";
        }
        $list1 = substr($list1,0,strlen($list1)-1);
        for($i=0;$i<count($table_cols);$i++){
            $list2 .= "'". $_POST[$table_cols[$i]] ."',";
        }
        $list2 = substr($list2,0,strlen($list2)-1);

        $sql = "INSERT INTO ". $table_name ." (".$list1.") 
                VALUES (".$list2.")";
    }else{
        echo "get undefined operation ".$operation_type;
        exit();
    }
//    echo $sql;

    $row_num = MysqlOperation::operate($sql);
    echo $row_num;

    MysqlOperation::free();
    ?>