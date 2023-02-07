import * as React from "react";
let ClassComponent = class extends React.Component {
    render() {
        return React.createElement("div", null, "\u7C7B\u7EC4\u4EF6");
    }
};
let App = function () {
    return React.createElement(ClassComponent, null);
};
export default App;
