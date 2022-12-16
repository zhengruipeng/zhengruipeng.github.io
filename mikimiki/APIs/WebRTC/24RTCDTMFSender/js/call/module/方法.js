import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        let rtpSenders = rtcPeerConnection.getSenders()[0];

        let transport = rtpSenders.transport;
        let iceTransport = transport?.iceTransport;
        console.log(transport,iceTransport)
        if(!iceTransport)return false;

        PanelOutput.println("<span style='color:#00A8EF'>getLocalCandidates: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.getLocalCandidates().toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )

        PanelOutput.println("<span style='color:#00A8EF'>getRemoteCandidates: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.getRemoteCandidates().toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )
        PanelOutput.println("<span style='color:#00A8EF'>getSelectedCandidatePair: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.getSelectedCandidatePair().toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )
        PanelOutput.println("<span style='color:#00A8EF'>getLocalParameters: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.getLocalParameters().toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )
        PanelOutput.println("<span style='color:#00A8EF'>getRemoteParameters: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.getRemoteParameters()?.toString2("<br />",-1,"&nbsp;&nbsp;")+
            "</span>"
        )
    })
})
