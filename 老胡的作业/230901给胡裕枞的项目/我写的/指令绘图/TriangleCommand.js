import { Command } from "./Command.js";
class TriangleCommand extends Command {
    p1 = [0, 0];
    p2 = [0, 0];
    p3 = [0, 0];
    svg;
    draw() {
        let path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        // @ts-ignore
        let pValue = (p, index) => p[index] ?? (index === 0 ? p.x : p.y);
        path.setAttribute("d", `M ${pValue(this.p1, 0)},${pValue(this.p1, 1)} L ${pValue(this.p2, 0)},${pValue(this.p2, 1)} ${pValue(this.p3, 0)},${pValue(this.p3, 1)} Z`);
        path.style.stroke = "#000";
        path.style.fill = "none";
        this.svg.appendChild(path);
        return path;
    }
    ;
    constructor(svg, p1 = [0, 0], p2 = [0, 0], p3 = [0, 0]) {
        super();
        this.svg = svg;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
}
export { TriangleCommand };
