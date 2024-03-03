var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ConstantObserver___observedValue__;
class ObserverCallBackType extends Object {
}
ObserverCallBackType.change = "change"; //代表数值发生了该表
/*
* 此类用于监视变量的变化
* 当变花时触发ObserverCallBackType.change事件
* */
class ConstantObserver extends EventTarget {
    //如果取值的话
    get value() {
        return __classPrivateFieldGet(this, _ConstantObserver___observedValue__, "f");
    }
    //如果对值进行修改的话
    set value(value) {
        __classPrivateFieldSet(this, _ConstantObserver___observedValue__, value, "f");
        let ev = new Event(ObserverCallBackType.change);
        this.dispatchEvent(ev);
    }
    //构造函数初始化被监视的值
    constructor(observedValue) {
        super();
        //设置被监视的值
        _ConstantObserver___observedValue__.set(this, void 0);
        __classPrivateFieldSet(this, _ConstantObserver___observedValue__, observedValue, "f");
    }
}
_ConstantObserver___observedValue__ = new WeakMap();
export { ObserverCallBackType, ConstantObserver };
