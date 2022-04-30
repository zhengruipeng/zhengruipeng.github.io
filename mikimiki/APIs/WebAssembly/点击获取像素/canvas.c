//
// Created by miki on 12/30/2021.
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
uint8_t* img_buf = NULL;
int img_height = 0,img_width = 0;
EM_PORT_API(uint8_t*) get_img_buf(int w,int h){
    if(img_buf == NULL || img_width == w|| img_height == h){
        if(img_buf != NULL){
            free(img_buf);
        }
        img_buf = (uint8_t*)malloc( w * h * 4 );
        img_height = h;
        img_width = w;
    }
    return img_buf;
}

EM_PORT_API(void) on_mouse_move(int x,int y){
    printf("mouseX:%d;mouseY:%d;RGBA:{%d,%d,%d,%d}\n",x,y,
           img_buf[(y*img_width + x)*4],
           img_buf[(y*img_width + x)*4 + 1],
           img_buf[(y*img_width + x)*4 + 2],
           img_buf[(y*img_width + x)*4 + 3]);
}
EM_PORT_API(void) on_key_down(const char* keys){
    printf("onkeydown:%s\n",keys);
}