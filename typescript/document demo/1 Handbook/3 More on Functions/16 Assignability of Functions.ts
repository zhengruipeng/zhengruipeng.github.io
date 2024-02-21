/*返回类型为void的上下文类型不会强制函数返回某些内容。
* 另一种说法是，具有void返回类型（类型voidFunc=（）=>void）
* 的上下文函数类型在实现时可以返回任何其他值，
* 但会被忽略。*/

type voidFunc = () => void;

const f1: voidFunc = () => {
    return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
    return true;
};

/*
即使Array.prototype.push返回一个数字，
而Array.prototype.forEach方法需要一个返回类型为void的函数，
但存在此行为时，以下代码仍然有效。
*/
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));


/*
还有一种特殊情况需要注意，
当非匿名函数定义具有void返回类型时，
该函数不能返回任何内容。
*/
function f4(): void {
    // @ts-expect-error
    return true;
}

const f5 = function (): void {
    // @ts-expect-error
    return true;
};