#include <stdio.h>
#include <malloc.h>
#include <math.h>
typedef struct LNode{
    int data;
    struct LNode *next;
}LNode,*LinkList;

void ListTraverse(LinkList L){
    LinkList p;
    p = L -> next;
    while(p != NULL){
        printf("%d\n",p -> data);
        p = p->next;
    }
}
/*	this function create a data item and insert it into aimed position.
*	LinkList L: 被操作链表
*	int i: 添加至第i位后
*	int e: 所添加的数据 
*/
int ListInsert(LinkList &L,int i,int e){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果
    LinkList p,s;
    int k = 1;
    p = L -> next;

    while(p != NULL){
        if(k == i){
            s = (LinkList)malloc(sizeof(LNode));
            s -> data = e;
            s -> next = p -> next;
            p -> next = s;
            return 1;
        }
        k++;
        p = p -> next;
    }
    return 0;
}
/*	this function init. a data chain with given message,save it into L arg..
*	LinkList L :give the verity which want to storage the init. chain.
*	int n :the count of chain items you add*/ 
int CreateList(LinkList &L,int n){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果
    int i ;
    LinkList p;
    L = (LinkList)malloc(sizeof(LNode));
    L -> next = NULL;
    for(i=0;i < n;i++){
    	p = (LinkList)malloc(sizeof(LNode));
    	scanf("%d",&p -> data);
    	p -> next = L -> next;
   		L -> next = p;
    }
    return p -> data;
}
/*	obtain specified element
*	LinkList L operated chain
*	int i the index of element
*	int &e	the data of item
*	*/
int GetElem(LinkList L,int i,int &e){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果
    LinkList p;
    p = L -> next;
    int k = 0;

    while(p != NULL){
        if(k == i){
            e = p -> data;
            return 1;
        }
        k++;
        //printf("%d\n",p->data);
        p = p -> next;
    }
    return 0;
}
int ListDelete(LinkList &L,int i,int &e){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果
	LinkList p,s;
	int k = 1;
	p = L -> next;
	while(p -> next != NULL){
		if(k == i){
			s = p ->next;
			e = s -> data;
			p -> next = p -> next -> next;
			free(s);
			return 1;
		}
		k++;
		p = p -> next;
	}
	return 0;
}
int ClearList(LinkList &L){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果
	LinkList p,s;
	while(L -> next != NULL){
		p = L -> next;
		L -> next = p -> next;
		free(p);
	}
}
int main(){
	LNode node;
	LinkList nodeList;
	int listLength = 3;
	
	//you can create a data chain and put some data
	CreateList(nodeList,listLength);
	
	//check up it with output data	
	ListTraverse(nodeList);

	//and then you can insert extra data in it,and output it with given enumerable function
	//so that,you can check up it again
	int insertMsg;
	scanf("%d",&insertMsg);
	ListInsert(nodeList,2,insertMsg);
	ListTraverse(nodeList);

	//check index 0,2 element in the chain
	int firstData,thridData; 
	GetElem(nodeList,0,firstData);
	GetElem(nodeList,2,thridData);
	printf("the fir. ele. of the chain is %d\n",firstData);
	printf("the thi. ele. of the chain is %d\n",thridData);
	
	//delete index 1 element and output
	int deletedItem;
	ListDelete(nodeList,1,deletedItem);
	printf("the %d item has been deleted",deletedItem);
	
	//after test,clear all of the items
	ClearList(nodeList);
	ListTraverse(nodeList);

	return 0;
}
