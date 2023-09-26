await Deno.stdin.readable
    // .pipeThrough(new CompressionStream("gzip"))
    .pipeTo(Deno.stdout.writable);