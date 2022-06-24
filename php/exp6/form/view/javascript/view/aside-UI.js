import {MyApp} from "../config/config.js";
import {Student} from "../model/Student.js";
import {IndexedDBCurd} from "../config/indexedDB-curd.js";
import {notify} from "./notification.js";
import {io} from "./output-info-into-panel.js";

document.addEventListener("DOMContentLoaded",function (){

    let initTrWithStudentInfo = function (student){
        let tr = document.createElement("tr");

        for(let name in student){
            let td = document.createElement("td");
            if(name === "constructor")continue;

            if(name !== "operation"){
                td.appendChild((typeof student[name] === "string")?
                    document.createTextNode(student[name]):
                    student[name]);
                td.className = name;
                tr.appendChild(td);
            }else{
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

    MyApp.customEvent.addListener("tableinit",function () {
        console.log(5);

        const table = document.querySelector("table");
        const tbody = table.querySelector("tbody");
        const asideLogoBtn = document.querySelector("#aside-logo");
        const deleteSelectedBtn = document.querySelector("#delete-selected");
        const addStudentBtn = document.querySelector("#add-student");
        const selectAllBtn = document.querySelector("#select-all");
        const aside = document.querySelector("aside");
        const menu = document.querySelector(".menu");
        const informationForm = document.querySelector(".information-form");
        const main = document.querySelector("main");

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
        deleteSelectedBtn.onclick = function () {
            let rows = Array.from(table.rows);
            rows.forEach((row, index) => {
                if (index === 0) return false;
                let selectedCell = row.cells[0];
                let deleteBtnInRow = row.querySelector(".delete");
                let selectedSpan = selectedCell.querySelector("span");
                let ifSelected = selectedSpan.classList.contains("select-justify-ensure");
                if (ifSelected) {
                    deleteBtnInRow.click();
                }
            });
        };
        addStudentBtn.onclick = function () {
            informationForm.classList.remove("information-form-close");
            informationForm.classList.add("information-form-open");
            menu.classList.remove("menu-open");
            menu.classList.add("menu-close");

            informationForm.innerHTML = "";
            MyApp.tableCols.forEach(col => {
                let input = document.createElement("input");
                input.classList.add("information-form-item");
                input.classList.add(col);
                input.required = true;
                informationForm.appendChild(input);

            })

            let cancelBtn = document.createElement("button");
            let submitBtn = document.createElement("button");
            cancelBtn.innerHTML = "取消";
            submitBtn.innerHTML = "确定";
            cancelBtn.onclick = function () {
                informationForm.classList.remove("information-form-open");
                informationForm.classList.add("information-form-close");
                menu.classList.remove("menu-close");
                menu.classList.add("menu-open");
            };
            submitBtn.onclick = function () {
                let redIfEmpty = function () {
                    if (!this.value) {
                        this.style.boxShadow = "0 0 10px red";
                    } else {
                        this.style.boxShadow = "";
                    }
                }
                let httpReq = function (toURL,/* id, name, age, sdept*/params) {
                    let setupInputElement = function (name, value) {
                        const input = document.createElement("input");
                        input.name = name;
                        input.value = value;
                        input.type = "text";
                        return input;
                    };
                    let htmlFormElement = document.createElement("form");
                    for (let name in params){
                        htmlFormElement.appendChild(setupInputElement(name, params[name]));
                    }

                    htmlFormElement.appendChild(setupInputElement("operation-type", "insert"));
                    htmlFormElement.appendChild(setupInputElement("table-name",MyApp.table));
                    htmlFormElement.appendChild(setupInputElement("table-cols",MyApp.tableCols.join(',')));

                    let formData = new FormData(htmlFormElement);
                    let res = true;

                    fetch(toURL, {
                        body: formData,
                        method: "post"
                    })
                        .then(response => response.text())
                    /*    .then(text => {
                            alert(text);
                            return new Promise(resolve => resolve(text));
                        })*/
                        .then(text => {
                            io.println(text);
                            return new Promise(resolve => resolve(text));
                        })
                        .then(text => {
                            notify.println("添加操作");
                            notify.print(text);
                            return new Promise(resolve => resolve(text));
                        })
                        .then(text => {
                            IndexedDBCurd.insert(params);
                            return new Promise(resolve => resolve(text));
                        })
                        .catch(err => {
                            res = false;
                            alert("php环境配置错误" + err.message);
                            console.log(err);
                        });
                    return res;

                };
                let idHasExist = function (id){
                    let idTds = Array.from(tbody.querySelectorAll("."+MyApp.tableCols[0]));
                    let idArr = idTds.map(idTd => idTd.innerText);
                    return idArr.indexOf(id) !== -1;
                };
                let params = {};

                //判断是否有空项
                MyApp.tableCols.forEach(col => {
                    let input = informationForm.querySelector("."+col);
                    redIfEmpty.call(input);
                    if (!input.value) params["error"] = true;
                    params[col] = input.value;
                });
                if( params["error"])return false;

                //判断id是不是已经存在
                let idInput = informationForm.querySelector("."+MyApp.tableCols[0]);
                if(idHasExist(idInput.value)){
                    notify.println("id重复");
                    return false;

                }

                console.log(params);

                let isHttpSuccess = httpReq("../control/set-info.php", params);
                if (!isHttpSuccess) {
                    notify.print("添加操作失败");
                    return false;
                }

                let student = new Student();

                for (let name in params){
                    student[name] = params[name];
                }

                MyApp.data.students.push(student);

                let tr = initTrWithStudentInfo(student);
                tbody.appendChild(tr);

                tr.style.height = tr.getBoundingClientRect().height + "px";
                tr.onclick = MyApp.eventFunctions.selected;

                let updateBtn = tr.querySelector(".update");
                let removeBtn = tr.querySelector(".delete");
                updateBtn.onclick = MyApp.eventFunctions.update;
                removeBtn.onclick = function (ev) {
                    MyApp.eventFunctions.update.call(this, ev);
                };
                Array.from(tr.cells).forEach(cell => {
                    cell.onmousemove = MyApp.eventFunctions.tdMouseMove;
                    cell.ondblclick = MyApp.eventFunctions.tdDblClick;
                })
                tr.scrollIntoView({behavior: "smooth"});
                // tr.className = "tr-selected";
                MyApp.eventFunctions.selected.call(tr, null);
                asideLogoBtn.click();
            }
            informationForm.appendChild(cancelBtn);
            informationForm.appendChild(submitBtn);
        };
        asideLogoBtn.onmouseover = function () {
            if (aside.classList.contains("aside-close")) {
                this.style.transform = "translate(10px,0)";
            }
        };
        asideLogoBtn.onmouseout = function () {
            this.style.transform = "";
        };
        selectAllBtn.onclick = function () {
            if (this.dataset.select === "none") {
                this.dataset.select = "all";
                this.innerHTML = "全不选";
                Array.from(tbody.rows).forEach(tr => {
                    let selectedSpan = tr.cells[0].querySelector("span");
                    selectedSpan.classList.add("select-justify-ensure");
                })
            } else if (this.dataset.select === "all") {
                this.dataset.select = "none";
                this.innerHTML = "全选";
                Array.from(tbody.rows).forEach(tr => {
                    let selectedSpan = tr.cells[0].querySelector("span");
                    selectedSpan.classList.remove("select-justify-ensure");
                })
            }
            asideLogoBtn.click();


        };
    });
})