<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    watch:{
      $route(to,from){
        console.log('我是to对象的内容')
        // to对象包含了要跳转到的目标页面的路由$route对象的所有信息，我们可以在跳转的过程中得到目标页面的path，name
        //params，query等信息，并进行提前处理
        console.log(to)
        // to对象包含了跳转的起始页面的路由$route对象的所有信息，我们可以在跳转的过程中得到目标页面的path，name
        //params，query等信息，并进行提前处理
        console.log('我是from对象的内容')
        console.log(from)
        // 阅读到这里之后我们打开下面的注释然后回到主菜单页面并点击“嵌套路由”，查看效果
        //发现无法进入嵌套路由页面了，查看以下逻辑分析，我们是在监测到to对象的path为/router-children
        //的时候就通过this.$router又跳回了首页，所以“嵌套路由”页面就无法进入了，这就是我们在路由监听中常用的处理方式
        // if(to.path == '/router-children'){
        //   this.$router.push('/')
        // }
      }
    }
  }
</script>
<style lang="scss">

</style>
