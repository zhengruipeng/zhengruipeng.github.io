import {GraphicBase} from "../GraphicBase.js";
import {NonNegativeNumber} from "../../Unit/NonNegativeNumber.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";

class Arc2 extends GraphicBase {
    public startX: number;
    public startY: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    @NonNegativeNumber
    public radius: number;

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.moveTo(this.startX, this.startY);
        crc.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
        crc.fillStyle = this.backgroundColor.toString();
        crc.strokeStyle = this.backgroundColor.toString();
        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fill() :
            crc.stroke();

        crc.closePath();
        return null;
    }

    constructor(startX: number,
                startY: number,
                x1: number,
                y1: number,
                x2: number,
                y2: number,
                radius: number) {
        super();
        this.startX = startX;
        this.startY = startY;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.radius = radius;

    }
}

customElements.define("mano-arc2", Arc2);
export {Arc2}