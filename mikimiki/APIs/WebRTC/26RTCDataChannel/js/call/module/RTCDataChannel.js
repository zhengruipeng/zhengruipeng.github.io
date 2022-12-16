import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded", function () {
    AppGlobal.isCaller.addEventListener(ObserverCallBackType.change,async function (){
        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        if(this.value === true){
            console.log("是发送者")
            let channel = rtcPeerConnection.createDataChannel("chat");

            channel.onopen = function (){
                PanelOutput.println("sending msg(caller)");
                console.log("sending msg(caller)")
                this.send("hello,this is caller");
            };
            channel.onmessage = function (ev){
                PanelOutput.println("recv msg:",ev.data);
                console.log("recv msg:",ev.data);
            }
        }else if(this.value === false){
            //是接收者
            console.log("是接收者");

            rtcPeerConnection.ondatachannel = function (ev){
                let channel = ev.channel;
                console.log(channel.readyState)

                channel.onopen = function (){
                    PanelOutput.println("sending msg(receiver)");
                    console.log("sending msg(receiver)")
                    this.send("hello,this is receiver");
                };
                channel.onmessage = function (ev){
                    PanelOutput.println("recv msg:",ev.data);
                    console.log("recv msg:",ev.data);
                };
            };
        }

    });
});
