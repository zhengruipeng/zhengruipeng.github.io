type NonNegativeNumber = number & { __nonNegative: never };

let a:NonNegativeNumber = 31 as NonNegativeNumber;
let b:NonNegativeNumber = -1 as NonNegativeNumber;

console.log(a,b);