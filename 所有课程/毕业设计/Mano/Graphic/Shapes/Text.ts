import {GraphicBase} from "../GraphicBase.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";
import {TextFormatInit} from "../TextFormatInit";

class Text extends GraphicBase {
    public text: string;
    public x: number;
    public y: number;
    public maxWidth?: number;

    #setStyles(crc) {
        crc.textBaseline = this?.textFormat?.textBaseline || "hanging";
        crc.textRendering = this?.textFormat?.textRendering || "auto";
        crc.textAlign = this?.textFormat?.textAlign || "left";
        crc.direction = this?.textFormat?.direction || "ltr";
        crc.wordSpacing = this?.textFormat?.wordSpacing || CSS.px(0);
        crc.letterSpacing = this?.textFormat?.letterSpacing || CSS.px(0);

        crc.shadowBlur = this?.textShadow?.blur || 0;
        crc.shadowColor = this?.textShadow?.color?.toString() || "rgb(255,255,255)";
        crc.shadowOffsetX = this?.textShadow?.offsetX || 0;
        crc.shadowOffsetY = this?.textShadow?.offsetY || 0;

        crc.fontKerning = this?.font?.fontKerning || "auto";
        crc.fontStretch = this?.font?.fontStretch || "normal";
        crc.fontVariantCaps = this?.font?.fontVariantCaps || "normal";
        crc.font = this?.font?.font || "10px  sans-serif";

        crc.setTransform(this.textTransform || new DOMMatrix([1, 0, 0, 1, 0, 0]));

        crc.fillStyle = this.backgroundColor.toString();
        crc.strokeStyle = this.backgroundColor.toString();
    }

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc: CanvasRenderingContext2D & TextFormatInit = super.render(canvas);

        crc.beginPath();

        this.#setStyles(crc);

        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fillText(this.text, this.x, this.y, this.maxWidth) :
            crc.strokeText(this.text, this.x, this.y, this.maxWidth);

        crc.closePath();
        return null;
    }

    constructor(text: string,
                x: number,
                y: number,
                maxWidth?: number
    ) {
        super();

        this.text = text;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
    }
}

customElements.define("mano-text", Text);
export {Text}