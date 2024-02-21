/*TypeScript的结构类型系统的基本规则是，
如果y拥有x的所有成员，那么x就是兼容的。
例如，考虑以下涉及一个名为Pet的接口的代码，它有一个name属性：
*/
interface Pet {
    name: string;
}

class Dog {
    name: string;
}

let pet: Pet;
// OK, because of structural typing
pet = new Dog();

// 不能给一个明确规定过类型的变量初始化一个对不上的对象
// let dog: Pet = { name: "Lassie", owner: "Rudd Weatherwax" }; // Error
