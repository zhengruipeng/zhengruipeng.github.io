import {Message} from "../model/Message.js";

class MessageManager extends EventTarget {
    #peerToMessages: Map<number, Array<Message>> = new Map();

    getMessages(peer: number): Array<Message> {
        return this.#peerToMessages.get(peer);
    }

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