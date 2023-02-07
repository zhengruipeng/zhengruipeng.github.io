// @ts-ignore
import React from "react";
import {SonC, SonF} from "./13-5父子关系子组件.js";

class App extends React.Component {
    state = {
        msg: "this is parent "
    };

    render(): React.ReactElement {
        // @ts-ignore
        return <><SonF data={this.state.msg}/><SonC data={this.state.msg}/></>
    }
}

export default App