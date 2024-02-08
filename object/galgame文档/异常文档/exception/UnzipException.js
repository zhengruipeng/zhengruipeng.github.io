import { Exception } from "./Exception.js";
class UnzipException extends Object {
    static PassWordError = class extends Exception {
        ID = 1;
        summary = 'UnzipException.PassWordError';
        info = "压缩包解压密码错误";
        constructor() {
            super();
        }
    };
    static Broken = class extends Exception {
        ID = 2;
        summary = 'UnzipException.Broken';
        info = "压缩包受损";
        constructor() {
            super();
        }
    };
}
export { UnzipException };
