import {MyApp} from "../../../../../../public/config.js"
import {Student} from "../model/Student.js";
import {IndexedDBCurd} from "../../../../../../public/indexedDB-curd.js";
import {notify} from "./notification.js";
import {io} from "./output-info-into-panel.js";
import {dataUpdateMonologWriter} from "../monolog/dataUpdateMonologWriter.js";
import {initPages,changePage,pageParams} from "./lay-page.js";

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
        // const  = document.querySelector("#select-all");
        const aside = document.querySelector("aside");
        const menu = document.querySelector(".menu");
        const informationForm = document.querySelector(".information-form");
        const main = document.querySelector("main");
        const nextBtn = document.getElementById("next-page");

        /*
        * <li class="menu-item" id="delete-selected">删除所有选中</li>
            <li class="menu-item" id="add-student">添加信息</li>
            <li class="menu-item" id="select-all" data-select="none">反选</li>
        * */

        //添加信息摁扭
        const addStudentBtn = document.createElement("li");
        addStudentBtn.id = "add-student";
        addStudentBtn.className = "menu-item";
        addStudentBtn.innerText = "添加信息"

        //删除所有选中摁扭
        const deleteSelectedBtn = document.createElement("li");
        deleteSelectedBtn.id = "delete-selected";
        deleteSelectedBtn.className = "menu-item";
        deleteSelectedBtn.innerText = "删除所有选中";

        //反选摁扭
        const selectAllBtn = document.createElement("li");
        selectAllBtn.id = "select-all";
        selectAllBtn.className = "menu-item";
        selectAllBtn.dataset.select = "none";
        selectAllBtn.innerText = "反选";


        menu.appendChild(addStudentBtn);
        menu.appendChild(deleteSelectedBtn);
        menu.appendChild(selectAllBtn);


        let addStudent = function (toURL,/* id, name, age, sdept*/params) {
            let setupInputElement = function (name, value) {
                const input = document.createElement("input");
                input.name = name;
                input.value = value;
                input.type = "text";
                return input;
            };
            let idHasExist = function (id){
                let idTds = Array.from(tbody.querySelectorAll("."+MyApp.tableCols[0]));
                let idArr = idTds.map(idTd => idTd.innerText);
                return idArr.indexOf(id) !== -1;
            };

            //判断id是不是已经存在
            let idInput = params[MyApp.tableKey];
            if(idHasExist(idInput)){
                notify.println("id重复");
                io.println("id="+idInput+"重复");
                return false;
            }


            let htmlFormElement = document.createElement("form");
            for (let name in params){
                htmlFormElement.appendChild(setupInputElement(name, params[name]));
            }

            htmlFormElement.appendChild(setupInputElement("operation-type", "insert"));
            htmlFormElement.appendChild(setupInputElement("table-name",MyApp.table));
            htmlFormElement.appendChild(setupInputElement("table-cols",MyApp.tableCols.join(',')));

            let formData = new FormData(htmlFormElement);
            let res = true;

            dataUpdateMonologWriter.write("insert",
                formData.get(MyApp.tableKey),
                MyApp.table,
                {...params,
                    "operation-type":formData.get("operation-type"),
                    "table-name":formData.get("table-name"),
                    "table-cols":formData.get("table-cols"),
                });

            fetch2(toURL, {
                body: formData,
                method: "post",
                headers:new Headers({
                    "content-type":"application/x-www-form-urlencoded",
                })
            })
                .then(response => response.text())
                /*    .then(text => {
                        alert(text);
                        return new Promise(resolve => resolve(text));
                    })*/
                .then(text => {
                    io.println(text+"行受到影响");
                    return new Promise(resolve => resolve(text));
                })
                .then(text => {
                    notify.println("添加操作");
                    notify.print(text+"行受到影响");
                    return new Promise(resolve => resolve(text));
                })
                .then(text => {
                    IndexedDBCurd.insert(params);
                    return new Promise(resolve => resolve(text));
                })
                .catch(err => {
                    res = false;
                    alert("jsp环境配置错误" + err.message);
                    console.log(err);
                });
            return res;

        };
        let insertTr = function (params){
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

            return tr;
        };

        //删除所有选中
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
        //反选
        selectAllBtn.onclick = function () {
            Array.from(tbody.rows).forEach(tr => {
                let selectedSpan = tr.cells[0].querySelector("span");
                if(selectedSpan.classList.contains("select-justify-ensure"))
                    selectedSpan.classList.remove("select-justify-ensure");
                else
                    selectedSpan.classList.add("select-justify-ensure");
            })
            asideLogoBtn.click();
        };
        //添加学生
        addStudentBtn.onclick = function () {
            //打开学生信息填写栏
            informationForm.classList.remove("information-form-close");
            informationForm.classList.add("information-form-open");
            menu.classList.remove("menu-open");
            menu.classList.add("menu-close");

            //动态创建填写的input元素过程
            informationForm.innerHTML = "";
            MyApp.tableCols.forEach(col => {
                let input = document.createElement("input");
                input.classList.add("information-form-item");
                input.classList.add(col);
                input.required = true;
                input.placeholder = col;
                informationForm.appendChild(input);

            })

            //动态创建提交和取消摁扭
            let cancelBtn = document.createElement("button");
            let submitBtn = document.createElement("button");
            cancelBtn.classList.add("information-form-item");
            submitBtn.classList.add("information-form-item");
            cancelBtn.style.cursor = "pointer";
            submitBtn.style.cursor = "pointer";
            cancelBtn.innerHTML = "取消";
            submitBtn.innerHTML = "确定";
            //点击取消则是关闭填写表单
            cancelBtn.onclick = function () {
                informationForm.classList.remove("information-form-open");
                informationForm.classList.add("information-form-close");
                menu.classList.remove("menu-close");
                menu.classList.add("menu-open");
            };
            //点击提交
            submitBtn.onclick = function () {
                let redIfEmpty = function () {
                    if (!this.value) {
                        this.style.boxShadow = "0 0 10px red";
                    } else {
                        this.style.boxShadow = "";
                    }
                }
                let httpReq = addStudent;
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
                // console.log(params);
                //发送网络请求
                let isHttpSuccess = httpReq("../../"+MyApp.handlePage, params);
                if (!isHttpSuccess) {
                    notify.print("添加操作失败");
                    return false;
                }

                //先跳转至最后一页
                for(let i = 0;i<pageParams.maxPage;i++){
                    nextBtn.click();
                }

                //动态创建表格的过程
                let tr = insertTr(params);

                //重新组织分页
                initPages(pageParams.itemsInOnePage,tr);
            }
            informationForm.appendChild(cancelBtn);
            informationForm.appendChild(submitBtn);
        };


        MyApp.eventFunctions.addStudent = addStudent;
        MyApp.eventFunctions.insertTr = insertTr;

    });
})