// 除了创建一个带有成员属性名的对象外，
// 数字枚举成员还获得了从枚举值到枚举名的反向映射。
// 例如，在这个例子中：

enum Enum {
    A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"