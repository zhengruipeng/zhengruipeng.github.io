/*返回类型为void的上下文类型不会强制函数返回某些内容。
* 另一种说法是，具有void返回类型（类型voidFunc=（）=>void）
* 的上下文函数类型在实现时可以返回任何其他值，
* 但会被忽略。*/
var f1 = function () {
    return true;
};
var f2 = function () { return true; };
var f3 = function () {
    return true;
};
/*
即使Array.prototype.push返回一个数字，
而Array.prototype.forEach方法需要一个返回类型为void的函数，
但存在此行为时，以下代码仍然有效。
*/
var src = [1, 2, 3];
var dst = [0];
src.forEach(function (el) { return dst.push(el); });
/*
还有一种特殊情况需要注意，
当非匿名函数定义具有void返回类型时，
该函数不能返回任何内容。
*/
function f4() {
    // @ts-expect-error
    return true;
}
var f5 = function () {
    // @ts-expect-error
    return true;
};
