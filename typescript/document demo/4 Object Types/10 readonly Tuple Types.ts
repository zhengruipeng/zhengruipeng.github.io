//大多数时候需要元组不可变
function doSomething(pair: readonly [string, number]) {
//    pair[0] = "hello!";
}

//当将不可变元组传入至可变元组中会报错
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}
function distanceFromOriginWithoutModify([x, y]: readonly [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

//distanceFromOrigin(point);  //报错
distanceFromOriginWithoutModify(point);