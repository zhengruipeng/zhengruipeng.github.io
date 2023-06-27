/*
* 消息对象的模型类
* */
let MessagePackage = class {
    messageType;    //信息类型
    data;   //具体数据

    //初始化工作
    constructor(data,messageType) {
        this.messageType = messageType;
        this.data = data;

    }
}

module.exports = MessagePackage
// export {MessagePackage}