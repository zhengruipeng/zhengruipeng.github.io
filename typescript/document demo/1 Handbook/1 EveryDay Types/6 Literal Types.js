let one = 1;
let helloWorld = "helloWorld";
function printText(s, alignment) {
    // ...
}
printText("Hello, world", "left");
//@ts-expect-error
printText("G'day, mate", "centre");
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
function configure(x) {
    // ...
}
configure({ width: 100 });
configure("auto");
//@ts-expect-error
configure("automatic");
