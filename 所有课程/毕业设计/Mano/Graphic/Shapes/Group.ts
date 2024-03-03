import {GraphicBase} from "../GraphicBase.js";
import {NonNegativeNumber} from "../../Unit/NonNegativeNumber.js";
import {Canvas} from "../../Global/Canvas.js";
import {FILL_TYPE} from "../FILL_TYPE.js";
import {AfterRenderEvent} from "../../Event/AftereRenderEvent.js";

class Group extends GraphicBase {

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let crc = super.render(canvas);

        Array.from(this.children).forEach(element => {
            let graphic = element as GraphicBase;
            graphic.render(canvas);

            let ev = new AfterRenderEvent("afterrender", {
                bubbles: true,
                cancelable: true,
            });
            graphic.dispatchEvent(ev);
        });
        return null;
    }

    constructor() {
        super();
    }
}

customElements.define("mano-group", Group);
export {Group}