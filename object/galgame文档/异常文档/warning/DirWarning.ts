import {Warning} from "./Warning.js"

class DirWarning extends Object{
    public static EngDir = class extends Warning {
        public ID: number = 1;
        public summary: string = 'DirWarning.EngDir';
        public info: string = "需要纯英文路径但是鲜有提示";

        constructor() {
            super();
        }
    }
}

export {DirWarning}