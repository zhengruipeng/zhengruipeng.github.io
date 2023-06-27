import {LocationMap} from "../libs/LocationMap.js";

document.addEventListener("DOMContentLoaded", function main() {
    const deleteBtn = Array.from(document.querySelectorAll("#delete-all"))[0];
    const tbody = document.querySelector("table>tbody");

    let locationMap = new LocationMap(location);
    let searchMap = locationMap.getSearchMap();

    deleteBtn.onclick = function () {
        console.log("deleteBtn");
        let deleteTrs = [];
        Array.from(tbody.rows).forEach(tr => {
            console.log(tr);
            let selectedSpan = tr.querySelector("span.select-justify");
            if (selectedSpan.classList.contains("select-justify-ensure")) {
                let em_id = tr.querySelector(".em_id").innerText;
                deleteTrs.push(em_id)
            }
        });

        //alert("要删除的ID有: "+deleteTrs.join());
        fetch(new Request("url?deleteItemsId=" + deleteTrs.join(), {
            method: "get",
        })).then(response => response.text())
            .then(text => {
                if (text === "OK") {
                    alert("删除成功");
                }
            })
    };


})