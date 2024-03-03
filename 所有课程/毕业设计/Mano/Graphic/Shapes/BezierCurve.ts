import {GraphicBase} from "../GraphicBase.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";

class BezierCurve extends GraphicBase {
    public startX: number;
    public startY: number;
    public cp1x: number;
    public cp1y: number;
    public cp2x: number;
    public cp2y: number;
    public endX: number;
    public endY: number;

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.endX, this.endY)
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
                cp1x: number,
                cp1y: number,
                cp2x: number,
                cp2y: number,
                endX: number,
                endY: number
    ) {
        super();
        this.startX = startX;
        this.startY = startY;
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.endX = endX;
        this.endY = endY;

    }
}

customElements.define("mano-bezier-curve", BezierCurve);
export {BezierCurve}