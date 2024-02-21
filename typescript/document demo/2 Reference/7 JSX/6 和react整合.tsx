import React from "react";

interface Props {
    foo: string;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>;
    }
}
<MyComponent foo="bar" />; // ok
// <MyComponent foo={0} />; // error