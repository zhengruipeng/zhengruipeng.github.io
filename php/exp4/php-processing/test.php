<?php
include_once "./MysqlOperation.php";
MysqlOperation::connect();
//$stmt = MysqlOperation::operate("delete from student where id='666'");
$stmt = MysqlOperation::operate("select * from student");
//echo $stmt;
while($row = $stmt -> fetch_assoc()){
    print_r($row);
    echo "<br />";
}
MysqlOperation::free();

?>