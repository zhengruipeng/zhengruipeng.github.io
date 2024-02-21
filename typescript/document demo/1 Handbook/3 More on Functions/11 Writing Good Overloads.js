/*
* 当重载的时候，返回值类型和参数类型不足以用原生JavaScript进行区分的情况下，
* 例如参数都是一个，但是类型不同，所以JavaScript无法区分，
* 当所写的类型和返回值一个函数实现无法全部处理的情况下，
* 则写函数重载就会报错，
* 也是写函数重载的大忌
* */
function len(x) {
    return x.length;
}
//这个更好
function len2(x) {
    return x.length;
}
