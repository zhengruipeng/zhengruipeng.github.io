abstract class Base {
    abstract getName(): string;

    printName() {
        console.log("Hello, " + this.getName());
    }
}

// const b = new Base();
// 抽象类不可实例化
class Derived extends Base {
    getName() {
        return "world";
    }
}
// 继承抽象类必须重写所有抽象方法
const d = new Derived();
d.printName();


// 如果想编写一个接受Base为基类的类为参数的函数的话
// 下面这种写法不正确
/*function greet(ctor: typeof Base) {
    const instance = new ctor();

    instance.printName();
}*/

//这么写正确
function greet(ctor: new () => Base) {
    const instance = new ctor();
    instance.printName();
}
greet(Derived);
// greet(Base);