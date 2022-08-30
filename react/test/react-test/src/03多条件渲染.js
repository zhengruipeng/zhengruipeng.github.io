"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var getRandom = function (start, length) {
    return start + Math.floor(Math.random() * length);
};
var App = function () {
    var rand = getRandom(1, 3);
    var targetEle = null;
    if (rand === 1) {
        targetEle = (0, jsx_runtime_1.jsx)("h1", { children: "h1" });
    }
    else if (rand === 2) {
        targetEle = (0, jsx_runtime_1.jsx)("h2", { children: "h2" });
    }
    else if (rand === 3) {
        targetEle = (0, jsx_runtime_1.jsx)("h3", { children: "h3" });
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: targetEle }));
};
exports["default"] = App;
