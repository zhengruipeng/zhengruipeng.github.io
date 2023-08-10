<template>
  <!-- template中遵循原则有且只有一个根标签 -->
  <div>
    <div class="title">
      {{ name }}
      <button class="btn" @click="handleClick">点我</button>
    </div>

  </div>
</template>

<script>
let counter = 0;
//Vue组件主体部分
export default {
  data() {
    let that = this;
    return {
      name: ++counter,
    }
  },
  methods: {
    handleClick() {
      this.name = ++counter;
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>
<!-- 声明sass语法，只对当前文件生效 -->
<style lang="scss" scoped="scoped">
.title {
  font-weight: bold;
  background-color: red;

  .btn {
    border: none;
    background: green;
    color: #fff;
  }
}

// 这种嵌套写法会解析成
/*
  .title{
    font-weight: bold;
    background-color: red;
  }
  .title .btn{
    border: none;
    background: green;
    color: #fff;
  }
*/
</style>
