//结构和类型相同即可
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;
x = y; // OK, because y matches structure of x

// 但是有时候泛型会影响类型，导致他们不相等
interface NotEmpty<T> {
    data: T;
}
let a: NotEmpty<number>;
let b: NotEmpty<string>;
// a = b; // Error


//如果不指定类型的话默认带入any类型进行检测，检测过程类似于class
let identity = function <T>(x: T): T {
    return null;
    // ...
};
let reverse = function <U>(y: U): U {
    return null;
    // ...
};
identity = reverse; // OK, because (x: any) => any matches (y: any) => any
