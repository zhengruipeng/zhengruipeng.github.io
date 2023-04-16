import {parseMap} from "./ParseMap.js"
import {CheckFilesEvent} from "./CheckFilesEvent.js";
import {contextMenu} from "./contextMenu.js"

document.addEventListener("DOMContentLoaded",function (){
    const main = document.querySelector("main");
    const details = Array.from(document.querySelectorAll("main details"));


    let checkFilesEvent = new CheckFilesEvent();


    contextMenu.createItem("自动匹配所有文件的备份",function (){
        details.forEach(source => {

            source.style.backgroundColor = "transparent";

            let obj1 =  parseMap.elementObjMap.get(source);
            let eleNum = -1;
            let likelyEle = null;

            if(obj1.constructor === Object)return ;

            //判断那个元素最接近
            for(let [detailsEle,dataArr] of parseMap.elementObjMap.entries()){
                if(detailsEle === source)continue;
                if(dataArr.constructor === Object)continue;

                //把所有的数组的原长度进行存储
                let originlen1 = dataArr.length;
                let originlen2 = obj1.length;

                //把数组中彼此重复的项去掉后和以前的长度作差
                //得出减少项的长度
                let [arr1,arr2] = checkFilesEvent.compare2Files(detailsEle,source);
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



            let sum = likelyEle.querySelector("summary");

            let iEle = sum.querySelector("i");
            let res = "";

            if(iEle){
                sum.removeChild(iEle);
                res = sum.innerHTML;
                sum.appendChild(iEle);
            }

            res = sum.innerHTML;

            let noneBackUp = false;
            if(eleNum === 0) {
                res = "没有备份";
                noneBackUp = true;
            }

            let summary = source.querySelector("summary");
            summary.innerHTML += res;


            let node = null;
            let counter = 0;
            let nodeIterator = document.createNodeIterator(summary,NodeFilter.SHOW_ELEMENT,
                (node) => node.nodeName.toLowerCase() === 'em' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT);
            while(node = nodeIterator.nextNode()){
                if(eleNum === 0)continue;

                counter++;
                if(counter === 3){
                    node.parentElement.removeChild(node.previousSibling);
                    node.parentElement.removeChild(node);
                }
            }
            summary.innerHTML += "概率:"+((eleNum/(obj1.length+parseMap.elementObjMap.get(likelyEle).length)*100).toFixed(1))+"%";

            if(eleNum/(obj1.length+parseMap.elementObjMap.get(likelyEle).length) < 0.1){
                // res = "匹配概率小于10%";
                if(!noneBackUp) summary.innerHTML += "(匹配概率小于10%)";

            }




        });
    });


})