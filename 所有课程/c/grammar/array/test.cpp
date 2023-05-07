#include <stdio.h>
int main(){
	int i = 0;
	int arr[10] = {0,0,0,1,2,3};
	arr[0] = 123;
	arr[1] = 111;
	arr[2] = 321;
	for(;i<10;i++){
		printf("%d\n",arr[i]);
	}
	return 0;
}
