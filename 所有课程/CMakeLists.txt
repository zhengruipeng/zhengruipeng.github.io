cmake_minimum_required(VERSION 3.25)
project(test)

set(CMAKE_CXX_STANDARD 14)

include_directories(c/arithmetic)
include_directories(c/arithmetic/test)

add_executable(
        c/arithmetic/test/List.h
        c/arithmetic/test/main.c
        c/arithmetic/test/stack.h
        c/arithmetic/test/Tree.h
        c/grammar/array/test.cpp
        c/grammar/function/test1.cpp
        c/grammar/random/test.cpp 数据结构/二叉树/后续非递归遍历二叉树.c)
