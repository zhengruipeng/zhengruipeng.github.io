function paintShape(opts) {
    // ...
}
var DOMPoint2 = /** @class */ (function () {
    function DOMPoint2(x, y) {
        this.x = x;
        this.y = y;
    }
    DOMPoint2.prototype.toString = function () {
        return "".concat(this.x, "--").concat(this.y);
    };
    return DOMPoint2;
}());
function foo(_a) {
    var shape = _a.shape, pos = _a.pos;
    console.log(arguments);
    console.log(pos);
}
foo({ shape: null, pos: new DOMPoint2(1, 2) });
