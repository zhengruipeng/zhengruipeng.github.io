/*在结构类型系统中，没有成员的类型通常是其他类型的超类型。*/
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
function fn(x) {
    // can't do anything with 'x', so I won't
}
// All OK!
fn(window);
fn({});
fn(fn);
