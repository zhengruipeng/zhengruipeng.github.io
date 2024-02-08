class MapperObserveKey extends Object {
    keylist = [];
    addKey(key) {
        this.keylist.push(key);
        return this;
    }
    clearKeyList() {
        this.keylist.length = 0;
        return this;
    }
    getValue(obj) {
        let value = obj;
        this.keylist.forEach(key => {
            value = value[key];
        });
        return value;
    }
}
class MapperEvent extends Object {
    key;
    target;
    customData;
    constructor(key, target, customData) {
        super();
        this.key = key;
        this.target = target;
        this.customData = customData;
    }
}
class Mapper extends Object {
    target;
    options;
    #map = new Map();
    map(key, callback) {
        if (!this.#map.get(key)) {
            this.#map.set(key, [callback]);
        }
        else {
            this.#map.get(key).push(callback);
        }
        return this;
    }
    call(...params) {
        let target;
        if (typeof this.target === "object" &&
            this.options.observeKey) {
            target = this.options.observeKey.getValue(this.target);
        }
        else {
            target = this.target;
        }
        let callbacks = this.#map.get(target);
        if (!callbacks)
            return;
        let mapperEvent = new MapperEvent(target, this, params);
        callbacks.forEach(cb => {
            cb(mapperEvent);
        });
    }
    constructor(target, options) {
        super();
        this.target = target;
        this.options = options;
    }
}
class ServiceWorkerHandler extends Object {
    self;
    messageMapper;
    constructor(self) {
        super();
        this.self = self;
    }
    install() {
        console.log(this.self);
        // @ts-ignore
        let registration = this.self.registration;
        // @ts-ignore
        let manager = registration.cookies;
        console.log("service worker installed");
    }
    message(ev) {
        // @ts-ignore
        let registration = this.self.registration;
        // @ts-ignore
        let manager = registration.cookies;
        let mapperObserveKey = new MapperObserveKey();
        mapperObserveKey.addKey("type");
        this.messageMapper = new Mapper(ev.data, { observeKey: mapperObserveKey });
        this.messageMapper.map("subscribe", async function () {
            console.log("subscribe");
            let { name, url } = ev.data;
            name = name || "";
            url = url || "";
            let params = [{ name, url }];
            return await manager.subscribe(params);
        });
        this.messageMapper.map("unsubscribe", async function () {
            console.log("unsubscribe");
            let { name, url } = ev.data;
            name = name || "";
            url = url || "";
            let params = [{ name, url }];
            return await manager.unsubscribe(params);
        });
        this.messageMapper.map("getSubscriptions", async function () {
            let subscriptions = await manager.getSubscriptions();
            let msg = "";
            subscriptions.forEach((v) => {
                msg += JSON.stringify(v);
                msg += ", ";
            });
            console.log(msg);
            ev.source.postMessage(msg);
            return subscriptions;
        });
        this.messageMapper.call();
    }
    cookieChange(ev) {
        console.log("change event invoked:", ev);
    }
}
let handler = new ServiceWorkerHandler(self);
self.addEventListener("install", handler.install);
self.addEventListener("message", handler.message);
self.addEventListener("cookiechange", handler.cookieChange);
