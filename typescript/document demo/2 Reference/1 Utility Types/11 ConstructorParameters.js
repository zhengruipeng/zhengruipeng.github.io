// 它可以从一个构造函数类型中提取出一个元组类型，包含所有的参数类型（如果Type不是一个函数，那么结果就是never类型）
var C = /** @class */ (function () {
    function C(a, b) {
    }
    return C;
}());
// type T5 = ConstructorParameters<Function>;
