<template>
  <div>
    <h4>
      嵌套路由
    </h4>
    <div>
      <router-link to="/router-children/">进入页面1</router-link> |
      <router-link to="/router-children/router-children2">进入页面2</router-link> |
      <router-link to="/router-children/router-children3">进入页面3</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    name:'router-children'
  }
</script>

<style>
</style>
