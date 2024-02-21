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
<MyComponent />; // ok
<MyFactoryFunction />; // ok
class NotAValidComponent {
}
function NotAValidFactoryFunction() {
    return {};
}
// <NotAValidComponent/>; // error
<NotAValidFactoryFunction />; // error
