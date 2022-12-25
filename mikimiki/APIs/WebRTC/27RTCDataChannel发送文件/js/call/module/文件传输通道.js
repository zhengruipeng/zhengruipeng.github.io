import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";
import {ConstantObserver} from "./ConstantObserver.js";

document.addEventListener("DOMContentLoaded", function () {
    const sendFileBtn = this.querySelector("#send-file");
    //dataChannel要在RTCPeerConnection创建之初时创建完毕，
    //之后等待candidate协商之时与candidate共同发送完成点对点通道建立
    AppGlobal.isCaller.addEventListener(ObserverCallBackType.change,async function (){
        let rtcPeerConnection = AppGlobal.RTCConnection.value;
        console.log(rtcPeerConnection)
        // console.log(rtcPeerConnection.sctp)

        let channel = null;
        let channelLoaded = new ConstantObserver(false);

        if(this.value === true){
            console.log("是发送者")
            channel = rtcPeerConnection.createDataChannel("file");
            channel.onopen = function (){
                // rtcPeerConnection.sctp.maxMessageSize = 2 ** 16;

                channelLoaded.value = true;
                PanelOutput.println("发送者通道建立完毕");
                console.log("发送者通道建立完毕")

            };
            channel.onmessage = function (ev){
                PanelOutput.println("收到消息:",ev.data);
                console.log("收到消息:",ev.data);
            }
        }else if(this.value === false){
            //是接收者
            console.log("是接收者");

            rtcPeerConnection.addEventListener("datachannel",function (ev){
                if(ev.channel.label !== "file")return false;
                channel = ev.channel;

                channel.onopen = function (){
                    // rtcPeerConnection.sctp.maxMessageSize = 2 ** 16;
                    channelLoaded.value = true;

                    PanelOutput.println("接收者通道建立完毕");
                    console.log("接收者通道建立完毕")

                };

            });
        }

        let fileBuffer;
        let fileBufferPointer = 0;
        // channel.bufferedAmountLowThreshold = 1 * 2 ** 16;
        rtcPeerConnection.onbufferedamountlow = function (){
            if(!fileBuffer)return false;
            PanelOutput.println("sending file with slice: "+fileBufferPointer+" to "+(fileBufferPointer+2**8));
            console.log("sending file with slice: "+fileBufferPointer+" to "+(fileBufferPointer+2**8));

            //每次发送2**8bit的数据
            channel.send(fileBuffer.slice(fileBufferPointer,fileBufferPointer+=2**8))
        };

        sendFileBtn.onchange = function (){
            let file = this.files[0];
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = function (){
                fileBuffer = this.result;
                //每次发送2**8bit的数据
                //直到完成为止
                console.log(typeof file.size)
                console.log(fileBuffer)
                //注意：此方法只允许发送String或者ArrayBuffer
                channel.send(JSON.stringify({size:file.size}));

                while(fileBufferPointer < fileBuffer.byteLength){
                    PanelOutput.println("sending file with slice: "+fileBufferPointer+" to "+(fileBufferPointer+2**8));
                    console.log("sending file with slice: "+fileBufferPointer+" to "+(fileBufferPointer+2**8));
                    console.log(fileBuffer.slice(fileBufferPointer,fileBufferPointer+2**8))
                    channel.send(fileBuffer.slice(fileBufferPointer,fileBufferPointer+=2**8))

                }
                channel.send("EOF")
            }
        };

        let receivedBuffer;
        let receivedBufferPointer = 0;
        channelLoaded.addEventListener(ObserverCallBackType.change,function (){
            channel.addEventListener("message",function (ev){
                let data = ev.data;
                // if(!data instanceof ArrayBuffer && ev.data !== "EOF" && typeof ev.data !== "number")return false;

                console.log(typeof data);
                try{
                    let configObj = JSON.parse(data);
                    let {size} = configObj;
                    console.log(data);

                    receivedBuffer = new ArrayBuffer(size);
                    PanelOutput.println("初始化长度为"+size);

                    console.log("初始化长度为"+size);
                    return false;
                }catch (e){
                    console.log("JSON无法转换")
                }

                if(data === "EOF"){
                    PanelOutput.println("finish");
                    console.log("finish");
                    console.log(new Uint16Array(receivedBuffer));
                    //删除结尾EOF

                    let receivedFile = new File(new Uint16Array(receivedBuffer),"sendedMsg.txt", {
                        type: "text/plain",
                    });
                    let url = URL.createObjectURL(receivedFile);
                    let a = document.createElement("a");
                    a.download ="sendedMsg.txt";
                    a.href = url;
                    document.body.appendChild(a);
                    a.style.display = "none";
                    a.click();

                    return false;


                }

                PanelOutput.println("received buffer data package");
                console.log("received buffer data package");
                // receivedBuffer = receivedBuffer.concat(Array.from(data));
                //把buffer和receivedBuffer进行连接
                let buffer32 = new Uint16Array(data)
                let receivedBuffer32 = new Uint16Array(receivedBuffer);
                buffer32.forEach(v => {
                    // console.log(String.fromCharCode.call(null,v))
                    receivedBuffer32[receivedBufferPointer++] = String.fromCharCode.call(null,v);
                });
                console.log(receivedBuffer);



            });
        })


    });
});
