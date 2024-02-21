"use strict";
class MyComponent {
    render() {
    }
}
function MyFactoryFunction() {
    return {
        render: () => {
        }
    };
}
React.createElement(MyComponent, null); // ok
React.createElement(MyFactoryFunction, null); // ok
class NotAValidComponent {
}
function NotAValidFactoryFunction() {
    return {};
}
// <NotAValidComponent/>; // error
React.createElement(NotAValidFactoryFunction, null); // error
