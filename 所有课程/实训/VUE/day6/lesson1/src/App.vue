<!--
	把App.vue理解成Vue.component('App',{})这个形式的组件的话
  template这个标签就相当于组件中的template属性
	由于我们在html中编写自定义组件时template是字符串形式，没有语法补全和语法着色，这样不利于我们维护自定义组件
	所以我们在.vue文件中把它单独的模版化这样写在template标签内部的内容就相当于template的值方便我们进行维护
-->
<template>
  <div id="app">
    <nav>
      <!--router-link是vue-router提供的跳页组件
      to代表跳页路径路径对应的页面参考router文件夹中的index.js中的配置就可以找到跳转到哪个组件中 -->
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/my-view">MyView</router-link>
      |
      <router-link to="/my-view2">MyView2</router-link>
    </nav>
    <!--
			router-view代表vue-router中配置的标签的容器，它相当于我们学习的component动态组件
			也就是说当我们点击Home的时候他展示的就是router中配置的Home.vue组件内容
		-->
    <router-view/>
  </div>
</template>
<script>
//export default为固定写法意义为导出当前页面的js对象
//该对象相当于Vue.component('app',{})中的json部分，写法就是Vue对象的正常写法，可以使用所有Vue选项和生命周期
export default {
  name: 'app',//.vue文件中的组件名称定义name:app,他相当于自定义组件的名称。就相当于 Vue.component('app',{})
  data() {
    return {
      name: 'hello'
    }
  },
  methods: {},
  props: {},
  computed: {},
  watch: {}
}
</script>
<!--
	style标签代表css样式书写的区域，每个组件内部可以编写组件自己的样式
  style有两个属性 lang="书写语法" 默认是css。由于项目引入了dart-sass
所以lang表示的语法为scss关于scss可以使用css的所有语法，并且可以通过样式嵌套来简化css的代码量
	style的另一个属性为scoped
	style标签默认书写的样式虽然是写在每个vue文件中的但是默认是全局生效的，不同的文件可能会由于样式相同导致冲突，所以style加入了scoped="scoped"这个属性，设置这个属性之后当前的style标签中书写的css样式只有该文件内部的标签可使用其他文件无法引用

-->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
