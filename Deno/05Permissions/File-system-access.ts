(async function () {
    const textDecoder: TextDecoder = new TextDecoder();
    const file: Uint8Array = Deno.readFileSync("./Network-access.ts");
    console.log(textDecoder.decode(file))

    const textEncoder: TextEncoder = new TextEncoder();
    const text = "console.log('hello world')";
    await Deno.writeFile("./File-system-access-output.ts", textEncoder.encode(text));

    console.log(Deno.execPath());

    const command = new Deno.Command(Deno.execPath(), {
        args: [
            "eval",
            "console.log('Hello World')",
        ],
        stdin: "piped",
        stdout: "piped",
    });
    const child: ChildProcess = command.spawn();

    // open a file and pipe the subprocess output to it.
    child.stdout.pipeTo(
        Deno.openSync("output", {write: true, create: true}).writable,
    );

    // manually close stdin
    child.stdin.close();
    const status = await child.status;

    console.log(status)
})();
/*
* deno run --allow-read=../05Permissions File-system-access.ts
* deno run --allow-write=../05Permissions File-system-access.ts
* */