#include <stdio.h>
long factorial(int x){
	int i = 0,res = 1;
	for(i++;i<=x;i++){
		res *= i;
	}
	return res;
}
int main(){
	int i = 1;
	printf("����1-5�Ľ׳�\n");
	for(;i<=5;i++){
		printf("%d\n",factorial(i));
	}
	return 0;
} 
