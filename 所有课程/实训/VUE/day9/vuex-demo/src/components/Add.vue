<template>
    <div>
          <h1>当前最新的   count值 是：{{$store.state.count}}</h1>
          <h1>当前最新的 getters  count值 是：{{$store.getters.showName}}</h1>
          <button @click="Add">+1</button>  
          <button @click="AddN">+10</button>  
          <button @click="AddAsync">...+1</button>  
          <button @click="AddAsyncN">...+10</button>  
    </div>
</template>

<script>
export default {
   

    data() {
        return {
         
        };
    },

    mounted() {
        
    },

    methods: {
        Add() {
            //   this.$store.state.count++
            //   按照编程思路，这样写也可以+1，没有报错，但是这么操作是不正确的。因为$store是全局的数据，vuex里不允许store直接
            //   去修改里面的数据，这样是不合法的。 mutations这才是用来修改变更$store数据的
            this.$store.commit('add')
            // Vue.new Vuex.Store.commit
            
        },
        AddN() {
              this.$store.commit('addN',10)
        },
        AddAsync() {
            //    异步让count+1
            // dispatch用来触发某个actions里的函数，把对应的函数名addAsync声明过来
            this.$store.dispatch('addAsync') 
        },
        AddAsyncN() {
            //    异步让count+1
            // dispatch用来触发某个actions里的函数，把对应的函数名addAsync声明过来
            this.$store.dispatch('addAsyncN',10) 
        }
       
        
    },
};
</script>

<style lang="scss" scoped>

</style>