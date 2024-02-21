"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Component extends react_1.default.Component {
    render() {
        return (react_1.default.createElement("h2", null, this.props.children));
    }
}
// OK
react_1.default.createElement(react_1.default.Fragment, null,
    "// OK",
    react_1.default.createElement(Component, { name: "foo" },
        react_1.default.createElement("h1", null, "Hello World"))
// Error: children is of type JSX.Element not array of JSX.Element
,
    "// Error: children is of type JSX.Element not array of JSX.Element",
    react_1.default.createElement(Component, { name: "bar" },
        react_1.default.createElement("h1", null, "Hello World"),
        react_1.default.createElement("h2", null, "Hello World"))
// Error: children is of type JSX.Element not array of JSX.Element or string.
,
    "// Error: children is of type JSX.Element not array of JSX.Element or string.",
    react_1.default.createElement(Component, { name: "baz" },
        react_1.default.createElement("h1", null, "Hello"),
        "World"));
