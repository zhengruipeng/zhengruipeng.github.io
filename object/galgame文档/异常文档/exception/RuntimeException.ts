import {Exception} from "./Exception.js";

class RuntimeException extends Object {
    public static Start = class extends Exception {
        public ID: number = 1;
        public summary: string = 'RuntimeException.Start';
        public info: string = "程序运行打开时出现错误";

        constructor() {
            super();
        }
    }
    public static Running = class extends Exception {
        public ID: number = 2;
        public summary: string = 'RuntimeException.Running';
        public info: string = "程序运行时出现错误";

        constructor() {
            super();
        }
    }
    public static End = class extends Exception {
        public ID: number = 3;
        public summary: string = 'RuntimeException.End';
        public info: string = "程序运行结束时出现错误";

        constructor() {
            super();
        }
    }
}

export {RuntimeException}