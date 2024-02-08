let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);

/*
* 请注意，这些分配中的每一个都是有效的。
* 即使在我们第一次赋值后观察到的类型x更改为number，
* 我们仍然能够将string赋值给x。
*
* 这是因为开始声明变量的时候x是string | number类型
* 如果我们将boolean分配给x，我们会看到一个错误，
* 因为它不是声明类型的一部分。
* */
// x = true;
console.log(x);