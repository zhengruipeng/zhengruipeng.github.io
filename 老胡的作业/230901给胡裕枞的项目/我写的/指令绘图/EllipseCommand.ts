import {Command} from "./Command.js";

class EllipseCommand extends Command {
    public cx: number = 0;
    public cy: number = 0;
    public rx: number = 0;
    public ry: number = 0;
    public svg: SVGElement;

    public draw(): SVGElement {
        let ellipse: SVGEllipseElement = document.createElementNS('http://www.w3.org/2000/svg', "ellipse");

        ellipse.cx.baseVal.value = this.cx;
        ellipse.cy.baseVal.value = this.cy;
        ellipse.rx.baseVal.value = this.rx;
        ellipse.ry.baseVal.value = this.ry;
        ellipse.style.stroke = "#000";
        ellipse.style.fill = "none";

        this.svg.appendChild(ellipse);

        return ellipse;
    };

    constructor(svg: SVGElement,
                cx: number = 0,
                cy: number = 0,
                rx: number = 0,
                ry: number = 0) {
        super();
        this.svg = svg;
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }
}

export {EllipseCommand}