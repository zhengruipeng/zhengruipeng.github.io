import {GraphicBase} from "../GraphicBase.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";
//已废弃
let createCustomGraphic = function (fn: (c: CanvasRenderingContext2D) => void, tag?: string) {
    class CustomGraphic extends GraphicBase {
        public fn: (c: CanvasRenderingContext2D) => void = fn;
        public tag?: string = "mano-" + tag;

        public render(canvas: Canvas): CanvasRenderingContext2D {
            let crc = super.render(canvas);
            this.fn(crc);

            return null;
        }

        constructor() {
            super();
        }
    }

    if (tag)
        customElements.define("mano-" + tag, CustomGraphic);

    return CustomGraphic;
}
export {createCustomGraphic}