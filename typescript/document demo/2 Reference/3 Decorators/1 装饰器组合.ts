function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}

class ExampleClass {
    @first()
    @second()
    method() {}
}

/*
* first(): factory evaluated
* second(): factory evaluated
* second(): called
* first(): called
* */

/*
对于一个类中的各种声明应用的多个装饰器，有明确的顺序：

参数装饰器，然后是方法、访问器或属性装饰器，按照每个实例成员的顺序应用。
参数装饰器，然后是方法、访问器或属性装饰器，按照每个静态成员的顺序应用。
参数装饰器，按照构造函数的参数列表的顺序应用。
类装饰器，按照类声明的顺序应用。*/
