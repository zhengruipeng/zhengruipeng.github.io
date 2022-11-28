import {AppGlobal} from "./AppGlobal.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {PanelOutput} from "./output-info-into-panel.js"

document.addEventListener("DOMContentLoaded",function (){
    AppGlobal.callingState.addEventListener(ObserverCallBackType.change,function (){
        let rtcPeerConnection = AppGlobal.RTCConnection;
        console.table(rtcPeerConnection)
        PanelOutput.println("<span style='color:gold;font-size:1.3em;margin:.2em 0;'>"+this.value+"</span>");

        PanelOutput.println("<span style='color:#00A8EF'>canTrickleIceCandidates: </span>",rtcPeerConnection.canTrickleIceCandidates);

        PanelOutput.println("<span style='color:silver'>Description: </span>");
        PanelOutput.println("<span style='color: #94957C'>当前的本地description类型是：</span>",
            rtcPeerConnection.localDescription === rtcPeerConnection.currentLocalDescription?"current":"pending",
            "<span style='color: #94957C'>类型，</span>");
        PanelOutput.println("<span style='color: #94957C'>当前的远程description类型是：</span>",
            rtcPeerConnection.remoteDescription === rtcPeerConnection.currentRemoteDescription?"current":"pending",
            "<span style='color: #94957C'>类型。</span>")
        PanelOutput.println();

        PanelOutput.println("<span style='color:#00A8EF'>localDescription`s type: </span>",rtcPeerConnection.localDescription?.type);
        PanelOutput.println("<span style='color:#00A8EF'>localDescription`s sdp: </span>",rtcPeerConnection.localDescription?.sdp);
        PanelOutput.println("<span style='color:#00A8EF'>remoteDescription`s type: </span>",rtcPeerConnection.remoteDescription?.type);
        PanelOutput.println("<span style='color:#00A8EF'>remoteDescription`s sdp: </span>",rtcPeerConnection.remoteDescription?.sdp);



        PanelOutput.println();

    })
})
