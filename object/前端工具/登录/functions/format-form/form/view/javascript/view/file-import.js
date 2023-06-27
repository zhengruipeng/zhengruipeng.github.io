    import {MyApp} from "../../../../../../public/config.js"
import {notify} from "./notification.js";
import {io} from "../view/output-info-into-panel.js";

document.addEventListener("DOMContentLoaded",function main(){

    MyApp.customEvent.addListener("tableinit",function () {
        console.log(6);

        const asideDisplay = document.querySelector("#aside-display");
        const informationForm = document.querySelector("#aside-container>ul.information-form");
        const menu = document.querySelector(".menu");


        const fileImportBtn = document.createElement("li");
        fileImportBtn.id = "file-import";
        fileImportBtn.className = "menu-item";
        fileImportBtn.innerText = "批量导入";

        menu.appendChild(fileImportBtn);



        let dataArr = null;

        let initTableWith2dArr = function (arr2d){
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");
            table.appendChild(tbody);
            let fragment = document.createDocumentFragment();
            arr2d.forEach(row => {
                let tr = document.createElement("tr");
                row.forEach(col => {
                    let td = document.createElement("td");
                    td.innerHTML = col;
                    tr.appendChild(td);
                })
                fragment.appendChild(tr);
            });
            tbody.appendChild(fragment);
            return table;
        };
        fileImportBtn.onclick = function (){
            informationForm.innerHTML = "";
            informationForm.classList.remove("information-form-close");
            informationForm.classList.add("information-form-open");
            menu.classList.remove("menu-open");
            menu.classList.add("menu-close");


            let fileContainer = document.createElement("li");
            fileContainer.classList.add("information-form-item");
            fileContainer.style.boxShadow = "0 0 10px var(--border-color)";
            fileContainer.style.gridRow = "1 /span 5";
            fileContainer.innerHTML = "" +
                "将数据文件导入到此处<br />" +
                "文件类型是.txt<br />" +
                "数据格式是：<br />" +
                "001 张三 男 计算机<br />" +
                "002 李四 女 软件<br />";
            informationForm.appendChild(fileContainer);
            fileContainer.ondragenter = function (){};
            fileContainer.ondragleave = function (){};
            fileContainer.ondragover = function (e){
                e.preventDefault();
            }
            fileContainer.ondrop = function (ev){
                ev.preventDefault();
                let files = Array.from(ev.dataTransfer.files);
                files.forEach(async file => {
                    let {type,name} = file;
                    if(type !== "text/plain")return false;
                    let content = await new Response(file).text();
                    let contentList = content.split(/[\r\n]+/);

                    contentList = contentList.map(row => {
                        return row.split(/[,]+/);
                    });
                    console.log(contentList);
                    let table = initTableWith2dArr(contentList);

                    asideDisplay.innerHTML = "";
                    asideDisplay.appendChild(table);
                    asideDisplay.classList.remove("aside-display-close");
                    asideDisplay.classList.add("aside-display-open");

                    dataArr = contentList;
                })

            };

            let cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "cancel";
            cancelBtn.classList.add("information-form-item");
            cancelBtn.style.cursor = "pointer";
            informationForm.appendChild(cancelBtn);
            cancelBtn.onclick = function (){
                informationForm.classList.add("information-form-close");
                informationForm.classList.remove("information-form-open");
                menu.classList.add("menu-open");
                menu.classList.remove("menu-close");
                asideDisplay.classList.remove("aside-display-open");
                asideDisplay.classList.add("aside-display-close");
            };

            let submitBtn = document.createElement("button");
            submitBtn.innerHTML = "submit";
            submitBtn.classList.add("information-form-item");
            submitBtn.style.cursor = "pointer";
            informationForm.appendChild(submitBtn);
            submitBtn.onclick = async function (){
                let res = await notify.confirm("确定信息无误后点击确认");
                if(!res)return false;
                // console.log(MyApp.eventFunctions.addStudent.toString());

                let params = [];

                dataArr.forEach(row => {
                    let param = {}
                    MyApp.tableCols.forEach((col,index) => {
                        param[col] = row[index] !== ""?row[index]:"0";
                    })
                    params.push(param);
                });
                console.log(params);

                //将所有参数依次添加至数据库，并用数组记录值和是否成功
                let errors = [];
                params.forEach(param => {
                    let done = MyApp.eventFunctions.addStudent("../../"+MyApp.handlePage, param);
                    errors.push({done,value:param});
                });

                //将所有有错误的输出
                errors.forEach(({done,value}) => {
                    if(done){
                        MyApp.eventFunctions.insertTr(value);
                        return false;
                    }
                    console.log("以下内容发送失败");
                    console.log(value)
                });

                
                cancelBtn.click();
            };


        }


    });
})