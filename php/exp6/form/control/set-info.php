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
    include_once "../model/MysqlOperation.php";
    include_once "../model/SQLEvent.php";
    $table_name = $_POST['table-name'];
    $table_cols = $_POST['table-cols'];
    $table_cols = explode(",",$table_cols);
    $key = $table_cols[0];

    $operation_type = $_POST['operation-type'];

    MysqlOperation::connect();

    $sql = "";
    if($operation_type === "update"){
        $sql = SQLEvent::updateSQL($table_cols,$table_name,$key);
    }else if($operation_type === "delete"){
        $sql = SQLEvent::deleteSQL($table_name,$key);
    }else if($operation_type === "insert"){
        $sql = SQLEvent::insertSQL($table_cols,$table_name);
    }else{
        echo "get undefined operation ".$operation_type;
        exit();
    }
//    echo $sql;

    $row_num = MysqlOperation::operate($sql);
    echo $row_num;

    MysqlOperation::free();
    ?>