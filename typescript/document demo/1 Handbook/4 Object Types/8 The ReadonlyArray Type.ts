function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate 'values'.
//    values.push("hello!");
}

//以下为简写
function doStuff2(values: readonly string[]) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate 'values'.
//    values.push("hello!");
}

interface ReadonlyCusArr<Type> {
    readonly [index: number]: Type;
}

interface CusArr<Type> {
    [index: number]: Type;
}

declare function createROCusArr(): ReadonlyCusArr<unknown>;

declare function createCusArr(): CusArr<unknown>;

let a = createROCusArr();
let b = createCusArr();
let temp = b;
b = a;
a = temp;

type ReadonlyCusArr2<Type> = readonly Type[];
let c: number[] = [1, 2, 3];
let d: ReadonlyCusArr2<number> = c;
let temp2 = c;
// @ts-expect-error
c = d;
d = temp2;

