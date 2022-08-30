import React from "react"

class Counter extends React.Component {
    // 定义数据
    state = {
        count: 0
    }
    // 定义修改数据的方法
    setCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    // 使用数据 并绑定事件
    render () {
        return <button onClick={this.setCount}>{this.state.count}</button>
    }
}

export default Counter