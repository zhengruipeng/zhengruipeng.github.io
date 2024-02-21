// 当比较两个类类型的对象时，只有实例的成员被比较。静态成员和构造函数不影响兼容性。
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) {}
}
class Size {
    feet: number;
    constructor(numFeet: number) {}
}

let a: Animal;
let s: Size;
a = s; // OK
s = a; // OK

/*
* 两个类必须有来自一个类的私有成员和被保护成员才兼容
*/