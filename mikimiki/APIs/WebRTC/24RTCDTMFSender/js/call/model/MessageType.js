/*
* 消息类型的枚举类
* */
let MessageType = class{
    static DESCRIPTION = 1;
    static CANDIDATE = 2;
    static CLOSE = 3;
    static REMOTE = 4;
    static OTHER = 5;

    static MESSAGE = 6;
    static NEW_FRIEND = 7;
    static NEW_GROUP = 8;

};
export {MessageType}