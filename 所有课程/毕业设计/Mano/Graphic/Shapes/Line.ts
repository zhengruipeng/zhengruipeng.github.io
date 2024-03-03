import {GraphicBase} from "../GraphicBase.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";

class Line extends GraphicBase {
    public startX: number;
    public startY: number;
    public endX: number;
    public endY: number;

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.moveTo(this.startX, this.startY);
        crc.lineTo(this.endX, this.endY);
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
                endX: number,
                endY: number) {
        super();
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

    }

}

customElements.define("mano-line", Line);
export {Line}