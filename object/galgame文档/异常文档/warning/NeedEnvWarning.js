import { Warning } from "./Warning.js";
class NeedEnvWarning extends Object {
    static NeedInstall = class extends Warning {
        ID = 1;
        summary = 'NeedEnvWarning.NeedInstall';
        info = "此应用解压后为安装包，需要安装";
        constructor() {
            super();
        }
    };
    static NeedSimulator = class extends Warning {
        ID = 2;
        summary = 'NeedEnvWarning.NeedSimulator';
        info = "此应用解压后运行需要模拟器";
        constructor() {
            super();
        }
    };
}
export { NeedEnvWarning };
