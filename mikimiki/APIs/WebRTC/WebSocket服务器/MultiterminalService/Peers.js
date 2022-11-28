class Peers{
    /*Connection[]*/ peers;

    constructor(peers) {
        this.peers = peers;
    }

    push(peer){
        this.peers.push(peer);
        return this;
    }

    removePeer(peer) {
        let index = this.peers.indexOf(peer);
        if(index === -1){
            return this;
        }
        this.peers.splice(index,1);
        return this;
    }

    removeIndex(index){
        if(index > this.peers.length || index<0){
            return this;
        }
        this.peers.splice(index,1);
        return this;
    }

    clear(){
        this.peers = [];
        return this;
    }

    get length(){
        return this.peers.length;
    }

    set length(len){
        this.peers.length = len;
        return this;
    }

    indexOf(peer){
        return this.peers.indexOf(peer);
    }

    getOtherPeers(peer){
        let res = [];
        this.peers.forEach(p => {
            if(p === peer)return false;
            res.push(p);
        });
        return res;

    }
}

module.exports = Peers;
// export {TwoPeers}