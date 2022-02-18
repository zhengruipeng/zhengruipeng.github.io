(function (){
    let request = new Request("./shader/vertex-shader1");
    fetch(request).then( response => response.text()).then(responseText => {
        console.log(responseText);
        globalVar.threeD.shaders.push([]);
        globalVar.threeD.shaders[0][0] = responseText;
    });
    request = new Request("./shader/fragment-shader1");
    fetch(request).then( response => response.text()).then(responseText => {
        console.log(responseText);
        globalVar.threeD.shaders[0][1] = responseText;
    });

})();