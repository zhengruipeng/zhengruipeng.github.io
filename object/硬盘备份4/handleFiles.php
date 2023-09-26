<?php
include_once "selectdir.php";
include_once "requestData.php";

function handleFiles($online = [], $offline = [], $cantVisit = [])
{
    $json = json_decode($_POST['path']);
    //结果集，写成JSON形式
    $res = array();
    foreach ($json as $add => $name) {
//        echo $name."----".$add."<br />";
        $json_str = "";
        $res['__belongTo'] = $add;

        //当用户获取百度云盘信息的时候
        if (str_contains($add, "百度")) {
//            echo "<p style='color:red'>" . $name . "----" . $add . "</p><br />";
            $url_lists = array(
                "动漫" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240066&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%8A%A8%E6%BC%AB&num=100&page=1",
                "电视剧" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240070&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E7%94%B5%E8%A7%86%E5%89%A7&num=100&page=1",
                //软件
                "软件" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240073&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E8%BD%AF%E4%BB%B6&num=100&page=1",
                //郑瑞蓬's 误删 >备份
                //课程录像
                "课程录像" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240042&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E8%AF%BE%E7%A8%8B%E5%BD%95%E5%83%8F&num=100&page=1",
                //夏日社
                "夏日社" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240046&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E5%A4%8F%E6%97%A5%E7%A4%BE&num=100&page=1",
                //经典游戏
                "经典游戏" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240051&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E7%BB%8F%E5%85%B8%E6%B8%B8%E6%88%8F&num=100&page=1",
                //量子acg
                "量子acg" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240054&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E9%87%8F%E5%AD%90&num=100&page=1",
                //系统
                "系统" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240057&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E7%B3%BB%E7%BB%9F&num=100&page=1",
                //galgame
                "galgame" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240061&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2Fgalgame&num=100&page=1",
                //月下
                "月下" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240079&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2F%E6%9C%88%E4%B8%8B&num=100&page=1",
                //acgngame
                "acgngame" =>
                    "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240093&order=time&desc=1&dir=%2F%E9%83%91%E7%91%9E%E8%93%AC%27s+%E8%AF%AF%E5%88%A0%2F%E5%A4%87%E4%BB%BD%2Facgngame&num=100&page=1",
            );


            foreach ($url_lists as $name => $url) {
//                echo "<p style='color:red'>{$add}：" . $name . "----" . $url . "</p><br />";

                $response = json_decode(curlHtml($url));
//                print_r($response);
//                print_r($response -> errno);
                //当错误码不等于0时就意味着出错了
//                echo "<p style='color:red'>" . $response -> errno . "</p>";

//                echo "{$add}";
                //当断网或者是请求回来的数据有问题的时候触发
                if (!property_exists($response, "errno")) {
//                    echo "<p style='color:red'>{$add}：" . $name . "----" . $url . "网络发送失败</p><br />";
                    if (file_exists("./{$name}.data")) {
                        //读取文件，分别输出

                        $myfile = fopen("./{$add}.data", "r");
                        $fileStr = "";
                        while (!feof($myfile)) {
                            $bruce = fgets($myfile);
                            $fileStr .= $bruce;
                        }
                        echo $fileStr . ",";

                        array_push($offline, "{$add}");
                    } else {
                        array_push($cantVisit, "{$add}");
                    }
                    break;
                } else if ($response->errno !== 0) {
//                    echo "<p style='color:red'>{$add}：" . $name . "----" . $url . "请求发生错误</p><br />";
                    array_push($cantVisit, "{$add}");
                    continue;
                }

                foreach ($response->list as $obj_data) {
                    $server_filename = $obj_data->server_filename;
                    $path = "{$add}:/" . substr($obj_data->path, 0, strpos($obj_data->path, $server_filename));
                    $res[$path][] = $server_filename;

                }
//                echo "<pre>";
//                print_r($res);
//                echo "</pre>";

                /*                echo "<pre style='color:red'>";
                                print_r($response -> list);
                                echo "</pre>";*/
                /*
                 * Array
(
    [0] => stdClass Object
        (
            [tkbind_id] => 0
            [server_mtime] => 1681384896
            [category] => 6
            [real_category] =>
            [fs_id] => 800151798696674
            [dir_empty] => 1
            [oper_id] => 0
            [server_ctime] => 1665285330
            [extent_tinyint7] => 0
            [wpfile] => 0
            [owner_type] => 1
            [local_mtime] => 1665285330
            [size] => 0
            [isdir] => 1
            [share] => 0
            [pl] => 1
            [from_type] => 0
            [local_ctime] => 1665285330
            [path] => /郑瑞蓬's 误删/动漫/孤独摇滚!
            [empty] => 0
            [server_atime] => 0
            [server_filename] => 孤独摇滚!
            [owner_id] => 908847743
            [unlist] => 0
        )
                 * */


            }
            $json_res = json_encode($res);
            echo $json_res . ",";

            //保存至文件
            $myfile = fopen("{$add}.data", "w");
            fwrite($myfile, $json_res);
            fclose($myfile);

            array_push($online, "{$add}");


        }
        else if (!is_dir($add)) {
            if (file_exists("./" . $name . ".data")) {
                //读取文件，分别输出

                $myfile = fopen($name . ".data", "r");
                $fileStr = "";
                while (!feof($myfile)) {
                    $bruce = fgets($myfile);
                    $fileStr .= $bruce;
                }
                echo $fileStr . ",";

                array_push($offline, $name);
            } else {
                array_push($cantVisit, $name);
            }
        }
        else {
            $json_str = json_encode(selectdir($name, $add));
            echo $json_str . ",";

            //保存至文件
            $myfile = fopen($name . ".data", "w");
            fwrite($myfile, $json_str);
            fclose($myfile);

            array_push($online, $name);
        }

    }

    return [$online, $offline, $cantVisit];
}

/*echo "<br /><pre>";
print_r($onlinePart);
print_r($offlinePart);
print_r($cantVisitPart);
echo "</pre>";*/

?>