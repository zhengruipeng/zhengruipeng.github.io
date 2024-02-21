// The inferred return type is void
function noop() {
    return;
}
//object
/*
* object类型是TypeScript 2.2引入的新类型，
* 它表示非原始对象，也就是除了number, string, boolean, symbol, null或undefined之外的任何类型。
* Object类型是所有对象类型的父类型，
* 它由Object接口和ObjectConstructor接口来定义，
* 包含了Object.prototype原型对象上的属性和Object类的属性。
* */
/*
* object和Object类型的一个重要区别是，Object类型可以包括原始值，而object类型不可以。
* object类型可以用来进行疲劳性检查（exhaustiveness check），也就是确保所有的情况都被覆盖到。Object类型则不能用于这个目的。
* object类型可以用来表示不确定的输入参数或返回值，而Object类型则会导致类型丢失。
* object类型可以用来限制对象的属性，只允许已知的属性存在，而Object类型则不会进行属性检查。
* */
//尽量一直使用object
(function () {
    return {};
})();
//unknown
/*
* 该unknown类型代表任何值。这与类型类似any，但更安全，因为对值执行任何操作都是不合法的unknown：
* */
function f1(a) {
    a.b(); // OK
}
function f2(a) {
    // a.b();
}
//never
/*
* never类型表示从未观察到的值。
* 在返回类型中，这意味着函数抛出异常或终止程序的执行。*/
function fail(msg) {
    throw new Error(msg);
}
//Function
/*
* 全局类型Function描述JavaScript中所有函数值上的bind、call、apply等属性。
* 它还具有一个特殊的性质，即函数类型的值总是可以被调用；这些调用返回any*/
/*如果您需要接受任意函数，但不打算调用它，
* 则类型（）=>void通常更安全。*/
function doSomething(f) {
    return f(1, 2, 3);
}
