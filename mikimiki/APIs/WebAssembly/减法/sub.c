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
EM_PORT_API(int) js_sub(int a,int b);
EM_PORT_API(void) js_console_log_int(int param);
EM_PORT_API(void) print_the_answer(){
	int i = js_sub(32,11);
	js_console_log_int(i);
}
