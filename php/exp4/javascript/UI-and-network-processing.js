import {MyApp} from "./config.js";
import {io} from "./output-info-into-panel.js";
import {notify} from "./notification.js";
import {IndexedDBCurd} from "./indexedDB-curd.js";
document.addEventListener("DOMContentLoaded",function (){
    let selected = function (){
        let tbody = this.parentNode;
        for(let i = 0;i<tbody.children.length;i++){
            tbody.children[i].classList.remove("tr-selected");
        }
        this.classList.add("tr-selected");
    };
    let update = function (ev){
        ev.preventDefault();
        let setupInputElement = function (name,value){
            const input = document.createElement("input");
            input.name = name;
            input.value = value;
            input.type = "text";
            return input;
        };
        let haveEditingDiv = function (td){
            for(let i = 0;i<td.children.length;i++){
                if(td.children[i].tagName === 'DIV'){
                    td.innerHTML = td.children[i].innerHTML;
                    return true;
                }
            }
            return false;

        };
        let type = this.classList.contains("update")?"update":"";
        type = this.classList.contains("delete")?"delete":type;
        let tr = this.parentNode.parentNode;
        haveEditingDiv(tr.children[1]);
        haveEditingDiv(tr.children[2]);
        haveEditingDiv(tr.children[3]);
        haveEditingDiv(tr.children[4]);
        let id = tr.children[1].innerHTML;
        let name = tr.children[2].innerHTML;
        let age = tr.children[3].innerHTML;
        let dept = tr.children[4].innerHTML;
        let htmlFormElement = document.createElement("form");
        htmlFormElement.appendChild(setupInputElement("id",id));
        htmlFormElement.appendChild(setupInputElement("sname",name));
        htmlFormElement.appendChild(setupInputElement("sage",age));
        htmlFormElement.appendChild(setupInputElement("sdept",dept));
        htmlFormElement.appendChild(setupInputElement("operation-type",type));
        let formData = new FormData(htmlFormElement);
        let data = {id,name,age,dept};
        if(type === "update"){
            IndexedDBCurd.update({id,sname:name,sage:age,sdept:dept});
        }else if(type === "delete"){
            IndexedDBCurd.delete(id);
        }
        fetch("./php-processing/set-info.php",{
            body:formData,
            method:"post"
        })
            .then(response => response.text())
            /*.then(text => {
                alert(text);
                return new Promise(resolve => resolve(text));
            })*/
            .then(text => {
                io.println(text);
                return new Promise(resolve => resolve(text));
            })
            .then(text => {
                notify.println(type === "update"?"修改操作":"删除操作");
                notify.print(text);
                return new Promise(resolve => resolve(text));
            })
            .then(function (){if(type === "delete")deleteItem.call(tr);})
            .catch(err => {
                alert("php环境配置错误"+err.message);
                console.log(err);
            });
    };
    let deleteItem = function (){
        let originHeight = this.getBoundingClientRect().height;

        this.style.transitionDuration = "0";
        this.style.height = originHeight + "px";
        for(let i = 0;i<this.children.length;i++){
            this.children[i].innerHTML = "";
        }
        this.style.transitionDuration = ".3s";

        let that = this;
        setTimeout(function (){
            that.style.height = 0 + "px";
            that.style.padding = 0 + "px";
            for(let i = 0;i<that.children.length;i++){
                that.children[i].style.padding = "0";
            }
            that.ontransitionend = function (){
                try{
                    this.parentNode.removeChild(this);
                }catch (e) {
                    
                }
            }
        },0);
    };

    MyApp.customEvent.addListener("tableinit",function () {
        console.log(2);

        const tbody = document.querySelector("table>tbody");

        tbody.childNodes.forEach(function (tr) {
            tr.onclick = selected;
        });
        tbody.querySelectorAll(".update").forEach(function (button) {
            button.onclick = update;
        });
        tbody.querySelectorAll(".delete").forEach(function (button) {
            button.onclick = function (ev) {
                update.call(this, ev);
            };
        });
        MyApp.eventFunctions.update = update;
        MyApp.eventFunctions.deleteItem = deleteItem;
        MyApp.eventFunctions.selected = selected;
    });
})