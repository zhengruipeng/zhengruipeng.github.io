"use strict";
(function () {
    let f = function (a, b, ...args) {
        console.log(a);
        console.log(b + "");
        console.log(args);
    };
    f("123", 33, 1, 2, 3);
})();
