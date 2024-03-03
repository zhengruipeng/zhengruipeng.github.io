type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
    return {x: 10, y: 3};
}

//type P = ReturnType<f>;
type a = typeof f;
//以下内容导致类型不匹配
//@ts-expect-error
let g: a = function (c) {
    return {x: 1, v: 2, y: 3}
}