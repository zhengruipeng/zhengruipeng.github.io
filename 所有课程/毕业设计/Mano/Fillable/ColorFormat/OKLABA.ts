import {ColorBase} from "../ColorBase.js";
import {NumberInRange} from "../../Unit/NumberInRange.js";

class OKLABA extends ColorBase {
    public type: string = "oklab";
    @NumberInRange(0, 100)
    public L: number;
    @NumberInRange(-128, 127)
    public A: number;
    @NumberInRange(-128, 127)
    public B: number;
    @NumberInRange(0, 1)
    public Alpha: number;

    public toString(): string {
        return `oklaba(${this.L}, ${this.A}, ${this.B}, ${this.Alpha})`;
    }

    constructor(L: number, A: number, B: number, Alpha: number = 1) {
        super();
        this.L = L;
        this.A = A;
        this.B = B;
        this.Alpha = Alpha;
    }
}


export {OKLABA};