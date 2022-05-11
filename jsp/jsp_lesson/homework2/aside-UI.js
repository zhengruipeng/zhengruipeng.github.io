import {MyApp} from "./config.js";
import {Student} from "./Student.js";
document.addEventListener("DOMContentLoaded",function (){
    const table = this.querySelector("table");
    const tbody = table.querySelector("tbody");
    const asideLogoBtn = this.querySelector("#aside-logo");
    const deleteSelectedBtn = this.querySelector("#delete-selected");
    const addStudentBtn = this.querySelector("#add-student");
    const selectAllBtn = this.querySelector("#select-all");
    const aside = this.querySelector("aside");
    const menu = this.querySelector(".menu");
    const informationForm = this.querySelector(".information-form");
    const main = this.querySelector("main");
    let initTrWithStudentInfo = function (student){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        td1.appendChild(student.selected);
        td2.appendChild(document.createTextNode(student.id));
        td3.appendChild(document.createTextNode(student.name));
        td4.appendChild(document.createTextNode(student.age));
        td5.appendChild(document.createTextNode(student.score));
        td6.appendChild(student.operation[0]);
        td7.appendChild(student.operation[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);


        return tr;

    };


    asideLogoBtn.onclick = function (){
        this.onmouseout.call(this,null);
        if(MyApp.asideMode){
            MyApp.asideMode = false;
            asideLogoBtn.className = "aside-logo-close";
            aside.className = "aside-close";
            main.style.filter = "blur(0)";
        }else {
            MyApp.asideMode = true;
            asideLogoBtn.className = "aside-logo-open";
            aside.className = "aside-open";
            main.style.filter = "blur(10px)";
        }
    };
    deleteSelectedBtn.onclick = function (){
        let rows = Array.from(table.rows);
        rows.forEach((row,index) => {
            if(index === 0)return false;
            let selectedCell = row.cells[0];
            let deleteBtnInRow = row.cells[6].children[0];
            let selectedSpan = selectedCell.children[0];
            let ifSelected = selectedSpan.classList.contains("select-justify-ensure");
            if(ifSelected){
                deleteBtnInRow.click();
            }
        });
    };
    addStudentBtn.onclick = function (){
        informationForm.classList.remove("information-form-close");
        informationForm.classList.add("information-form-open");
        menu.classList.remove("menu-open");
        menu.classList.add("menu-close");
        let idInput = document.createElement("input");
        let nameInput = document.createElement("input");
        let ageInput = document.createElement("input");
        let scoreInput = document.createElement("input");

        idInput.className = "information-form-item";
        nameInput.className = "information-form-item";
        ageInput.className = "information-form-item";
        scoreInput.className = "information-form-item";

        idInput.required = true;
        nameInput.required = true;
        ageInput.required = true;
        scoreInput.required = true;

        informationForm.innerHTML = "";
        informationForm.appendChild(idInput);
        informationForm.appendChild(nameInput);
        informationForm.appendChild(ageInput);
        informationForm.appendChild(scoreInput);

        let cancelBtn = document.createElement("button");
        let submitBtn = document.createElement("button");
        cancelBtn.innerHTML = "取消";
        submitBtn.innerHTML = "确定";
        cancelBtn.onclick = function (){
            informationForm.classList.remove("information-form-open");
            informationForm.classList.add("information-form-close");
            menu.classList.remove("menu-close");
            menu.classList.add("menu-open");
        };
        submitBtn.onclick = function (){
            let redIfEmpty = function (){
                if(!this.value){
                    this.style.boxShadow = "0 0 10px red";
                }else{
                    this.style.boxShadow = "";
                }
            }
            let httpReq = function (toURL,id,name,age,score){
                let setupInputElement = function (name,value){
                    const input = document.createElement("input");
                    input.name = name;
                    input.value = value;
                    input.type = "text";
                    return input;
                };
                let htmlFormElement = document.createElement("form");
                htmlFormElement.appendChild(setupInputElement("id",id));
                htmlFormElement.appendChild(setupInputElement("name",name));
                htmlFormElement.appendChild(setupInputElement("age",age));
                htmlFormElement.appendChild(setupInputElement("score",score));
                htmlFormElement.appendChild(setupInputElement("operation-type","create"));
                let formData = new FormData(htmlFormElement);
                let res = true;
                fetch(toURL,{
                    body:formData,
                    method:"post"
                }).then(response => response.text())
                    .then(alert)
                    .catch(err => {
                        res = false;
                        alert("php环境配置错误"+err.message);
                        console.log(err);
                    });
                return res;

            };

            let id = idInput.value;
            let name = nameInput.value;
            let age = ageInput.value;
            let score = scoreInput.value;
            redIfEmpty.call(idInput);
            redIfEmpty.call(nameInput);
            redIfEmpty.call(ageInput);
            redIfEmpty.call(scoreInput);
            if(!id || !name || !age || !score)return false;

            let isHttpSuccess = httpReq("./process.php",id,name,age,score);
            if(!isHttpSuccess){
                alert("添加操作失败");
            }

            let student = new Student(id,name,age,score);
            MyApp.data.students.push(student)
            let tr = initTrWithStudentInfo(student);
            tbody.appendChild(tr);

            tr.style.height = tr.getBoundingClientRect().height+"px";
            tr.onclick  = MyApp.eventFunctions.selected;

            let updateBtn = tr.cells[5].children[0];
            let removeBtn = tr.cells[6].children[0];
            updateBtn.onclick = MyApp.eventFunctions.update;
            removeBtn.onclick = function (ev){
                MyApp.eventFunctions.update.call(this,ev);
            };
            Array.from(tr.cells).forEach(cell => {
                cell.onmousemove = MyApp.eventFunctions.tdMouseMove;
                cell.ondblclick = MyApp.eventFunctions.tdDblClick;
            })
            tr.scrollIntoView({behavior:"smooth"});
            // tr.className = "tr-selected";
            MyApp.eventFunctions.selected.call(tr,null);
            asideLogoBtn.click();
        }
        informationForm.appendChild(cancelBtn);
        informationForm.appendChild(submitBtn);
    };
    asideLogoBtn.onmouseover = function (){
        if(aside.classList.contains("aside-close")){
            this.style.left = "4%";
        }
    };
    asideLogoBtn.onmouseout = function (){
        this.style.left = "";
    };
    selectAllBtn.onclick = function (){
        if(this.dataset.select === "none"){
            this.dataset.select = "all";
            this.innerHTML = "全不选";
            Array.from(tbody.rows).forEach(tr => {
                let selectedSpan = tr.cells[0].children[0];
                selectedSpan.classList.add("select-justify-ensure");
            })
        }else if(this.dataset.select === "all"){
            this.dataset.select = "none";
            this.innerHTML = "全选";
            Array.from(tbody.rows).forEach(tr => {
                let selectedSpan = tr.cells[0].children[0];
                selectedSpan.classList.remove("select-justify-ensure");
            })
        }
        asideLogoBtn.click();


    };
})