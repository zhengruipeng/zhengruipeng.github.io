//和Mapper为依赖关系
class MapperObserveKey extends Object {
    public keylist: any = [];

    public addKey(key: any): MapperObserveKey {
        this.keylist.push(key);
        return this;
    }

    public clearKeyList(): MapperObserveKey {
        this.keylist.length = 0;
        return this;
    }

    public getValue(obj: Object): any {
        let value: any = obj;

        this.keylist.forEach(key => {
            value = value[key];
        });

        return value;
    }
}

class MapperEvent extends Object {
    public key: any;
    public target: Mapper;
    public customData: Array<any>;

    constructor(key: any, target: Mapper, customData: Array<any>) {
        super();

        this.key = key;
        this.target = target;
        this.customData = customData;
    }
}

interface MapperOptions {
    observeKey: MapperObserveKey;
}

class Mapper extends Object {
    public target: any;
    public options: MapperOptions;
    #map: Map<any, Array<Function>> = new Map();
    #symbolDefault: Symbol = Symbol("default");
    #symbolFinally: Symbol = Symbol("finally");

    public map(key: any, callback: Function): Mapper {
        if (!this.#map.get(key)) {
            this.#map.set(key, [callback]);
        } else {
            //@ts-ignore:
            this.#map.get(key).push(callback);
        }
        return this;
    }

    default(callback: CallableFunction): Mapper {
        if (!this.#map.get(this.#symbolDefault)) {
            this.#map.set(this.#symbolDefault, [callback]);
        } else {
            //@ts-ignore:
            this.#map.get(this.#symbolDefault).push(callback);
        }
        return this;
    }

    public finally(callback: CallableFunction): Mapper {
        if (!this.#map.get(this.#symbolFinally)) {
            this.#map.set(this.#symbolFinally, [callback]);
        } else {
            //@ts-ignore:
            this.#map.get(this.#symbolFinally).push(callback);
        }
        return this;
    }

    public call(...params: Array<any>): void {
        let target: any;
        if (typeof this.target === "object" &&
            this.options.observeKey) {
            target = this.options.observeKey.getValue(this.target);
        } else {
            target = this.target;
        }

        let callbacks: Function[] | undefined = this.#map.get(target);
        if (!callbacks) callbacks = this.#map.get(this.#symbolDefault);
        if (!callbacks) return;
        let finallyCBs: Function[] | undefined = this.#map.get(this.#symbolFinally);

        let mapperEvent: MapperEvent = new MapperEvent(target, this, params);

        callbacks?.forEach((cb: Function) => {
            cb(mapperEvent);
        });
        finallyCBs?.forEach((cb: Function) => {
            cb(mapperEvent);
        });
    }

    public async callSync(...params: Array<any>): Promise<void> {
        let target: any;
        if (typeof this.target === "object" &&
            this.options.observeKey) {
            target = this.options.observeKey.getValue(this.target);
        } else {
            target = this.target;
        }

        let callbacks: Function[] | undefined = this.#map.get(target);
        if (!callbacks) callbacks = this.#map.get(this.#symbolDefault);
        if (!callbacks) return;

        const mapperEvent: MapperEvent = new MapperEvent(target, this, params);

        for (const callback of callbacks) {
            await callback(mapperEvent);
        }
    }

    constructor(target: any, options: MapperOptions | null) {
        super();
        this.target = target;
        this.options = options;
    }
}

export {Mapper, MapperObserveKey, MapperOptions, MapperEvent}