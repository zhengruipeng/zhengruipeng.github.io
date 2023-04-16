import {parseMap} from "./ParseMap.js"
import {isInAccessSuffix} from "./accessSuffix.js"

let CheckFilesEvent = class extends Object{
    cover = null;
    getAllParentElement = function (ele,tagName){
        let res = [ele];
        if(ele.parentElement.tagName === tagName){
            res = res.concat(this.getAllParentElement(ele.parentElement,tagName));
        }
        return res;
    }

    compareArr = function (arr1,arr2){
        let res = [];
        for(let value of arr1){
            // if(!arr2.includes(value))res.push(value);
            if(isInAccessSuffix(value)){
                value = value.substring(0,value.lastIndexOf("."))
                // alert(arr2V)
                // console.log()
            }
            let bool = true;
            for(let arr2V of arr2){
                if(typeof arr2V === "string"){
                    if(isInAccessSuffix(arr2V)){
                        arr2V = arr2V.substring(0,arr2V.lastIndexOf("."))
                        // alert(arr2V)
                        // console.log()
                    }
                }
                if(arr2V === value){
                    bool = false;
                }
            }
            if(bool)res.push(value);
        }
        return res;

    }

    arrInToItems = function (arr){
        let fragment = document.createDocumentFragment();
        arr.forEach(val => {
            const p = document.createElement("p");
            p.innerHTML = val;
            fragment.appendChild(p);
        });
        return fragment;
    }

    initCover = function (container){
        container.style.filter = "blur(4px)";

        const div = document.createElement("div");
        div.style.cssText = `
                 position:fixed;
                 top:0;
                 left:0;
                 z-index: 1;
                 height:100%;
                 width:100%;                 
                 overflow-y:scroll;
            `;
        const divShadowRoot = div.attachShadow({mode:"open"});
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        divShadowRoot.innerHTML =
            `
                <style>
                    div{
                        float:left;
                        margin:10px;
                        height:95%;
                        width:48%;
                    }
                    div>p{
                        width:100%;
                        margin:0;
                        line-height: 2em;
                        border-radius: .5em;
                        border:#000 solid 1px;
                        text-indent: 2em;
                    }
                    
                </style>
                `;
        divShadowRoot.appendChild(div2);
        divShadowRoot.appendChild(div3);

        document.body.appendChild(div);

        div.ondblclick = this.removeCover.bind(this,container);

        this.cover = div;

        return this.cover;
    };

    removeCover = function (container){

        container.style.filter = "blur(0)";
        document.body.removeChild(this.cover);

    };

    compare2Files = function (file1,file2){
        let obj1 =  parseMap.elementObjMap.get(file1);
        let obj2 =  parseMap.elementObjMap.get(file2);

        if(obj1.constructor === Object)return false;
        if(obj2.constructor === Object)return false;

        let arrIn1 = this.compareArr(obj1,obj2);
        let arrIn2 = this.compareArr(obj2,obj1);

        return [arrIn1,arrIn2];
    };

    initCheckbox = (function (){
        let selected = [];
        let count = 0;
        let checkIfSelected2 = function (cb){
            if(selected.length !== count)return false;

            cb(...selected);

            selected.length = 0;
        };
        return function (n,cb){
            count = n;

            const label = document.createElement("label");
            label.style.display = "block";

            const checkbox = document.createElement("input")
            checkbox.type = "checkbox";
            checkbox.name = "fileSelector";

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode("选择此项"));

            const that = this;

            checkbox.onchange = function (){
                selected.push(that);
                checkIfSelected2(cb);
            };

            this.appendChild(label);

        };
    })();

    removeCheckbox = function (){
        let inputs = Array.from(this.querySelectorAll("label"));
        inputs.forEach(input => {
            input.parentElement.removeChild(input);
        });

    };
};
export {CheckFilesEvent};