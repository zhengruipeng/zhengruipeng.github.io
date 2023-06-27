// @ts-ignore
const TwoPeers = require('./TwoPeers');

type TwoPeer = typeof TwoPeers;

class CallingManager extends Object {
    peers: Array<TwoPeer> = [];

    addPeer(peer: TwoPeer): void {
        this.peers.push(peer);
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