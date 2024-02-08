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
    map(key, callback) {
        if (!this.#map.get(key)) {
            this.#map.set(key, [callback]);
        }
        else {
            this.#map.get(key).push(callback);
        }
        return this;
    }
    default(callback) {
        if (!this.#map.get(this.#symbolDefault)) {
            this.#map.set(this.#symbolDefault, [callback]);
        }
        else {
            this.#map.get(this.#symbolDefault).push(callback);
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
        let mapperEvent = new MapperEvent(target, this, params);
        callbacks.forEach((cb) => {
            cb(mapperEvent);
        });
    }
    constructor(target, options) {
        super();
        this.target = target;
        this.options = options;
    }
}
export { Mapper, MapperObserveKey, MapperEvent };
