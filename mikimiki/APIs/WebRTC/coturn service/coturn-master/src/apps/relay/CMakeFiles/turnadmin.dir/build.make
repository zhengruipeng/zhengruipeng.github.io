# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master"

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master"

# Utility rule file for turnadmin.

# Include the progress variables for this target.
include src/apps/relay/CMakeFiles/turnadmin.dir/progress.make

src/apps/relay/CMakeFiles/turnadmin: src/apps/relay/turnserver
	cd "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/apps/relay" && /usr/bin/cmake -E create_symlink turnserver turnadmin

turnadmin: src/apps/relay/CMakeFiles/turnadmin
turnadmin: src/apps/relay/CMakeFiles/turnadmin.dir/build.make

.PHONY : turnadmin

# Rule to build all files generated by this target.
src/apps/relay/CMakeFiles/turnadmin.dir/build: turnadmin

.PHONY : src/apps/relay/CMakeFiles/turnadmin.dir/build

src/apps/relay/CMakeFiles/turnadmin.dir/clean:
	cd "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/apps/relay" && $(CMAKE_COMMAND) -P CMakeFiles/turnadmin.dir/cmake_clean.cmake
.PHONY : src/apps/relay/CMakeFiles/turnadmin.dir/clean

src/apps/relay/CMakeFiles/turnadmin.dir/depend:
	cd "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master" && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master" "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/apps/relay" "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master" "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/apps/relay" "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/apps/relay/CMakeFiles/turnadmin.dir/DependInfo.cmake" --color=$(COLOR)
.PHONY : src/apps/relay/CMakeFiles/turnadmin.dir/depend

