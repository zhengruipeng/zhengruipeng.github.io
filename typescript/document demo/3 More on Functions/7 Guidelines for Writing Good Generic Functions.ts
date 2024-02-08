//下推类型参数
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

//使用更少的类型参数
/*
* 我们创建了一个和两个值不关联的类型参数Func。
* 这始终是一个危险信号，
* 因为这意味着想要指定类型参数的调用者必须无缘无故地手动指定额外的类型参数。
* Func没有做任何事情，只是让函数更难阅读和推理！
* */
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
): Type[] {
    return arr.filter(func);
}

//类型参数应该出现两次
/*一般一个泛型被指定要用很多次，
例如当一个类型被指定用于参数类型和返回值类型，就是使用了两次
以下代码中泛型只使用了一次*/
function greet<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}

greet("world");