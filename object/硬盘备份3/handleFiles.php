<?php
include_once "selectdir.php";


function handleFiles($online = [],$offline = [],$cantVisit = []){
    $json = json_decode($_POST['path']);
    foreach($json as $add=>$name){
//        echo $name."----".$add."<br />";
        $json_str = "";
        if(!is_dir($add)){
            if(file_exists("./".$name.".data")){
                //读取文件，分别输出

                $myfile = fopen($name.".data", "r");
                $fileStr = "";
                while (!feof($myfile)) {
                    $bruce=fgets($myfile);
                    $fileStr .= $bruce;
                }
                echo $fileStr.",";

                array_push($offline,$name);
            }else{
                array_push($cantVisit,$name);
            }
        }else{
            $json_str = json_encode(selectdir($name,$add));
            echo $json_str.",";

            //保存至文件
            $myfile = fopen($name.".data", "w");
            fwrite($myfile, $json_str);
            fclose($myfile);

            array_push($online,$name);
        }

    }

    return [$online,$offline,$cantVisit];
}

/*echo "<br /><pre>";
print_r($onlinePart);
print_r($offlinePart);
print_r($cantVisitPart);
echo "</pre>";*/

?>