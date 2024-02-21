function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);

/*
* 请注意，通常情况下，TypeScript并不认为数组是不可变的。
* 这可能会导致一些令人惊讶的行为：*/
//以下代码报错
//const args = [8, 5];
//const angle = Math.atan2(...args);
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);