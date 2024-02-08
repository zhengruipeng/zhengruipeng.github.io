const output = await Deno.create("../output.txt.gz");
const readableStreams = Deno.stdin.readable
    .pipeThrough(new TransformStream({
    async transform(chunk, controller) {
        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(chunk);
        if (text.indexOf("p") !== -1) {
            await output.writable.abort();
            await writeFileStream.abort();
            // await readableStreams[0].cancel()
            // await readableStreams[1].cancel()
        }
        controller.enqueue(chunk);
    }
}))
    .pipeThrough(new CompressionStream("gzip"))
    .tee();
await readableStreams[0]
    .pipeTo(output.writable);
let writeFileStream = new WritableStream({
    write(value) {
        console.log((new TextDecoder()).decode(value));
        console.log(Array.from(value).join());
    }
});
await readableStreams[1]
    .pipeTo(writeFileStream);
console.log(1234);
