# Install script for directory: /mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/." TYPE DIRECTORY FILES "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/man")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/turnserver" TYPE DIRECTORY FILES "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/turndb/")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/doc/turnserver" TYPE DIRECTORY FILES "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/turndb/")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/doc/turnserver" TYPE FILE FILES
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/LICENSE"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/README.turnserver"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/README.turnadmin"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/README.turnutils"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/INSTALL"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/postinstall.txt"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xRuntimex" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc" TYPE FILE RENAME "turnserver.conf.default" FILES "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/examples/etc/turnserver.conf")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/examples/turnserver" TYPE DIRECTORY FILES
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/examples/etc"
    "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/examples/scripts"
    REGEX "/rfc5769\\.sh$" EXCLUDE)
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/src/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/mnt/d/xampp/htdocs/usr/javascript/zhengruipeng.github.io/mikimiki/APIs/webrtc/coturn service/coturn-master/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
