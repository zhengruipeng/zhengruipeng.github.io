// @ts-ignore
const PeerInfo = require("./model/PeerInfo")

class PeerManager extends Object {
    peers: Array<Object> = [];
    // @ts-ignore
    peerToInfo: Map<Object, PeerInfo> = new Map();

    getIdByPeer(peer: Object): number {
        return this.peers.indexOf(peer);
    }

    getPeerById(id: number): Object {
        return this.peers[id];
    }

    addPeer(peer: Object): void {
        this.peers.push(peer);
        this.peerToInfo.set(peer,
            new PeerInfo(
                this.peers.indexOf(peer),
                PeerInfo.ganerateName()
            ));
    }

    removePeer(peer: Object): void {
        delete this.peers[this.peers.indexOf(peer)];
        this.peerToInfo.delete(peer);
    }
}

// @ts-ignore
module.exports = PeerManager;
