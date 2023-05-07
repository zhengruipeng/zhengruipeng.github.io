#define list_init_size 100 
#define listincrement 10
#include <stdio.h>
#include <malloc.h>

typedef struct{
	int *elem;    //基址
	int length;   //长度
	int listsize;  //当前分配存储空间容量 
}SqList; 

int initList(SqList &l,int n){
	l.elem = (int*)malloc(list_init_size*sizeof(int));
	if(!l.elem) return 0;    //内存溢出
	l.length = 0 ;
	l.listsize = list_init_size;
	if(n>l.listsize) return 0;
	for(int i = 0;i<n;i++){
		scanf("%d",&l.elem[i]);
		l.length++;
	}
}

int getLength(SqList l){
	return l.length;
}

int iterator(SqList l){
	int i;
	for(i=0;i<l.length;i++){
		printf("%d  ",l.elem[i]); 
	}
	printf("\n");
}

int isEmpty(SqList l){
	return l.length == 0?1:0;
}

int clear(SqList &l){
	l.length = 0;
}

int freeList(SqList &l){
/*	int i = 0;
	for(;i<l.length;i++){
		free(l[i]);
	}*/
	free(l.elem);
	l.length = 0;
}

int getItem(SqList l,int n){
	return l.elem[n];
}

int createItem(SqList &l,int data,int index){
	int i = l.length;
	int t;
	
	if(l.length+1>l.listsize)return 0;
	l.length++;

	for(;i>index;i--){
		//printf("%d--%d",l.elem[i],l.elem[i-1]);
		l.elem[i] = l.elem[i-1];
		
	}
	l.elem[index] = data;
}

int deleteItem(SqList &l,int index){
	int i = index;
	int res = l.elem[index];
	for(;i<l.length;i++){
		l.elem[i] = l.elem[i+1]; 
	}
	l.length--;
	return res;
	
}

int indexOf(SqList &l,int data){
	int i = 0;
	for(;i<l.length;i++){
		if(l.elem[i] == data)return i;
	}
	return -1;
}

int preEle(SqList l,int index){
	return l.elem[index-1]?l.elem[index-1]:0;
}
int nextEle(SqList l,int index){
	return l.elem[index+1]?l.elem[index+1]:0;
}

int main(){
	SqList sqlist;
	
	printf("init a array,the length of this array is 5,thus you can input 5 digits\n");
	initList(sqlist,5);
	printf("the array is:");
	iterator(sqlist);
	printf("\n");
	
	printf("create 5 element with circling program,and create a random digit at index 1\n");
	int i = 1;
	for(;i<=5;i++){
		createItem(sqlist,i+5,i);
	}
	createItem(sqlist,765,1);
	printf("output all of the data ");
	iterator(sqlist);
	printf("\n");

	//delete index 2,4 item
	printf("delete 2nd item:%d\n",deleteItem(sqlist,2));
	printf("delete 4th item:%d\n",deleteItem(sqlist,4));
	iterator(sqlist);
	printf("\n");

	printf("the length of the array is %d",getLength(sqlist));
	if(!isEmpty(sqlist))printf(" and it is not empty\n");
	
	
	printf("get 2nd element %d\n",getItem(sqlist,2));
	
	printf("start to clear the array\n");
	clear(sqlist);
	
	printf("clear over\n");
	printf("the length of the array is %d",getLength(sqlist));
	if(isEmpty(sqlist))printf(" and it is now empty\n");
	
	printf("inserting 5 element in test,6,7,8,9,10\n");
	i = 1;
	for(;i<=5;i++){
		createItem(sqlist,i+5,i-1);
	}
	printf("after insert elems. the datas of the array is now \n");
	iterator(sqlist);
	
	printf("and thus,locale the index of 8\n");
	printf("the index of 8 is %d\n",indexOf(sqlist,8));
	
	printf("we can also obtain the previous element`s data with programming ,the next one is so on\n");
	printf("the previous data of 8 is %d\n",preEle(sqlist,indexOf(sqlist,8)));
	printf("the next data of 8 is %d\n",nextEle(sqlist,indexOf(sqlist,8)));
	
	
	printf("start to distroy the array\n");
	freeList(sqlist);
	printf("the array has been distroyed,the test is over\n");
	printf("the length of the array :%d\n",sqlist.length);
	printf("and it`s empty:%d\n",isEmpty(sqlist));

	return 0; 
} 
