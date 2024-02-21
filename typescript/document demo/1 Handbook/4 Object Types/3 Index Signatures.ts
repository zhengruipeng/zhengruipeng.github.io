/*
可以同时支持这两种类型的索引器，
但数字索引器返回的类型必须是字符串索引器返回类型的子类型。
这是因为当使用数字进行索引时，
JavaScript实际上会在索引到对象之前将其转换为字符串。
这意味着用100（一个数字）进行索引与用“100”（一个字符串）进行索引是一样的，
所以两者需要一致。例如
*/
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
    // @ts-expect-error
    [x: number]: Animal;
    [x: string]: Dog;
}


/*
虽然字符串索引签名是描述“字典”模式的一种强大方式，
但它们也强制所有属性与其返回类型匹配。
这是因为字符串索引声明obj.properties也可用作obj[“property”]。
在以下示例中，名称的类型与字符串索引的类型不匹配，类型检查器会给出一个错误：
*/
interface NumberDictionary {
    [index: string]: number;

    length: number; // ok
//    name: string;  //报错
}

//可以代替为以下方案
interface NumberOrStringDictionary {
    [index: string]: number | string;

    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

//结合readonly用法
declare function getReadOnlyStringArray(): ReadonlyStringArray;

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
//myArray[2] = "Mallory";