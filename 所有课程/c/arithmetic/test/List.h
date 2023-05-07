//
// Created by Administrator on 2022/04/25.
//

#ifndef TEST_LIST_H
typedef struct DoubleList{
    void *data;
    struct DoubleList *next;
    struct DoubleList *previous;
}DoubleList;

DoubleList *DoubleList_getFirstNode(DoubleList *list){
    while(list -> previous != NULL){
         list = list -> previous;
    }
    return list;
}

DoubleList *DoubleList_getLastNode(DoubleList *list){
    while(list -> next != NULL){
        list = list -> next;
    }
    return list;
}

DoubleList *DoubleList_unshift(DoubleList *list,void* data){
    list = DoubleList_getFirstNode(list);
    DoubleList* temp = (DoubleList *)malloc(sizeof(DoubleList));
    temp -> data = data;
    temp ->previous = NULL;
    temp -> next = list;
    list -> previous = temp;
    return temp;
}

DoubleList *DoubleList_push(DoubleList *list,void* data){
    list = DoubleList_getLastNode(list);
    DoubleList* temp = (DoubleList *)malloc(sizeof(DoubleList));
    temp -> data = data;
    temp ->previous = list;
    temp -> next = NULL;
    list -> next = temp;
    return temp;
}

void* DoubleList_toString(DoubleList *list){
    list = DoubleList_getFirstNode(list);
    while(list != NULL){
        printf("%d",(int)list->data);
        list = list -> next;
    }
}
/*
List* add(List * list,void *data){
    List* temp = (List *)malloc(sizeof(List));
    temp -> data = data;
    while(list -> next != NULL){
        list = list -> next;
    }
    temp -> next = NULL;
    list -> next = temp;
    return list;
}

List* removeAt(List* list,int index){
    while(index != 0){
        index--;
        list = list -> next;
    }
}
*/

#define TEST_LIST_H

#endif //TEST_LIST_H
