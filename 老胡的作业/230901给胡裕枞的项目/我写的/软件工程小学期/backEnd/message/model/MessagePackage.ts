/*
* 消息对象的模型类
* */
// @ts-ignore
const MessageType = require("./MessageType");
type MessageType2 = typeof MessageType;
let MessagePackage = class {

    //初始化工作
    /*
    * messageType;    //信息类型
        data;   //具体数据
        * */
    constructor(public data: any, public messageType: MessageType2) {
    }
}

// @ts-ignore
module.exports = MessagePackage
// export {MessagePackage}