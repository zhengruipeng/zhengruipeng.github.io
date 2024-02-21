class Animal {
    move() {
        console.log("Moving along!");
    }
}

class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);

//继承方法要保证参数彼此兼容
class Base {
    greet() {
        console.log("Hello, world!");
    }
}

class Derived extends Base {
    // Make this parameter required

    //这里如果name不是可选的话就会报错
    greet(name?: string) {
        console.log(`Hello, ${name.toUpperCase()}`);
    }
}

//如果你在子类中重新声明一个属性，
//他会覆盖父类的属性
//如果不想覆盖可以用declare
interface Animal {
    dateOfBirth: any;
}

interface Dog extends Animal {
    breed: any;
}

class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
        this.resident = animal;
    }
}

class DogHouse extends AnimalHouse {
    // Does not emit JavaScript code,
    // only ensures the types are correct
    declare resident: Dog;
    constructor(dog: Dog) {
        super(dog);
    }
}

/*
* JavaScript 定义的类初始化顺序是：

基类字段已初始化
基类构造函数运行
派生类字段被初始化
派生类构造函数运行
* 这意味着基类构造函数name在其自己的构造函数期间看到了自己的值，因为派生类字段初始化尚未运行。
* */

class Base2 {
    name = "base";
    constructor() {
        console.log("My name is " + this.name);
    }
}

class Derived2 extends Base2 {
    name = "derived";
}

// Prints "base", not "derived"
const d2 = new Derived2();

//继承内部类
// 将Error、Array和其他子类化可能不再像预期的那样工作。
// 这是因为Error、Array等的构造函数使用ECMAScript 6的new.target来调整原型链；
// 然而，在ECMAScript 5中调用构造函数时，无法确保new.target的值。
// 默认情况下，其他下层编译器通常具有相同的限制。
class MsgError extends Error {
    constructor(m: string) {
        super(m);
    }
    sayHello() {
        return "hello " + this.message;
    }
}
// 您可能会发现：
// 在构造这些子类返回的对象上，方法可能是未定义的，因此调用sayHello将导致错误。
// instanceof将在子类的实例及其实例之间断开，因此（new MsgError（））instanceof MsgError将返回false。

//作为建议，您可以在任何super（…）调用后立即手动调整原型。