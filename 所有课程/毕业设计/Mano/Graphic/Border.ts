import {BorderInit} from "./BorderInit.js";
import {TextFormatInit} from "./TextFormatInit";

class Border implements BorderInit{
    public lineCap: "butt" | "round" | "square"
    public lineDash: number;
    public lineJoin: "round" | "bevel" | "miter"
    public lineWidth: number

    constructor(init?: TextFormatInit) {
        //将所有init中的值赋给this中
        Object.assign(this, init);
    }
}

export {Border}