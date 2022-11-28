import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        let rtcPeerConnection = AppGlobal.RTCConnection;

        let RTCRtpSenderArr = rtcPeerConnection.getSenders();
        RTCRtpSenderArr.forEach(RTCRtpSenderInstance => {
            let RTCRtpParametersInstance = RTCRtpSenderInstance.getParameters();
            let RTCRtpCodecParametersArr = RTCRtpParametersInstance.codecs;
            RTCRtpCodecParametersArr.forEach(RTCRtpCodecParameters => {
                PanelOutput.println("<span style='color:#00A8EF'>"+
                    RTCRtpCodecParameters.toString2("<br />")+
                    "</span>");
            })

        })
    })
})
