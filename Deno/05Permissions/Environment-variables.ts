(function () {
    let home = Deno.env.get("HOME");
    let path = Deno.env.get("PATH");
    console.log("home", home);
    console.log("path", path.split(";"));
})();
/*
* deno run --allow-env Environment-variables.ts
* */