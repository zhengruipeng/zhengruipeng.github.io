import {NumberInRange} from "../../Unit/NumberInRange.js";
import {ColorBase} from "../ColorBase.js";

class HWBA extends ColorBase {
    public type:string = "hwb";
    @NumberInRange(0, 360)
    public H: number;
    @NumberInRange(0, 100)
    public W: number;
    @NumberInRange(0, 100)
    public B: number;
    @NumberInRange(0, 1)
    public Alpha: number;

    public toString(): string {
        return `hwba(${this.H}deg, ${this.W}%, ${this.B}%, ${this.Alpha})`;
    }

    constructor(H: number, W: number, B: number,  Alpha: number = 1) {
        super();
        this.H = H;
        this.W = W;
        this.B = B;
        this.Alpha = Alpha;
    }
}

export { HWBA };