// @ts-ignore
const PeerInfo = require("./model/PeerInfo");
class PeerManager extends Object {
    peers = [];
    // @ts-ignore
    peerToInfo = new Map();
    getIdByPeer(peer) {
        return this.peers.indexOf(peer);
    }
    getPeerById(id) {
        return this.peers[id];
    }
    addPeer(peer) {
        this.peers.push(peer);
        this.peerToInfo.set(peer, new PeerInfo(this.peers.indexOf(peer), PeerInfo.ganerateName()));
    }
    removePeer(peer) {
        delete this.peers[this.peers.indexOf(peer)];
        this.peerToInfo.delete(peer);
    }
}
// @ts-ignore
module.exports = PeerManager;
