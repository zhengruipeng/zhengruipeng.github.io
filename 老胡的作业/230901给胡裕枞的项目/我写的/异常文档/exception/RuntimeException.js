import { Exception } from "./Exception.js";
class RuntimeException extends Object {
    static Start = class extends Exception {
        ID = 1;
        summary = 'RuntimeException.Start';
        info = "程序运行打开时出现错误";
        constructor() {
            super();
        }
    };
    static Running = class extends Exception {
        ID = 2;
        summary = 'RuntimeException.Running';
        info = "程序运行时出现错误";
        constructor() {
            super();
        }
    };
    static End = class extends Exception {
        ID = 3;
        summary = 'RuntimeException.End';
        info = "程序运行结束时出现错误";
        constructor() {
            super();
        }
    };
}
export { RuntimeException };
