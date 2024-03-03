//我们可以使用索引访问类型在另一个类型上查找特定属性：
//type I3 = Person["alve"];
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
//注意，这里的age是一个类型不是一个值，所以以下写法是错误的
const key = "age";
//type Age = Person[key];
