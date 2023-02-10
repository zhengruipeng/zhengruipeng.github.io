import React from "react"
import PropTypes from "prop-types"
let ListItem = class extends React.Component {
    render() {
        console.log(this.children)
        return <div>
            list item instance
        </div>
    };
}

let ListItem2 = function (param){
    console.log(param)

    return <div>
        list item instance
    </div>
}
let App = class extends React.Component{
    constructor() {
        super();

    }
    render(){
        return <>
            <ListItem>
                <div>child</div>
            </ListItem>
            <ListItem2>
                <div>child</div>
                <div>child2</div>
            </ListItem2>
        </>
    }
};

export default App;