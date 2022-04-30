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

EM_PORT_API(void) print_int(int a){
    printf("C:%d\n",a);
}
EM_PORT_API(void) print_float(float a){
    printf("C:%f\n",a);
}
EM_PORT_API(void) print_double(double a){
    printf("C:%lf\n",a);
}
EM_PORT_API(int) main(){
    printf("123");
    return 1;
}