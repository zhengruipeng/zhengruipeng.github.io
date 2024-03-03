let one: 1 = 1;
let helloWorld: "helloWorld" = "helloWorld";

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}
printText("Hello, world", "left");
//@ts-expect-error
printText("G'day, mate", "centre");

function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

interface Options {
    width: number;
}
function configure(x: Options | "auto") {
    // ...
}
configure({ width: 100 });
configure("auto");
//@ts-expect-error
configure("automatic");