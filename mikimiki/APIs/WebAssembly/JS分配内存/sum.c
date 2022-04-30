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

EM_PORT_API(int) sum(int* ptr,int count){
    int sum = 0,i;
    for(i = 0;i<count;i++){
        sum += ptr[i];
    }
    return sum;
}

EM_PORT_API(void*) js_malloc(int count){
    void* m = malloc(count);
    return m;
}
EM_PORT_API(void) js_free(void* m){
    free(m);
}