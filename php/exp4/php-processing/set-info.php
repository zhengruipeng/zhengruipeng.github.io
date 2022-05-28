<?php
    /*
    htmlFormElement.appendChild(setupInputElement("id",id));
    htmlFormElement.appendChild(setupInputElement("sname",name));
    htmlFormElement.appendChild(setupInputElement("sage",age));
    htmlFormElement.appendChild(setupInputElement("sdept",dept));
    htmlFormElement.appendChild(setupInputElement("operation-type",type));*/
    include_once "./MysqlOperation.php";

    $id = $_POST['id'];
    $sname = $_POST['sname'];
    $sage = $_POST['sage'];
    $sdept = $_POST['sdept'];
    $operation_type = $_POST['operation-type'];

    MysqlOperation::connect();

    $sql = "";
    if($operation_type === "update"){
        $sql = "update student set sname='".$sname."',sage='".$sage."',sdept='".$sdept."' where id='".$id."' ";
    }else if($operation_type === "delete"){
        $sql = "delete from student where id='".$id."'";
    }else if($operation_type === "insert"){
        $sql = "INSERT INTO student (id,sname,sage,sdept) 
                VALUES ('".$id."','".$sname."','".$sage."','".$sdept."')";
    }else{
        echo "get undefined operation ".$operation_type;
        exit();
    }

    $row_num = MysqlOperation::operate($sql);
    echo $row_num;

    MysqlOperation::free();
    ?>