//和Mapper为依赖关系
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
    #symbolDefault = Symbol("default");
    #symbolFinally = Symbol("finally");
    map(key, callback) {
        if (!this.#map.get(key)) {
            this.#map.set(key, [callback]);
        }
        else {
            //@ts-ignore:
            this.#map.get(key).push(callback);
        }
        return this;
    }
    default(callback) {
        if (!this.#map.get(this.#symbolDefault)) {
            this.#map.set(this.#symbolDefault, [callback]);
        }
        else {
            //@ts-ignore:
            this.#map.get(this.#symbolDefault).push(callback);
        }
        return this;
    }
    finally(callback) {
        if (!this.#map.get(this.#symbolFinally)) {
            this.#map.set(this.#symbolFinally, [callback]);
        }
        else {
            //@ts-ignore:
            this.#map.get(this.#symbolFinally).push(callback);
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
            callbacks = this.#map.get(this.#symbolDefault);
        if (!callbacks)
            return;
        let finallyCBs = this.#map.get(this.#symbolFinally);
        let mapperEvent = new MapperEvent(target, this, params);
        callbacks?.forEach((cb) => {
            cb(mapperEvent);
        });
        finallyCBs?.forEach((cb) => {
            cb(mapperEvent);
        });
    }
    async callSync(...params) {
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
            callbacks = this.#map.get(this.#symbolDefault);
        if (!callbacks)
            return;
        const mapperEvent = new MapperEvent(target, this, params);
        for (const callback of callbacks) {
            await callback(mapperEvent);
        }
    }
    constructor(target, options) {
        super();
        this.target = target;
        this.options = options;
    }
}
export { Mapper, MapperObserveKey, MapperEvent };
