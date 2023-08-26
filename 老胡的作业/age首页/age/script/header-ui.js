document.addEventListener("DOMContentLoaded", function () {
    const navContent = this.querySelector("#nav-content");
    const navAEles = Array.from(navContent.children);

    navAEles.forEach(ele => {
        ele.addEventListener("click", function (ev) {
            navAEles.forEach(v => v.classList.remove("selected"));
            this.classList.add("selected");
        })
    })
})