import {A} from "./Test.js";
import {B} from "./Test2.js"

class C extends A {
    foo(a?: B) {
        super.foo();
        console.log(a);
    }
}

class NS{
    public static A:typeof A = A;
    public static B:typeof B = B;
    public static C:typeof C = C;

}

export {NS}