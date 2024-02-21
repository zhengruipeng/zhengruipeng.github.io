type SomeObject = Object;

interface CallOrConstruct {
    (n?: number): string;

    new(s: string): Date;
}

let D:CallOrConstruct = Date;

type SomeConstructor = {
    new(s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}