import React from "react";

let isFirstRunning = true;
let SonF = function (props)/*React.ReactElement*/ {
    let {fetchData} = props;
    // SonF.isFirstRunning = true;
    if (isFirstRunning) {
        fetchData("msg");
        isFirstRunning = false;

    }
    return <div>我是函数子组件
    </div>
}

class App extends React.Component {
    state = {
        msg: undefined
    };

    fetchData(data) {
        this.msg = data;
        let temp;
        this.setState((temp = structuredClone(this.state),temp.msg = data,temp));
        console.log(this, data)

    }

    render()/* React.ReactElement*/ {
        return <>
            <SonF fetchData={this.fetchData.bind(this)}></SonF>
            <p>{this.msg ? this.msg : "没有值，"}sibling</p>
            <p>{this.state.msg ? this.state.msg : "没有值，"}通过state传值</p>
        </>

    }
}

export default App