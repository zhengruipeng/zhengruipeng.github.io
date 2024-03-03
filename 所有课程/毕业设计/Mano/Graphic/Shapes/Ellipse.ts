import {GraphicBase} from "../GraphicBase.js";
import {NonNegativeNumber} from "../../Unit/NonNegativeNumber.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";
import {Rect} from "./Rect.js";

class Ellipse extends GraphicBase {
    public x: number
    public y: number
    @NonNegativeNumber
    public radiusX: number
    @NonNegativeNumber
    public radiusY: number
    public rotation: number
    public startAngle: number
    public endAngle: number
    public counterclockwise?: boolean

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.ellipse(this.x, this.y,
            this.radiusX, this.radiusY,
            this.rotation, this.startAngle,
            this.endAngle, this.counterclockwise);

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
                radiusX: number,
                radiusY: number,
                rotation: number,
                startAngle: number,
                endAngle: number,
                counterclockwise?: boolean) {
        super();
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.counterclockwise = counterclockwise;

    }
}

customElements.define("mano-ellipse", Ellipse);
export {Ellipse}