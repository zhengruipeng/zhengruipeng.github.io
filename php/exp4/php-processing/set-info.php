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