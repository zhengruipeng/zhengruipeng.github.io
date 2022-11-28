import {CallEnvironment} from "../../environment/call.js";
import {MessageType} from "../../environment/model/MessageType.js";
import {MessageEnvironment} from "../../environment/message.js";
import {MemberInfo} from "../model/MemberInfo.js";

document.addEventListener("DOMContentLoaded",function (){
    console.log("挂载新朋友上线处理");
    const friendList = document.querySelector("#container>aside>ul");

    const createFriendItems = function (...arr){
        arr.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.id}: ${item.name}`;
            li.dataset.memberId = item.id;
            friendList.appendChild(li);
        })
    }

    const removeFriendItem = function (memberId){
        console.log(memberId)
        let children = Array.from(friendList.children)
        console.log(children)
        children.forEach(child => {
            console.log(child.dataset.memberId ,memberId+"")
            if(child.dataset.memberId === memberId+""){
                friendList.removeChild(child);
            }
        })
    }

    const removeAllItems = function (){
        friendList.innerHTML = "";
    };

    let wsService = CallEnvironment.wsService;
    wsService.messageMap.addMap(MessageType.FRIEND_LIST,function (ev){
        removeAllItems();
        createFriendItems(...ev.data);
    });
    wsService.messageMap.addMap(MessageType.FRIEND_ONLINE,function (ev){
        removeFriendItem(ev.data.id);
        createFriendItems(ev.data);
    });
    wsService.messageMap.addMap(MessageType.FRIEND_OFFLINE,function (ev){
        removeAllItems();
        createFriendItems(...ev.data);
        removeFriendItem(MessageEnvironment.myInfo.id);
    });
    wsService.messageMap.addMap(MessageType.MY_INFO,function (ev){
        MessageEnvironment.myInfo = new MemberInfo(ev.data.id,ev.data.name);
        console.log("当前端的个人信息",MessageEnvironment.myInfo);
    });
    wsService.messageMap.refreshEvent();

});