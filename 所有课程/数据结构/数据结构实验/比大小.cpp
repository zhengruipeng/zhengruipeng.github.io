#include <stdio.h>
int min(int arr[],int n){
	int i;
	int res = arr[0];
	for(i=1;i<n;i++){
		res = res>arr[i]?arr[i]:res;
	}
	return res;
}
int main(){
	int arr[]={5,123,0,1,2,3};
	int minV;
	minV = min(arr,3);
	printf("%d",minV);
	
	return 1;
} 
