import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection;
        let rtpSender = rtcPeerConnection.getSenders()[0];

        let rtpStatsReport = await rtpSender.getStats();
        PanelOutput.println(
            "<span style='color:red'>"+
            rtpStatsReport.toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>");
        console.log(rtpStatsReport)
    })
})
