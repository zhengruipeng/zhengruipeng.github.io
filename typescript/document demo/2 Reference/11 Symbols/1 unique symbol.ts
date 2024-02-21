/*
* 若要将符号视为唯一文字，可以使用特殊类型的唯一符号。
* 唯一符号是符号的一个子类型，
* 仅通过调用symbol（）或symbol.for（）或显式类型注释生成。
* 这种类型只允许在const声明和只读静态属性上使用，
* 并且为了引用特定的唯一符号，必须使用typeof运算符。
* 每个对唯一符号的引用都意味着一个与给定声明相关的完全唯一的身份。
* */

declare const sym1: unique symbol;

// sym2 can only be a constant reference.
// let sym2: unique symbol = Symbol();

// Works - refers to a unique symbol, but its identity is tied to 'sym1'.
// unique symbol即使是类型也是独一无二的，所以要用typeof sym1重新指定
let sym3: typeof sym1 = sym1;

// Also works.
class C {
    static readonly StaticSymbol: unique symbol = Symbol();
}