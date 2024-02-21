//静态成员可以使用修饰符或者被继承

class MyClass {
    private static x = 0;
}
// console.log(MyClass.x);

class Base {
    static getGreeting() {
        return "Hello world";
    }
}
class Derived extends Base {
    myGreeting = Derived.getGreeting();
}
//静态方法不可以与Function.prototype中的属性重名
//ts没有静态类