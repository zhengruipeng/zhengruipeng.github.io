// 1：安装nodeJS
// 2：在cmd中输入 npm install nodejs-websocket 从而安装nodejs-websocket
// (在不同文件目录下需要分别下载，下载后出现一个node_modules文件夹)
// 3: 用nodeJS运行此代码从而开启服务器
// 4: 用websocket API访问相应接口
// 5: 注意：index.html别用3000端口打开，而是用一个能够进行正常读取文件的服务器进行打开，比如phpstorm自带服务器
var http = require("http");
var ws = require("nodejs-websocket");

let SendMessage = require("../message/SendMessage")
let MessageOutput = require("../message/MessageOutput")
let TwoPeers = require("./TwoPeers")

var httpserver = new http.Server();
httpserver.on("request",function (req,res){
    if(req.url === "/"){
        res.writeHead(200,{"Content-type":"text/html"});
        res.end();
    }
});

let peers = new TwoPeers();

let wsserver = ws.createServer({server:httpserver},function (con/*Connection*/){
    //con为当前连接对象
    con.on("text",function (str){
        MessageOutput.output(peers.indexOf(this)+": ontext: \n"+str,120);
        SendMessage.sendMsg(peers.getAnotherPeer(this),str);
    })
    con.on("error",function (code,reason){

    })
    con.on("close",function (){
        console.log("Peer"+peers.indexOf(this)+": closed");
    });
    con.on("message",function (m) {
        MessageOutput.output("onmessage :"+m);
    });
});

wsserver.on("connection",function (s){
    peers = new TwoPeers(...wsserver.connections);

    let outputMsg = "";
    wsserver.connections.forEach(conn => {
        outputMsg += peers.indexOf(conn)+",";
    })

    MessageOutput.output("new peer joined, peers: "+ outputMsg);

    // console.log(s./**/connections)
    s.on("message",function (m) {
        // console.log("onmessage :"+m);
    });

});
wsserver.listen(3000);