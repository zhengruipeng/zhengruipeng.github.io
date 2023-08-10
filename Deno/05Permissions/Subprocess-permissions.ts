(function () {
    const proc = Deno.run({ cmd: ["whoami"] });
})();
// deno run --allow-run=whoami Subprocess-permissions.ts