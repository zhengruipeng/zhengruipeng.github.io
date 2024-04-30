var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GraphicBase } from "../GraphicBase.js";
import { NonNegativeNumber } from "../../Unit/NonNegativeNumber.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class Arc2 extends GraphicBase {
    render(canvas) {
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
    constructor(startX, startY, x1, y1, x2, y2, radius) {
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
__decorate([
    NonNegativeNumber
], Arc2.prototype, "radius", void 0);
customElements.define("mano-arc2", Arc2);
export { Arc2 };
