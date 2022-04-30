//
// Created by miki on 12/29/2021.
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
#include "facedetect.h"
#include "facedetectcnn.h"
#include
#define DETECT_BUFFER_SIZE 0x20000
int main(){
    IplImage* p_img = cvL
    int* p_res = facedetect_cnn(pBuffer,imageData,width,height,width*3);
    int i;
    for(i = 0;i < ( p_res ? *p_res:0 );i++){
        short* p = ((short*)(p_res+1))+142*i;
        int x = p[0];
        int y = p[1];
        int w = p[2];
        int h = p[3];
        int neighbors = p[4];
        int angle = p[5];
    }
    return 1;
}