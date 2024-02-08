//当我们需要适配多个类型的时候可能需要书写以下代码
interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}

interface BooleanBox {
    contents: boolean;
}

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}

//但是实际上可以使用泛型代替
interface Box<Type> {
    contents: Type;
}

function setContents2<Type>(box: Box<Type>, newContents: Type) {
    box.contents = newContents;
}

//也可以用类型声明
type Box2<Type> = {
    contents: Type;
};