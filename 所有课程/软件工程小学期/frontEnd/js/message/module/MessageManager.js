class MessageManager extends EventTarget {
    #peerToMessages = new Map();
    /*
    * 根据发送目标端获取所有消息*/
    getMessages(peer) {
        return this.#peerToMessages.get(peer);
    }
    /*
    * @param
    *   peer：消息是谁发来的？通常是对方一端
    *   message：信息对象
    * @desc
    *   根据端和消息对象添加消息至Map
    * */
    addMessages(peer, message) {
        if (!this.#peerToMessages.get(peer)) {
            this.#peerToMessages.set(peer, []);
        }
        this.#peerToMessages.get(peer).push(message);
        let ev = new Event("change");
        this.dispatchEvent(ev);
    }
}
export { MessageManager };
