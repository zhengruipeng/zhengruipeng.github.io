const svg = this.querySelector("#svg");
const modifyCanvasWidth = this.querySelector("#modify-canvas-width");
window.haffman.updateGraphics = function (data) {
    console.log(data)

    svg.innerHTML = "";
    //at first ,change the position of element sort by the path length
    data = data.sort((pv, cv) => {
        if (pv[1].length < cv[1].length) return -1;
        else if (pv[1].length === cv[1].length) {
            if (pv[1][pv[1].length - 1] === "左") return -1;
            if (pv[1][pv[1].length - 1] === "右") return 1;
        } else return 1;
    });

    //we can see that the last one of the list has the biggest path length
    let maxFloor = data[data.length - 1][1].length;

    //design the height and width of svg element
    // with the path length which we have just calculated
    //and if the button of modifyCanvasWidth was checkek
    //we can modify the width of svg element big and big as possible
    //so that ,it can contain all of the child node in it
    //set the css attribute
    svg.style.height = maxFloor * 150 + 100 + "px";
    if (modifyCanvasWidth.checked) svg.style.width = (2 ** (maxFloor)) * 100 + "px";//Math.sqrt(Math.abs((2**4)*100-(2**(maxFloor-1))*100))*2**(maxFloor-1)*5+"px";
    else svg.style.width = document.documentElement.clientWidth - 3 + "px";
    svg.style.border = "#f2a5aa solid 1px";


};


let TreeRenderer = class extends Object {
    svg = null;

    initSvg(width,height) {
        this.svg = document.createElement("svg");
        this.svg.width = width;
        this.svg.height = height;
        svg.style.border = "#f2a5aa solid 1px";

    }

    clearAll() {
        this.svg.innerHTML = "";
    }

    render(data){

        let line;
        let treeSvgMap = new Map();
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < data.length; i++) {
            let treeNode = data[i][0];      //Tree
            let path = data[i][1];      //Array

            let width = Number.parseFloat(this.svg.style.width);
            let x = width / 2;

            path.forEach((v, i, a) => {
                if (v === "左") {
                    x -= Math.max(width / 2 ** (i + 2), 60);
                } else if (v === "右") {
                    x += Math.max(width / 2 ** (i + 2), 60);
                }
            });

            //if the value of x big than the width of screen ,x will be the screen`s width minus 20
            //if the value of x less than 0 ,x will be 20
            x = Math.min(x, Number.parseFloat(svg.style.width) - 20);
            x = Math.max(x, 20);

            //design the y-aris position with the node`s deep information
            let y = (path.length) * 150 + 50;

            //create SVGCircleElement and set its attribute value
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("transform", `translate(${x},${y})`);
            circle.setAttribute("x", x);
            circle.setAttribute("y", y);
            circle.setAttribute("r", 50);
            circle.style.cssText = "fill:none;stroke:#f2a5aa";
            //    <text x="100" y="100" text-anchor="middle">我是字</text>
            //create SVGTextElement
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute("text-anchor", "middle");

            //if  the tree node is created by computer, it will show in pink color
            if (!treeNode.isTrust) text.style.cssText = "fill:#f2a5aa";
            text.appendChild(document.createTextNode(treeNode.value));

            //append to temp node
            fragment.appendChild(circle);
            fragment.appendChild(text);

            //set the mapping relation with tree noe and svg element
            treeSvgMap.set(treeNode, circle);
        }

        //begin to create line element
        for (let i = 0; i < data.length; i++) {
            //we can also get the tree node and children in the node
            let treeNode = data[i][0];      //Tree
            let lChild = treeNode.lChild;
            let rChild = treeNode.rChild;

            //get the svg element with tree node in the map
            //and get the x,y in the svg element to record them
            //create line and set the attribute value in x,y
            //at last,put them into temp
            if (treeSvgMap.get(lChild)) {
                let x2 = treeSvgMap.get(lChild).getAttribute("x");
                let y2 = treeSvgMap.get(lChild).getAttribute("y");
                let x1 = treeSvgMap.get(treeNode).getAttribute("x");
                let y1 = treeSvgMap.get(treeNode).getAttribute("y");
                line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1 - 0 + 50);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2 - 50);
                line.style.cssText = "fill:none;stroke:#f2a5aa";

                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", x1 * 0.5 + x2 * 0.5);
                text.setAttribute("y", y1 * 0.5 + y2 * 0.5);
                text.setAttribute("text-anchor", "middle");

                //if  the tree node is created by computer, it will show in pink color
                if (!treeNode.isTrust) text.style.cssText = "fill:#f2a5aa";
                text.appendChild(document.createTextNode("0"));

                //append to temp node
                fragment.appendChild(line);
                fragment.appendChild(text);

            }

            //use the same method to add the right one`s
            if (treeSvgMap.get(rChild)) {
                let x2 = treeSvgMap.get(rChild).getAttribute("x");
                let y2 = treeSvgMap.get(rChild).getAttribute("y");
                let x1 = treeSvgMap.get(treeNode).getAttribute("x");
                let y1 = treeSvgMap.get(treeNode).getAttribute("y");
                line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1 - 0 + 50);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2 - 50);
                line.style.cssText = "fill:none;stroke:#f2a5aa";


                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", x1 * 0.5 + x2 * 0.5);
                text.setAttribute("y", y1 * 0.5 + y2 * 0.5);
                text.setAttribute("text-anchor", "middle");

                //if  the tree node is created by computer, it will show in pink color
                if (!treeNode.isTrust) text.style.cssText = "fill:#f2a5aa";
                text.appendChild(document.createTextNode("1"));

                //append to temp node
                fragment.appendChild(line);
                fragment.appendChild(text);
                // fragment.appendChild(line);
            }
        }
        svg.appendChild(fragment);
    }
}

export {TreeRenderer}