#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
double add(double a,double b){
    return a+b;
}

EMSCRIPTEN_KEEPALIVE
unsigned char* touppercase(unsigned char* string){
    int i = 0;
    for(;string[i] != '\0';i++){
        char currentPos = *(string + i);
        if(currentPos >= 0x61 && currentPos <=0x7a){
            *(string + i) = currentPos - 32;
        }
    }
    return string;
}