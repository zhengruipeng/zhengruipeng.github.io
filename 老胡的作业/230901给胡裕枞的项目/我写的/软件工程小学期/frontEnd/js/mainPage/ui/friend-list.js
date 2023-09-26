import {AppGlobal} from "../../call/module/AppGlobal.js";
import {MessageType} from "../../call/model/MessageType.js";
import {MessagePackage} from "../../call/model/MessagePackage.js";


document.addEventListener("DOMContentLoaded", function () {
    const friendList = this.querySelector("#friend-list");
    const friendNickName = this.querySelector("#friend-nickname");
    const nickname = this.querySelector("#nickname");


    //当服务器推送新好友加入时
    AppGlobal.wsConnection.messageMap.addMap(MessageType.NEW_FRIEND, async function (messagePackage) {
        /*
        * 执行操作：
        * 1：清空好友列表
        * 2：依次添加好友
        * 3：给新加进来的好友注册前端事件
        * */
        friendList.innerHTML = "";
        console.log("新的好友加入信息", messagePackage);

        messagePackage.data.forEach(info => {
            let item = document.createElement("li");
            item.innerText = info;
            item.dataset.peerInfo = info;
            item.classList.add("friend");
            friendList.appendChild(item);
        });

        const friends = Array.from(friendList.querySelectorAll(".friend"));
        friends.forEach(friend => {
            friend.onclick = function () {
                friendNickName.innerText = friend.innerText;
                AppGlobal.friendListExport.anotherPeer.value = friend.dataset.peerInfo.substring(0, friend.dataset.peerInfo.indexOf(":")) - 0;

                AppGlobal.wsConnection.sendMessage(JSON.stringify(
                    new MessagePackage(AppGlobal.friendListExport.anotherPeer.value, MessageType.ANOTHER_ID)
                ));
                // console.log(AppGlobal.friendListExport.anotherPeer.value);
            };
        })
    });

    //服务器给当前用户推送服务器派发给当前用户的信息
    AppGlobal.wsConnection.messageMap.addMap(MessageType.SELF_INFO, async function (messagePackage) {
        console.log("服务器推送自己信息", messagePackage);
        nickname.innerText = messagePackage.data;
        AppGlobal.friendListExport.myPeer = messagePackage.data.substring(0, messagePackage.data.indexOf(":")) - 0;
    });

});