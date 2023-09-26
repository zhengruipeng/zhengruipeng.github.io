/*
* 图片轮播标准插件
* */
window.SlideShow = class extends Object {
    image = null;
    hrefs = [];
    #index = 0;
    debug = false;
    indexEleMap = new Map();

    constructor(hrefs) {
        super();
        this.image = document.createElement("div");
        this.hrefs = hrefs;

        const that = this;
        hrefs.forEach((v, i) => {
            let image = document.createElement("img");
            image.src = v;
            image.style.position = "fixed";
            image.style.opacity = 0;
            image.style.zIndex = -1;
            image.style.height = "100%";
            image.style.width = "100%";
            that.image.appendChild(image);
            that.indexEleMap.set(i, image);
        });
    }

    print(...msg) {
        if (!this.debug) return false;

        console.log(...msg);
    }

    resetIndex() {
        this.#index = 0;
    }

    syncPictureIndex() {
        if (!(this.#index in Object.keys(this.hrefs))) {
            this.resetIndex();
        }

        this.print(this.hrefs[this.#index]);
        for(let image of this.indexEleMap.values()){
            image.style.opacity = 0;
            image.style.zIndex = -1;
        }

        this.indexEleMap.get(this.#index).style.opacity = 1;
        this.indexEleMap.get(this.#index).style.zIndex = 0;
        // this.image.src = this.hrefs[this.#index];
    }

    init(container = document.body) {
        container.appendChild(this.image);
        this.syncPictureIndex();
    }

    next() {
        this.#index++;
        this.syncPictureIndex();
    }

    pre() {
        this.#index--
        this.syncPictureIndex();
    }

}
