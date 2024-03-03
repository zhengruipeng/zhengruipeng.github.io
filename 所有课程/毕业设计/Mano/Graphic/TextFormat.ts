import {TextFormatInit} from "./TextFormatInit.js";

class TextFormat implements TextFormatInit {
    public textAlign: "left" | "right" | "center" | "start" | "end";
    public textBaseline: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom" = "hanging";
    public textRendering: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
    public wordSpacing: CSSUnitValue | number;
    public letterSpacing: CSSUnitValue;
    public direction: "ltr" | "rtl" | "inherit"

    constructor(init?: TextFormatInit) {
        //将所有init中的值赋给this中
        Object.assign(this, init);
    }
}

export {TextFormat}