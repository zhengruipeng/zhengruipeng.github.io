/*
* 枚举成员被初始化为一个常量枚举表达式。
* 常量枚举表达式是TypeScript表达式的一个子集，
* 它可以在编译时完全求值。如果一个表达式是以下之一，
* 那么它就是一个常量枚举表达式：
* 一个字面量枚举表达式（基本上是一个字符串字面量或一个数字字面量）
* 一个对之前定义的常量枚举成员的引用（它可以来自不同的枚举）
* 一个用括号括起来的常量枚举表达式
* 一个应用于常量枚举表达式的+，-，~一元运算符
* 一个以常量枚举表达式为操作数的+，-，*，/，%，<<，>>，>>>，&，|，^二元运算符
* 如果常量枚举表达式被求值为NaN或Infinity，那么在编译时会报错。
* 在所有其他情况下，枚举成员被认为是计算的。
* */
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
