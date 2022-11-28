import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        let rtcPeerConnection = AppGlobal.RTCConnection;

        PanelOutput.println("<span style='color: red'>当前取到的是发送者</span>")
        let RTCRtpSenderArr = rtcPeerConnection.getSenders();

        RTCRtpSenderArr.forEach(RTCRtpSenderInstance => {
            let RTCRtpParametersInstance = RTCRtpSenderInstance.getParameters();
            let RTCRtpCodecParametersArr = RTCRtpParametersInstance.codecs;
            console.log(RTCRtpParametersInstance,RTCRtpCodecParametersArr)

            RTCRtpCodecParametersArr.forEach(RTCRtpCodecParameters => {
                PanelOutput.println("<span style='color:#00A8EF'>"+
                    RTCRtpCodecParameters.toString2("<br />")+
                    "</span>");
            })
        });

        PanelOutput.println("<span style='color: red'>当前取到的是接收者</span>")
        let RTCRtpReceiverArr = rtcPeerConnection.getReceivers();

        RTCRtpReceiverArr.forEach(RTCRtpReceiverInstance => {
            let RTCRtpParametersInstance = RTCRtpReceiverInstance.getParameters();
            let RTCRtpCodecParametersArr = RTCRtpParametersInstance.codecs;
            console.log(RTCRtpParametersInstance,RTCRtpCodecParametersArr)

            RTCRtpCodecParametersArr.forEach(RTCRtpCodecParameters => {
                PanelOutput.println("<span style='color:#00A8EF'>"+
                    RTCRtpCodecParameters.toString2("<br />")+
                    "</span>");
            })
        });
    })
})
