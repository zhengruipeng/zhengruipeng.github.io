import { Arc } from "./Shapes/Arc.js";
import { Arc2 } from "./Shapes/Arc2.js";
import { Ellipse } from "./Shapes/Ellipse.js";
import { Line } from "./Shapes/Line.js";
import { BezierCurve } from "./Shapes/BezierCurve.js";
import { Rect } from "./Shapes/Rect.js";
import { RoundRect } from "./Shapes/RoundRect.js";
import { Text } from "./Shapes/Text.js";
import { createCustomGraphic } from "./Shapes/CustomGraphic.js";
import { ContextChangeEvent } from "../Event/ContextChangeEvent.js";
import { Group } from "./Shapes/Group.js";
class Graphic extends HTMLElement {
    appendChild(node) {
        var _a, _b;
        super.appendChild(node);
        //触发预备程序，在下一次屏幕刷新的时候更新
        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        ev.source = "graphic";
        (_b = (_a = this.mano) === null || _a === void 0 ? void 0 : _a.canvas) === null || _b === void 0 ? void 0 : _b.dispatchEvent(ev);
        return node;
    }
    removeChild(child) {
        var _a, _b;
        super.removeChild(child);
        //触发预备程序，在下一次屏幕刷新的时候更新
        let ev = new ContextChangeEvent("contextchange", {
            bubbles: true,
            cancelable: true,
        });
        (_b = (_a = this.mano) === null || _a === void 0 ? void 0 : _a.canvas) === null || _b === void 0 ? void 0 : _b.dispatchEvent(ev);
        return child;
    }
}
Graphic.Arc = Arc;
Graphic.Arc2 = Arc2;
Graphic.Ellipse = Ellipse;
Graphic.Line = Line;
Graphic.BezierCurve = BezierCurve;
Graphic.Rect = Rect;
Graphic.RoundRect = RoundRect;
Graphic.Text = Text;
Graphic.Group = Group;
Graphic.createCustomGraphic = createCustomGraphic;
customElements.define("mano-graphic", Graphic);
export { Graphic };
