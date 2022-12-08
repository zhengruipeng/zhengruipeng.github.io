import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection;

        let rtpSenders = rtcPeerConnection.getSenders()[0];

        PanelOutput.println("<span style='color:#00A8EF'>iceTransport: </span><br />",
            "<span style='color:palevioletred'>"+
            rtpSenders.transport?.iceTransport?.toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )

        PanelOutput.println("<span style='color:#00A8EF'>state</span>",
            "<span style='color:palevioletred'>"+
            rtpSenders.transport?.state?.toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )
        // console.log(rtpSenders)
        // console.log(rtpSenders.transport);

    })
})
