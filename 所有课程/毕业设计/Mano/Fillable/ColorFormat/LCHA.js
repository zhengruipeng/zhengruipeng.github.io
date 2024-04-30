var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ColorBase } from "../ColorBase.js";
import { NumberInRange } from "../../Unit/NumberInRange.js";
class LCHA extends ColorBase {
    toString() {
        return `lcha(${this.L}, ${this.C}, ${this.H}, ${this.A})`;
    }
    constructor(L, C, H, A) {
        super();
        this.type = "lch";
        this.A = 1;
        this.L = L;
        this.C = C;
        this.H = H;
        this.A = A;
    }
}
__decorate([
    NumberInRange(0, 360)
], LCHA.prototype, "L", void 0);
__decorate([
    NumberInRange(0, 100)
], LCHA.prototype, "C", void 0);
__decorate([
    NumberInRange(0, 360)
], LCHA.prototype, "H", void 0);
__decorate([
    NumberInRange(0, 1)
], LCHA.prototype, "A", void 0);
export { LCHA };
