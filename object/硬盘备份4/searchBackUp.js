import {parseMap} from "./ParseMap.js"
import {CheckFilesEvent} from "./CheckFilesEvent.js";
import {contextMenu} from "./contextMenu.js"

document.addEventListener("DOMContentLoaded",function (){
    const main = document.querySelector("main");
    const details = Array.from(document.querySelectorAll("main details"));

    let clicked = false;

    let checkFilesEvent = new CheckFilesEvent();


    contextMenu.createItem("自动查找最有可能的备份文件夹",function (){
        if(!clicked){
            details.forEach(ele => {
                ele.style.backgroundColor = "transparent";
                checkFilesEvent.initCheckbox.call(ele,1,function (file1){
                    let obj1 =  parseMap.elementObjMap.get(file1);
                    let eleNum = -1;
                    let likelyEle = null;

                    for(let [detailsEle,dataArr] of parseMap.elementObjMap.entries()){
                        if(detailsEle === file1)continue;
                        if(dataArr.constructor === Object)continue;

                        //把所有的数组的原长度进行存储
                        let originlen1 = dataArr.length;
                        let originlen2 = obj1.length;

                        //把数组中彼此重复的项去掉后和以前的长度作差
                        //得出减少项的长度
                        let [arr1,arr2] = checkFilesEvent.compare2Files(detailsEle,file1);
                        let [len1,len2] = [originlen1 - arr1.length,originlen2 - arr2.length];

                        //如果循环第一次运行则初始化变量
                        if(eleNum === -1)eleNum = len1 + len2;
                        if(!likelyEle)likelyEle = detailsEle;

                        //如果碰到减少的项目更多的组合则刷新数据
                        if(eleNum < len1 + len2){
                            eleNum = len1 + len2;
                            likelyEle = detailsEle;
                        }
                    }

                    if(eleNum === 0)alert("没有备份");

                    //初始化输出面板
                    checkFilesEvent.initCover(main);

                    //获取当前文件夹和与最像的文件夹去重后所有的文件
                    let [arrIn1,arrIn2] = checkFilesEvent.compare2Files(file1,likelyEle);

                    //输出
                    checkFilesEvent.cover.shadowRoot.children[1].appendChild(checkFilesEvent.arrInToItems(arrIn1));
                    checkFilesEvent.cover.shadowRoot.children[2].appendChild(checkFilesEvent.arrInToItems(arrIn2));

                    //取消两个选中的摁扭
                    Array.from(file1.querySelectorAll("input[type='checkbox']")).forEach(input => input.checked = false);

                    //高亮显示两个被选中的项
                    let eles = checkFilesEvent.getAllParentElement(file1,"DETAILS")
                    eles.forEach(ele => ele.style.backgroundColor = "rgba(150,150,255,.15)");
                    eles = checkFilesEvent.getAllParentElement(likelyEle,"DETAILS")
                    eles.forEach(ele => ele.style.backgroundColor = "rgba(150,150,255,.15)");

                });
            });
        }else{
            details.forEach(ele => {
                checkFilesEvent.removeCheckbox.call(ele);
            });
        }
        clicked = !clicked;
    });


})