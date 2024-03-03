import {ColorBase} from "../ColorBase.js";
import {NumberInRange} from "../../Unit/NumberInRange.js";

class HSLA extends ColorBase {
    public type:string = "hsl";
    @NumberInRange(0, 360)
    public H: number;
    @NumberInRange(0, 100)
    public S: number;
    @NumberInRange(0, 100)
    public L: number;
    @NumberInRange(0, 1)
    public Alpha: number;

    public toString(): string {
        return `hsla(${this.H}deg, ${this.S}%, ${this.L}%, ${this.Alpha})`;
    }

    constructor(H: number, S: number, L: number,  Alpha: number = 1) {
        super();
        this.H = H;
        this.S = S;
        this.L = L;
        this.Alpha = Alpha;
    }
}

export {HSLA}