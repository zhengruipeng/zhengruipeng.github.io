var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _GraphicBase___content__;
import { TextFormat } from "./TextFormat.js";
import { FILL_TYPE } from "./FILL_TYPE.js";
import { RGBA } from "../Fillable/ColorFormat/RGBA.js";
import { RenderEvent } from "../Event/RenderEvent.js";
import { AfterRenderEvent } from "../Event/AftereRenderEvent.js";
class GraphicBase extends HTMLElement {
    get content() {
        return __classPrivateFieldGet(this, _GraphicBase___content__, "f");
    }
    set content(content) {
        __classPrivateFieldSet(this, _GraphicBase___content__, content, "f");
    }
    render(canvas) {
        let ev = new RenderEvent("render");
        this.dispatchEvent(ev);
        //返回绘制位置
        return this.animation ? canvas.dynamicsCanvas : canvas.staticCanvas;
    }
    renderChild(canvas) {
        Array.from(this.children).forEach(element => {
            let graphic = element;
            graphic.render(canvas);
            let ev = new AfterRenderEvent("afterrender", {
                bubbles: true,
                cancelable: true,
            });
            graphic.dispatchEvent(ev);
        });
    }
    constructor() {
        super();
        _GraphicBase___content__.set(this, void 0);
        this.textFormat = new TextFormat({ textBaseline: "hanging" });
        this.boxTransform = new DOMMatrix([1, 0, 0, 1, 0, 0]);
        this.textTransform = new DOMMatrix([1, 0, 0, 1, 0, 0]);
        this.fillType = FILL_TYPE.GRAPHIC_FILL;
        this.backgroundColor = new RGBA(0, 0, 0);
        this.color = new RGBA(0, 0, 0);
    }
}
_GraphicBase___content__ = new WeakMap();
export { GraphicBase };
