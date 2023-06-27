import {Message} from "../model/Message.js";

class MessageManager extends EventTarget {
    #peerToMessages: Map<number, Array<Message>> = new Map();

    /*
    * 根据发送目标端获取所有消息*/
    getMessages(peer: number): Array<Message> {
        return this.#peerToMessages.get(peer);
    }

    /*
    * @param
    *   peer：消息是谁发来的？通常是对方一端
    *   message：信息对象
    * @desc
    *   根据端和消息对象添加消息至Map
    * */
    addMessages(peer: number, message: Message): void {
        if (!this.#peerToMessages.get(peer)) {
            this.#peerToMessages.set(peer, []);
        }
        this.#peerToMessages.get(peer).push(message);
        let ev = new Event("change");
        this.dispatchEvent(ev);
    }

}

export {MessageManager}