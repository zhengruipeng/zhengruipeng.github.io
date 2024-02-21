/*
* 在任何表达式之后写入!
* 实际上是一个类型断言，
* 该值不是null或undefined
* */
function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
}