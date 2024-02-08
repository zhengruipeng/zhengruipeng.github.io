import { Command } from "./Command.js";
class EllipseCommand extends Command {
    cx = 0;
    cy = 0;
    rx = 0;
    ry = 0;
    svg;
    draw() {
        let ellipse = document.createElementNS('http://www.w3.org/2000/svg', "ellipse");
        ellipse.cx.baseVal.value = this.cx;
        ellipse.cy.baseVal.value = this.cy;
        ellipse.rx.baseVal.value = this.rx;
        ellipse.ry.baseVal.value = this.ry;
        ellipse.style.stroke = "#000";
        ellipse.style.fill = "none";
        this.svg.appendChild(ellipse);
        return ellipse;
    }
    ;
    constructor(svg, cx = 0, cy = 0, rx = 0, ry = 0) {
        super();
        this.svg = svg;
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }
}
export { EllipseCommand };
