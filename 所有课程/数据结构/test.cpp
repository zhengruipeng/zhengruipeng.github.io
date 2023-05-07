#include <stdio.h>
#include <malloc.h>
typedef struct LNode{
	int data;
	struct LNode *next;
}LNode,*LinkList;
int GetElem(LinkList L,int i,int &e){		//&e引用型参数，如果运行过程中给e赋值了希望得到修改之后的结果 
	LinkList p;
	p = L -> next;
	while(p != NULL){
		printf("%d\n",p->data);
		p = p -> next;
	}	
} 
int main(){
	
} 	
