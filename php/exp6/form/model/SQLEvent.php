<?php

trait SQLEvent{
    public static function updateSQL($table_cols,$table_name,$key){
        $list = "";
        for($i=1;$i<count($table_cols);$i++){
            $list .= $table_cols[$i] ."='". $_POST[$table_cols[$i]] ."',";
        }
        $list = substr($list,0,strlen($list)-1);

        $sql = "update ".$table_name." set ".$list." where ".$key."='".$_POST[$key]."'";
        return $sql;
    }
    public static function deleteSQL($table_name,$key){
        $sql = "delete from ".$table_name." where ".$key."='".$_POST[$key]."'";
        return $sql;
    }
    public static function insertSQL($table_cols,$table_name){
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
        return $sql;
    }
}