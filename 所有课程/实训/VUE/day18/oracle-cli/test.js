const {merge} = require('webpack-merge');

let o = {
    a: 1,
    b: 2
}
let o2 = {
    b: 3,
    c: 4
}
console.log(merge(o, o2));
console.log(Object.assign(o, o2))