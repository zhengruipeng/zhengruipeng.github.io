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
            let channel = rtcPeerConnection.createDataChannel("2",{
                ordered:false,
            });

            channel.onopen = function (){
                PanelOutput.println("发送1000条数据用于测试无序传输");
                console.log("发送1000条数据用于测试无序传输")

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
                if(channel.label !== "2")return false;

                channel.onopen = function (){
                    // PanelOutput.println("sending msg(receiver)");
                    // console.log("sending msg(receiver)")
                    // this.send("hello,this is receiver");
                };
                let messages = [];
                let timer = 0;
                channel.onmessage = function (ev){
                    // PanelOutput.println("recv 200 msgs:",ev.data);
                    // console.log("recv 200 msgs:",ev.data);
                    messages.push(ev.data);
                    clearTimeout(timer);
                    timer = setTimeout(function (){
                        let regexp = /orderless messages: (\d+)/;
                        let currentNum = null;
                        let checked = true;
                        messages.forEach((msg,index) => {
                            let all,num;
                            try{
                                [all,num] = msg.match(regexp);
                            }catch (e){
                                return false;
                            }
                            num -= 0;
                            if(currentNum === null)currentNum = num;
                            else if(currentNum+1 === num){
                                currentNum++;
                                return false;
                            }else if(currentNum+1 !== num) {
                                checked = false;
                                console.log(`在${num}处发现规律错误现象，紧三位分别是[
                                ${(messages[index-2] || "没有")},
                                ${(messages[index-1] || "没有")},
                                ${(messages[index])}]`);
                                PanelOutput.println(`在${num}处发现规律错误现象，紧三位分别是[
                                ${(messages[index-2] || "没有")},
                                ${(messages[index-1] || "没有")},
                                ${(messages[index])}]`);
                                currentNum = num;
                            }
                        });
                        if(checked){
                            console.log("接受了"+messages.length+"条数据，没有错误");
                            PanelOutput.println("接受了"+messages.length+"条数据，没有错误");
                        }

                    },1000);
                };
            });
        }

    });
});
