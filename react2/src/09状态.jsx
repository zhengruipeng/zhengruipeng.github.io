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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            a: 1,
            b: 2,
            innerHTML: <p>123</p>,
        };
        return _this;
    }
    App.prototype.changeA = function () {
        this.setState(__assign(__assign({}, this.state), { a: this.state.a + 1 }));
        document.getElementById("a").innerText = "a的值已经改成" + this.state.a;
    };
    App.prototype.delB = function () {
        var temp = __assign({}, this.state);
        // @ts-ignore
        delete temp.b;
        this.setState(temp);
        document.getElementById("b").innerText = "b的值已经删除";
    };
    App.prototype.render = function () {
        return (<div>
                <span id="a">a{this.state.a}</span>
                <span id="b">b{this.state.b}</span>
                {this.state.innerHTML}
                <button onClick={this.changeA}>更改A</button>
                <button onClick={this.delB}>删除B</button>
            </div>);
    };
    return App;
}(React.Component));
exports.default = App;
