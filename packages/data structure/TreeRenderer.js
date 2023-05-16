//表示渲染结果的一个树节点
let TreeNode = class extends Object {
    static R = 50;
    nodes = [];

    constructor(left, top, value) {
        super();
        this.left = left;
        this.top = top;
        this.value = value;

        this.render();
    }

    render() {
        //create SVGCircleElement and set its attribute value
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("transform", `translate(${this.left},${this.top})`);
        circle.setAttribute("x", this.left);
        circle.setAttribute("y", this.top);
        circle.setAttribute("r", TreeNode.R);
        circle.style.cssText = "fill:none;stroke:#f2a5aa";
        this.nodes.push(circle);

        //create SVGTextElement
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", this.left);
        text.setAttribute("y", this.top);
        text.setAttribute("text-anchor", "middle");
        text.appendChild(document.createTextNode(this.value));
        this.nodes.push(text);
    }
}
//表示渲染结果的两个树节点的中间的连线
let LineNode = class extends Object {
    nodes = [];

    constructor(startX, startY, endX, endY, value = "") {
        super();
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.value = value;

        this.render();
    }

    render() {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.startX);
        line.setAttribute("y1", this.startY);
        line.setAttribute("x2", this.endX);
        line.setAttribute("y2", this.endY);
        line.style.cssText = "fill:none;stroke:#f2a5aa";

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", this.startX * 0.5 + this.endX * 0.5);
        text.setAttribute("y", this.startY * 0.5 + this.endY * 0.5);
        text.setAttribute("text-anchor", "middle");
        text.appendChild(document.createTextNode(this.value));

        this.nodes.push(line);
        this.nodes.push(text);
    }
}
let TreeRenderer = class extends Object {
    svg = null;
    svgWidth;
    svgHeight;

    constructor(width, height) {
        super();
        if (Number.isNaN(width - 0) || Number.isNaN(width - 0)) {
            throw new TypeError("the params of TreeRenderer constructor are invalid");
        }

        this.svgWidth = width;
        this.svgHeight = height;

        this.initSvg(width, height);
        this.#relativeTop = 50;
        this.#relativeLeft = width / 2;
    }

    initSvg(width, height) {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", width);
        this.svg.setAttribute("height", height);
        return this.svg;
    }

    clearAll() {
        this.svg.innerHTML = "";
    }


    //render()函数运行过程中所使用的节点位置偏移量
    //表示当前节点的位置
    #relativeTop = null;
    #relativeLeft = null;

    //根据当前节点的深度生成X的偏移量，作为节点的空隙使用
    #nodeLeftGap(deep) {
        return Math.max(this.svgWidth / 2 ** (deep + 2), TreeNode.R + 10);
    };

    #nodeTopGap = 100;

    //计算两个点之间的连线的坐标
    #calcLinePoint(x1, y1, x2, y2) {
        //取差值
        let deltaX = x1 - x2;
        let deltaY = y1 - y2;

        //取开始点和结束点，划一条横线
        //设距离开始点为r的一点的参数为mix
        //可得出等式：r/d = mix/1
        //可求出：mix = r/d
        //其中d为两点距离：横坐标之差和纵坐标之差作勾股定理
        //结束点坐标的参数为距离终点为r的点
        //所以直接将1-mix和mix调换位置即可
        let d = Math.hypot(deltaX, deltaY);
        let mix = TreeNode.R / d;

        //开始点坐标
        let startX = mix * x1 + (1 - mix) * x2;
        let startY = mix * y1 + (1 - mix) * y2;

        //结束点坐标
        let endX = (1 - mix) * x1 + mix * x2;
        let endY = (1 - mix) * y1 + mix * y2;

        return {startX, startY, endX, endY};
    }

    //渲染节点
    render(data/*BinaryTree*/, deep = 0) {
        if (data === null) return null;

        /*渲染节点*/
        let treeNode = new TreeNode(this.#relativeLeft, this.#relativeTop, data.value);
        let that = this;
        treeNode.nodes.forEach(node => {
            that.svg.appendChild(node);
        });


        /*
        * 流程：
        * 先将相对位置移动到左子树对应的位置，
        * 画出连接线，
        * 对节点进行渲染，
        * 后将相对位置移动到右子树对应的位置，
        * 画出连接线，
        * 对节点进行渲染，
        * 最后进行归位
        * */


        /*
        * 先假设，要将X坐标先向左移nodeLeftGap
        * 如果小于最小值的话，将偏移量减去TreeNode.r
        * 将最终算出来的偏移量让X坐标自减
        * */
        let offset = this.#nodeLeftGap(deep)
        if (this.#relativeLeft < TreeNode.R) {
            offset = offset - TreeNode.R;
        }
        this.#relativeLeft -= offset;
        this.#relativeTop += this.#nodeTopGap

        if (data.lChild) {
            /*画线*/
            //首先，取到两个节点的坐标
            let x1 = treeNode.left;
            let y1 = treeNode.top;
            let x2 = this.#relativeLeft;
            let y2 = this.#relativeTop;

            let {startX, startY, endX, endY} = this.#calcLinePoint(x1,
                y1,
                x2,
                y2);

            let ln = new LineNode(startX, startY, endX, endY);
            let that = this;
            ln.nodes.forEach(node => {
                that.svg.appendChild(node);
            });

            this.render(data.lChild, deep + 1);
        }

        //先把relativeLeft复位后再放在右边
        //如果不在边缘的话两个offset正好是两个nodeLeftGap值，即为relativeLeft += 2 * nodeLeftGap
        // 如果在边缘就将偏移量减去R
        this.#relativeLeft += offset;
        offset = this.#nodeLeftGap(deep);
        if (this.#relativeLeft > this.svgWidth - TreeNode.R) {
            offset = offset - TreeNode.R;
        }
        this.#relativeLeft += offset;


        if (data.rChild) {
            /*画线*/
            //首先，取到两个节点的坐标
            let x1 = treeNode.left;
            let y1 = treeNode.top;
            let x2 = this.#relativeLeft;
            let y2 = this.#relativeTop;

            let {startX, startY, endX, endY} = this.#calcLinePoint(x1,
                y1,
                x2,
                y2);

            let ln = new LineNode(startX, startY, endX, endY);
            let that = this;
            ln.nodes.forEach(node => {
                that.svg.appendChild(node);
            });

            this.render(data.rChild, deep + 1);
        }

        this.#relativeTop -= this.#nodeTopGap;
        this.#relativeLeft -= offset;

        return treeNode;

    }
}

export {TreeRenderer}