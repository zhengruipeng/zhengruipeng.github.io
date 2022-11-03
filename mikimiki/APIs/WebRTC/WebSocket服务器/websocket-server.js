// 1：安装nodeJS
// 2：在cmd中输入 npm install nodejs-websocket 从而安装nodejs-websocket
// (在不同文件目录下需要分别下载，下载后出现一个node_modules文件夹)
// 3: 用nodeJS运行此代码从而开启服务器
// 4: 用websocket API访问相应接口
// 5: 注意：index.html别用3000端口打开，而是用一个能够进行正常读取文件的服务器进行打开，比如phpstorm自带服务器
var http = require("http");
var ws = require("nodejs-websocket");

import {SendMessage} from "./message/SendMessage";
import {MessageOutput} from "./message/MessageOutput";

var httpserver = new http.Server();
httpserver.on("request",function (req,res){
    if(req.url === "/"){
        res.writeHead(200,{"Content-type":"text/html"});
        res.end();
    }
});


var wsserver = ws.createServer({server:httpserver},function (con/*Connection*/){
    //con为当前连接对象
    con.on("text",function (str){
        msgOutput(peers.indexOf(this)+": ontext: \n"+str);
        sendMsgToAnotherPeer(peers,this,str)
    })
    con.on("error",function (code,reason){
        // console.log("error code: " + code + "reason: " + reason);
    })
    con.on("close",function (){
        console.log("closed");
    });
    con.on("message",function (m) {
        msgOutput("onmessage :"+m);
    });
});

let peers = []
wsserver.on("connection",function (s){
    console.log("connection");
    peers = wsserver.connections;
    // console.log(s./**/connections)
    s.on("message",function (m) {
        // console.log("onmessage :"+m);
    });

});
wsserver.listen(3000);