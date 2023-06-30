// @ts-ignore
const PeerInfo = require("./model/PeerInfo")

class PeerManager extends Object {
    public peers: Array<Object> = [];
    // @ts-ignore
    public peerToInfo: Map<Object, PeerInfo> = new Map();

    public getIdByPeer(peer: Object): number {
        return this.peers.indexOf(peer);
    }

    public getPeerById(id: number): Object {
        return this.peers[id];
    }

    public addPeer(peer: Object): void {
        this.peers.push(peer);
        this.peerToInfo.set(peer,
            new PeerInfo(
                this.peers.indexOf(peer),
                PeerInfo.ganerateName()
            ));
    }

    public removePeer(peer: Object): void {
        delete this.peers[this.peers.indexOf(peer)];
        this.peerToInfo.delete(peer);
    }
}

// @ts-ignore
module.exports = PeerManager;
