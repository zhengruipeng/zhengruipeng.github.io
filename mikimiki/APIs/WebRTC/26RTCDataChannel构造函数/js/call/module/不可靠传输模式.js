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
            let channel = rtcPeerConnection.createDataChannel("3",{
                maxRetransmits:1,
            });

            channel.onopen = function (){
                PanelOutput.println("发送1000条数据用于测试不可靠传输");
                console.log("发送1000条数据用于测试不可靠传输")

                for(let i = 0;i<1e3;i++){
                    this.send("orderless messages: "+i);
                }

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
                if(channel.label !== "3")return false;

                console.log(channel)

                channel.onopen = function (){
                    // PanelOutput.println("sending msg(receiver)");
                    // console.log("sending msg(receiver)")
                    // this.send("hello,this is receiver");
                };
                let messages = [];
                let timer = 0;
                channel.onmessage = function (ev){

                    // PanelOutput.println("recv 1000 msgs:",ev.data);
                    // console.log("recv 1000 msgs:",ev.data)
                    messages.push(ev.data);

                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        PanelOutput.println("recv msgs number:"+messages.length);
                        PanelOutput.println(`${(1000-messages.length)/1000}% loss`);
                        console.log("recv msgs number:",messages.length)
                        console.log(`${(1000-messages.length)/1000}% loss`);

                    },1000);
                };
            });
        }

    });
});
