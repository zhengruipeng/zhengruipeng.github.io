import {WSConnection} from "../../../../WebSocket服务器/WSConnection.js"
import {MessageType} from "../model/MessageType.js";
import {MessagePackage} from "../model/MessagePackage.js";
import {ConstantObserver} from "./ConstantObserver.js";
import {ObserverCallBackType} from "../model/ObserverCallBackType.js";
import {CallingState} from "../model/CallingState.js";
import {AppGlobal} from "./AppGlobal.js";

document.addEventListener("DOMContentLoaded", function () {
    //获取元素
    const callBtn = this.getElementById("call");
    const receiveBtn = this.getElementById("receive");
    const finishBtn = this.getElementById("finish");
    const videophoneContainer = this.getElementById("videophone-container");

    //保存当前的音频
    let currentAudio = {local: null, remote: null};

    let iceServerConfig;

    let generatingCertificate = new ConstantObserver(false);

    //采用默认stun和turn服务器
    RTCPeerConnection.generateCertificate({
        name: "RSASSA-PKCS1-v1_5",
        hash:"SHA-256",
        modulusLength:2048,
        publicExponent:new Uint8Array([1,0,1])
    }).then(rtcCertificate => {
        iceServerConfig = {
            "iceServer": [
                {"urls": "stun:stun.l.google.com:19302"}
            ],
            certificates:[rtcCertificate]
        };
        generatingCertificate.value = true;
        // console.log(rtcCertificate);
    });

    // let peerConnA;
    AppGlobal.beforeAddTrack = new ConstantObserver(false);

    //ice处理的事件
    let iceCandidateA = async function (e) {
        if (e.candidate) {
            // console.log(new MessagePackage(e.candidate, MessageType.CANDIDATE))
            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(e.candidate, MessageType.CANDIDATE)
            ))
        }
    };
    let iceConnectionStateChangeA = function () {
        // console.log("iceConnectionStateChangeA");
    };
    //当远程媒体流传过来的时候触发的事件
    let gotRemoteStream = function (e) {
        // console.log("接收到媒体流")
        currentAudio.remote = new Audio();
        currentAudio.remote.srcObject = e.streams[0];
        currentAudio.remote.autoplay = true;
        currentAudio.remote.muted = false;

        //电话已经接通，设置为通话中
        // callingState.value = CallingState.CALLING

        AppGlobal.RTCConnection?.addEventListener("iceconnectionstatechange",function (){
            // console.log(this.iceConnectionState)
            if(this.iceConnectionState === "connected"){
                callingState.value = CallingState.CALLING
            }
        })
    };

    //拨打电话方拨打电话触发的事件
    let call = async function () {
        // console.log("call函数触发");
        //开始通话的时候重新创建一个PTC对象
        if(!generatingCertificate.value){
            console.warn("generating certification");
            return false;

        }

        let peerConnA = AppGlobal.RTCConnection = new RTCPeerConnection(iceServerConfig);

        //重新注册事件
        peerConnA.addEventListener("icecandidate", iceCandidateA);
        peerConnA.addEventListener("iceconnectionstatechange", iceConnectionStateChangeA);
        peerConnA.addEventListener("track", gotRemoteStream);

        //创建打电话方的麦克风，并且保存至对象中
        currentAudio.local = new Audio();
        let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true/*, video: true*/});
        currentAudio.local.srcObject = mediaStream;
        currentAudio.local.autoplay = true;
        currentAudio.local.muted = true;

        //打开对话页面并直接开启
        videophoneContainer.className = "start";
        receiveBtn.classList.add("calling");
        finishBtn.classList.add("calling");

        //开始添加本地麦克风到待传输媒体流中

        AppGlobal.beforeAddTrack.value = true;
        for (let v of mediaStream.getTracks()) {
            peerConnA.addTrack(v, mediaStream);
        }

        //创建一个description并且发送至对等端。
        let offer = await peerConnA.createOffer()
        await peerConnA.setLocalDescription(offer);
        //发送一个DESCRIPTION类型信息，意为传输描述信息，将信息放到包中送出
        wsConnection.sendMessage(JSON.stringify(
            new MessagePackage(offer, MessageType.DESCRIPTION)
        ))

        //已发出了通话申请，更改当前通话状态为：申请中
        callingState.value = CallingState.REQUESTING

        //当不想打电话的时候可以随时终止电话
        finishBtn.addEventListener("click", hungup);
    };

    //挂断
    let hungup = function (ev, sendMsg = true) {
        //关闭所有正在传输的媒体流并释放麦克风和扬声器资源
        currentAudio.local?.pause();
        currentAudio.remote?.pause();
        currentAudio.local = null;
        currentAudio.remote = null;

        //关闭当前的连接通道
        AppGlobal.RTCConnection.close();

        //关闭通话页面
        videophoneContainer.className = "end";

        //是否需要通知对等端关闭对话
        if (sendMsg)
            //通过发送一个CLOSE类型信息通知对等端通知对方同时挂断
            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(null, MessageType.CLOSE)
            ));

        //设置通话状态为通话结束
        callingState.value = CallingState.END;

        //关闭通话页面
        receiveBtn.classList.remove("calling");
        finishBtn.classList.remove("calling");

        //把设置远程描述是否准备妥当的变量设置为否，
        // 并且将所有已经传到监视器的事件全部清除
        // 防止重复触发事件的同时又能保证下次ICE
        // 在remoteDescription之前到达的话可以按照时间顺序进行等待，
        remoteDescriptionIsReady.clearEventListener(ObserverCallBackType.change);
        remoteDescriptionIsReady.value = false;

    };

    //通过接口创建一个ws协议，连接的是ICE中转服务器
    let wsConnection = AppGlobal.wsConnection = new WSConnection("ws://localhost:3000/");
    //当与ICE中转服务器连接成功的时候即可开始进行通话
    wsConnection.onopen = function () {
        callBtn.addEventListener("click", call);
    };

    //设置远程描述是不是已经完成了？
    // 监视器可以添加事件，
    let remoteDescriptionIsReady = new ConstantObserver(false);
    //显示现在的通话状态
    //默认通话状态是没有通话
    let callingState = AppGlobal.callingState = new ConstantObserver(CallingState.HAS_NO_CALLING);

    //针对不同种消息给出不同种处理方式
    //也就是消息的映射
    //当收到对方传来描述信息的时候
    // 也就是当前程序接到服务器转发过来的电话的时候，
    wsConnection.messageMap.addMap(MessageType.DESCRIPTION, async function (messagePackage) {
        //对方打来电话的时候创建一个RTC对象
        if(!generatingCertificate.value){
            console.warn("generating certification");
            return false;

        }
        let peerConnA = AppGlobal.RTCConnection = new RTCPeerConnection(iceServerConfig);

        // console.log("收到DESCRIPTION类型方法")

        //打开通话页面
        videophoneContainer.className = "start";

        //当前通话状态为正在请求
        callingState.value = CallingState.REQUESTING

        //接听摁钮事件
        //只有当接听者摁下接听键的时候才开始正常通话
        receiveBtn.onclick = async function () {
            //设置被呼叫者的本地麦克风资源
            currentAudio.local = new Audio();
            let mediaStream = await navigator.mediaDevices.getUserMedia({audio: true/*, video: true*/});
            currentAudio.local.srcObject = mediaStream;
            currentAudio.local.autoplay = true;
            currentAudio.local.muted = true;

            //初始化事件
            peerConnA.addEventListener("icecandidate", iceCandidateA);
            peerConnA.addEventListener("iceconnectionstatechange", iceConnectionStateChangeA);
            peerConnA.addEventListener("track", gotRemoteStream);

            //获取媒体流
            for (let v of mediaStream.getTracks()) {
                peerConnA.addTrack(v, mediaStream);
            }

            //设置remoteDes并创建一个应答
            // 在remoteDes创建之后方可开始加入ICE
            await peerConnA.setRemoteDescription(messagePackage.data);
            remoteDescriptionIsReady.value = true;
            let answer = await peerConnA.createAnswer();
            await peerConnA.setLocalDescription(answer);

            //将自己创建好的本地描述传给呼叫者，作为呼叫者的远程描述
            wsConnection.sendMessage(JSON.stringify(
                new MessagePackage(answer, MessageType.REMOTE)
            ));

            //对方也可以随时挂断电话
            finishBtn.addEventListener("click", hungup);
        };

        // receiveBtn.click();
    });
    // 也就是当前程序接到服务器转发过来的ICE候选的时候
    wsConnection.messageMap.addMap(MessageType.CANDIDATE, async function (messagePackage) {
        if (!remoteDescriptionIsReady.value) {
            //将所有的事件挂起，当value被修改为true的时候
            // 也就是远程描述已经准备就绪的时候自动执行
            //如果不这样的话会出错
            remoteDescriptionIsReady.addEventListener(ObserverCallBackType.change, async function () {
                await AppGlobal.RTCConnection.addIceCandidate(messagePackage.data);
            });
        } else {
            //如果已经为true则直接执行
            await AppGlobal.RTCConnection.addIceCandidate(messagePackage.data);
        }
    })
    //对方请求了关闭
    wsConnection.messageMap.addMap(MessageType.CLOSE, function () {
        //如果对方传来了挂断的信息的话，就需要手动触发挂断功能
        // 这个挂断功能执行的时候不能再次发送信息给对方
        // 否则会造成无限循环
        hungup(null, false);
    });
    //对方传来了远程描述，仅当本程序是通话发起者的时候像对方传出了描述
    // 之后等待对方回应的描述时，收到对方的描述
    //也就是远程描述时使用
    wsConnection.messageMap.addMap(MessageType.REMOTE, async function (messagePackage) {
        await AppGlobal.RTCConnection.setRemoteDescription(messagePackage.data);
        // callingState.value = CallingState.CALLING
    });
    //采用默认触发事件方式
    wsConnection.messageMap.refreshEvent();

    //当通话状态发生改变的时候触发
    callingState.addEventListener(ObserverCallBackType.change, function () {
        console.log(this.value)
        //当通话状态变成正在通话的时候开始计时
        if (this.value === CallingState.CALLING) {
            AppGlobal.callTimer.start();
        } else if(
            this.value === CallingState.END||
            this.value === CallingState.HAS_NO_CALLING||
            this.value === CallingState.REQUESTING
        ) {//当通话变成其他状态的时候停止计时并恢复时间为0
            AppGlobal.callTimer.reset();
            AppGlobal.callTimer.stop();
        }
    })
})
