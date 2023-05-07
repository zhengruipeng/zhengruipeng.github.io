import {MyApp} from "./config.js";

document.addEventListener("DOMContentLoaded",function (){
    const tbody = this.querySelector("table>tbody");
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
        let score = tr.children[4].innerHTML;
        let htmlFormElement = document.createElement("form");
        htmlFormElement.appendChild(setupInputElement("id",id));
        htmlFormElement.appendChild(setupInputElement("name",name));
        htmlFormElement.appendChild(setupInputElement("age",age));
        htmlFormElement.appendChild(setupInputElement("score",score));
        htmlFormElement.appendChild(setupInputElement("operation-type",type));
        let formData = new FormData(htmlFormElement);
        let data = {id,name,age,score};
        fetch("./process.php",{
            body:formData,
            method:"post"
        }).then(response => response.text())
            .then(alert)
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
    tbody.childNodes.forEach(function (tr){
        tr.onclick = selected;
    });
    tbody.querySelectorAll(".update").forEach(function (button){
        button.onclick = update;
    });
    tbody.querySelectorAll(".delete").forEach(function (button){
        button.onclick = function (ev){
            update.call(this,ev);
        };
    });
    MyApp.eventFunctions.update = update;
    MyApp.eventFunctions.deleteItem = deleteItem;
    MyApp.eventFunctions.selected = selected;
})