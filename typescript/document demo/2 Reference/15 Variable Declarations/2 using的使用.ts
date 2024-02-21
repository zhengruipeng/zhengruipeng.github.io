/// <reference lib="esnext" />
// from the default lib:
interface Disposable {
    [Symbol.dispose](): void;
}

// usage:
class TraceActivity implements Disposable {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
        console.log(`Entering: ${name}`);
    }

    [Symbol.dispose](): void {
        console.log(`Exiting: ${name}`);
    }
}

function f() {
    using _activity = new TraceActivity("f");
    console.log("Hello world!");
}

f();
// prints:
//   Entering: f
//   Hello world!
//   Exiting: f