var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NumberInRange } from "../../Unit/NumberInRange.js";
import { ColorBase } from "../ColorBase.js";
class HWBA extends ColorBase {
    toString() {
        return `hwba(${this.H}deg, ${this.W}%, ${this.B}%, ${this.Alpha})`;
    }
    constructor(H, W, B, Alpha = 1) {
        super();
        this.type = "hwb";
        this.H = H;
        this.W = W;
        this.B = B;
        this.Alpha = Alpha;
    }
}
__decorate([
    NumberInRange(0, 360)
], HWBA.prototype, "H", void 0);
__decorate([
    NumberInRange(0, 100)
], HWBA.prototype, "W", void 0);
__decorate([
    NumberInRange(0, 100)
], HWBA.prototype, "B", void 0);
__decorate([
    NumberInRange(0, 1)
], HWBA.prototype, "Alpha", void 0);
export { HWBA };
