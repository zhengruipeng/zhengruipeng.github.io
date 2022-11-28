let eventListener = new Map();

//目前没实现，没啥头绪
let MessageMap = class extends Object{
    connection = null;
    messageMap = new Map();

    constructor(connection) {
        super();
        this.connection =  connection;
    }

    defaultEvent(ev){
        let message = JSON.parse(ev.data);
        let {messageType,data} = message;

        this.invoke(messageType,message)
    }

    refreshEvent(eventFun = this.defaultEvent){
        this.connection.addEventListener("message",this.defaultEvent.bind(this));
    }

    addMap(type,callback){
        if(!this.messageMap.has(type)){
            this.messageMap.set(type,[callback])
        }else{
            this.messageMap.get(type).push(callback)
        }
    }
    removeMap(type){
        this.messageMap.delete(type);
    }
    invoke(type,messageData){
        if(this.messageMap.has(type)){
            this.messageMap.get(type).forEach(cb => cb(messageData));
        }
    }
}

class WSConnection extends Object{
    wsConnection = null;
    messageMap;

    // onopen(){};
    // onclose(){};
    // onerror(){};
    // onmessage(){};


    get onopen() {
        return this.wsConnection.onopen;
    }

    set onopen(fun) {
        this.wsConnection.onopen = fun;
    }

    get onclose() {
        return this.wsConnection.onclose;
    }

    set onclose(fun) {
        this.wsConnection.onclose = fun;
    }

    get onerror() {
        return this.wsConnection.onerror;
    }

    set onerror(fun) {
        this.wsConnection.onerror = fun;
    }

    get onmessage() {
        return this.wsConnection.onmessage;
    }

    set onmessage(fun) {
        this.wsConnection.onmessage = fun;
    }

    sendMessage(...text){
        this.wsConnection.send(text.join());
    };


    getEventListener(){
        return eventListener;
    }

    addEventListener(event/*String*/,cb/*Function*/){
        this.wsConnection.addEventListener(event,cb);


        if(eventListener.has(event))
            eventListener.get(event).push(cb);
        else
            eventListener.set(event,[cb]);

    };

    removeEventListener(event/*String*/,cb/*Function*/){
        this.wsConnection.removeEventListener(event,cb);

        if(eventListener.has(event)){
            let arr = eventListener.get(event);
            let index = eventListener.get(event).indexOf(cb);
            if(index === -1)return false;

            // delete arr[index];
            arr.splice(index,1)
        }
    }


    constructor(url) {
        super();
        this.wsConnection = new WebSocket(url);
        this.wsConnection.onopen = this.onopen;
        this.wsConnection.onclose = this.onclose;
        this.wsConnection.onerror = this.onerror;
        this.wsConnection.onmessage = this.onmessage;
        this.messageMap = new MessageMap(this.wsConnection);

    }


}

export {WSConnection}

/*
* prop:
*   WebSocket wsConnection
* method:
*   undefined sendMessage(...text)
* events:
*   onopen
*   onclose
*   onerror
*   onmessage
*
*
*
*
* */