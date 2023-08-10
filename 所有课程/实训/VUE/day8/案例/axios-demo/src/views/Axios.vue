<template>
  <div>
    <h4>axios基础</h4>
    <div>
      <h4>点我调用/shop-service/v1/api-test/get/demo1接口</h4>
      <el-button :loading="loading" @click="handleClick">调用</el-button>
    </div>
    <div>
      <h4>点我调用/shop-service/v1/api-test/get/demo2接口</h4>
      <el-button :loading="loading" @click="handleClick1">调用</el-button>
    </div>
    <div>
      <h4>点我调用/shop-service/v1/api-test/post/demo1接口</h4>
      <el-button :loading="loading" @click="handleClick2">调用</el-button>
    </div>
    <div>
      <h4>练习：点我调用/shop-service/v1/api-test/post/demo2接口</h4>
      <el-button :loading="loading" >调用</el-button>
    </div>
    <div>
      <h4>点我调用
​/shop-service​/v1​/api-test​/path​/demo1​/username​/{username}​/password​/{password}接口</h4>
      <el-button :loading="loading" @click="handleClick4" >调用</el-button>
    </div>
  </div>
</template>

<script>
  // 导入外部定义的接口函数
  import { postDemo1,pathDemo1 } from '../api/api-test.js'
  export default{
    data(){
      return {
        loading:false
      }
    },
    methods:{
      // 通过this对象调用接口的方式
      handleClick(){
        this.loading = true
        // 当axios安装到vue上之后我们的axios对象就绑定到了this.$http上
        //我们就可以在所有文件中通过this.$http进行接口的调用
        this.$http({
          url:'http://localhost:3000/shop-service/v1/api-test/get/demo1',
          //当配置了proxy代理之后请求地址不需要携带端口号以及ip地址部分，
          //并且/shop-service/v1这个前缀我们已经在http/index.js中做了全局配置所以
          //只需要填写从/api-test开始部分的路径即可
          // url:'/api-test/get/demo1',
          method:'get'
        }).then(res => {
          console.log(res.data)
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      },
      // 采用async和await得方式进行调用
      async handleClick1(){
        let res = await this.$http({
          url:'/api-test/get/demo2',
          // params中的json对象会被转换成?key=value&key=value...拼接到url后面并发送到后台
          params:{
            username:'admin',
            password:'123456'
          },
          // catch是调用接口出现异常时将错误信息返回到res里
        }).catch(err => err)
        console.log(res.data)
      },
      // 通过外部引入的方式
      async handleClick2(){
        // 执行postDemo1调用post/demo1接口
        let res = await postDemo1().catch(err => err);
        console.log(res.data)
      },
      // 通过外部引入的方式
      async handleClick4(){
        // 执行postDemo1调用path/demo1接口并传入username和password
        let username = 'admin'
        let password = '123456'
        // username和password在api-test.js中已经定义所以可以直接传入
        let res = await pathDemo1(username,password).catch(err => err);
        console.log(res.data)
      }
    }
  }
</script>

<style>
</style>
