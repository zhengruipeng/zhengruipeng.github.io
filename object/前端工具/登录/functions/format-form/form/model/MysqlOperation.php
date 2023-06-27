<?php

trait MysqlOperation{
    public static $mysqli = null;
    public static $stmt = null;
    public static function connect(){
        MysqlOperation::$mysqli = new mysqli("localhost","root","","database essential");  //连接数据库
        if(mysqli_connect_errno()){
            echo mysqli_connect_error();
            exit;
        }
        MysqlOperation::$mysqli->query("set names utf8");  //设置与数据库连接的通信方式(编码方式)
    }
    public static function operate($sql){
        $res = MysqlOperation::$mysqli -> query($sql);  //返回一个资源类型的数据信息(整型/浮点型/字符型/布尔型/数组/资源类型)
        MysqlOperation::$stmt = $res;
        if(!is_bool($res)){
            return $res;
        }else{
            $row_num = mysqli_affected_rows(MysqlOperation::$mysqli);
            return $row_num."行受到影响";
        }
    }
    public static function free(){
        if (MysqlOperation::$stmt and !is_bool(MysqlOperation::$stmt)) {
            MysqlOperation::$stmt->free();
        }
        if (MysqlOperation::$mysqli) {
            MysqlOperation::$mysqli->close();
        }

    }
}