<template>
  <div>
    <h4>
      路由动画
    </h4>
    <router-link to="/transition/">进入页面1</router-link>
    |
    <router-link to="/transition/router-children2">进入页面2</router-link>
    |
    <router-link to="/transition/router-children3">进入页面3</router-link>
    <!--
     首先查看过渡效果，然后我们去优化他
     注意事项：
     由于路由切换是两个组件第一个隐藏第二个展示，并且是同时发生的，所以
     默认两个组件在执行过渡的时候会有共存时间，那么他们共存的时候默认是两个html元素的排列
     所以会出现上下两个组件同时出现的情况。
     我们想要的结果是让两个组件可以重合展示，那么通过过去学习的css知识可以通过position：absolute来实现
     观察下面的css样式并打开注释，再次查看页面。是否修复了动画的瑕疵
     -->
    <!-- 对子路由增加跳转动画，用法与transition时学习的内容完全一致-->
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <h4>
      课堂练习：对根路由增加过渡动画
    </h4>
  </div>
</template>

<script>
</script>

