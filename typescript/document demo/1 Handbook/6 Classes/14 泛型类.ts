class Box<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}

const b = new Box("hello!");

//泛型无法作用于静态属性