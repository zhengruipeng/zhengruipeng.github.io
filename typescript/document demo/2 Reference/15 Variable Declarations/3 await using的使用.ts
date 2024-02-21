/// <reference lib="esnext" />

async function f() {
    await using x = {
        async [Symbol.asyncDispose]() {
            console.log(123)
        }
    };
    await new Promise<void>(res => {
        setTimeout(_ => res(),100);
    });
} // `await x[Symbol.asyncDispose]()` is invoked
f();
