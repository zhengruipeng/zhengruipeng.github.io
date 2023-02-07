// @ts-ignore
import React from "react";
import { SonC, SonF } from "./13-5父子关系子组件.js";
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            msg: "this is parent "
        };
    }
    render() {
        // @ts-ignore
        return React.createElement(React.Fragment, null,
            React.createElement(SonF, { data: this.state.msg }),
            React.createElement(SonC, { data: this.state.msg }));
    }
}
export default App;
