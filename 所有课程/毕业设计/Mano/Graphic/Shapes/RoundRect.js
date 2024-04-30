import { GraphicBase } from "../GraphicBase.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class RoundRect extends GraphicBase {
    render(canvas) {
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
    constructor(x, y, width, height, radii) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radii = radii;
    }
}
customElements.define("mano-roundrect", RoundRect);
export { RoundRect };
