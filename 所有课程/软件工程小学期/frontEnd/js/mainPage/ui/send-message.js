import {AppGlobal} from "../../call/module/AppGlobal.js";
import {MessageType} from "../../call/model/MessageType.js";
import {MessagePackage} from "../../call/model/MessagePackage.js";
import {MessageManager} from "../../message/module/MessageManager.js";
import {Message} from "../../message/model/Message.js";
import {ObserverCallBackType} from "../../call/model/ObserverCallBackType.js";

document.addEventListener("DOMContentLoaded", function () {
    const sendMessageBtn = this.querySelector("#send-message");
    const messagebox = this.querySelector("#messagebox");
    const chatbox = this.querySelector("#chatbox");
    messagebox.value = "";

    const messageManager = new MessageManager();

    sendMessageBtn.onclick = function () {
        /*
        * 流程：
        * 1：如果当前用户没选择对等端则不发送消息
        * 2：获取消息并发送
        * 3：添加至消息管理
        * */
        if (Number.isNaN(AppGlobal.friendListExport.anotherPeer.value - 0)) return;

        // let content = messagebox.value.replaceAll(String.fromCharCode(160), String.fromCharCode(32));
        let content = messagebox.value;
        if (content === "") return;

        messagebox.value = "";

        AppGlobal.wsConnection.sendMessage(JSON.stringify(
            new MessagePackage(content, MessageType.MESSAGE)
        ));

        messageManager.addMessages(AppGlobal.friendListExport.anotherPeer.value - 0, new Message(AppGlobal.friendListExport.myPeer, content))

    };

    /*用户点击回车时触发发送信息事件*/
    messagebox.addEventListener("keydown", ev => {
        if (ev.key === "Enter") {
            sendMessageBtn.click();
        }
    });

    /*当服务器推送消息的时候，添加至消息管理器*/
    AppGlobal.wsConnection.messageMap.addMap(MessageType.MESSAGE, async function (messagePackage) {
        console.log("收到消息", messagePackage)
        messageManager.addMessages(messagePackage.from - 0, new Message(messagePackage.from, messagePackage.data))
    });

    /*渲染消息列表*/
    let render = function () {
        /*
        * 步骤：
        * 1：清空列表
        * 2：从消息管理器中获取所有选中的对等端消息
        * 3：按照是那个人发的依次输出
        * */

        chatbox.innerHTML = "";

        let msgs = messageManager.getMessages(Number.parseFloat(AppGlobal.friendListExport.anotherPeer.value));
        if (!msgs) return;

        msgs.forEach(msg => {
            console.log("信息id，另一端id，自己端id", msg.id, AppGlobal.friendListExport.anotherPeer.value, AppGlobal.friendListExport.myPeer)

            const li = document.createElement("li");

            if (msg.id === AppGlobal.friendListExport.anotherPeer.value - 0) {
                li.className = "friends-message";
                li.innerHTML = `
                    <img src="./image/logo2.jpg" alt="no image"/>
                    <p>${msg.data}</p>
                `;
            } else if (msg.id === AppGlobal.friendListExport.myPeer) {
                li.className = "my-message";
                li.innerHTML = `
                    <img src="./image/logo.jpg" alt="no image"/>
                    <p>${msg.data}</p>
                `;
            }
            chatbox.appendChild(li);
            li.scrollIntoView({behavior: "smooth"});
        });
    }

    /*
    * 消息管理中的内容发生变化时，自动重新刷新消息列表
    * */
    messageManager.addEventListener("change", render);
    /*
    * 对等端发生变化时，重新刷新*/
    AppGlobal.friendListExport.anotherPeer.addEventListener(ObserverCallBackType.change, function () {
        render();
    });

});