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
exports.__esModule = true;
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
    return (<div onClick={clickCB} style={buttonStyle}>函数组件</div>);
};
var ClassCom = function () {
};
ClassCom.prototype.constructor = ClassCom;
//@ts-ignore
ClassCom.prototype = new React.Component();
ClassCom.prototype.render = function () {
    //@ts-ignore
    return (<div onContextMenu={clickCB} style={buttonStyle}>类组件</div>);
};
var ClassCom2 = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        //@ts-ignore
        return (<div onContextMenu={clickCB} style={buttonStyle}>类组件</div>);
    };
    return class_1;
}(React.Component));
var App = function () {
    // @ts-ignore
    return (<div><FnCom /><ClassCom /></div>);
};
exports["default"] = App;
