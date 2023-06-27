// @ts-ignore
const TwoPeers = require('./TwoPeers');

type TwoPeer = typeof TwoPeers;

/*
* 用于保存和管理所有通话组，*/
class CallingManager extends Object {
    peers: Array<TwoPeer> = [];

    addPeer(peer: TwoPeer): void {
        this.peers.push(peer);
    }

    removePeerAssociatedWith(peer: Object): TwoPeer {
        let peers: Array<TwoPeer> = [];
        this.peers.forEach((twoPeer, index: number) => {
            if (twoPeer.peer1 !== peer && twoPeer.peer2 !== peer) {
                peers.push(twoPeer);
            }
        });

        this.peers = peers;
    }

    getPeerAssociatedWith(peer: Object): TwoPeer {
        let res: Array<TwoPeer> = [];

        this.peers.forEach(twoPeer => {
            if (twoPeer.peer1 === peer || twoPeer.peer2 === peer) {
                res.push(twoPeer);
            }
        });
        return res;

    }
}

// @ts-ignore
module.exports = {CallingManager};