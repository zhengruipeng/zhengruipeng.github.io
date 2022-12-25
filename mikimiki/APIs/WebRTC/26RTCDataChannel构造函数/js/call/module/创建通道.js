import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded", function () {
    //dataChannel要在RTCPeerConnection创建之初时创建完毕，
    //之后等待candidate协商之时与candidate共同发送完成点对点通道建立
    AppGlobal.isCaller.addEventListener(ObserverCallBackType.change,async function (){
        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        if(this.value === true){
            console.log("是发送者")
            let channel = rtcPeerConnection.createDataChannel("1");

            channel.onopen = function (){
                PanelOutput.println("sending msg(caller)");
                console.log("sending msg(caller)")
                this.send("hello,this is caller");

                PanelOutput.println(`<details><summary>rtcPeerConnection.sctp</summary>
                    <p style="color:yellow">${rtcPeerConnection.sctp.toString2("<br />",-1,"&nbsp;&nbsp;")}</p>
                    </details>`);
                console.log(rtcPeerConnection.sctp);
            };
            channel.onmessage = function (ev){
                PanelOutput.println("recv msg:",ev.data);
                console.log("recv msg:",ev.data);
            }
        }else if(this.value === false){
            //是接收者
            console.log("是接收者");

            rtcPeerConnection.addEventListener("datachannel",function (ev){
                let channel = ev.channel;
                if(channel.label !== "1")return false;
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
            });
        }

    });
});
