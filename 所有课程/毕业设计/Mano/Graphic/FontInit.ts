import {CSSAngle, CSSLength, CSSPercent} from "../Unit/CSSUnit.js";

interface FontInit {
    fontKerning?: "auto" | "normal" | "none";
    fontStretch?: CSSPercent/*百分比*/ | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "normal" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded";
    fontVariantCaps?: "normal" | "small-caps" | "all-small-caps" | "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";
    /*fontFamily?: string | string[];
    fontSize?: CSSLength | CSSPercent/!*单位值和百分比*!/ | "smaller" | "larger" | "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" | "xxx-large";
    fontStyle?: "normal" | "italic" | "oblique" | ["oblique", CSSAngle];
    fontVariant?:*/

    font: string;
}

export {FontInit}