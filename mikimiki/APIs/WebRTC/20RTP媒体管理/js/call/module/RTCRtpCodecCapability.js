import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    let capabilities = RTCRtpSender.getCapabilities("video");

    capabilities.codecs.forEach((codec) => {
        PanelOutput.println(
            codec.toString2("<br />")
        );
    });
})
