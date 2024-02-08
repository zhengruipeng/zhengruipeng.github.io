import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
function Test(props) {
    const [name, setName] = useState('');
    useEffect(() => {
        console.log(props.location.query);
        setName(props.location.query.name);
    }, []);
    return (React.createElement("div", null,
        React.createElement("h4", null,
            "test",
            React.createElement(Link, { to: "/" }, "\u8FD4\u56DE")),
        "\u63A5\u5230\u7684\u53C2\u6570\u4E3A name:",
        name,
        React.createElement("div", null,
            React.createElement(Link, { to: "/test/test1" }, "\u8DF3\u8F6C\u5230test1"),
            "|",
            React.createElement(Link, { to: "/test/test2" }, "\u8DF3\u8F6C\u5230test2"),
            React.createElement("br", null),
            props.children)));
}
export default Test;
//# sourceMappingURL=test.js.map