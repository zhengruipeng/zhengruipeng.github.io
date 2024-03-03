import {GraphicBase} from "../Graphic/GraphicBase";
import {Keyframe} from "./Keyframe.js";
import {KeyframeEffectOptionsWithoutPseudo} from "./KeyframeEffectOptionsWithoutPseudo.js";

class KeyframeEffect {
    public target: GraphicBase
    public composite: "replace" | "add" | "accumulate"

    constructor(target: GraphicBase, frames: Keyframe[] | DOMMatrix, options: KeyframeEffectOptionsWithoutPseudo) {
        this.target = target;
    }
}

export {KeyframeEffect}