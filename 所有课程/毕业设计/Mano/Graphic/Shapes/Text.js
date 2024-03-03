var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Text_instances, _Text_setStyles;
import { GraphicBase } from "../GraphicBase.js";
import { FILL_TYPE } from "../FILL_TYPE.js";
class Text extends GraphicBase {
    render(canvas) {
        let crc = super.render(canvas);
        crc.beginPath();
        __classPrivateFieldGet(this, _Text_instances, "m", _Text_setStyles).call(this, crc);
        this.fillType === FILL_TYPE.GRAPHIC_FILL ?
            crc.fillText(this.text, this.x, this.y, this.maxWidth) :
            crc.strokeText(this.text, this.x, this.y, this.maxWidth);
        crc.closePath();
        return null;
    }
    constructor(text, x, y, maxWidth) {
        super();
        _Text_instances.add(this);
        this.text = text;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
    }
}
_Text_instances = new WeakSet(), _Text_setStyles = function _Text_setStyles(crc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    crc.textBaseline = ((_a = this === null || this === void 0 ? void 0 : this.textFormat) === null || _a === void 0 ? void 0 : _a.textBaseline) || "hanging";
    crc.textRendering = ((_b = this === null || this === void 0 ? void 0 : this.textFormat) === null || _b === void 0 ? void 0 : _b.textRendering) || "auto";
    crc.textAlign = ((_c = this === null || this === void 0 ? void 0 : this.textFormat) === null || _c === void 0 ? void 0 : _c.textAlign) || "left";
    crc.direction = ((_d = this === null || this === void 0 ? void 0 : this.textFormat) === null || _d === void 0 ? void 0 : _d.direction) || "ltr";
    crc.wordSpacing = ((_e = this === null || this === void 0 ? void 0 : this.textFormat) === null || _e === void 0 ? void 0 : _e.wordSpacing) || CSS.px(0);
    crc.letterSpacing = ((_f = this === null || this === void 0 ? void 0 : this.textFormat) === null || _f === void 0 ? void 0 : _f.letterSpacing) || CSS.px(0);
    crc.shadowBlur = ((_g = this === null || this === void 0 ? void 0 : this.textShadow) === null || _g === void 0 ? void 0 : _g.blur) || 0;
    crc.shadowColor = ((_j = (_h = this === null || this === void 0 ? void 0 : this.textShadow) === null || _h === void 0 ? void 0 : _h.color) === null || _j === void 0 ? void 0 : _j.toString()) || "rgb(255,255,255)";
    crc.shadowOffsetX = ((_k = this === null || this === void 0 ? void 0 : this.textShadow) === null || _k === void 0 ? void 0 : _k.offsetX) || 0;
    crc.shadowOffsetY = ((_l = this === null || this === void 0 ? void 0 : this.textShadow) === null || _l === void 0 ? void 0 : _l.offsetY) || 0;
    crc.fontKerning = ((_m = this === null || this === void 0 ? void 0 : this.font) === null || _m === void 0 ? void 0 : _m.fontKerning) || "auto";
    crc.fontStretch = ((_o = this === null || this === void 0 ? void 0 : this.font) === null || _o === void 0 ? void 0 : _o.fontStretch) || "normal";
    crc.fontVariantCaps = ((_p = this === null || this === void 0 ? void 0 : this.font) === null || _p === void 0 ? void 0 : _p.fontVariantCaps) || "normal";
    crc.font = ((_q = this === null || this === void 0 ? void 0 : this.font) === null || _q === void 0 ? void 0 : _q.font) || "10px  sans-serif";
    crc.setTransform(this.textTransform || new DOMMatrix([1, 0, 0, 1, 0, 0]));
    crc.fillStyle = this.backgroundColor.toString();
    crc.strokeStyle = this.backgroundColor.toString();
};
customElements.define("mano-text", Text);
export { Text };
