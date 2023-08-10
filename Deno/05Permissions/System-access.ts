/*
* deno run --allow-sys=systemMemoryInfo System-access.ts
*/
(function () {
    console.log(Deno.systemMemoryInfo())
})();