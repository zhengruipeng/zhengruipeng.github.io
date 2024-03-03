class A {
    x = 10;
    sameAs(other) {
        // No error
        return other.x === this.x;
    }
}
let a = new A();
console.log((new A()).sameAs(a));
class MySafe {
    secretKey = 12345;
}
const s = new MySafe();
// Not allowed during type checking
// console.log(s.secretKey);
// OK
console.log(s["secretKey"]);
