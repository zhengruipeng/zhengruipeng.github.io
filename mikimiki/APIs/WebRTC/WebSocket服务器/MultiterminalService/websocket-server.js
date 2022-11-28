// 1：安装nodeJS
// 2：在cmd中输入 npm install nodejs-websocket 从而安装nodejs-websocket
// (在不同文件目录下需要分别下载，下载后出现一个node_modules文件夹)
// 3: 用nodeJS运行此代码从而开启服务器
// 4: 用websocket API访问相应接口
// 5: 注意：index.html别用3000端口打开，而是用一个能够进行正常读取文件的服务器进行打开，比如phpstorm自带服务器
var http = require("http");
var ws = require("nodejs-websocket");

let MessageType = require("../message/model/MessageType")
let MessagePackage = require("../message/model/MessagePackage")

let SendMessage = require("../message/SendMessage")
let MessageOutput = require("../message/MessageOutput")
let Peers = require("./Peers")
let MemberInfo = require("./model/MemberInfo");

let httpserver = new http.Server();
httpserver.on("request", function (req, res) {
    if (req.url === "/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end();
    }
});

let peers = new Peers();
let members = new Map();

let wsserver = ws.createServer({server: httpserver}, function (con/*Connection*/) {
    //con为当前连接对象
    //当收到信息的时候触发此事件
    con.on("text", function (str) {
        MessageOutput.output(peers.indexOf(this) + ": ontext: \n" + str, 120);
        SendMessage.sendMsg(peers.getAnotherPeer(this), str);
    })
    con.on("error", function (code, reason) {
    })
    con.on("close", function (ev) {
        // console.log("关闭输出：",ev);
        let membersInfo = [];
        peers.peers.forEach((p, i) => {
            // membersInfo.push(new MemberInfo(i,"用户" + i));
            membersInfo.push(members.get(p));
        });

        SendMessage.sendMsgToAllPeers(peers.peers,JSON.stringify(
            new MessagePackage(membersInfo, MessageType.FRIEND_OFFLINE)
        ));
        // console.log("Peer" + peers.indexOf(this) + ": closed");

    });
    con.on("message", function (m) {
        MessageOutput.output("onmessage :" + m);
    });
});

let connCounter = 0;
//有新客户端连接到服务器时触发此事件
wsserver.on("connection", function (s) {
    peers = new Peers(wsserver.connections);

    //把最新的连接者放入members数组中
    members.set(peers.peers[peers.length-1],
        new MemberInfo(connCounter,"用户"+connCounter))

    //输出当前有几个人，给个提示信息
    welcomeMsg();

    //给当前账户发送他自己的信息
    sendtheirInfo();

    //给新加入的人发送当前在线的用户
    sendFriendsInfo();

    //给所有在线用户发送新用户
    sendNewFriendInfo(connCounter);

    s.on("message", function (m) {

    });
    //更新下一个人的ID
    connCounter++;

});
wsserver.listen(3000);

let welcomeMsg = function () {
    let outputMsg = "";
    wsserver.connections.forEach(conn => {
        outputMsg += peers.indexOf(conn) + ",";
        // MessageOutput.output("name" + outputMsg + ": " + conn.name);

    })

    MessageOutput.output("检测到新用户，目前有：" + outputMsg);
};

//给新加入的人发送当前在线的用户
let sendFriendsInfo = function () {
    let newPeer = peers.peers[peers.peers.length - 1]
    //收集除了当前用户以外的所有用户，
    let membersInfo = [];
    peers.peers.forEach((p, i) => {
        if(p === newPeer)return false;
        membersInfo.push(members.get(p));

    });
    //给新用户发送所有用户的用户信息
    SendMessage.sendMsg(newPeer, JSON.stringify(
        new MessagePackage(membersInfo, MessageType.FRIEND_LIST)
    ));

};

//给所有在线用户发送新用户
let sendNewFriendInfo = function (memberId) {
    let newPeer = peers.peers[peers.peers.length - 1]
    //收集除了当前用户以外的所有用户，
    // let memberInfo = new MemberInfo(peers.peers.length - 1,"用户" + (peers.peers.length - 1))
    // membersInfo.push(members.get(p));
    let memberInfo = members.get(newPeer);

    console.log("新用户的id和name：",memberInfo.id,memberInfo.name);
    //给所有用户发送新用户的用户信息
    peers.peers.forEach((p, i) => {
        if (p === newPeer) return false;

        SendMessage.sendMsg(p, JSON.stringify(
                new MessagePackage(memberInfo, MessageType.FRIEND_ONLINE)
        ));
    });

};

let sendtheirInfo = function (){
    let newPeer = peers.peers[peers.peers.length - 1]

    // let memberInfo = new MemberInfo(peers.peers.length - 1,"用户" + (peers.peers.length - 1))
    let memberInfo = members.get(newPeer);
    //给新用户发送所有用户的用户信息
    SendMessage.sendMsg(newPeer, JSON.stringify(
        new MessagePackage(memberInfo, MessageType.MY_INFO)
    ));
}