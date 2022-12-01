import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        let rtcPeerConnection = AppGlobal.RTCConnection;

        PanelOutput.println("<span style='color: red'>RTCRtpEncodingParameters</span>")
        let RTCRtpSenderArr = rtcPeerConnection.getSenders();

        RTCRtpSenderArr.forEach(RTCRtpSenderInstance => {
            let RTCRtpParametersInstance = RTCRtpSenderInstance.getParameters();
            let RTCRtpEncodingParametersArr = RTCRtpParametersInstance.encodings;
            console.log(RTCRtpParametersInstance,RTCRtpEncodingParametersArr)

            RTCRtpEncodingParametersArr.forEach(RTCRtpEncodingParameters => {
                PanelOutput.println("<span style='color:#00A8EF'>"+
                    RTCRtpEncodingParameters.toString2("<br />")+
                    "</span>");
            })
        });

    })
})
