import {slideBarInit} from "./slide-bar-init.js"
import {sliderEvent} from "./slider-event.js"
import {slideEvent} from "./slide-event.js"

//建造者模式
document.addEventListener("DOMContentLoaded", function () {
    slideBarInit();
    sliderEvent();
    slideEvent();
});