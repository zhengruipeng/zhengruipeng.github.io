import {GraphicBase} from "../GraphicBase.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";

class RoundRect extends GraphicBase {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public radii: number | number[] & { length: 1 | 2 | 3 | 4 };

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.roundRect(this.x, this.y, this.width, this.height, this.radii);
        crc.fillStyle = this.backgroundColor.toString();
        crc.strokeStyle = this.backgroundColor.toString();
        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fill() :
            crc.stroke();

        crc.closePath();
        return null;
    }

    constructor(x: number,
                y: number,
                width: number,
                height: number,
                radii: number | number[] & { length: 1 | 2 | 3 | 4 }) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radii = radii;
    }
}

customElements.define("mano-roundrect", RoundRect);
export {RoundRect}