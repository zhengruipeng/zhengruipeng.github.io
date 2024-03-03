function f() {
    return { x: 10, y: 3 };
}
//以下内容导致类型不匹配
//@ts-expect-error
let g = function (c) {
    return { x: 1, v: 2, y: 3 };
};
