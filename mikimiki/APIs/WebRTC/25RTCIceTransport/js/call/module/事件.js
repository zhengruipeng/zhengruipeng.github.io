import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded", function () {
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change, async function () {
        if (this.value !== CallingState.CALLING) return false;

        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        let rtpSenders = rtcPeerConnection.getSenders()[0];

        let rtcDTMFSender = rtpSenders.dtmf;

        if (!rtcDTMFSender) return false;

        rtcDTMFSender.ontonechange = function (ev) {
            if (ev.tone !== "") {
                PanelOutput.println("<span style='color:#00A8EF'>" + ev.tone + "</span>")
            }
        };
    });
});
