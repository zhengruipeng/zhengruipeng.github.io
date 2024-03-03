interface TextFormatInit {
    textAlign?: "left" | "right" | "center" | "start" | "end";
    textBaseline?: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
    textRendering?: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
    wordSpacing?: CSSUnitValue | number;
    letterSpacing?: CSSUnitValue;
    direction?: "ltr" | "rtl" | "inherit"
}

export {TextFormatInit}