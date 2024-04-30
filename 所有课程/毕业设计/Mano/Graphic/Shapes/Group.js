import { GraphicBase } from "../GraphicBase.js";
import { AfterRenderEvent } from "../../Event/AftereRenderEvent.js";
class Group extends GraphicBase {
    render(canvas) {
        let crc = super.render(canvas);
        Array.from(this.children).forEach(element => {
            let graphic = element;
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
export { Group };
