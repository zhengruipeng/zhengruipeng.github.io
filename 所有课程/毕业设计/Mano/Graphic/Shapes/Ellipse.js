var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GraphicBase } from "../GraphicBase.js";
import { NonNegativeNumber } from "../../Unit/NonNegativeNumber.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class Ellipse extends GraphicBase {
    render(canvas) {
        let crc = super.render(canvas);
        crc.beginPath();
        crc.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle, this.counterclockwise);
        crc.fillStyle = this.backgroundColor.toString();
        crc.strokeStyle = this.backgroundColor.toString();
        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fill() :
            crc.stroke();
        crc.closePath();
        return null;
    }
    constructor(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
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
__decorate([
    NonNegativeNumber
], Ellipse.prototype, "radiusX", void 0);
__decorate([
    NonNegativeNumber
], Ellipse.prototype, "radiusY", void 0);
customElements.define("mano-ellipse", Ellipse);
export { Ellipse };
