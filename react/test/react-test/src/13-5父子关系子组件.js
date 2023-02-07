// @ts-ignore
import React from "react";
let SonF = function (props) {
    console.log(props);
    return React.createElement("div", null,
        "\u6211\u662F\u51FD\u6570\u5B50\u7EC4\u4EF6",
        props.data);
};
class SonC extends React.Component {
    render() {
        //this.props就相当于实例的属性对象
        // @ts-ignore
        console.log(this.props);
        // @ts-ignore
        return React.createElement(React.Fragment, null,
            React.createElement("div", null,
                "\u6211\u662F\u7C7B\u5B50\u7EC4\u4EF6",
                this.props.data));
    }
}
export { SonF, SonC };
//--target 'es6' --jsx
