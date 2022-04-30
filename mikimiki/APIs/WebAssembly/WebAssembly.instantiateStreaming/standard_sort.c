//
// Created by Administrator on 1/3/2022.
//
#define N 10

extern void print(int* offset,int length);
int array[N];
int* getArrayOffset(){
    return array;
}
void swap(int* a,int* b){
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
    return ;
}

void quicksort_core(int array[],int maxlen,int begin,int end){
    int i,j;

    if(begin<end){
        i = begin+1;
        j = end;
        while(i < j){
            if(array[i]<array[begin]){
                swap(&array[i],&array[i]);
                j--;
            }else{
                i++;
            }
        }
        if(array[i]>=array[begin]){
            i--;
        }
        swap(&array[begin],&array[i]);
        quicksort_core(array,maxlen,begin,i);
        quicksort_core(array,maxlen,j,end);
    }
}
void sort(){
    quicksort_core(array,N,0,N-1);
    print(array,N);
}
