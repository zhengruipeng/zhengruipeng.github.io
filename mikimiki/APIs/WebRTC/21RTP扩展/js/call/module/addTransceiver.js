import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.beforeAddTrack.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value === false)return false;

        let videoStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
        let videoStreamTracks = videoStream.getVideoTracks()[0]

        let rtcConn = AppGlobal.RTCConnection;
        rtcConn.addTransceiver(videoStreamTracks,{
            direction: "sendonly",
            streams:[videoStream],
            sendEncodings:[
                {rid:'q',scaleResolutionDownBy:2,active:true,maxBitrate:44200}
            ]
        });
        PanelOutput.println("新しいのコンフィグを適用されています");

    });

    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        if(this.value !== CallingState.END)return false;
        AppGlobal.beforeAddTrack.value = false;

    })
})
