<template>
  <div>
    <h1>当前最新的 count值 是：{{ count }}</h1>
    <h1>当前最新的 getters showNum值 是：{{ showName }}</h1>
    <button @click="Sub">-1</button>
    <button @click="SubN">-10</button>
    <button @click="subAsync">...-1</button>
    <button @click="subAsyncN">...-10</button>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
// console.log(mapState);
export default {


  data() {
    return {};
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showName'])
  },

  mounted() {

  },

  methods: {
    // 获取mapMutations这里面映射的两个函数
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['addAsync', 'addAsyncN']),
    Sub() {
      this.sub()
    },
    SubN() {
      this.subN(10)
    },
    subAsync() {
      this.addAsync()
    },
    subAsyncN() {
      this.addAsyncN(10)
    }


  },
};
</script>

<style lang="scss" scoped>

</style>
