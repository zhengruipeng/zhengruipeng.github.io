<template>
  <div class="hello">
    <h2>展示名字：{{username}}</h2>
    <button @click="handleClick">保存名字</button>
  </div>
</template>

<script>
import {  mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['username'])//使用哪个就引入哪个，要映射到计算属性，以便响应式
  },
  methods: {
    ...mapActions(['saveName']),//使用哪个就引入哪个
    handleClick(){
      this.saveName('zhangsan');
    }
  },
}
</script>
