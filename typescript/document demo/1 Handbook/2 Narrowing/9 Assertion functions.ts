function yell(str) {
    assert(typeof str === "string");
    return str.toUpperCase();
    //         ~~~~~~~~~~~
    // error: Property 'toUppercase' does not exist on type 'string'.
    //        Did you mean 'toUpperCase'?
}

class AssertionError implements Error {
    constructor(msg: string) {
        this.message = msg;
    }

    message: string;
    name: string;
}

function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(msg);
    }
}

function assertIsString(val: any): asserts val is string {
    if (typeof val !== "string") {
        throw new AssertionError("Not a string!");
    }
}