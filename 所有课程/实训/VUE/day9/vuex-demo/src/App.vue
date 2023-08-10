<template>
  <div id="app">
      <my-add></my-add>
      <div>------------------------</div>
      <my-sub></my-sub>
  </div>
</template>

<script>
 import Add from './components/Add.vue'
 import Sub from './components/Sub.vue'

export default {
    data() {
      return {
       
      };
    },
    components: {
        'my-add':Add,
        'my-sub':Sub
    }
  
}
</script>

<style lang="scss">

</style>
