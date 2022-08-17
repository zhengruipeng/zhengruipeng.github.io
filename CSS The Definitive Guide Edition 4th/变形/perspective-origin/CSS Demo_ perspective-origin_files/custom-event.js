document.addEventListener("DOMContentLoaded",function (){
    const options = Array.from(this.querySelectorAll("code.language-css"));
    const exampleEle = this.getElementById("example-element");
    options.forEach(option => {
        option.addEventListener("click",function (){
            let treeWalker = document.createTreeWalker(this,NodeFilter.SHOW_TEXT,node => node.data.trim() !== "");

            let currentNode;
            let value = "";
            while(currentNode = treeWalker.nextNode()){
                // console.log(currentNode);
                if(currentNode.parentElement !== this)continue;
                value += currentNode.data;
            }
            exampleEle.style.perspectiveOrigin = value
            navigator.clipboard.writeText(value);
        })
    });

})