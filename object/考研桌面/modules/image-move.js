document.addEventListener("DOMContentLoaded", function () {
    const mainImage = this.querySelector("#main-image");

    class TransformFormat {
        #scale = [];      //string[]
        #rotate = [];      //string[]
        #translate = [];      //string[]

        get scale()/*string[]*/ {
            return this.#scale;
        };

        set scale(v/*string[]*/) {
            v.forEach((val, index) => {
                this.#scale[index] = val ?? this.#scale[index];
            });
        };

        get rotate()/*string[]*/ {
            return this.#rotate;
        };

        set rotate(v/*string[]*/) {
            v.forEach((val, index) => {
                this.#rotate[index] = val ?? this.#rotate[index];
            });
        };

        get translate()/*string[]*/ {
            return this.#translate;
        };

        set translate(v/*string[]*/) {
            v.forEach((val, index) => {
                this.#translate[index] = val ?? this.#translate[index];
            });
        };

        toString()/*string*/ {
            const that = this;
            return `${(function () {
                return that.#scale.length !== 0 ? `scale(${that.#scale.join()})` : "";
            })()} ${(function () {
                return that.#rotate.length !== 0 ? `rotate(${that.#rotate.join()})` : "";
            })()} ${(function () {
                return that.#translate.length !== 0 ? `translate(${that.#translate.join()})` : "";
            })()}`
        };
    }

    let transformFormat = new TransformFormat();
    transformFormat.scale = [1.02];
    mainImage.style.transform = transformFormat.toString();

    const imageBoundingBox = mainImage.getBoundingClientRect();
    const imageHeight = imageBoundingBox.height;
    const imageWidth = imageBoundingBox.width;

    this.body.addEventListener("mousemove", function (ev) {
        let sensitivity = 0.01;
        let deltaX = ev.x * sensitivity - imageWidth * sensitivity / 2;
        let deltaY = ev.y * sensitivity - imageHeight * sensitivity / 2;

        transformFormat.translate = [deltaX + "px", deltaY + "px"];
        mainImage.style.transform = transformFormat.toString();
        // console.log(transformFormat.toString())
    });
});