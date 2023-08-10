<template>
  <div class="hello">
    <button @click="saveName">保存名字</button>
    <h2>展示名字：{{$store.state.username}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods: {
    saveName() {
      this.$store.dispatch('saveName', 'zhangsan')
    }
  },
}
</script>
