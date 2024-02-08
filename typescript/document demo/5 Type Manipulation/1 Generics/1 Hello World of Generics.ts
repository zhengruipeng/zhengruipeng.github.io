function identity<Type>(arg: Type): Type {
    return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString");