import {ColorBase} from "../ColorBase.js";
import {NumberInRange} from "../../Unit/NumberInRange.js";

class OKLCHA extends ColorBase {
    public type: string = "oklch";
    @NumberInRange(0, 360)
    public L: number;
    @NumberInRange(0, 100)
    public C: number;
    @NumberInRange(0, 360)
    public H: number;
    @NumberInRange(0, 1)
    public Alpha: number;

    public toString(): string {
        return `oklcha(${this.L}, ${this.C}, ${this.H}, ${this.Alpha})`;
    }

    constructor(L: number, C: number, H: number, Alpha: number = 1) {
        super();
        this.L = L;
        this.C = C;
        this.H = H;
        this.Alpha = Alpha;
    }
}

export {OKLCHA};