let sliderEvent = function () {
    let slideBar = document.getElementById("slide-bar");
    let slider = document.getElementById("slider");

    slider.addEventListener("click", function () {
        slideBar.classList.toggle("close")
        slider.classList.toggle("close")
    });
}
export {sliderEvent};