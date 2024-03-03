import {RGBA} from "./ColorFormat/RGBA.js"
import {HSLA} from "./ColorFormat/HSLA.js"
import {HWBA} from "./ColorFormat/HWBA.js"
import {LABA} from "./ColorFormat/LABA.js";
import { LCHA } from "./ColorFormat/LCHA.js";
import { OKLABA } from "./ColorFormat/OKLABA.js";
import { OKLCHA } from "./ColorFormat/OKLCHA.js";
import {COLOR_NAME} from "./COLOR_NAME.js";

class Color {
    // [COLOR_NAME: string]: RGBA
    public name: COLOR_NAME;

    public static RGBA: typeof RGBA = RGBA;
    public static HSLA: typeof HSLA = HSLA;
    public static HWBA: typeof HWBA = HWBA;
    public static LABA: typeof LABA = LABA;
    public static LCHA: typeof LCHA = LCHA;
    public static OKLABA: typeof OKLABA = OKLABA;
    public static OKLCHA: typeof OKLCHA = OKLCHA;
}

export {Color}

