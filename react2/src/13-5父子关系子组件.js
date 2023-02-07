import React from "react";
let SonF = function () {
    return React.createElement("div", null, "\u6211\u662F\u51FD\u6570\u5B50\u7EC4\u4EF6");
};
class SonC extends React.Component {
    render() {
        return React.createElement(React.Fragment, null,
            React.createElement("div", null, "\u6211\u662F\u7C7B\u5B50\u7EC4\u4EF6"));
    }
}
export { SonF, SonC };
//--target 'es6' --jsx
