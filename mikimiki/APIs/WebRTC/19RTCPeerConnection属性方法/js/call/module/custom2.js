import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        let rtcPeerConnection = AppGlobal.RTCConnection;

        rtcPeerConnection.oniceconnectionstatechange = function (){
            PanelOutput.println("<span style='color: red'>iceConnectionState: </span>",rtcPeerConnection.iceConnectionState);
        };
        rtcPeerConnection.onconnectionstatechange = function (){
            PanelOutput.println("<span style='color: red'>connectionState: </span>",rtcPeerConnection.connectionState);
        };
        rtcPeerConnection.onicegatheringstatechange = function (){
            PanelOutput.println("<span style='color: red'>iceGatheringState: </span>",rtcPeerConnection.iceGatheringState);
        };
        rtcPeerConnection.onsignalingstatechange = function (){
            PanelOutput.println("<span style='color: red'>signalingState: </span>",rtcPeerConnection.signalingState);
        };
        rtcPeerConnection.onnegotiationneeded = function (){
            PanelOutput.println("<span style='color: red'>onnegotiationneeded事件已触发，需要重新协商</span>");
        };
        rtcPeerConnection.onicecandidate = function (ev){
            PanelOutput.println("<span style='color: red'>onicecandidate事件已触发，新的candidate信息如下</span>",
                ev.candidate?.toString2("<br />",5));
        };
        rtcPeerConnection.onicecandidateerror = function (ev){
            PanelOutput.println("<span style='color: red'>onicecandidateerror，错误信息如下</span>",
                ev.errorText);
        };

    })
})
