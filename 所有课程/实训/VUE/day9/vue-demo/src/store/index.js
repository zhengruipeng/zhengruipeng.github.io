import Vuex from 'vuex'
import Vue from 'vue'

//1.安装插件
Vue.use(Vuex)

const state = {
  // 应用启动时，username 置为空
  username: ''
}

const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state,第二个参数传过来的参数
  saveName(state, name){
    state.username = name;
  }
}

//2.创建对象
const store = new Vuex.Store({
  state,
  mutations
})

export default store;
