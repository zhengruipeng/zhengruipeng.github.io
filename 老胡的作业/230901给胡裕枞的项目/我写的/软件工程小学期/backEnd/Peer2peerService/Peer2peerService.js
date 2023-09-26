// 1：安装nodeJS
// 2：在cmd中输入 npm install nodejs-websocket 从而安装nodejs-websocket
// (在不同文件目录下需要分别下载，下载后出现一个node_modules文件夹)
// 3: 用nodeJS运行此代码从而开启服务器
// 4: 用websocket API访问相应接口
// 5: 注意：index.html别用3000端口打开，而是用一个能够进行正常读取文件的服务器进行打开，比如phpstorm自带服务器

const http = require("http");
const ws = require("nodejs-websocket");

const MessageType = require("../message/model/MessageType");
const MessagePackage = require("../message/model/MessagePackage");
const SendMessage = require("../message/SendMessage")

const MessageOutput = require("../package/MessageOutput")
const {MapperObserveKey, MapperEvent, Mapper} = require("../package/Mapper");

const TwoPeers = require("./TwoPeers");
const PeerManager = require("./PeerManager");
const {CallingManager} = require("./CallingManager");
const fs = require("fs");
const https = require("https");

/*const serverConfig = {
    key: fs.readFileSync('../../certificate/server.key'),
    cert: fs.readFileSync('../../certificate/server.crt')
};*/
const httpserver = http.createServer();

let callingManager = new CallingManager();
const peerManager = new PeerManager();

let wsserver = ws.createServer({server: httpserver}, function (con/*Connection*/) {
    //con为当前连接对象
    con.on("text", function (str) {
        // 1：解析当前端发送过来的消息
        // 2：根据不同种类型消息给到不同的处理函数上
        // 3：当类型为另一端ID时，给定两个端的ID
        // 4：为其他类型信息时，直接转发给另一端

        let messageObj = JSON.parse(str);

        let ok = new MapperObserveKey();
        ok.addKey("messageType");

        let mapper = new Mapper(messageObj, {observeKey: ok});

        mapper.map(MessageType.ANOTHER_ID, function () {
            con.twoPeer = new TwoPeers();
            con.twoPeer.peer2 = peerManager.peers[messageObj.data];
            con.twoPeer.peer1 = con;
        });

        mapper.map(MessageType.MESSAGE, function () {
            if (!con.twoPeer) return;

            let obj = JSON.parse(str);
            obj.from = peerManager.peerToInfo.get(con).id;
            obj.to = peerManager.peerToInfo.get(con.twoPeer.getAnotherPeer(con)).id;
            console.log(obj);

            SendMessage.sendMsg(con.twoPeer.getAnotherPeer(con), JSON.stringify(obj));
            console.log(`${peerManager.getIdByPeer(con)}发送给${peerManager.getIdByPeer(con.twoPeer.getAnotherPeer(con))}`,
                str.substring(0, 40))
        });
        mapper.map(MessageType.CLOSE, function () {
            let peers = callingManager.getPeerAssociatedWith(con);

            callingManager.removePeerAssociatedWith(peers[0].peer1);
            callingManager.removePeerAssociatedWith(peers[0].peer2);

            SendMessage.sendMsg(peers[0].getAnotherPeer(con), str);

            console.log(`${peerManager.getIdByPeer(con)}发送给${peerManager.getIdByPeer(peers[0].getAnotherPeer(con))}`,
                str.substring(0, 40))
        });
        mapper.default(function () {
            //当前用户没有对等端
            if (!con.twoPeer) {
                console.log("当前端没有对等端");
                let peers = callingManager.getPeerAssociatedWith(con);
                if (peers.length === 0) {
                    console.log("当前端没有通信端");
                    //当不存在对等方且没有相关联的通话的时候退出程序
                    //一般处理误操作和错误指令
                    return;
                } else if (peers.length > 1) {
                    console.log("当前端有多个通信端");
                    //如果有大于1个对等端的话则对应一个端有多个通话
                    return;
                }
                console.log("当前端有一个通信端");
                con.twoPeer = peers[0];
            }

            let peers = callingManager.getPeerAssociatedWith(con);
            if (peers.length === 0) {
                console.log("检测到没有通信端，于是加了一个")
                callingManager.addPeer(con.twoPeer);

                peers = callingManager.getPeerAssociatedWith(con);

            }

            console.log("有通信端，正常执行")
            SendMessage.sendMsg(peers[0].getAnotherPeer(con), str);

            console.log(`${peerManager.getIdByPeer(con)}发送给${peerManager.getIdByPeer(peers[0].getAnotherPeer(con))}`,
                str.substring(0, 40), `类型为${JSON.parse(str).messageType}`)
        });
        mapper.call();
    })
    con.on("error", function (code, reason) {

    })
    con.on("close", function () {
        peerManager.removePeer(this);
        callingManager.removePeerAssociatedWith(this);

        let allPeers = [];
        peerManager.peers.forEach(peer => {
            allPeers.push(peerManager.peerToInfo.get(peer).getInfo());
        });

        peerManager.peers.forEach(peer => {
            let arr = structuredClone(allPeers);

            //把自己的信息剔除
            arr.splice(arr.indexOf(peerManager.peerToInfo.get(peer).getInfo()), 1);

            SendMessage.sendMsg(peer, JSON.stringify(
                new MessagePackage(
                    arr,
                    MessageType.NEW_FRIEND
                )));
        });

        MessageOutput.output("目前有：" + JSON.stringify(allPeers));

    });
    con.on("message", function (m) {
        MessageOutput.output("onmessage :" + m);
    });
});

wsserver.on("connection", function (newPeer) {
    /*
    * 1：将新的端存入类中，
    * 2：通知所有端更新列表
    * 3：给新连进来的端传他自己的信息
    * */
    peerManager.addPeer(newPeer);

    let allPeers = [];
    peerManager.peers.forEach(peer => {
        allPeers.push(peerManager.peerToInfo.get(peer).getInfo());
    });

    peerManager.peers.forEach(peer => {
        let arr = structuredClone(allPeers);

        //把自己的信息剔除
        arr.splice(arr.indexOf(peerManager.peerToInfo.get(peer).getInfo()), 1);

        SendMessage.sendMsg(peer, JSON.stringify(
            new MessagePackage(
                arr,
                MessageType.NEW_FRIEND
            )));
    })

    MessageOutput.output("目前有：" + JSON.stringify(allPeers));

    SendMessage.sendMsg(newPeer, JSON.stringify(
        new MessagePackage(
            peerManager.peerToInfo.get(newPeer).getInfo(),
            MessageType.SELF_INFO
        )));
});

//监听3000端口
wsserver.listen(3000);
console.log("websocket server listened in 3000");
