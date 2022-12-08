import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection;

        setTimeout(function (){
            let rtpReceiver = rtcPeerConnection.getReceivers()[0];

            let rtpSynchronizationSources = rtpReceiver.getSynchronizationSources();
            PanelOutput.println(
                "<span style='color:red'>"+
                rtpSynchronizationSources.toString2("<br />",-1,"&nbsp;&nbsp;")+
                "</span>");
            console.log(rtpSynchronizationSources)
        },5e3)
    })
})
