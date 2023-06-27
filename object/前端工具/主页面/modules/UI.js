import {LocationMap} from "../libs/LocationMap.js"

document.addEventListener("DOMContentLoaded",function (){
    const sections = document.querySelectorAll("main>section");
    const toPrePage = document.getElementById("to-pre-page");
    const toNextPage = document.getElementById("to-next-page");

	let currentPage = 0;

    let changeToPage = function (page){
        if(page === 0){
            toPrePage.style.opacity = "0";
        }
        if(page === sections.length-1){
            toPrePage.style.opacity = "0";
        }
        if(page<0 || page>sections.length-1){
            return false;
        }
        toPrePage.style.opacity = "1";
        toPrePage.style.opacity = "1";

        for(let i = 0;i<sections.length;i++){
            let section = sections[i];
            if(i<page){
                section.classList.remove("main-cur-page");
                section.classList.remove("main-next-page");
                section.classList.add("main-pre-page");
            }else if(i === page){
                section.classList.add("main-cur-page");
                section.classList.remove("main-next-page");
                section.classList.remove("main-pre-page");
                try{
                    let items = Array.from(section.querySelector(".container")?.children);
                    // console.log(items);
                    items.forEach((item,index) => {
                        item.style.animationName = "default-anime";
                        item.style.animationDelay = `calc(${index} * var(--animation-duration))`
                        item.style.animationDuration = "var(--animation-duration)";
                        item.style.animationDirection = "normal";
                        item.style.animationFillMode = "forwards";
                        item.style.animationIterationCount = "1";
                        item.style.animationTimingFunction = "ease-out";
                    })
                }catch (e){}
            }else{
                section.classList.remove("main-cur-page");
                section.classList.add("main-next-page");
                section.classList.remove("main-pre-page");
            }
        }
        currentPage = page;
    };

    toPrePage.onclick = function (){
        changeToPage(currentPage-1);
    };
    toNextPage.onclick = function (){
        changeToPage(currentPage+1);

    };

    window.addEventListener("wheel",function (ev){
        if(ev.deltaY>0){
            toNextPage.click();
        }else{
            toPrePage.click();
        }
    });
    
 	let locationMap = new LocationMap(location);
    let obj = locationMap.getSearchMap();
   
    console.log(obj);
    if(obj.path !== undefined){
    	console.log(123);
        //toNextPage.click();
    }
    


});