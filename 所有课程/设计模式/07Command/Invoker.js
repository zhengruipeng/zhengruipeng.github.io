class Invoker extends Object {
    ctrlY = [];
    ctrlZ = [];
    svg;
    // private command: Command;
    invoke(command) {
        // this.command = command;
        let ele = command.draw();
        this.ctrlY.length = 0;
        this.ctrlZ.push(ele);
    }
    restore() {
        if (this.ctrlZ.length === 0)
            return;
        let ele = this.ctrlZ.pop();
        this.ctrlY.push(ele);
        this.svg.removeChild(ele);
    }
    undoRestore() {
        if (this.ctrlY.length === 0)
            return;
        let ele = this.ctrlY.pop();
        this.ctrlZ.push(ele);
        this.svg.appendChild(ele);
    }
    registEvent() {
        let that = this;
        window.addEventListener("keydown", function (ev) {
            if (!ev.ctrlKey)
                return;
            if (ev.key.toLowerCase() === "z") {
                that.restore();
            }
            else if (ev.key.toLowerCase() === "y") {
                that.undoRestore();
            }
        });
    }
    constructor(svg) {
        super();
        this.svg = svg;
        this.registEvent();
    }
}
export { Invoker };
