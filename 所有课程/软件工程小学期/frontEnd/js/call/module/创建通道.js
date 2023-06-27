import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded", function () {
    //dataChannel要在RTCPeerConnection创建之初时创建完毕，
    //之后等待candidate协商之时与candidate共同发送完成点对点通道建立
    AppGlobal.isCaller.addEventListener(ObserverCallBackType.change, async function () {
        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        if (this.value === true) {
            console.log("数据通道发送者")
            let channel = rtcPeerConnection.createDataChannel("1");

            channel.onopen = function () {
                console.log("发送者发送信息")
                this.send("hello,this is caller");
            };
            channel.onmessage = function (ev) {
                console.log("收到信息：", ev.data);
            }
        } else if (this.value === false) {
            //是接收者
            console.log("数据通道接收者");

            rtcPeerConnection.addEventListener("datachannel", function (ev) {
                let channel = ev.channel;
                if (channel.label !== "1") return false;
                console.log("信息通道状态：", channel.readyState)

                channel.onopen = function () {
                    console.log("接受者发送信息")
                    this.send("hello, this is receiver");
                };
                channel.onmessage = function (ev) {
                    console.log("收到信息：", ev.data);
                };
            });
        }

    });
});
