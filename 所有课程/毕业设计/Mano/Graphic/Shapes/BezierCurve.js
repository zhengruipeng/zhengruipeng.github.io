import { GraphicBase } from "../GraphicBase.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class BezierCurve extends GraphicBase {
    render(canvas) {
        let crc = super.render(canvas);
        crc.beginPath();
        crc.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.endX, this.endY);
        crc.fillStyle = this.backgroundColor.toString();
        crc.strokeStyle = this.backgroundColor.toString();
        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fill() :
            crc.stroke();
        crc.closePath();
        return null;
    }
    constructor(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY) {
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
export { BezierCurve };
