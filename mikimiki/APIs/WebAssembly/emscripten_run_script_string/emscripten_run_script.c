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

int main(){
    char* js_code = emscripten_run_script_string("let f = () => {return '123aaa'};f();");
    puts(js_code);
    return 1;
}
