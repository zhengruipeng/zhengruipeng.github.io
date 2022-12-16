import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded", function () {
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change, function () {
        if(this.value !== CallingState.REQUESTING)return false;

        let rtcPeerConnection = AppGlobal.RTCConnection.value;

        let rtpSenders = rtcPeerConnection.getSenders()[0];

        let transport = rtpSenders?.transport;
        let iceTransport = transport?.iceTransport;
        console.log(transport, iceTransport)
        if (!iceTransport) return false;

        iceTransport.onstatechange = function () {
            PanelOutput.println("<span style='color:#00A8EF'>onstatechange: </span><br />",
                "<span style='color:palevioletred'>" +
                iceTransport.state +
                "</span>"
            )
        };
        iceTransport.ongatheringstatechange = function () {
            PanelOutput.println("<span style='color:#00A8EF'>ongatheringstatechange: </span><br />",
                "<span style='color:palevioletred'>" +
                iceTransport.gatheringState +
                "</span>"
            )
        };
        iceTransport.onselecctedcandidatepairchange = function () {
            PanelOutput.println("<span style='color:#00A8EF'>onselecctedcandidatepairchange: </span><br />",
                "<span style='color:palevioletred'>" +
                iceTransport.getSelectedCandidatePair().toString2("<br />", -1, "&nbsp;&nbsp;") +
                "</span>"
            )
        };

        console.log(rtpSenders.transport)
    });
});
