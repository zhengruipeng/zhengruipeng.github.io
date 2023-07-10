(async function () {
    const filenames = Deno.args;
    for (const filename of filenames) {
        const file = await Deno.open(filename);
        await file.readable.pipeTo(Deno.stdout.writable, {preventClose: true});
    }
})();

/*
* Again, here, we need to give –allow-read access to the program.
*
* Try the program:
*
* # macOS / Linux
* deno run --allow-read https://deno.land/std@0.193.0/examples/cat.ts /etc/hosts
*
* # Windows
* deno run --allow-read https://deno.land/std@0.193.0/examples/cat.ts "C:\Windows\System32\Drivers\etc\hosts"
*
* */