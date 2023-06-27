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
        if(Number.isNaN(AppGlobal.friendListExport.anotherPeer.value - 0))return ;

        // let content = messagebox.value.replaceAll(String.fromCharCode(160), String.fromCharCode(32));
        let content = messagebox.value;
        messagebox.value = "";

        AppGlobal.wsConnection.sendMessage(JSON.stringify(
            new MessagePackage(content, MessageType.MESSAGE)
        ));

        messageManager.addMessages(AppGlobal.friendListExport.anotherPeer.value - 0, new Message(AppGlobal.friendListExport.myPeer, content))

    };

    messagebox.addEventListener("keydown", ev => {
        if (ev.key === "Enter") {
            sendMessageBtn.click();
        }
    });
    AppGlobal.wsConnection.messageMap.addMap(MessageType.MESSAGE, async function (messagePackage) {
        console.log("收到消息", messagePackage)

        messageManager.addMessages(messagePackage.from - 0, new Message(messagePackage.from, messagePackage.data))
    });
    /*const msg = document.createElement("li");
        msg.className = "friends-message";
        msg.innerHTML = `
            <img src="./image/logo2.jpg" alt="no image"/>
            <p>${messagePackage.data}</p>
        `;
        chatbox.appendChild(msg);*/

    let render = function () {
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

    messageManager.addEventListener("change", render);
    AppGlobal.friendListExport.anotherPeer.addEventListener(ObserverCallBackType.change, function () {
        render();
    });

});