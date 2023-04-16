<?php
/**
 * [curlHtml 获取页面信息]
 * @param  [type] $url [网址]
 * @return [type]      [description]
 */

function curlHtml($url)
{
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "{$url}",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding: gzip, deflate, br",
            "Accept-Language: zh-CN,zh;q=0.9",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Cookie: BAIDUID=329DEF1F8FB97B5868230CEDCD03F8B7:FG=1; BAIDUID_BFESS=329DEF1F8FB97B5868230CEDCD03F8B7:FG=1; __bid_n=18662ab6cc46096a21ae4f; PANWEB=1; BDUSS=dtQml-eVFCN093RmZ-OWNzenVxMGNFNk5sNW9jYjJBdVFUcUxPZ3cydndoVHBrRVFBQUFBJCQAAAAAAAAAAAEAAABMmsWnTUlDSEFFTFlVMTczAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD4EmTw-BJkdH; BDUSS_BFESS=dtQml-eVFCN093RmZ-OWNzenVxMGNFNk5sNW9jYjJBdVFUcUxPZ3cydndoVHBrRVFBQUFBJCQAAAAAAAAAAAEAAABMmsWnTUlDSEFFTFlVMTczAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD4EmTw-BJkdH; STOKEN=795eab97a8836b78577d91713853d4fedb4d73f6058785d448ae3df2a3b50409; FPTOKEN=QmlyN3AmtU63T4hGqY1Vcq0IjErtczjDSf2taB0G7OUnTdhkSFE+Tp/pCv1F96zOX9mmGIGh3SdHuq+QiUHY44C5X5O5fPebCr7CUFvyVJy2EEA+MSKQbVuY/q+KWoVy5ieW/EjFH+9zSgOyosc3WxuIHanjQOimDnIEcov4+8CJvrmh0QBUj1lfuzBv7WNW0jOrxhvUNHJ8n4U9IrW/AIYq1nUwCu/y2ge7PgXeX6U+WG6o8Z+Pvy/izAoonfV/nKHRBAi9hjzfI0zT7huZhNl1HoAC4Mof2cVDwJnIBgyE9loHpVEDCVlwg5j0JVZgnpN8TXiqbT1O8fmCpyYVPcx/aJAHdVZceGFw+8Ji+19rufGMX3d5W59aaQuhER7j/XsGOdzRlwEfD4jaWGqPSg==|nLLZKpDFPDS7l2QfR2tC3x1OwB1Qf15Y1aUFqwYaEYc=|10|7d6dc63f1a4ddd857914863c097b53ed; RT=\"z=1&dm=baidu.com&si=fb8d3a8f-0395-400f-8306-e0d0cc724e0a&ss=lgetrmx4&sl=4&tt=5io&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=43ls&ul=44ll&hd=44mm\"; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1678964935,1681384844; BDCLND=Xb1UVz69e%2FTH320FqBojFBBGWYPI8b23ydDVUJ%2B3clQ%3D; csrfToken=CW1Le9v4cP3LfLm4u-BLmVyn; newlogin=1; PANPSC=9172641059933860010%3ACU2JWesajwCdqbze%2BXRqEIYFB6Yu73Hp3XH66FkiQ3PBoMJFTEmM6wZuq6kOUHWCR9seg3qS0umiJqqiIKdGD8ZIzuhpmLh6666zyxAATPs71aGXvS2es9L9vR6DsgcTu1tPRVPr6y7%2FwyO%2B4eG7s0I0NZhR03fFz5xX%2FEZfPGSENn20htUodO4PuTzNr1rr; ndut_fmt=29E85BFAF659E96C2EC1E9AD700DE3C6CA6392B642C0D90F7E1B278960A8CD36; ab_sr=1.0.1_YTNlYzk2MzZlNGY5Y2UwMTc4NjkzYWI1MDM2Y2Y2NTk4YTIxYjg0YTlmNDRhNzdiMDRlZmE5NzJlMzQ5ZDJiMmQzOTU1ZTRhNDA0Y2I5MDViMGViYjU4NjE5YWJjOWQwMWYwYTJhMzhkZjYwZTU0ZTk0NmM3NTAxYTc3ZWVlN2QwNTg3NTcyZDcxOTQwOWRlMTlmYzhjOGU0NGYzMGZjZjk2N2Q1MzZmMTA0NGJiOTEyYjY2MGI2ZWViNTQzMzU0",
            "Pragma: no-cache",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
            "cache-control: no-cache"
        ),
    ));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) return false;
    else return $response;
}

//echo curlHtml("https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=52093900781509660057&order=time&desc=1&dir=%2F郑瑞蓬%27s+误删&num=100&page=1");
// 爬虫核心功能：获取网页源码
//$html = file_get_contents("https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=52093900781509660057&order=time&desc=1&dir=%2F郑瑞蓬%27s+误删&num=100&page=1");
// 通过 php 的 file_get_contents 函数获取百度首页源码，并传给 $html 变量
//echo $html;
// 输出 $html
