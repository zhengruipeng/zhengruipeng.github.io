import {GraphicBase} from "../Graphic/GraphicBase"
import {CanvasOptions} from "./CanvasOptions.js";
import {Mano} from "../Mano.js";
import {RGBA} from "../Fillable/ColorFormat/RGBA.js";
import {RenderEvent} from "../Event/RenderEvent.js";
import {AfterRenderEvent} from "../Event/AftereRenderEvent.js";
import {BeforeRenderEvent} from "../Event/BeforeRenderEvent.js";

class Canvas extends HTMLElement {
    public mano: Mano;
    public static CanvasId: number = 0;

    public canvasId: number;
    public dynamicsCanvas: CanvasRenderingContext2D;
    public staticCanvas: CanvasRenderingContext2D;
    public canvasOptions: CanvasOptions;

    //这两个属性属于绘制图片的时候用的，地方错了
    public imageSmoothingEnabled: boolean;
    public imageSmoothingQuality: "low" | "medium" | "high";

    //渲染任务已经预备，准备渲染中
    //通常在触发beforerender事件之后和render事件触发之前，此值为true
    public rendering: boolean = false;

    public clear(): void {
        let canvas = this.staticCanvas.canvas;
        canvas.width = this.canvasOptions.width;
        this.staticCanvas = canvas.getContext("2d");

        canvas = this.dynamicsCanvas.canvas;
        canvas.width = this.canvasOptions.width;
        this.dynamicsCanvas = canvas.getContext("2d");

        this.dynamicsCanvas.beginPath();
        this.dynamicsCanvas.rect(0, 0, this.canvasOptions.width, this.canvasOptions.height);
        this.dynamicsCanvas.fillStyle = this.canvasOptions.clearColor?.toString() ||
            (new RGBA(255, 255, 255, 255)).toString();
        this.dynamicsCanvas.fill();
        this.dynamicsCanvas.closePath();
    }

    counter = 0;

    public render(): void {
        console.log(++this.counter);

        let ev = new RenderEvent("render", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(ev);

        this.clear();

        //为了防止一些组件内部添加导致无限渲染
        this.removeEventListener("contextchange", this.#__contextChangeDefaultCallBack__)
        let that = this;
        Array.from(this.mano.graphic.children).forEach(element => {
            let graphic = element as GraphicBase;
            graphic.render(that);

            let ev = new AfterRenderEvent("afterrender", {
                bubbles: true,
                cancelable: true,
            });
            graphic.dispatchEvent(ev);
        });
        this.addEventListener("contextchange", this.#__contextChangeDefaultCallBack__)

        this.rendering = false;

        ev = new AfterRenderEvent("afterrender", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(ev);
    }


    #__contextChangeDefaultCallBack__ = (function (e) {
        if (this.rendering) return;

        console.log(e.source);
        let ev = new BeforeRenderEvent("beforerender", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(ev);
        this.rendering = true;

        requestAnimationFrame(this.render.bind(this));
    }).bind(this);

    constructor(options?: CanvasOptions) {
        super();

        if (!options) {
            options = {};
            Array.from(this.attributes).forEach(attr => {
                options[attr.name] = attr.value
            });
        }

        this.canvasId = ++Canvas.CanvasId;
        this.canvasOptions = options;

        const dynamicsCanvasEle = document.createElement("canvas");
        const staticCanvasEle = document.createElement("canvas");

        if (options?.width && options?.height) {
            let {width, height} = options;
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

        let shadowRoot = this.attachShadow({mode: "open"});

        dynamicsCanvasEle.style.position = "fixed";
        staticCanvasEle.style.position = "fixed";

        shadowRoot.appendChild(dynamicsCanvasEle);
        shadowRoot.appendChild(staticCanvasEle);

        this.addEventListener("contextchange", this.#__contextChangeDefaultCallBack__)
    }

}

customElements.define("mano-canvas", Canvas);

export {Canvas}
