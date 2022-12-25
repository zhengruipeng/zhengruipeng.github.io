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
            let channel = rtcPeerConnection.createDataChannel("4",{
                negotiated:true,
                id:4,
            });

            channel.onopen = function (){
                PanelOutput.println("带外协商数据通道创建成功");
                console.log("带外协商数据通道创建成功");
                this.send("带外通道发送信息");
            };
            channel.onmessage = function (ev){

            }
        }else if(this.value === false){
            //是接收者
            console.log("是接收者");
            let channel = rtcPeerConnection.createDataChannel("4",{
                negotiated:true,
                id:4,
            });
            channel.onopen = function (){
                PanelOutput.println("带外协商数据通道创建成功");
                console.log("带外协商数据通道创建成功");
            };

            channel.onmessage = function (ev){
                PanelOutput.println(ev.data);
                console.log(ev.data);
            };
        }

    });
});
