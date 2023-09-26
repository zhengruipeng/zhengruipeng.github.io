import {Command} from "./Command.js";

class RectCommand extends Command {
    public left: number = 0;
    public top: number = 0;
    public width: number = 0;
    public height: number = 0;
    public svg: SVGElement;

    public draw(): SVGElement {
        let rect:SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', "rect");

        rect.x.baseVal.value = this.left;
        rect.y.baseVal.value = this.top;
        rect.width.baseVal.value = this.width;
        rect.height.baseVal.value = this.height;
        rect.style.stroke = "#000";
        rect.style.fill = "none";

        this.svg.appendChild(rect);

        return rect;
    };

    constructor(svg: SVGElement,
                left: number = 0,
                top: number = 0,
                width: number = 0,
                height: number = 0) {
        super();
        this.svg = svg;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

export {RectCommand}