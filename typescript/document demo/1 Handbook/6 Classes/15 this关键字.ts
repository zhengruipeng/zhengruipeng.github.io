class MyClass {
    name = "MyClass";
    getName = () => {
        return this.name;
    };
}
const c = new MyClass();
const g = c.getName;
console.log(g());       //MyClass

