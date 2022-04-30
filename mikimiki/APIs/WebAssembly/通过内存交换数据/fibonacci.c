//
// Created by miki on 12/9/2021.
//
#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCIPREN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if define(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif
#include <stdio.h>
#include <stdlib.h>
EM_PORT_API(int*) fibonacci(int count){
    if(count == 0)return NULL;
    int* re = (int *)malloc(count * 4);
    if(re == NULL){
        printf("分配空间失败");
        return NULL;
    }
    re[0] = 1;
    int a = 0,b = 1,i;
    for(i=1;i<count;i++){
        re[i] = a+b;
        a = re[i-1];
        b = re[i];
    }
    return re;
}

EM_PORT_API(void) free_buf(void* buf){
    free(buf);
}
