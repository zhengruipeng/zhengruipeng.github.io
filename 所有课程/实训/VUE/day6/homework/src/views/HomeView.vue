<template>
  <div id="root">
    <router-link to="/parent">转至parent页面</router-link>

<!--    <transition name="fade">-->
      <router-view></router-view>
<!--    </transition>-->
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>
<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: 5s;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: 5s;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
