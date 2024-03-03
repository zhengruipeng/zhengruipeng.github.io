import {ColorBase} from "../ColorBase.js";
import {NumberInRange} from "../../Unit/NumberInRange.js";

class LCHA extends ColorBase {
    public type:string = "lch";
    @NumberInRange(0, 360)
    public L: number;
    @NumberInRange(0, 100)
    public C: number;
    @NumberInRange(0, 360)
    public H: number;
    @NumberInRange(0, 1)
    public A: number = 1;

    public toString(): string {
        return `lcha(${this.L}, ${this.C}, ${this.H}, ${this.A})`;
    }

    constructor(L: number, C: number, H: number, A?: number) {
        super();
        this.L = L;
        this.C = C;
        this.H = H;
        this.A = A;
    }
}

export {LCHA};