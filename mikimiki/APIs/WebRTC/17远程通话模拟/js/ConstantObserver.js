let CallBackType = class extends Object{
    static change = "change";
}

let ObserverCallBack = class extends Object{
    callbacks = {};

    addEventListener(eventName,callback){
        if(!this.callbacks[eventName] ||
            !this.callbacks[eventName].length)
            this.callbacks[eventName] = [];

        this.callbacks[eventName].push(callback);
    };
    removeEventListener(eventName,callback){
        if(this.callbacks[eventName].indexOf(callback) !== -1){
            this.callbacks[eventName].splice(
                this.callbacks[eventName].indexOf(callback),
                1
            );
        }
    };
    call(eventName){
        if(!this.callbacks[eventName])return false;

        this.callbacks[eventName].forEach(cb => {
            cb.call(this)
        });
        return true;
    }
};

let ConstantObserver = class extends ObserverCallBack{
    __observedValue__;

    get value(){
        return this.__observedValue__;
    }
    set value(value){
        this.__observedValue__ = value;
        this.call(CallBackType.change);
    }

    constructor(observedValue) {
        super();
        this.__observedValue__ = observedValue;
    }
};

export {ConstantObserver,CallBackType}