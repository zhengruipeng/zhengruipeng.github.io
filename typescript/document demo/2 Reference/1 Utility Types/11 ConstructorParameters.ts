// 它可以从一个构造函数类型中提取出一个元组类型，包含所有的参数类型（如果Type不是一个函数，那么结果就是never类型）

type T0 = ConstructorParameters<ErrorConstructor>;
type T1 = ConstructorParameters<FunctionConstructor>;
type T2 = ConstructorParameters<RegExpConstructor>;
class C {
    constructor(a: number, b: string) {}
}
type T3 = ConstructorParameters<typeof C>;
type T4 = ConstructorParameters<any>;
// type T5 = ConstructorParameters<Function>;