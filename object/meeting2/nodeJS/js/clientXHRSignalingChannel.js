let createDignalingChannel = function (key,handlers){
    let id,status;
    let doNothing = function (){};

    handlers = handlers || { };
    let initHandler = function (h){
        return ((typeof h === "function") && h)|| doNothing;
    };
    let waitingHandler = initHandler(handlers.onWaiting);
    let connectedHandler = initHandler(handlers.onConnected);
    let messageHandler = initHandler(handlers.onMessage);

    let send = function (msg,responseHandler){
        responseHandler = responseHandler || function (){};
        let handler = function (){
            if(this.readyState === this.DONE){
                if(this.status === 200 && this.response !== null){
                    let res = JSON.parse(this.response);
                    if(res.err){
                        responseHandler("error: "+res.err);
                        return false;
                    }
                    responseHandler(res);
                    return false;
                }else{
                    responseHandler("HTTP error : "+this.status);
                    return false;
                }
            }
        }
        let client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open("POST","/send");
        let sendData = {id,message:msg};
        client.send(JSON.stringify(sendData));
    };

    let get = function (getResponseHandler){
        let handler = function(){
            if(this.readyState == this.DONE){
                if(this.status === 200 && this.response != null){
                    let res = JSON.parse(this.response);
                    if(res.err){
                        getResponseHandler("error: "+res.err);
                        return false;
                    }
                    getResponseHandler(res);
                    return res;
                }else {
                    getResponseHandler("HTTP error: "+this.status);
                    return false;
                }
            }
        }
        let client = new XMLHttpRequest();
        client.onreadystatechange = handle;
        client.open("POST","/get");
        client.send(JSON.stringify({id}));
    };

    let handleMessage = function (msg){
        setTimeout(function(){messageHandler(msg);},0);
    };

    let poll = function () {
        let msgs;
        let pollWaitDelay = (function (){
            let delay = 10;
            let counter = 1;

            let reset = function (){
                delay = 10;
                counter = 1;
            };

            let increase = function (){
                counter++;
                if(counter>20){
                    delay = 1000;
                }else if(counter > 10){
                    delay = 100;
                }
            };

            let value = function (){
                return delay;
            };

            return {reset,increase,value};

        }());

        let getLoop = (function (){
            get(function (response){
                let i;
                let msgs = (response && response.msgs) || [];

                if(response.msgs && (status !== "connected")){
                    status = "connected";
                    connectedHandler();
                }

                if(msgs.length > 0){
                    pollWaitDelay.reset();
                    for(let i = 0;i<msgs.length;i++){
                        handleMessage(msgs[i]);
                    }
                }else{
                    pollWaitDeley.increase();
                }
                setTimeout(getLoop,pollWaitDelay.value());
            });
        }());
    };

    let connect = function(failureCB){
        failureCB = (typeof failureCB === "function") || function(){};



        let handler = function(){
            if(this.readyState == this.DONE) {
                if (this.status === 200 && this.response != null) {

                    let res = JSON.parse(this.response);
                    if (res.err) {
                        failureCB("error: " + res.err);
                        return false;
                    }

                    id = res.id;
                    status = res.status;
                    poll();

                    if (status === "waiting") {
                        waitingHandler();
                    } else {
                        connectedHandler();
                    }

                    return false;
                } else {
                    failureCB("HTTP error : " + this.status);
                    return false;
                }
            }
        }
        let client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open("GET","connect?key="+key);
        client.send();
    };

    return {
        connect,
        send
    };

}