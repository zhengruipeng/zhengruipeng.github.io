document.addEventListener("DOMContentLoaded",async function (){
    fetch("./php-processing/get-info.php")
        .then(response => response.text())
        .then(text => {
            let script = document.createElement("script");
            script.type = "module";
            script.innerHTML = text;
            // script.innerHTML += ";console.log('ccc')";
            document.body.appendChild(script);
        });
})