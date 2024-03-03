class ObserverCallBackType extends Object {
    static change = "change";   //代表数值发生了该表
}

/*
* 此类用于监视变量的变化
* 当变花时触发ObserverCallBackType.change事件
* */
class ConstantObserver<T> extends EventTarget {
    //设置被监视的值
    #__observedValue__: T;

    //如果取值的话
    get value() {
        return this.#__observedValue__;
    }

    //如果对值进行修改的话
    set value(value: T) {
        this.#__observedValue__ = value;
        let ev = new Event(ObserverCallBackType.change);
        this.dispatchEvent(ev);
    }

    //构造函数初始化被监视的值
    constructor(observedValue: T) {
        super();
        this.#__observedValue__ = observedValue;
    }
}

export {ObserverCallBackType, ConstantObserver}