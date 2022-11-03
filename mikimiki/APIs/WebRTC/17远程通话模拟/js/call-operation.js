import {WSConnection} from "../../WebSocket服务器/WSConnection.js"
import {MessageType} from "./MessageType.js";
import {MessagePackage} from "./MessagePackage.js";
import {ConstantObserver, CallBackType} from "./ConstantObserver.js";
import {CallingState} from "./CallingState.js";
import {AppGlobal} from "./AppGlobal.js";

document.addEventListener("DOMContentLoaded", function () {

    const callBtn = this.getElementById("call");
    const receiveBtn = this.getElementById("receive");
    const finishBtn = this.getElementById("finish");
    const videophoneContainer = this.getElementById("videophone-container");
    let currentAudio = {local: null, remote: null};

    let iceServerConfig = {"iceServer": [{"urls": "stun:stun.l.google.com:19302"}]};
    let peerConnA;


    let iceCandidateA = async function (e) {
        if (e.candidate) {
            console.log(new MessagePackage(e.candidate, MessageType.CANDIDATE))
            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(e.candidate, MessageType.CANDIDATE)
            ))
        }
    };
    let iceConnectionStateChangeA = function () {
        console.log("iceConnectionStateChangeA");
    };
    let gotRemoteStream = function (e) {
        currentAudio.remote = new Audio();
        currentAudio.remote.srcObject = e.streams[0];
        currentAudio.remote.autoplay = true;
        currentAudio.remote.muted = false;
    };


    let createOffer = async function (desc) {
        //创建一个description并且发送至对等端。
        await peerConnA.setLocalDescription(desc);

        console.log(new MessagePackage(desc, MessageType.DESCRIPTION))
        wsConnection.sendMessage(JSON.stringify(
            new MessagePackage(desc, MessageType.DESCRIPTION)
        ))

        //发送完description之后，等待对等端返回的answer信息
        // 将信息添加至remoteDescription，恢复之前的监听函数


    };
    peerConnA = new RTCPeerConnection(iceServerConfig);

    let call = async function () {

        peerConnA.addEventListener("icecandidate", iceCandidateA);
        peerConnA.addEventListener("iceconnectionstatechange", iceConnectionStateChangeA);
        peerConnA.addEventListener("track", gotRemoteStream);

        currentAudio.local = new Audio();
        let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true/*, video: true*/});
        currentAudio.local.srcObject = mediaStream;
        currentAudio.local.autoplay = true;
        currentAudio.local.muted = false;

        //打开对话页面并直接开启
        videophoneContainer.className = "start";
        receiveBtn.classList.add("calling");
        finishBtn.classList.add("calling");

        for (let v of mediaStream.getTracks()) {
            peerConnA.addTrack(v, mediaStream);
        }

        let offer = await peerConnA.createOffer()
        await createOffer(offer);

        callingState.value = CallingState.REQUESTING

        finishBtn.addEventListener("click", hungup);
    };

    let hungup = function (ev, sendMsg = true) {
        console.log("hung up");

        console.log(currentAudio)

        currentAudio.local?.pause();
        currentAudio.remote?.pause();
        currentAudio.local = null;
        currentAudio.remote = null;

        // peerConnA.close();

        videophoneContainer.className = "end";

        if (sendMsg)
            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(null, MessageType.CLOSE)
            ));

        callingState.value = CallingState.END;

        receiveBtn.classList.remove("calling");
        finishBtn.classList.remove("calling");

    };

    let wsConnection = new WSConnection("ws://localhost:3000/");

    wsConnection.onopen = function () {


        callBtn.addEventListener("click", call);
    };

    //设置远程描述是不是已经完成了？
    // 监视器可以添加事件，
    let remoteDescriptionIsReady = new ConstantObserver(false);
    //显示现在的通话状态
    let callingState = new ConstantObserver(CallingState.HAS_NO_CALLING);

    //针对不同种消息给出不同种处理方式
    //也就是消息的映射
    wsConnection.messageMap.addMap(MessageType.DESCRIPTION, async function (messagePackage) {
        // peerConnA = new RTCPeerConnection(iceServerConfig);

        peerConnA.addEventListener("icecandidate", iceCandidateA);
        peerConnA.addEventListener("iceconnectionstatechange", iceConnectionStateChangeA);
        peerConnA.addEventListener("track", gotRemoteStream);

        videophoneContainer.className = "start";

        callingState.value = CallingState.REQUESTING
        //只有当接听者摁下接听键的时候才开始正常通话
        receiveBtn.addEventListener("click", async function () {
            currentAudio.local = new Audio();
            let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true/*, video: true*/});
            currentAudio.local.srcObject = mediaStream;
            currentAudio.local.autoplay = true;
            currentAudio.local.muted = false;

            for (let v of mediaStream.getTracks()) {
                peerConnA.addTrack(v, mediaStream);
            }

            //设置remoteDes并创建一个应答
            // 在remoteDes创建之后方可开始加入ICE
            await peerConnA.setRemoteDescription(messagePackage.data);
            remoteDescriptionIsReady.value = true;
            let answer = await peerConnA.createAnswer();
            await peerConnA.setLocalDescription(answer);


            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(answer, MessageType.REMOTE)
            ));

            callingState.value = CallingState.CALLING

            finishBtn.addEventListener("click", hungup);
        });

    });
    wsConnection.messageMap.addMap(MessageType.CANDIDATE, async function (messagePackage) {
        if (!remoteDescriptionIsReady.value) {
            //将所有的事件挂起，当value被修改为true的时候自动执行
            remoteDescriptionIsReady.addEventListener(CallBackType.change, async function () {
                await peerConnA.addIceCandidate(messagePackage.data);
            });
        } else {
            //如果已经为true则直接执行
            await peerConnA.addIceCandidate(messagePackage.data);
        }
    })
    wsConnection.messageMap.addMap(MessageType.CLOSE, function () {
        hungup(null, false);
    });
    wsConnection.messageMap.addMap(MessageType.REMOTE, async function (messagePackage) {
        await peerConnA.setRemoteDescription(messagePackage.data);
        callingState.value = CallingState.CALLING
    });

    wsConnection.messageMap.refreshEvent();

    /*

        wsConnection.onmessage = async function (ev) {
            let data = JSON.parse(ev.data);
            if (data.messageType === MessageType.DESCRIPTION) {
                videophoneContainer.className = "start";

                //只有当接听者摁下接听键的时候才开始正常通话
                receiveBtn.addEventListener("click", async function () {
                    currentAudio.local = new Audio();
                    let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true/!*, video: true*!/});
                    currentAudio.local.srcObject = mediaStream;
                    currentAudio.local.autoplay = true;
                    currentAudio.local.muted = false;

                    for (let v of mediaStream.getTracks()) {
                        peerConnA.addTrack(v, mediaStream);
                    }

                    //设置remoteDes并创建一个应答
                    // 在remoteDes创建之后方可开始加入ICE
                    await peerConnA.setRemoteDescription(data.data);
                    remoteDescriptionIsReady.value = true;
                    let answer = await peerConnA.createAnswer();
                    await peerConnA.setLocalDescription(answer);


                    wsConnection.sendMessage(JSON.stringify(
                        new MessagePackage(answer, MessageType.DESCRIPTION)
                    ));

                    finishBtn.addEventListener("click", hungup);
                });


            } else if (data.messageType === MessageType.CANDIDATE) {

                if (!remoteDescriptionIsReady.value) {
                    //将所有的事件挂起，当value被修改为true的时候自动执行
                    remoteDescriptionIsReady.addEventListener(CallBackType.change, async function () {
                        await peerConnA.addIceCandidate(data.data);
                    });
                } else {
                    //如果已经为true则直接执行
                    await peerConnA.addIceCandidate(data.data);
                }
            } else if (data.messageType === MessageType.CLOSE) {
                hungup(null,false);
            }
        };
    */

    callingState.addEventListener(CallBackType.change, function () {
        console.log(this.value)
        if (this.value === CallingState.CALLING) {
            AppGlobal.callTimer.start();
        } else if (this.value === CallingState.END) {
            AppGlobal.callTimer.reset();
            AppGlobal.callTimer.stop();
        }
    })
})
