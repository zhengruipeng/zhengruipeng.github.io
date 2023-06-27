import {MyApp} from "../../../../../../public/config.js"
import {notify} from "../view/notification.js";
import {io} from "../view/output-info-into-panel.js";

let initPages;
let changePage;
let removeItem;
let pageParams = {};
document.addEventListener("DOMContentLoaded",function main(){

    MyApp.customEvent.addListener("tableinit",function () {
        console.log(8);

        const table = document.querySelector("main>table");
        const tbody = table.querySelector("tbody");
        let trs = Array.from(tbody.querySelectorAll("tr"));
        const previousBtn = document.getElementById("previous-page");
        const nextBtn = document.getElementById("next-page");

        let pageOffset = 0;
        const itemsInOnePage = 12;
        const maxPage = Math.floor(trs.length/itemsInOnePage);
        pageParams = {pageOffset,itemsInOnePage,maxPage};

        let pages = [];
        initPages = function (itemsNum,newEle){
            if(pages.length !== 0){
                trs = pages.reduce((lv,rv) => {
                    return lv.concat(rv);
                },[]);
            }
            // console.log(trs);
            if(newEle)trs.push(newEle);
            pages = [];
            trs.forEach((tr,index) => {
                if(index%itemsNum === 0){
                    pages.push([]);
                }
                pages[pages.length - 1].push(tr);
            })

        };
        removeItem = function (tr){
            for(let page of pages){
                if(page.indexOf(tr) !== -1){
                    page.splice(page.indexOf(tr),1);
                }
            }
            initPages(pageParams.itemsInOnePage);
        };
        changePage = function (page){
            tbody.innerHTML = "";
            let items = pages[page];
            items.forEach(item => {
                tbody.appendChild(item);
            });

        };

        previousBtn.onclick = function (){
            if(pageParams.pageOffset === 0)return false;
            pageParams.pageOffset--;
            changePage(pageParams.pageOffset,pageParams.itemsInOnePage);

        };
        nextBtn.onclick = function (){
            if(pageParams.pageOffset === pageParams.maxPage)return false;
            pageParams.pageOffset++;
            changePage(pageParams.pageOffset,pageParams.itemsInOnePage);

        };
        MyApp.customEvent.addListener("allDone",function (){
            initPages(pageParams.itemsInOnePage);
            changePage(0);
        });

        console.log(MyApp.customEvent);

    });
});
export {initPages,changePage,removeItem,pageParams};