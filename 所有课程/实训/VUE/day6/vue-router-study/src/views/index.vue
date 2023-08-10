<template>
  <div>
    <ul>
      <li>
        <router-link to="/js-router">编程式路由</router-link>
      </li>
      <li>
        <!-- 在url中传入了参数 -->
        <router-link to="/router-param?title=我是index传入的参数">路由传参</router-link>
      </li>
      <li>
        <router-link to="/router-children">嵌套路由</router-link>
      </li>
      <li>
        <router-link to="/transition">路由过渡动画</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style>
</style>
