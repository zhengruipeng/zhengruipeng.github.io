class A {
    private x = 10;

    public sameAs(other: A) {
        // No error
        return other.x === this.x;
    }
}

let a = new A();
console.log((new A()).sameAs(a));

class MySafe {
    private secretKey = 12345;
}

const s = new MySafe();

// Not allowed during type checking
// console.log(s.secretKey);

// OK
console.log(s["secretKey"]);