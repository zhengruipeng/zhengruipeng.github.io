/// <reference lib="dom" />

//ts可以通过结构定义猜测到参数的类型，
// 故而进行推断
// 不符合推断结果类型的属性会报错
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- OK
    console.log(mouseEvent.kangaroo); //<- Error
};
