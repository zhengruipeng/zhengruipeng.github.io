import React,{createRef} from "react"

let App = class extends React.Component {
    inputRef = createRef();

    changeHandler(){
        console.log(this.inputRef);
    }

    render() {
        return (
            <>
                <input type="" onChange={this.changeHandler.bind(this)} ref={this.inputRef}></input>
            </>)
    }
};

export default App