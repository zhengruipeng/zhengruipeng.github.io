<template>
  <div>
    <h4>axios基础</h4>
    <div>
      <h4>点我调用/shop-service/v1/api-test/get/demo1接口</h4>
      <el-button :loading="loading" @click="handleClick">调用</el-button>
    </div>
    <div>
      <h4>点我调用/shop-service/v1/api-test/get/demo2接口</h4>
      <el-button :loading="loading" @click="handleClick2">调用</el-button>
    </div>
    <div>
      <h4>点我调用/shop-service/v1/api-test/post/demo1接口</h4>
      <el-button :loading="loading" @click="handleClick3">调用</el-button>
    </div>
    <div>
      <h4>练习：点我调用/shop-service/v1/api-test/post/demo2接口</h4>
      <el-button :loading="loading" @click="handleClick5">调用</el-button>
    </div>
    <div>
      <h4>点我调用
        /shop-service/v1/api-test/path/demo1/username/{username}/password/{password}接口</h4>
      <el-button :loading="loading" @click="handleClick4">调用</el-button>
    </div>
  </div>
</template>

<script>
// 导入外部定义的接口函数
import {postDemo1, pathDemo1, pathDemo2} from '../api/api-test.js'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleClick() {
      this.loading = true
      this.$http({
        url: '/api-test/get/demo1',
        method: 'get'
      }).then(res => {
        console.log(res.data)
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      })
    },
    async handleClick2() {
      this.loading = true
      let res = await this.$http({
        url: '/api-test/get/demo1',
        method: 'get'
      }).catch(err => {
        this.loading = false;
      });

      console.log(res.data)
      this.loading = false;
    },
    async handleClick3() {
      let res = await postDemo1().catch(err => err);
      console.log(res.data)
    },
    async handleClick4() {
      // 执行postDemo1调用path/demo1接口并传入username和password
      let username = 'admin'
      let password = '123456'
      // username和password在api-test.js中已经定义所以可以直接传入
      let res = await pathDemo1(username,password).catch(err => err);
      console.log(res.data)
    },
    async handleClick5() {
      // 执行postDemo1调用path/demo1接口并传入username和password
      let username = 'admin'
      let password = '123456'
      // username和password在api-test.js中已经定义所以可以直接传入
      let res = await pathDemo2(username,password).catch(err => err);
      console.log(res.data)
    }
  }
}
</script>

<style>
</style>
