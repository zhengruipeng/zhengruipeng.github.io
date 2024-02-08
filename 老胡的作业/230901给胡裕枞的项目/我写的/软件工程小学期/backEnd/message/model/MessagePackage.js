/*
* 消息对象的模型类
* */
// @ts-ignore
const MessageType = require("./MessageType");
let MessagePackage = class {
    data;
    messageType;
    //初始化工作
    /*
    * messageType;    //信息类型
        data;   //具体数据
        * */
    constructor(data, messageType) {
        this.data = data;
        this.messageType = messageType;
    }
};
// @ts-ignore
module.exports = MessagePackage;
// export {MessagePackage}
