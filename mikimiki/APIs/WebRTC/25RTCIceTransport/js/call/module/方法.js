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

        if(!rtcDTMFSender)return false;

        PanelOutput.println("rtcPeerConnection.iceConnectionState",
            rtcPeerConnection.iceConnectionState);

        PanelOutput.println("<span style='color:#00A8EF'>canInsertDTMF: </span><br />",
            "<span style='color:palevioletred'>"+
            rtcDTMFSender.canInsertDTMF+
            "</span>"
        )

        if(!rtcDTMFSender.canInsertDTMF){
            PanelOutput.println("rtcDTMFSender.canInsertDTMF",
                "属性为false，所以无法发送DTMF");
            return false;

        }
        //拨号只能拨双音多频拨号中拥有的键位，1234567890*#abcd
        rtcDTMFSender.insertDTMF("123a456b789c*0#d",400,200);



    })
})
