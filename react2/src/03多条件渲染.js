"use strict";
exports.__esModule = true;
var getRandom = function (start, length) {
    return start + Math.floor(Math.random() * length);
};
var App = function () {
    var rand = getRandom(1, 3);
    var targetEle = null;
    if (rand === 1) {
        targetEle = <h1>h1</h1>;
    }
    else if (rand === 2) {
        targetEle = <h2>h2</h2>;
    }
    else if (rand === 3) {
        targetEle = <h3>h3</h3>;
    }
    return (<div>
            {targetEle}
        </div>);
};
exports["default"] = App;
