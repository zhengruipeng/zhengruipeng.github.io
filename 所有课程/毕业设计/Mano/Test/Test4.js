import { A } from "./Test.js";
import { B } from "./Test2.js";
class C extends A {
    foo(a) {
        super.foo();
        console.log(a);
    }
}
class NS {
}
NS.A = A;
NS.B = B;
NS.C = C;
export { NS };
