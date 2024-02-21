let zoo = [new Rhino(), new Elephant(), new Snake()];
// 理想情况下，我们可能希望zoo被推断为Animal[]，
// 但是由于数组中没有一个对象严格地是Animal类型，
// 我们不会对数组元素类型做出任何推断。
// 要纠正这个问题，可以显式地提供类型：
let zoo2 = [new Rhino(), new Elephant(), new Snake()];
