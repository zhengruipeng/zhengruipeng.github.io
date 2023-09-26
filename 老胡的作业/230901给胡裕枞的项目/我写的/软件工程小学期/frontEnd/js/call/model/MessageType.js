/*
* 消息类型的枚举类
* */
let MessageType = class{
    //WebRTC用的类型
    static DESCRIPTION = 1;
    static CANDIDATE = 2;
    static CLOSE = 3;
    static REMOTE = 4;
    static OTHER = 5;

    static MESSAGE = 6;     //发送信息
    static NEW_FRIEND = 7;      //刷新好友列表请求
    static NEW_GROUP = 8;

    static SELF_INFO = 9;       //用于服务器给客户发送他们自己的信息
    static ANOTHER_ID = 10;     //对话中对方的ID
};
export {MessageType}