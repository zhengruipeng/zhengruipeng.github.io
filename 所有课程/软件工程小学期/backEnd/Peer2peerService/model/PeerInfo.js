class PeerInfo extends Object {
    id;
    name;
    getInfo() {
        return `${this.id}: ${this.name}`;
    }
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
    static ganerateName() {
        return Math.floor(Math.random() * 5000) + "";
    }
}
// @ts-ignore
module.exports = PeerInfo;
