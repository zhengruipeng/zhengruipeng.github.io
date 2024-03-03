//readonly
// 字段可以使用readonly字段可以使用修饰符作为前缀readonly。
// 这可以防止对构造函数外部的字段进行赋值。修饰符作为前缀。这可以防止对构造函数外部的字段进行赋值。
class Greeter {
    name = "world";
    constructor(otherName) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
    err() {
        // this.name = "not ok";
    }
}
const g = new Greeter();
// g.name = "also not ok";
