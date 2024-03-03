///<reference path="./Color.ts" />
///<reference path="./Gradient.ts" />
///<reference path="./Parttern.ts" />
import {Color} from "./Color.js";
import {Gradient} from "./Gradient.js";
import {Parttern} from "./Parttern.js";

type Fillable = Color | Gradient | Parttern;

export {Fillable}
