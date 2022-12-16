import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        let rtpSenders = rtcPeerConnection.getSenders()[0];

        let rtcDTMFSender = rtpSenders.dtmf;
        console.log(rtcDTMFSender)
        if(!rtcDTMFSender)return false;

        PanelOutput.println("<span style='color:#00A8EF'>canInsertDTMF: </span><br />",
            "<span style='color:palevioletred'>"+
            rtcDTMFSender.canInsertDTMF+
            "</span>"
        )

        PanelOutput.println("<span style='color:#00A8EF'>toneBuffer: </span><br />",
            "<span style='color:palevioletred'>"+
            rtcDTMFSender.toneBuffer.toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        );
        console.log(rtcDTMFSender.toneBuffer)

    })
})
