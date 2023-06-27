import {MyApp} from "../../../../../../public/config.js"

document.addEventListener("DOMContentLoaded",function () {

    let initTrWithStudentInfo = function (student) {
        let tr = document.createElement("tr");

        for (let name in student) {
            let td = document.createElement("td");
            if (name === "constructor") continue;

            if (name !== "operation") {
                td.appendChild((typeof student[name] === "string") ?
                    document.createTextNode(student[name]) :
                    student[name]);
                td.className = name;
                tr.appendChild(td);
            } else {
                let td2 = document.createElement("td");

                td.appendChild(student.operation[0]);
                td2.appendChild(student.operation[1]);

                td.className = name;
                td2.className = name;

                tr.appendChild(td);
                tr.appendChild(td2);
                continue;
            }

        }

        return tr;

    };

    MyApp.customEvent.addListener("tableinit", function () {
        console.log(11);

        const asideLogoBtn = document.querySelector("#aside-logo");
        const aside = document.querySelector("aside");
        const main = document.querySelector("main");

        asideLogoBtn.onmouseover = function () {
            if (aside.classList.contains("aside-close")) {
                this.style.transform = "translate(10px,0)";
            }
        };
        asideLogoBtn.onmouseout = function () {
            this.style.transform = "";
        };
        asideLogoBtn.onclick = function () {
            this.onmouseout.call(this, null);
            if (MyApp.asideMode) {
                MyApp.asideMode = false;
                asideLogoBtn.className = "aside-logo-close";
                aside.className = "aside-close";
                main.style.filter = "blur(0)";
            } else {
                MyApp.asideMode = true;
                asideLogoBtn.className = "aside-logo-open";
                aside.className = "aside-open";
                main.style.filter = "blur(10px)";
            }
        };

    });
});