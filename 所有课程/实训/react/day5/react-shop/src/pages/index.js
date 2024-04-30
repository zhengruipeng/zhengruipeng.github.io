import React, { useState, useEffect } from 'react';
import PTabBar from '@/components/p-tabbar.jsx';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { history } from 'umi';
const RenderIcon = (props) => {
    const [show, setShow] = useState(false);
    const handleVisiableChange = (v) => {
        setShow(v);
    };
    const handleSelect = (v) => {
        setShow(false);
        history.push('/me');
    };
    return (React.createElement(Popover, { visible: show, overlay: [
            React.createElement(Popover.Item, { icon: React.createElement(Icon, { type: "check-circle-o" }) }, "\u6211\u7684")
        ], onVisibleChange: handleVisiableChange, onSelect: handleSelect },
        React.createElement(Icon, { type: "ellipsis", size: "xs" })));
};
export default () => {
    // index加载函数
    useEffect(() => {
        console.log('index loaded');
    }, []);
    return (React.createElement("div", null,
        React.createElement(NavBar, { mode: "light", rightContent: React.createElement(RenderIcon, null) }, "\u9996\u9875"),
        React.createElement(PTabBar, null)));
};
//# sourceMappingURL=index.js.map