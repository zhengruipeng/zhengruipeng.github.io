import {MyApp} from "../../../../../../public/config.js";
document.addEventListener("DOMContentLoaded",async function (){
    // alert(MyApp.table);
    fetch("../control/get-info.jsp?table="+MyApp.table)
        .then(response => response.text())
        .then(text => {
            let script = document.createElement("script");
            script.type = "module";
            script.innerHTML = text;
            // script.innerHTML += ";console.log('ccc')";
            document.body.appendChild(script);
        });
})