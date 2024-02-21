declare interface Shape {
}

declare function getShape(): Shape;

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    // ...
}

//const shape = getShape();
//paintShape({shape});
//paintShape({shape, xPos: 100});
//paintShape({shape, yPos: 100});
//paintShape({shape, xPos: 100, yPos: 100});


interface PaintOptions2 {
    shape: Shape;
    pos?: DOMPoint2;
}

class DOMPoint2 {
    public toString(): string {
        return `${this.x}--${this.y}`;
    }

    constructor(public x: number, public y: number) {
    }

}

function foo({shape, pos}: PaintOptions2) {
    console.log(pos)
}

foo({shape: null, pos: new DOMPoint2(1, 2)});


//注意以下js代码：
//意思是将参数a的值赋值给变量c
let c = 321;

let f = function ({a: c, b}) {
    console.log(c, b);
};

f({a: 1, b: 2});