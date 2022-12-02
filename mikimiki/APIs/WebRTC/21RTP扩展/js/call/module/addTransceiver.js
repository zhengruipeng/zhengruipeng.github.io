import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.beforeAddTrack.addEventListener(ObserverCallBackType.change,function (){
        let audio = new Audio();
        audio.src = "../EVERYDAY!%20SUNNYDAY!%20-%20サニーピース.mp3";
        audio.muted = false;
        audio.autoplay = true;
        let audioStream = audio.captureStream();
        let audioStreamTrack = audioStream.getAudioTracks()[0];

        let rtcConn = AppGlobal.RTCConnection;
        rtcConn.addTransceiver(audioStreamTrack,{
            direction: "sendonly",
            streams:[audioStream],
            sendEncodings:[

            ]
        });
        PanelOutput.println("")
    })
})
