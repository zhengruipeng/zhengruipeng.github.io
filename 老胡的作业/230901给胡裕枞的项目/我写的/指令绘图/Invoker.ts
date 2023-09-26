import {Command} from "./Command.js";

class Invoker extends Object {
    public ctrlY: Array<SVGElement> = [];
    public ctrlZ: Array<SVGElement> = [];
    public svg: SVGElement;

    // private command: Command;

    public invoke(command: Command): void {
        // this.command = command;
        let ele: SVGElement = command.draw();
        this.ctrlY.length = 0;
        this.ctrlZ.push(ele);
    }

    public restore(): void {
        if (this.ctrlZ.length === 0) return;

        let ele: SVGElement = this.ctrlZ.pop();
        this.ctrlY.push(ele);
        this.svg.removeChild(ele);
    }

    public undoRestore(): void {
        if (this.ctrlY.length === 0) return;

        let ele: SVGElement = this.ctrlY.pop();
        this.ctrlZ.push(ele);
        this.svg.appendChild(ele);

    }

    public registEvent(): void {
        let that = this;
        window.addEventListener("keydown", function (ev: KeyboardEvent): void {
            if (!ev.ctrlKey) return;
            if (ev.key.toLowerCase() === "z") {
                that.restore();
            } else if (ev.key.toLowerCase() === "y") {
                that.undoRestore();
            }
        })
    }

    constructor(svg: SVGElement) {
        super();
        this.svg = svg;
        this.registEvent();
    }
}

export {Invoker}