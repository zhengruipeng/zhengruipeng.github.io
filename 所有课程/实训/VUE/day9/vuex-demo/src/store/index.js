import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    //  相当于vuex的计算属性
    showName(state) {
      return 100 + state.count
    }
  },
  mutations: {
    // mutations中不能编写异步代码
    add(state) {
      state.count++
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    }
  },
  actions: {
    addAsync(conText) {
      // 注意：commit只能去找 mutations:里的add，说明 actions:里面如果想修改数据，还只能通过commit去触发 mutations:里的方法，

      // 我们可以通过conText形参,它代表new Vuex.Store，通过conText调用commit这个方法，
      // 结论：1.只有 actions:才能处理异步数，2.只有 mutations:才能修改数据
      setTimeout(() => {
        // conText.commit('add')
        conText.commit('sub')
        // new Vuex.Store.commit（）
      }, 1000);
    },
    addAsyncN(conText, step) {
      setTimeout(() => {
        // conText.commit('addN',step)
        conText.commit('subN', step)
        // new Vuex.Store.commit（）
      }, 1000);
    }


    // actions能编写异步代码,只要是异步操作，必须通过actions:，不能用mutations
  },
  modules: {}
})

// 重要总结：
//      1.commit的作用，就是用来调用 mutations的某个函数
//      2.dispatch函数，专门用来触发 actions:里的某个异步函数
//      3.只有mutations才能修改我们的 state:里的共享数据
//      4.只有actions:才能执行异步数据，所以我在actions:里面用mutations来修改 state:里的共享数据
