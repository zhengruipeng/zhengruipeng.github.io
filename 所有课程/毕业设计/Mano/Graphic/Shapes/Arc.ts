import {GraphicBase} from "../GraphicBase.js";
import {NonNegativeNumber} from "../../Unit/NonNegativeNumber.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";

class Arc extends GraphicBase {
    public x: number;
    public y: number;
    @NonNegativeNumber
    public radius: number;
    public startAngle: number;
    public endAngle: number;
    public counterclockwise?: boolean;

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        crc.beginPath();
        crc.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterclockwise);
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
                radius: number,
                startAngle: number,
                endAngle: number,
                counterclockwise?: boolean) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.counterclockwise = counterclockwise;

    }
}

customElements.define("mano-arc", Arc);
export {Arc}