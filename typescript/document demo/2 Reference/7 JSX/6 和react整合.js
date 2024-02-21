"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class MyComponent extends react_1.default.Component {
    render() {
        return react_1.default.createElement("span", null, this.props.foo);
    }
}
react_1.default.createElement(MyComponent, { foo: "bar" }); // ok
// <MyComponent foo={0} />; // error
