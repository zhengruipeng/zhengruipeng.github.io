class GenerateEvent extends Event{
    expression = "";
}
class CubicBezierTimingFunctionBuilder extends EventTarget {
    svg = null;
    svgHeight;
    svgWidth;
    generatedExpression = "cubic-bezier(0.3,0.3,0.6,0.6)";

    #defaultStyleSheet = `
    svg{
            border:#bbb solid 1px;
        }
        svg>circle{
            transition:fill,transform .3s;
            cursor: pointer;
            fill:darkred;
            transform-box:fill-box;
            transform-origin: center;
            transform: scale(1,1);

        }
        svg>circle:hover{
            transform: scale(1.3,1.3);
            fill:red;
        }`;

    initSVGElement(width = 600, height = 600) {
        //设置宽高大于300小于4000
        width = Math.min(Math.max(100, width), 4000);
        height = Math.min(Math.max(100, height), 4000);

        //创建svg过程
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", height);
        this.svg.setAttribute("width", width);
        this.svgWidth = width;
        this.svgHeight = height;

        //设置样式
        let ss = new CSSStyleSheet();
        ss.replaceSync(this.#defaultStyleSheet);
        document.adoptedStyleSheets = [ss];

        //设置画图内容
        this.svg.innerHTML = `
            <path d="M 0 ${height} C ${width / 3} ${height * 2 / 3},${width * 2 / 3} ${height / 3},${width} 0" style="fill:none;stroke:#000"/>
            <circle r="15" cx="${width / 3}" cy="${height * 2 / 3}"/>
            <circle r="15" cx="${width * 2 / 3}" cy="${height / 3}"/>
        `;

        const points = Array.from(this.svg.querySelectorAll("circle"));
        let that = this;
        points.forEach((point, index) => {
            point.addEventListener("mousedown", (ev) => {
                that.defaultEvent.call(point, ev, index, that);
            });
        });

        return this.svg;
    };

    defaultEvent(ev, pointIndex, that) {
        let svg = that.svg;
        let ec = svg.querySelector("path");
        // let that = this;
        let parseECPath = function () {
            let path = ec.getAttribute("d");
            //M 0 600 C 200 400,400 200,600 0
            let regexp = new RegExp(`M 0 ${that.svgHeight} C ([-\\d\\s\\.]+),([-\\d\\s\\.]+),${that.svgWidth} 0`);
            return path.match(regexp);
        }
        let stringifyECPath = function (p1, p2) {
            let path = `M 0 ${that.svgHeight} C ` + p1[0] + " " + p1[1] + "," + p2[0] + " " + p2[1] + `,${that.svgWidth} 0`;
            return path;
        }
        let point = this;
        let mousemove = function (ev) {
            let {x, y} = ev;
            [x, y] = [x - svg.getBoundingClientRect().left, y - svg.getBoundingClientRect().top];
            let [all, point1, point2] = parseECPath();
            point1 = point1.split(" ");
            point2 = point2.split(" ");     //[300,300]
            // console.log(point1);
            // console.log(point2);

            if (pointIndex === 0) {
                let path = stringifyECPath([x, y], point2);
                ec.setAttribute("d", path);
            } else if (pointIndex === 1) {
                let path = stringifyECPath(point1, [x, y]);
                ec.setAttribute("d", path);
            }
            point.setAttribute("cx", x);
            point.setAttribute("cy", y);

        };

        let mouseup = function (ev) {
            svg.removeEventListener("mousemove", mousemove);
            svg.removeEventListener("mouseup", mouseup);

            let [all, point1, point2] = parseECPath();
            point1 = point1.split(" ");
            point2 = point2.split(" ");//[300,300]

            let x1 = point1[0];
            let y1 = point1[1];
            let x2 = point2[0];
            let y2 = point2[1];

            x1 = x1 / svg.width.baseVal.value;
            x2 = x2 / svg.width.baseVal.value;
            y1 = y1 / svg.height.baseVal.value;
            y2 = y2 / svg.height.baseVal.value;

            let cssCB = `cubic-bezier(${x1},${1 - y1},${x2},${1 - y2})`;
            // console.log(cssCB);
            that.generatedExpression = cssCB;

            let generateEvent = new GenerateEvent("generate");
            generateEvent.expression = cssCB;
            that.dispatchEvent(generateEvent);
        };
        svg.addEventListener("mousemove", mousemove);
        svg.addEventListener("mouseup", mouseup);
    }
};

export {CubicBezierTimingFunctionBuilder};

/*
*
*         let c = new CubicBezierTimingFunctionBuilder();
*         c.initSVGElement(this.body, 300, 300);
*         c.addEventListener("generate",function (ev){
*             console.log(123,ev)
*         })
* */