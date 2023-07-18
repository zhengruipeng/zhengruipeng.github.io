let eventListener = new Map();

/*
* 一个消息映射类，用于给WS协议的消息分组*/
let MessageMap = class extends Object {
    connection = null;      //WS连接
    messageMap = new Map();     //映射表

    constructor(connection) {
        super();
        this.connection = connection;
    }

    /*
    * 收到消息默认触发的事件，此处为结构+派发*/
    defaultEvent(ev) {
        let message = JSON.parse(ev.data);
        let {messageType, data} = message;

        this.invoke(messageType, message)
    }

    /*
    * 更新触发事件
    * */
    refreshEvent(eventFun = this.defaultEvent) {
        this.connection.addEventListener("message", eventFun.bind(this));
    }

    /*
    * 添加一个类型和回调函数的映射*/
    addMap(type, callback) {
        if (!this.messageMap.has(type)) {
            this.messageMap.set(type, [callback])
        } else {
            this.messageMap.get(type).push(callback)
        }
    }

    /*删除一个类型下的所有回调函数*/
    removeMap(type) {
        this.messageMap.delete(type);
    }

    /*调用一个类型下的所有回调函数*/
    invoke(type, messageData) {
        this.messageMap.get(type).forEach(cb => cb(messageData));
    }
}

/*一个WebSocket封装接口*/
class WSConnection extends Object {
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

    sendMessage(...text) {
        this.wsConnection.send(text.join());
    };

    getEventListener() {
        return eventListener;
    }

    addEventListener(event/*String*/, cb/*Function*/) {
        this.wsConnection.addEventListener(event, cb);


        if (eventListener.has(event))
            eventListener.get(event).push(cb);
        else
            eventListener.set(event, [cb]);

    };

    removeEventListener(event/*String*/, cb/*Function*/) {
        this.wsConnection.removeEventListener(event, cb);

        if (eventListener.has(event)) {
            let arr = eventListener.get(event);
            let index = eventListener.get(event).indexOf(cb);
            if (index === -1) return false;

            // delete arr[index];
            arr.splice(index, 1)
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