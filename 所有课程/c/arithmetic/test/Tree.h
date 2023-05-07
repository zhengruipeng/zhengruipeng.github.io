//
// Created by Administrator on 2022/04/25.
//

#ifndef TEST_TREE_H
typedef struct Tree{
    char data;
    struct Tree *lChild;
    struct Tree *rChild;
}Tree,*Treep;

Treep initTree(char* comment,int start){
    /*for(int i = 0;comment[i] != '\0';i++ ){



    }*/
    if(comment[start] == '\0'){
        return NULL;
    }
    if(comment[start] == ' '){
        return NULL;
    }
    Tree *treeNode = (Tree *)malloc(sizeof(Tree));
    treeNode -> data = comment[start];

    treeNode -> lChild = initTree(comment,start+1);
    treeNode -> rChild = initTree(comment,start+2);
    printf("has init %c",treeNode -> data);
    return treeNode;
}
#define TEST_TREE_H

#endif //TEST_TREE_H
