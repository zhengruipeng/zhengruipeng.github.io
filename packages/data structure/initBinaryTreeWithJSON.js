import {BinaryTree} from "./BinaryTree.js";

let initBinaryTreeWithJSON = function (json = {}){
    if(!json || !json.value)return null;

    let tree = new BinaryTree(json.value)
    tree.lChild = initBinaryTreeWithJSON(json.lChild);
    tree.rChild = initBinaryTreeWithJSON(json.rChild);

    return tree;
};

export {initBinaryTreeWithJSON}