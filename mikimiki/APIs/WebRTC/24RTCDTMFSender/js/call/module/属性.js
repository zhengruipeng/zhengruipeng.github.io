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

        PanelOutput.println("<span style='color:#00A8EF'>role: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.role+
            "</span>"
        )

        PanelOutput.println("<span style='color:#00A8EF'>component: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.component+
            "</span>"
        )
        PanelOutput.println("<span style='color:#00A8EF'>state: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.state+
            "</span>"
        )
        PanelOutput.println("<span style='color:#00A8EF'>gatheringState: </span><br />",
            "<span style='color:palevioletred'>"+
            iceTransport.gatheringState+
            "</span>"
        )


    })
})
