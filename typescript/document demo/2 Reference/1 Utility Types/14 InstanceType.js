"use strict";
// 构造一个由Type中的构造函数类型的实例类型组成的类型。例如：
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
        this.y = 0;
    }
    return C;
}());
// type T2 = never
// type T3 = InstanceType<string>;
/*Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
type T3 = any*/
// type T4 = InstanceType<Function>;
/*
Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
Type 'Function' provides no match for the signature 'new (...args: any): any'.
type T4 = any*/
