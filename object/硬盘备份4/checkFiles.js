import {CheckFilesEvent} from "./CheckFilesEvent.js";
import {contextMenu} from "./contextMenu.js"

document.addEventListener("DOMContentLoaded",function  (){
    const main = document.querySelector("main");
    const details = Array.from(document.querySelectorAll("main details"));

    let clicked = false;

    let checkFilesEvent = new CheckFilesEvent();

    contextMenu.createItem("查看两个文件夹的非重复项",function (){
        if(!clicked){
            details.forEach(ele => {
                checkFilesEvent.initCheckbox.call(ele,2,function  (file1,file2){
                    checkFilesEvent.initCover(main);

                    let twoFilesComparation;
                    if((twoFilesComparation = checkFilesEvent.compare2Files(file1,file2)) === false){
                        alert("请选择包含文件的文件夹");
                        return false;
                    }

                    let [arrIn1,arrIn2] = twoFilesComparation;

                    checkFilesEvent.cover.shadowRoot.children[1].appendChild(checkFilesEvent.arrInToItems(arrIn1));
                    checkFilesEvent.cover.shadowRoot.children[2].appendChild(checkFilesEvent.arrInToItems(arrIn2));

                    //取消两个选中的摁扭
                    Array.from(file1.querySelectorAll("input[type='checkbox']")).forEach(input => input.checked = false);
                    Array.from(file2.querySelectorAll("input[type='checkbox']")).forEach(input => input.checked = false);

                });
            });
        }else{
            details.forEach(ele => {
                checkFilesEvent.removeCheckbox.call(ele);
            });
        }
        clicked = !clicked;
    });

    // main.insertAdjacentElement("afterbegin",button);
});
