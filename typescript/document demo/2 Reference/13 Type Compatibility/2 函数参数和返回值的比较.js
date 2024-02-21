// 当比较两个函数的兼容性时，需要考虑参数和返回值
// 以下代码中，x的每个参数都有一个在y中有一个兼容类型的对应参数，
// 所以赋值是允许的。
// 第二个赋值是一个错误，因为y有一个必需的第二个参数，而x没有，所以赋值是不允许的。
let x = (a) => 0;
let y = (b, s) => 0;
y = x; // OK
// x = y; // Error
// 类型系统强制源函数的返回类型必须是目标类型的返回类型的子类型。
let a = () => ({ name: "Alice" });
let b = () => ({ name: "Alice", location: "Seattle" });
a = b; // OK
// b = a; // Error, because x() lacks a location property
// 一个rest参数可以接受无限个参数
function invokeLater(args, callback) {
    /* ... Invoke callback with 'args' ... */
}
// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
