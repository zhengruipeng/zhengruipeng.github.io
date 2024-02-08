class TwoPeers {
    /*Connection*/
    peer1;
    /*Connection*/
    peer2;
    constructor(peer1, peer2) {
        this.peer1 = peer1;
        this.peer2 = peer2;
    }
    push(peer) {
        if (!this.peer1) {
            this.peer1 = peer;
        }
        else if (!this.peer2) {
            this.peer2 = peer;
        }
    }
    removePeer(peer) {
        if (this.peer1 === peer)
            this.peer1 = null;
        else if (this.peer2 === peer)
            this.peer2 = null;
        return this;
    }
    removeIndex(index) {
        if (1 === index)
            this.peer1 = null;
        else if (2 === index)
            this.peer2 = null;
        return this;
    }
    clear() {
        this.peer1 = this.peer2 = null;
        return this;
    }
    get length() {
        let res = 0;
        this.peer1 && res++;
        this.peer2 && res++;
        return res;
    }
    indexOf(peer) {
        if (this.peer1 === peer)
            return 1;
        else if (this.peer2 === peer)
            return 2;
        return -1;
    }
    getAnotherPeer(peer) {
        if (this.peer1 === peer)
            return this.peer2;
        else if (this.peer2 === peer)
            return this.peer1;
        return null;
    }
}
// @ts-ignore
module.exports = TwoPeers;
// export {TwoPeers}
