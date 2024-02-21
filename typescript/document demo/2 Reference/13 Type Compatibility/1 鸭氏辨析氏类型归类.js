class Dog {
    name;
}
let pet;
// OK, because of structural typing
pet = new Dog();
// 不能给一个明确规定过类型的变量初始化一个对不上的对象
// let dog: Pet = { name: "Lassie", owner: "Rudd Weatherwax" }; // Error
