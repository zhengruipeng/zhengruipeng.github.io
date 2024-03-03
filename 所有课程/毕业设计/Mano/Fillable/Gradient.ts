import {ConicGradient} from "./ConicGradient.js";
import {LinearGradient} from "./LinearGradient.js";
import {RadialGradient} from "./RadialGradient.js";

class Gradient {
    public static ConicGradient: typeof ConicGradient = ConicGradient;
    public static RadialGradient: typeof RadialGradient = RadialGradient;
    public static LinearGradient: typeof LinearGradient = LinearGradient;

}

export {Gradient}

