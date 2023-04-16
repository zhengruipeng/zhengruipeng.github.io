import {slideBarInit} from "./slide-bar-init.js"
import {sliderEvent} from "./slider-event.js"
import {slideEvent} from "./slide-event.js"
document.addEventListener("DOMContentLoaded", function () {
    slideBarInit();
    sliderEvent();
    slideEvent();
});