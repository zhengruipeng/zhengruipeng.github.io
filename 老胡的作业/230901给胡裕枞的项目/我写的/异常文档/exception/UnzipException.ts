import {Exception} from "./Exception.js";

class UnzipException extends Object{
    public static PassWordError = class extends Exception {
        public ID: number = 1;
        public summary: string = 'UnzipException.PassWordError';
        public info: string = "压缩包解压密码错误";

        constructor() {
            super()
        }
    }
    public static Broken = class extends Exception {
        public ID: number = 2;
        public summary: string = 'UnzipException.Broken';
        public info: string = "压缩包受损";

        constructor() {
            super()
        }
    }
}

export {UnzipException}