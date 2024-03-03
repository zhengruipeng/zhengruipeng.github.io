import {ColorBase} from "../ColorBase.js";
import {NumberInRange} from "../../Unit/NumberInRange.js";

class RGBA extends ColorBase {
    public type: string = "rgb";
    @NumberInRange(0, 255)
    public R: number;
    @NumberInRange(0, 255)
    public G: number;
    @NumberInRange(0, 255)
    public B: number;
    @NumberInRange(0, 1)
    public Alpha: number;

    public toString(): string {
        return `rgba(${this.R},${this.G},${this.B},${this.Alpha})`;
    }

    constructor(R: number, G: number, B: number, Alpha: number = 1) {
        super();
        this.R = R;
        this.G = G;
        this.B = B;
        this.Alpha = Alpha;
    }
}

export {RGBA}