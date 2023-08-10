<template>
  <div>
    我是index.vue
    <router-link to="/test">跳转到test</router-link>
    <img style="display: block;" width="200" :src="src" alt="">
    <img width="200" height="200" src="imgs/1.jpg" alt="">
  </div>
</template>

<script>
import img from '../assets/1.jpg'
export default{
  data(){
    return {
      src:img
    }
  }
}
</script>

<style>
</style>
