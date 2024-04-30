import { GraphicBase } from "../GraphicBase.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class Line extends GraphicBase {
    render(canvas) {
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
    constructor(startX, startY, endX, endY) {
        super();
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
}
customElements.define("mano-line", Line);
export { Line };
