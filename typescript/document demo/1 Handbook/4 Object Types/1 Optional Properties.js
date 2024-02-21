function paintShape(opts) {
    // ...
}
class DOMPoint2 {
    x;
    y;
    toString() {
        return `${this.x}--${this.y}`;
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function foo({ shape, pos }) {
    console.log(pos);
}
foo({ shape: null, pos: new DOMPoint2(1, 2) });
//注意以下js代码：
//意思是将参数a的值赋值给变量c
let c = 321;
let f = function ({ a: c, b }) {
    console.log(c, b);
};
f({ a: 1, b: 2 });
