"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
//@ts-ignore
var clickCB = function (ev) {
    ev.preventDefault();
    alert(123);
};
var buttonStyle = {
    padding: "7px 15px",
    margin: "20px",
    display: "inline-block"
};
var FnCom = function () {
    //@ts-ignore
    return ((0, jsx_runtime_1.jsx)("div", __assign({ onClick: clickCB, style: buttonStyle }, { children: "\u51FD\u6570\u7EC4\u4EF6" })));
};
var ClassCom = function () {
};
ClassCom.prototype.constructor = ClassCom;
//@ts-ignore
ClassCom.prototype = new React.Component();
ClassCom.prototype.render = function () {
    //@ts-ignore
    return ((0, jsx_runtime_1.jsx)("div", __assign({ onContextMenu: clickCB, style: buttonStyle }, { children: "\u7C7B\u7EC4\u4EF6" })));
};
var ClassCom2 = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        //@ts-ignore
        return ((0, jsx_runtime_1.jsx)("div", __assign({ onContextMenu: clickCB, style: buttonStyle }, { children: "\u7C7B\u7EC4\u4EF6" })));
    };
    return class_1;
}(React.Component));
var App = function () {
    // @ts-ignore
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FnCom, {}), (0, jsx_runtime_1.jsx)(ClassCom, {})] }));
};
exports["default"] = App;
