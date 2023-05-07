#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main(){
	int arr[10],i;
	srand(time(0));
	
	for(i = 0;i<10;i++){
		arr[i] = rand()%10;
	}
	
	for(i = 0;i<10;i++){
		printf("%d\n",arr[i]);
	}
	
}
