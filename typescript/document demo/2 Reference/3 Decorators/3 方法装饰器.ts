/*
* 方法装饰器的表达式在运行时会作为函数被调用，传入下列3个参数：
* 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
* 成员的名字。
* 成员的属性描述符。
* 注意 如果你的脚本目标小于 ES5，属性描述符将会是 undefined。
* */
// 如果修饰器是一个函数调用的话需要写一个高级函数，第一层就是用户调用，第二层是返回给ts的修饰器
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}