import {UIMode} from "./UIMode.js";
import {ComponentLib} from "./ComponentLib.js";

let CompactMode = class extends UIMode{
    /*+ HTMLElement buildMenu()
    + HTMLElement buildList()
    + HTMLElement buildWindow()
    + HTMLElement buildSlider()*/
    buildMenu(){
        return ComponentLib.buildEmptyElement();
    }
    buildList(){
        return ComponentLib.buildEmptyElement();
    }
    buildWindow(){
        return ComponentLib.buildWindow();
    }
    buildSlider(){
        return ComponentLib.buildSlider();
    }
    render() {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(this.buildMenu());
        fragment.appendChild(this.buildList());
        fragment.appendChild(this.buildWindow());
        fragment.appendChild(this.buildSlider());
        return fragment;
    }
}

export {CompactMode}