// 提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则为 unknown
function toHex() {
    return this.toString(16);
}
function numberToString(n) {
    return toHex.apply(n);
}
