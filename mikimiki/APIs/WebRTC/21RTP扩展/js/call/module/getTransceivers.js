import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"
import {CallingState} from "../model/CallingState.js";

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        if(this.value !== CallingState.CALLING)return false;

        let rtcConnection = AppGlobal.RTCConnection;

        // PanelOutput.println("transceiversを出力する");
        // PanelOutput.println(rtcConnection.getTransceivers().toString2("<br />",-1,"&nbsp;&nbsp;"));
        console.log(rtcConnection.getTransceivers())

        // PanelOutput.println("sendersを出力する");
        // PanelOutput.println("<p style='color:orangered'>"+
        //     rtcConnection.getSenders().toString2("<br />",-1,"&nbsp;&nbsp;")+
        // "</p>");
        console.log(rtcConnection.getSenders())

        // PanelOutput.println("receiversを出力する");
        // PanelOutput.println("<p style='color:cadetblue'>"+
        //     rtcConnection.getReceivers().toString2("<br />",-1,"&nbsp;&nbsp;")+
        // "</p>");
        console.log(rtcConnection.getReceivers())

    })
})
