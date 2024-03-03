function doStuff(values) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // ...but we can't mutate 'values'.
    //    values.push("hello!");
}
//以下为简写
function doStuff2(values) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // ...but we can't mutate 'values'.
    //    values.push("hello!");
}
let a = createROCusArr();
let b = createCusArr();
let temp = b;
b = a;
a = temp;
let c = [1, 2, 3];
let d = c;
let temp2 = c;
// @ts-expect-error
c = d;
d = temp2;
