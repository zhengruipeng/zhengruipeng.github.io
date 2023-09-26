class PeerInfo extends Object {
    public id: number;
    public name: string;

    public getInfo(): string {
        return `${this.id}: ${this.name}`;
    }

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;

    }

    public static ganerateName(): string {
        return Math.floor(Math.random() * 5000) + "";
    }
}

// @ts-ignore
module.exports = PeerInfo;
