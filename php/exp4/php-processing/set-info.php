<?php
/*
htmlFormElement.appendChild(setupInputElement("id",id));
htmlFormElement.appendChild(setupInputElement("sname",name));
htmlFormElement.appendChild(setupInputElement("sage",age));
htmlFormElement.appendChild(setupInputElement("sdept",dept));
htmlFormElement.appendChild(setupInputElement("operation-type",type));*/

    $id = $_POST['id'];
    $sname = $_POST['sname'];
    $sage = $_POST['sage'];
    $sdept = $_POST['sdept'];
    $operation_type = $_POST['operation-type'];

    $mysqli = new mysqli("localhost","root","","database essential");  //连接数据库
    if(mysqli_connect_errno()){
        echo mysqli_connect_error();
        exit;
    }

    $mysqli->query("set names utf8");  //设置与数据库连接的通信方式(编码方式)
    //mysqli_connect_errno()：连接成功返回0,连接失败返回1045
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

//    echo $sql;
    $res = $mysqli->query($sql);
    $row_num = mysqli_affected_rows($mysqli);
    echo $row_num."行受到影响";

    $mysqli -> close();
    ?>