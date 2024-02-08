import { Warning } from "./Warning.js";
class DirWarning extends Object {
    static EngDir = class extends Warning {
        ID = 1;
        summary = 'DirWarning.EngDir';
        info = "需要纯英文路径但是鲜有提示";
        constructor() {
            super();
        }
    };
}
export { DirWarning };
