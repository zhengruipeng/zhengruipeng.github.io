interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

//示例
interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
}

//此函数可以简化为
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}

let a = createLabel2("typescript");
let b = createLabel2(2.8);
let c = createLabel2(Math.random() ? "hello" : 42);
