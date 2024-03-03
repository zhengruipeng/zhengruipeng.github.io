import {Color} from "../Fillable/Color.js";
import {ShadowInit} from "./ShadowInit.js";

class Shadow implements ShadowInit{
    public blur:number;
    public color:Color;
    public offsetX:number;
    public offsetY:number;

    constructor(init?: ShadowInit) {
        //将所有init中的值赋给this中
        Object.assign(this, init);
    }
}

export {Shadow}