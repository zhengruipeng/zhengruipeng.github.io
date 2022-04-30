//
// Created by miki on 12/9/2021.
//
#include "stdio.h"
int max(int a,int b){
    return a>b?a:b;
}
int min(int a,int b){
    return a>b?b:a;
}
int main(){
    int a,b,c,m,n,o;
    scanf("%d%d%d",&a,&b,&c);

    m = max(a,b);
    m = max(c,m);
    if(m == a){
        n = max(b,c);
        if(n == b)o = c;
        else o = b;
    }
    else if(m == b){
        n = max(a,c);
        if(n == a)o = c;
        else o = a;
    }
    else{
        n = max(b,a);
        if(n == b)o = a;
        else o = b;
    }
    printf("x=%d,y=%d,z=%d\n",o,n,m);
    return 0;

}


