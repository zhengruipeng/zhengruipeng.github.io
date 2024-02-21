// 最佳通用类型算法会考虑每个候选类型，并选择与所有其他候选类型兼容的类型。
// 即为最小公约数
declare class Animal {
}

declare class Rhino extends Animal {
}

declare class Elephant extends Animal {
}

declare class Snake extends Animal {
}

let zoo = [new Rhino(), new Elephant(), new Snake()];

// 理想情况下，我们可能希望zoo被推断为Animal[]，
// 但是由于数组中没有一个对象严格地是Animal类型，
// 我们不会对数组元素类型做出任何推断。
// 要纠正这个问题，可以显式地提供类型：

let zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()];
