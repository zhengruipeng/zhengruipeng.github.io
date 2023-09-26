await Deno.stdin.readable
    .pipeThrough(new CompressionStream("gzip"))
    // .pipeTo(Deno.stdout.writable);
    .pipeTo(new WritableStream<Uint8Array>({
        start(contorller: WritableStreamDefaultController): void {

        }
    }))