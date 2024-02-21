let x;
let y;
x = y; // OK, because y matches structure of x
let a;
let b;
// a = b; // Error
//如果不指定类型的话默认带入any类型进行检测，检测过程类似于class
let identity = function (x) {
    return null;
    // ...
};
let reverse = function (y) {
    return null;
    // ...
};
identity = reverse; // OK, because (x: any) => any matches (y: any) => any
