import React from "react"
import PropTypes from "prop-types"

let Test = function ({list}){
    return <div>
        {list.map(v => <p>{v}</p>)}
    </div>
}
Test.propTypes = {
    list:PropTypes.array,
};
let App = class extends React.Component{

    render(){
        return <>
            <Test list={[1,2,3]}></Test>
            <Test list={9}></Test>
        </>
    }
};

export default App;