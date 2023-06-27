class TwoPeers {
    /*Connection*/
    peer1: Object;
    /*Connection*/
    peer2: Object;

    constructor(peer1: Object, peer2: Object) {
        this.peer1 = peer1;
        this.peer2 = peer2;
    }

    push(peer: Object): void {
        if (!this.peer1) {
            this.peer1 = peer;
        } else if (!this.peer2) {
            this.peer2 = peer;
        }
    }

    removePeer(peer): TwoPeers {
        if (this.peer1 === peer) this.peer1 = null
        else if (this.peer2 === peer) this.peer2 = null;
        return this;
    }

    removeIndex(index): TwoPeers {
        if (1 === index) this.peer1 = null
        else if (2 === index) this.peer2 = null;
        return this;
    }

    clear(): TwoPeers {
        this.peer1 = this.peer2 = null;
        return this;
    }

    get length(): number {
        let res: number = 0;
        this.peer1 && res++;
        this.peer2 && res++;
        return res;
    }

    indexOf(peer: Object): 1 | 2 | -1 {
        if (this.peer1 === peer) return 1;
        else if (this.peer2 === peer) return 2;
        return -1;
    }

    getAnotherPeer(peer: Object): Object {
        if (this.peer1 === peer) return this.peer2;
        else if (this.peer2 === peer) return this.peer1;
        return null;
    }
}

// @ts-ignore
module.exports = TwoPeers
// export {TwoPeers}