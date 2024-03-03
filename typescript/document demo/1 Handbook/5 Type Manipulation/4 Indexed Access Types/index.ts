//我们可以使用索引访问类型在另一个类型上查找特定属性：

type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
//type I3 = Person["alve"];


const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
    ];

type Person2 = typeof MyArray[number];
type Age2 = typeof MyArray[number]["age"];
// Or
type Age3 = Person["age"];
//注意，这里的age是一个类型不是一个值，所以以下写法是错误的
const key = "age";
//type Age = Person[key];