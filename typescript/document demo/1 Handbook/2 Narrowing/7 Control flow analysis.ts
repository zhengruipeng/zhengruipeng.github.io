/*padLeft从其第一个if块中返回。
TypeScript能够分析此代码，
并发现在padding是数字的情况下，
正文的其余部分（return padding+input；）是不可访问的。
因此，它能够从函数其余部分的填充类型中删除数字（从string|number缩小到从string）。

这种基于可达性的代码分析称为控制流分析，
TypeScript在遇到类型保护和赋值时使用这种流分析来缩小类型。
当分析变量时，控制流可以一次又一次地分离和重新合并，
并且可以观察到该变量在每个点具有不同的类型。*/

function example() {
    let x: string | number | boolean;

    x = Math.random() < 0.5;

    console.log(x);

    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
    } else {
        x = 100;
        console.log(x);
    }

    return x;
}