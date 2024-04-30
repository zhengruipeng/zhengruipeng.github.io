import { GraphicBase } from "../GraphicBase.js";
//已废弃
let createCustomGraphic = function (fn, tag) {
    class CustomGraphic extends GraphicBase {
        render(canvas) {
            let crc = super.render(canvas);
            this.fn(crc);
            return null;
        }
        constructor() {
            super();
            this.fn = fn;
            this.tag = "mano-" + tag;
        }
    }
    if (tag)
        customElements.define("mano-" + tag, CustomGraphic);
    return CustomGraphic;
};
export { createCustomGraphic };
