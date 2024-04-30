var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Canvas___contextChangeDefaultCallBack__;
import { RGBA } from "../Fillable/ColorFormat/RGBA.js";
import { RenderEvent } from "../Event/RenderEvent.js";
import { AfterRenderEvent } from "../Event/AftereRenderEvent.js";
import { BeforeRenderEvent } from "../Event/BeforeRenderEvent.js";
class Canvas extends HTMLElement {
    clear() {
        var _a;
        let canvas = this.staticCanvas.canvas;
        canvas.width = this.canvasOptions.width;
        this.staticCanvas = canvas.getContext("2d");
        canvas = this.dynamicsCanvas.canvas;
        canvas.width = this.canvasOptions.width;
        this.dynamicsCanvas = canvas.getContext("2d");
        this.dynamicsCanvas.beginPath();
        this.dynamicsCanvas.rect(0, 0, this.canvasOptions.width, this.canvasOptions.height);
        this.dynamicsCanvas.fillStyle = ((_a = this.canvasOptions.clearColor) === null || _a === void 0 ? void 0 : _a.toString()) ||
            (new RGBA(255, 255, 255, 255)).toString();
        this.dynamicsCanvas.fill();
        this.dynamicsCanvas.closePath();
    }
    render() {
        console.log(++this.counter);
        let ev = new RenderEvent("render", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(ev);
        this.clear();
        //为了防止一些组件内部添加导致无限渲染
        this.removeEventListener("contextchange", __classPrivateFieldGet(this, _Canvas___contextChangeDefaultCallBack__, "f"));
        let that = this;
        Array.from(this.mano.graphic.children).forEach(element => {
            let graphic = element;
            graphic.render(that);
            let ev = new AfterRenderEvent("afterrender", {
                bubbles: true,
                cancelable: true,
            });
            graphic.dispatchEvent(ev);
        });
        this.addEventListener("contextchange", __classPrivateFieldGet(this, _Canvas___contextChangeDefaultCallBack__, "f"));
        this.rendering = false;
        ev = new AfterRenderEvent("afterrender", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(ev);
    }
    constructor(options) {
        super();
        //渲染任务已经预备，准备渲染中
        //通常在触发beforerender事件之后和render事件触发之前，此值为true
        this.rendering = false;
        this.counter = 0;
        _Canvas___contextChangeDefaultCallBack__.set(this, (function (e) {
            if (this.rendering)
                return;
            console.log(e.source);
            let ev = new BeforeRenderEvent("beforerender", {
                bubbles: true,
                cancelable: true,
            });
            this.dispatchEvent(ev);
            this.rendering = true;
            requestAnimationFrame(this.render.bind(this));
        }).bind(this));
        if (!options) {
            options = {};
            Array.from(this.attributes).forEach(attr => {
                options[attr.name] = attr.value;
            });
        }
        this.canvasId = ++Canvas.CanvasId;
        this.canvasOptions = options;
        const dynamicsCanvasEle = document.createElement("canvas");
        const staticCanvasEle = document.createElement("canvas");
        if ((options === null || options === void 0 ? void 0 : options.width) && (options === null || options === void 0 ? void 0 : options.height)) {
            let { width, height } = options;
            dynamicsCanvasEle.width = staticCanvasEle.width = width;
            dynamicsCanvasEle.height = staticCanvasEle.height = height;
            this.style.width = width + "px";
            this.style.height = height + "px";
            this.style.display = "block";
        }
        dynamicsCanvasEle.id = "mano-dynamics-canvas" + this.canvasId;
        staticCanvasEle.id = "mano-static-canvas" + this.canvasId;
        this.dynamicsCanvas = dynamicsCanvasEle.getContext("2d");
        this.staticCanvas = staticCanvasEle.getContext("2d");
        let shadowRoot = this.attachShadow({ mode: "open" });
        dynamicsCanvasEle.style.position = "fixed";
        staticCanvasEle.style.position = "fixed";
        shadowRoot.appendChild(dynamicsCanvasEle);
        shadowRoot.appendChild(staticCanvasEle);
        this.addEventListener("contextchange", __classPrivateFieldGet(this, _Canvas___contextChangeDefaultCallBack__, "f"));
    }
}
_Canvas___contextChangeDefaultCallBack__ = new WeakMap();
Canvas.CanvasId = 0;
customElements.define("mano-canvas", Canvas);
export { Canvas };
