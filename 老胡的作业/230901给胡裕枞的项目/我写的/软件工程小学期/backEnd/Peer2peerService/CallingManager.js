// @ts-ignore
const TwoPeers = require('./TwoPeers');
/*
* 用于保存和管理所有通话组，*/
class CallingManager extends Object {
    peers = [];
    addPeer(peer) {
        this.peers.push(peer);
    }
    removePeerAssociatedWith(peer) {
        let peers = [];
        this.peers.forEach((twoPeer, index) => {
            if (twoPeer.peer1 !== peer && twoPeer.peer2 !== peer) {
                peers.push(twoPeer);
            }
        });
        this.peers = peers;
    }
    getPeerAssociatedWith(peer) {
        let res = [];
        this.peers.forEach(twoPeer => {
            if (twoPeer.peer1 === peer || twoPeer.peer2 === peer) {
                res.push(twoPeer);
            }
        });
        return res;
    }
}
// @ts-ignore
module.exports = { CallingManager };
