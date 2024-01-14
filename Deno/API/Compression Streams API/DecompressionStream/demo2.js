const outputgz = await Deno.open("../output.txt.gz");
const output = await Deno.create("../output.txt");
(async function () {
    let readableStream = await outputgz.readable
        .pipeThrough(new DecompressionStream("gzip"));
    let [t1, t2] = readableStream.tee();
    await t2.pipeTo(output.writable).catch();
    await t1.pipeTo(Deno.stdout.writable).catch();
})();
