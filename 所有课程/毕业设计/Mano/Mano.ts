import {Canvas} from "./Global/Canvas.js"
import {GraphicBase} from "./Graphic/GraphicBase.js"
import {Graphic} from "./Graphic/Graphic.js"
import {Animation} from "./Animation/Animation.js"
import {KeyframeEffect} from "./Animation/KeyframeEffect.js"
import {Color} from "./Fillable/Color.js";
import {ColorBase} from "./Fillable/ColorBase.js";
import {COLOR_NAME} from "./Fillable/COLOR_NAME.js";
import {Gradient} from "./Fillable/Gradient.js";
import {GradientBase} from "./Fillable/GradientBase.js";
import {Parttern} from "./Fillable/Parttern.js";
import {Border} from "./Graphic/Border.js";
import {FILL_TYPE} from "./Graphic/FILL_TYPE.js";
import {Font} from "./Graphic/Font.js";
import {Shadow} from "./Graphic/Shadow.js";
import {TextFormat} from "./Graphic/TextFormat.js";
import {ImageData} from "./Pixel/ImageData.js";
import {MultipleInstancesError} from "./Exception/MultipleInstancesError.js";
import {ContextChangeEvent} from "./Event/ContextChangeEvent.js";

class Mano extends HTMLElement {
    public static Canvas: typeof Canvas = Canvas;
    public static GraphicBase: typeof GraphicBase = GraphicBase;
    public static Graphic: typeof Graphic = Graphic;
    public static Parttern: typeof Parttern = Parttern;
    public static Border: typeof Border = Border;
    public static FILL_TYPE: typeof FILL_TYPE = FILL_TYPE;
    public static Font: typeof Font = Font;
    public static Shadow: typeof Shadow = Shadow;
    public static TextFormat: typeof TextFormat = TextFormat;
    public static Animation: typeof Animation = Animation;
    public static KeyframeEffect: typeof KeyframeEffect = KeyframeEffect;
    public static Color: typeof Color = Color;
    public static ColorBase: typeof ColorBase = ColorBase;
    public static COLOR_NAME: typeof COLOR_NAME = COLOR_NAME;
    public static Gradient: typeof Gradient = Gradient;
    public static GradientBase: typeof GradientBase = GradientBase;
    public static ImageData: typeof ImageData = ImageData;

    public canvas: Canvas;
    public graphic: Graphic;

    appendChild<T extends Node>(node: T): T {
        if (node instanceof Canvas)
            if (!this.canvas) {
                this.canvas = node;
            } else new MultipleInstancesError("出现了多个画布实例");

        if (node instanceof Graphic)
            if (!this.graphic) {
                this.graphic = node;
            } else new MultipleInstancesError("出现了多个图形容器实例");


        (node as T & { mano: Mano }).mano = this;

        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        ev.source = "mano";
        this.canvas?.dispatchEvent(ev);

        super.appendChild(node);
        return node;
    }

    removeChild<T extends Node>(child: T): T {
        if (child instanceof Canvas) this.canvas = null;
        if (child instanceof GraphicBase) this.graphic = null;

        (child as T & { mano: Mano }).mano = null;

        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        this.canvas?.dispatchEvent(ev);

        super.removeChild(child);
        return child;
    }
}

customElements.define("mano-main", Mano)
export {Mano}