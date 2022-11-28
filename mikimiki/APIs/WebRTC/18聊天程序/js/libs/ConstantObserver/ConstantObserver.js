import {ObserverCallBackType} from "./ObserverCallBackType.js";
//监视器的回调函数管理类
let ObserverCallBack = class extends Object {
    //储存回调函数
    callbacks = {};

    //添加一个事件的回调函数
    addEventListener(eventName, callback) {
        if (!this.callbacks[eventName] ||
            !this.callbacks[eventName].length)
            this.callbacks[eventName] = [];

        this.callbacks[eventName].push(callback);
    };

    //删除
    removeEventListener(eventName, callback) {
        if (this.callbacks[eventName].indexOf(callback) !== -1) {
            this.callbacks[eventName].splice(
                this.callbacks[eventName].indexOf(callback),
                1
            );
        }
    };

    //清除一个类型的所有回调函数
    clearEventListener(eventName) {
        if (this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
    };

    //手动触发一个类型的所有回调函数
    call(eventName) {
        if (!this.callbacks[eventName]) return false;

        this.callbacks[eventName].forEach(cb => {
            cb.call(this)
        });
        return true;
    }
};

//常量监视器基于回调函数类
let ConstantObserver = class extends ObserverCallBack {
    //设置被监视的值
    __observedValue__;

    //如果取值的话
    get value() {
        return this.__observedValue__;
    }

    //如果对值进行修改的话
    set value(value) {
        this.__observedValue__ = value;
        this.call(ObserverCallBackType.change);
    }

    //构造函数初始化被监视的值
    constructor(observedValue) {
        super();
        this.__observedValue__ = observedValue;
    }
};

export {ConstantObserver}