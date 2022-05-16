<?php
$arr = [1,2,2,2,3,4,5,5];
$res = [];
for($i=0;$i<sizeof($arr);$i++){
    $v = $arr[$i];

    if(!array_key_exists($v,$res)){
        $res[$v] = 0;
    }
    $res[$v]++;
}
print_r($res);

?>