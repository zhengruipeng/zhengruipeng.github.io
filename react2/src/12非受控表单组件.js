import React, {createRef} from "react"

let App = class extends React.Component {
    inputRef = createRef();
    inputRef2 = createRef();

    changeHandler() {
        console.log(this.inputRef);
    }

    //问题：为什么只有使用箭头函数的时候不用绑定this
    changeHandler2 = () => {
        console.log(this);
    }

    changeHandler3 = (ev) => {
        console.log(this);
        console.log(ev.target)
    }

    render() {
        return (
            <>
                1<input type="" onChange={this.changeHandler.bind(this)} ref={this.inputRef}></input>
                2<input type="" onChange={this.changeHandler2} ref={this.inputRef2}></input>
                3<input type="" onChange={this.changeHandler3}></input>
            </>)
    }
};

export default App