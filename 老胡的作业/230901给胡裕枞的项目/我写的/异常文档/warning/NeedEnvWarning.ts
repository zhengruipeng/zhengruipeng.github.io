import {Warning} from "./Warning.js"

class NeedEnvWarning extends Object{
    public static NeedInstall = class extends Warning {
        public ID: number = 1;
        public summary: string = 'NeedEnvWarning.NeedInstall';
        public info: string = "此应用解压后为安装包，需要安装";

        constructor() {
            super();
        }
    }

    public static NeedSimulator = class extends Warning {
        public ID: number = 2;
        public summary: string = 'NeedEnvWarning.NeedSimulator';
        public info: string = "此应用解压后运行需要模拟器";

        constructor() {
            super();
        }
    }
}

export {NeedEnvWarning}