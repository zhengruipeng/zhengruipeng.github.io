/*
* 上一篇代码问题在于给用户提供的参数的类型是any，我们要改成特定类型
* 方法如下：
* 第一个参数中使用的文字被捕获为文字类型
* 该文字类型可以被验证为位于泛型中有效属性的联合中
* 可以使用索引访问在泛型结构中查找已验证属性的类型
* 然后可以应用此类型信息来确保回调函数的参数具有相同的类型
* */
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (nerValue: Type[Key]) => void): void;
};

declare function makeWatchedObject<Type>(object: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});

person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
})

person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})