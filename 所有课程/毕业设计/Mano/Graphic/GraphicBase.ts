import {TextFormat} from "./TextFormat.js"
import {Shadow} from "./Shadow.js"
import {Border} from "./Border.js"
import {Font} from "./Font"
import {FILL_TYPE} from "./FILL_TYPE.js"
import {Fillable} from "../Fillable/Fillable.js"
import {Canvas} from "../Global/Canvas.js";
import {Animation} from "../Animation/Animation.js";
import {RGBA} from "../Fillable/ColorFormat/RGBA.js";
import {RenderEvent} from "../Event/RenderEvent.js";
import {AfterRenderEvent} from "../Event/AftereRenderEvent.js";
import {Text} from "./Shapes/Text.js";

class GraphicBase extends HTMLElement {
    #__content__: string;

    get content(): string {
        return this.#__content__;
    }

    set content(content: string) {
        this.#__content__ = content;
    }

    public textFormat: TextFormat = new TextFormat({textBaseline: "hanging"});
    public boxShadow: Shadow;
    public textShadow: Shadow;
    public border: Border;
    public font: Font;
    public boxTransform: DOMMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    public textTransform: DOMMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);

    public fillType: FILL_TYPE = FILL_TYPE.GRAPHIC_FILL;
    public backgroundColor: Fillable = new RGBA(0, 0, 0);
    public color: Fillable = new RGBA(0, 0, 0);

    public animation: Animation;

    public render(canvas: Canvas): CanvasRenderingContext2D {
        let ev = new RenderEvent("render");
        this.dispatchEvent(ev);
        //返回绘制位置
        return this.animation ? canvas.dynamicsCanvas : canvas.staticCanvas;
    }

    public renderChild(canvas: Canvas) {
        Array.from(this.children).forEach(element => {
            let graphic = element as GraphicBase;
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
    }
}

export {GraphicBase}

