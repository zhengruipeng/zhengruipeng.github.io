/*
接口允许我们通过扩展其他类型来构建新的类型。
TypeScript提供了另一种称为交集类型的构造，主要用于组合现有的对象类型。
*/
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;