//
// Created by miki on 12/10/2021.
//
//
// Created by miki on 12/10/2021.
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
#include <emscripten.h>

EM_PORT_API(double) printParam(int a,int b){
    double res =  EM_ASM_DOUBLE({
        return $1*$0;
    },a,b);
    return res;

}
EM_PORT_API(void) print_double(double d){
    printf("%lf",d);
}
EM_PORT_API(int) main(){
    return 1;
}