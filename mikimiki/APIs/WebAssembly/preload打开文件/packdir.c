//
// Created by miki on 12/28/2021.
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
void read_fs(const char* fname){
    FILE* file_pointer = fopen(fname,"rt");
    if(file_pointer){
        while(!feof(file_pointer)){
            char c = fgetc(file_pointer);
            if(c != EOF){
                putchar(c);
            }
        }
        fclose(file_pointer);
    }
}
void write_fs(){
    FILE* fp = fopen("t3.txt","wt");
    if(fp){
        fprintf(fp,"This is t3.txt");
        fclose(fp);
    }
}
int main(){
    read_fs("dat_dir/t1.txt");
    read_fs("dat_dir/t2.txt");
    read_fs("dat_dir/sub_dir/t3.txt");

    write_fs();
    read_fs("t3.txt");
    return 1;
}