<template>
  <div>
    {{ str }}
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      str: 'hello1'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>