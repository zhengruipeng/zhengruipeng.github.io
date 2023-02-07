import React from "react";
import { SonC, SonF } from "./13-5父子关系子组件.js";
class App extends React.Component {
    render() {
        return React.createElement(React.Fragment, null,
            React.createElement(SonF, null),
            React.createElement(SonC, null));
    }
}
export default App;
