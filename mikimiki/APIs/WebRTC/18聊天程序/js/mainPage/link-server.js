import {WSConnection} from "../libs/WSConnection.js";
import {CallEnvironment} from "../environment/call.js"
import {MessageEnvironment} from "../environment/message.js"


document.addEventListener("DOMContentLoaded",function (){
    console.log("开始执行连接服务器模块")
    //通过接口创建一个ws协议，连接的是ICE中转服务器
    let wsConnection = new WSConnection("ws://localhost:3000/");

    wsConnection.addEventListener("open",function () {
        // console.log(this);
    });

    CallEnvironment.wsService = wsConnection;
    MessageEnvironment.wsService = wsConnection;

});