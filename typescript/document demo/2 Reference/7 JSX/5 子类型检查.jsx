"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Component extends react_1.default.Component {
    render() {
        return (<h2>
                {this.props.children}
            </h2>);
    }
}
// OK
<>
    // OK
    <Component name="foo">
        <h1>Hello World</h1>
    </Component>
    // Error: children is of type JSX.Element not array of JSX.Element
    <Component name="bar">
        <h1>Hello World</h1>
        <h2>Hello World</h2>
    </Component>
    // Error: children is of type JSX.Element not array of JSX.Element or string.
    <Component name="baz">
        <h1>Hello</h1>
        World
    </Component>
</>;
