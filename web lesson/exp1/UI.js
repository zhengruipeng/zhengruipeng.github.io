document.addEventListener("DOMContentLoaded",function (){
    let currentPage = 0;
    const sections = document.querySelectorAll("main>section");
    const toPrePage = document.getElementById("to-pre-page");
    const toNextPage = document.getElementById("to-next-page");
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
            }else{
                section.classList.remove("main-cur-page");
                section.classList.add("main-next-page");
                section.classList.remove("main-pre-page");
            }
        }
        currentPage = page;
    }
    toPrePage.onclick = function (){
        changeToPage(currentPage-1);
    };
    toNextPage.onclick = function (){
        changeToPage(currentPage+1);

    };
    window.onselectstart = function (ev){
        ev.preventDefault();
    }
})