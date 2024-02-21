// 从Type中移除this参数。如果Type没有显式声明的this参数，结果就是Type本身。
// 否则，从Type中创建一个没有this参数的新函数类型。
// 泛型会被擦除，只有最后一个重载签名会传递到新的函数类型中。
function toHex(this: Number) {
    return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());