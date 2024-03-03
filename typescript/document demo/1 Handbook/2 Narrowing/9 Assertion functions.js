function yell(str) {
    assert(typeof str === "string");
    return str.toUpperCase();
    //         ~~~~~~~~~~~
    // error: Property 'toUppercase' does not exist on type 'string'.
    //        Did you mean 'toUpperCase'?
}
class AssertionError {
    constructor(msg) {
        this.message = msg;
    }
    message;
    name;
}
function assert(condition, msg) {
    if (!condition) {
        throw new AssertionError(msg);
    }
}
function assertIsString(val) {
    if (typeof val !== "string") {
        throw new AssertionError("Not a string!");
    }
}
