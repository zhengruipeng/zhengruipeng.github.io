/*
* 消息类型的枚举类
* */
let MessageType = class{
    static DESCRIPTION = "description";
    static CANDIDATE = "candidate";
    static CLOSE = "close";
    static REMOTE = "remote";
    static OTHER = "other";

    static MESSAGE = "message";     //用户发送消息
    static FRIEND_ONLINE = "friendOnline";   //给在线用户发送新用户
    static CREATE_GROUP = "createGroup";
    static FRIEND_OFFLINE = "friendOffline";  //给在线用户发送下线的用户
    static DELETE_GROUP = "deleteGroup";

    static FRIEND_LIST = "friendList";    //给新用户发送用户列表
    static MY_INFO = "myInfo"   //自己的详情信息
};

module.exports = MessageType
// export {MessageType}