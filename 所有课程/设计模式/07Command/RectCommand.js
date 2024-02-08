import { Command } from "./Command.js";
class RectCommand extends Command {
    left = 0;
    top = 0;
    width = 0;
    height = 0;
    svg;
    draw() {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
        rect.x.baseVal.value = this.left;
        rect.y.baseVal.value = this.top;
        rect.width.baseVal.value = this.width;
        rect.height.baseVal.value = this.height;
        rect.style.stroke = "#000";
        rect.style.fill = "none";
        this.svg.appendChild(rect);
        return rect;
    }
    ;
    constructor(svg, left = 0, top = 0, width = 0, height = 0) {
        super();
        this.svg = svg;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
export { RectCommand };
