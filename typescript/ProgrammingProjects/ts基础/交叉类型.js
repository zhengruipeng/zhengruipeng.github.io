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
        c: 3
    };
    for (let name in o) {
        // console.log(name+":"+o[name]);
        console.log(name);
    }
})();
