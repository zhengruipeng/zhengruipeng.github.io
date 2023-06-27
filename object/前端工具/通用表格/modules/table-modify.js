import {LocationMap} from "../libs/LocationMap.js";

document.addEventListener("DOMContentLoaded", function main() {
    const modifyBtn = Array.from(document.querySelectorAll(".modify-button"));

    let locationMap = new LocationMap(location);
    let searchMap = locationMap.getSearchMap();

    let createInput = function (name, value) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = name;
        input.value = value;
        return input;
    }
    modifyBtn.forEach(btn => {
        btn.onclick = function () {
            let tr = btn.parentElement;
            let em_id = tr.querySelector(".em_id").innerText;
            let em_name = tr.querySelector(".em_name").innerText;
            let em_sex = tr.querySelector(".em_sex").innerText;


            let formData = new FormData();
            formData.append("id", em_id);
            formData.append("name", em_name);
            formData.append("sex", em_sex);

            fetch(new Request("url", {
                method: "post",
            })).then(response => response.text())
                .then(text => {
                    if (text === "OK") {
                        alert("修改成功");
                    }
                })

        };
    })

})