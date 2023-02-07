let App = function () {
};
App.prototype.constructor = App;
// @ts-ignore
App.prototype = new React.Component();
App.prototype.render = function () {
    return (React.createElement("div", null, "\u6784\u9020\u51FD\u6570\u7C7B\u7EC4\u4EF6"));
};
export default App;
