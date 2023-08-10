class Peer extends Object {
    public channel: BroadcastChannel | null = null;

    public send(...msgs: string[]): void {
        const that = this.channel;
        msgs.forEach(msg => {
            that?.postMessage(msg);
        });
    }
    constructor() {
        super();
        this.channel = new BroadcastChannel("name");
    }

}

export {Peer}