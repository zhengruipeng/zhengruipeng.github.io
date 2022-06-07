"use strict";
(function () {
    class A {
        constructor() {
            this.a = 1;
            this.b = 2;
            this.c = 3;
        }
    }
    class B {
        constructor() {
            this.a = 3;
            this.b = 4;
        }
    }
    let o = {
        a: 1,
        b: 2,
        c: 3
    };
    let o2 = {
        a: 4,
        b: 5
    };
    let o3 = { ...o, ...o2 };
    console.log(o3.a);
    console.log(o3.b);
    console.log(o3.c);
})();
