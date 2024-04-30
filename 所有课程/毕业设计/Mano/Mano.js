import { Canvas } from "./Global/Canvas.js";
import { GraphicBase } from "./Graphic/GraphicBase.js";
import { Graphic } from "./Graphic/Graphic.js";
import { Animation } from "./Animation/Animation.js";
import { KeyframeEffect } from "./Animation/KeyframeEffect.js";
import { Color } from "./Fillable/Color.js";
import { ColorBase } from "./Fillable/ColorBase.js";
import { COLOR_NAME } from "./Fillable/COLOR_NAME.js";
import { Gradient } from "./Fillable/Gradient.js";
import { GradientBase } from "./Fillable/GradientBase.js";
import { Parttern } from "./Fillable/Parttern.js";
import { Border } from "./Graphic/Border.js";
import { FILL_TYPE } from "./Graphic/FILL_TYPE.js";
import { Font } from "./Graphic/Font.js";
import { Shadow } from "./Graphic/Shadow.js";
import { TextFormat } from "./Graphic/TextFormat.js";
import { ImageData } from "./Pixel/ImageData.js";
import { MultipleInstancesError } from "./Exception/MultipleInstancesError.js";
import { ContextChangeEvent } from "./Event/ContextChangeEvent.js";
class Mano extends HTMLElement {
    appendChild(node) {
        var _a;
        if (node instanceof Canvas)
            if (!this.canvas) {
                this.canvas = node;
            }
            else
                new MultipleInstancesError("出现了多个画布实例");
        if (node instanceof Graphic)
            if (!this.graphic) {
                this.graphic = node;
            }
            else
                new MultipleInstancesError("出现了多个图形容器实例");
        node.mano = this;
        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        ev.source = "mano";
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.dispatchEvent(ev);
        super.appendChild(node);
        return node;
    }
    removeChild(child) {
        var _a;
        if (child instanceof Canvas)
            this.canvas = null;
        if (child instanceof GraphicBase)
            this.graphic = null;
        child.mano = null;
        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.dispatchEvent(ev);
        super.removeChild(child);
        return child;
    }
}
Mano.Canvas = Canvas;
Mano.GraphicBase = GraphicBase;
Mano.Graphic = Graphic;
Mano.Parttern = Parttern;
Mano.Border = Border;
Mano.FILL_TYPE = FILL_TYPE;
Mano.Font = Font;
Mano.Shadow = Shadow;
Mano.TextFormat = TextFormat;
Mano.Animation = Animation;
Mano.KeyframeEffect = KeyframeEffect;
Mano.Color = Color;
Mano.ColorBase = ColorBase;
Mano.COLOR_NAME = COLOR_NAME;
Mano.Gradient = Gradient;
Mano.GradientBase = GradientBase;
Mano.ImageData = ImageData;
customElements.define("mano-main", Mano);
export { Mano };
