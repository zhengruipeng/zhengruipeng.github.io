import {FontInit} from "./FontInit.js";
import {TextFormatInit} from "./TextFormatInit.js";

class Font implements FontInit{
    public fontKerning: "auto" | "normal" | "none";
    public fontStretch: "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "normal" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded";
    public fontVariantCaps: "normal" | "small-caps" | "all-small-caps" | "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";
    public font: string;

    constructor(init?: FontInit) {
        //将所有init中的值赋给this中
        Object.assign(this, init);
    }
}

export {Font}