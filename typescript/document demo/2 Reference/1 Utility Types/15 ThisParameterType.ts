// 提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则为 unknown
function toHex(this: Number) {
    return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}