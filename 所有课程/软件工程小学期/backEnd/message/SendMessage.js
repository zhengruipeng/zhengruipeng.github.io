class SendMessage{
    static sendMsg(peer/*Peers*/,msg){
        peer.sendText(msg);
        return true;
    };

    static sendMsgToAnotherPeer(peers/*Peers[]*/,currentPeer,msg){
        if(!peers.length || peers.length !== 2){
            console.warn("sendMsgToAnotherPeer:param1 of function is invalidate")
            return false;
        }
        if(!peers.includes(currentPeer)){
            console.warn("sendMsgToAnotherPeer:param2 of function is not in peers")
            return false;
        }

        peers.forEach(peer => {
            if(peer === currentPeer){
                return false;
            }
            peer.sendText(msg);
        });

        return true;
    };

    static sendMsgToOtherPeer(peers/*Peers[]*/,currentPeer,msg){
        if(!peers.length){
            console.warn("sendMsgToOtherPeer:param1 of function is invalidate")
            return false;
        }
        if(!peers.includes(currentPeer)){
            console.warn("sendMsgToOtherPeer:param2 of function is not in peers")
            return false;
        }

        peers.forEach(peer => {
            if(peer === currentPeer){
                return false;
            }
            peer.sendText(msg);
        });

        return true;
    };

    static sendMsgToAllPeers(peers,msg){
        if(!peers.length){
            console.warn("sendMsgToAllPeers:param1 of function is invalidate")
            return false;
        }

        peers.forEach(peer => {
            peer.sendText(msg);
        });

        return true;
    }
}

module.exports = SendMessage;
// exports Send Message