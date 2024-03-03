class Greeter {
    greet() {
        console.log("Hello, " + this.getName());
    }
    getName() {
        return "hi";
    }
}
class SpecialGreeter extends Greeter {
    howdy() {
        // OK to access protected member here
        console.log("Howdy, " + this.getName());
    }
}
const g = new SpecialGreeter();
g.howdy(); // OK
// g.getName();
//可以修改修饰符
class Base {
    m = 10;
}
class Derived extends Base {
    // No modifier, so default is 'public'
    m = 15;
}
const d = new Derived();
console.log(d.m); // OK
class Base2 {
    x = 1;
}
class Derived1 extends Base2 {
    x = 5;
}
class Derived2 extends Base2 {
    f1(other) {
        other.x = 10;
    }
    f2(other) {
        // other.x = 10;
    }
}
