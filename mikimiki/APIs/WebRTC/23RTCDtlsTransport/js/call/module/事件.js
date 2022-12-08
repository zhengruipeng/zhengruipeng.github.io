import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,async function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection;
        let rtpSenders = rtcPeerConnection.getSenders()[0];

        if(!rtpSenders.transport){
            console.warn("transport is null");
            return false;
        }

        rtpSenders.transport.onstatechange = function (){
            PanelOutput.println("<span style='color:#00A8EF'>onstatechange: </span><br />",
                "<span style='color:palevioletred'>"+
                rtpSenders.transport?.state+
                "</span>"
            )
        };
        rtpSenders.transport.onerror = function (){
            PanelOutput.println("<span style='color:#00A8EF'>onerror: </span><br />",
                "<span style='color:palevioletred'>"+
                rtpSenders.transport?.state+
                "</span>"
            )
        };

        console.log(rtpSenders.transport)
    })
})
