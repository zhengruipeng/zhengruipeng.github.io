console.log(123);
(_ => {
    let touppercase = Module.wrap("touppercase","string",['string']);
    console.log(touppercase("asdf"));

})();