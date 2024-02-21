/*
* 请注意，与函数类型表达式相比，语法略有不同。在参数列表和返回类型之间使用:，而不是=>.
* */
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";

doSomething(myFunc);