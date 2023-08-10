<template>
  <div>
    <h4>
      路由传参
    </h4>
    <div>
      <!--
       学习步骤：
       1.首先阅读created生命周期在其中查看打印的query参数，并回头到index.vue中查看传参数方式
       2.观察本页的url路径发现title是通过url传入的所以反复刷新本页参数不消失
       3.我们通过query和params方式分别点击跳转对应页面首先观看参数是否传输成功
       4.首先点击query按钮然后跳转观察url路径，发现路径携带参数，并刷新目标页面发现参数不消失
       5.然后点击params按钮跳转到目标页面观察url路径，发现并没有参数，然后刷新目标页面发现参数消失
       6.通过query按钮跳转到目标页面，点击返回后，再点击本页的前进按钮，发现query参数不消失
       7.通过params按钮跳转到目标页面，点击返回后在点击本页的前进按钮，发现params的参数消失
       -->
      从index.vue中传入的参数:{{ title }}
      <br/>
      <button @click="handleRouterToNextPageByPath">点我通过query传参数</button>
      <button @click="handleRouterToNextPageByName">点我通过params传参数</button>
      <br/>
      <button @click="handleForward">前进</button>
    </div>
    <h4>
      练习：通过localStorage来实现让params的参数刷新也不丢失
      <!--
       步骤：
       1.在handleRouterToNextPageByName中传递的参数追加一个sendTime:当前时间的时分秒(getTime函数已经声明完毕)
       2.在目标页面中声明一个sendTime来接收传入的sendTime
       3.先实现sendTime的传输并能实时展示新跳页的时间
       4.实现params参数不消失的方式实现
         1.由于在目标页面接收sendTime的时候是通过created生命周期获取的，所以就算刷新也会重新执行一次。
         2.我们的思路就是只有在跳转传递参数的时候params中才会存在sendTime和title
         3.那么我们可以在目标页面增加判断，当监测到有参数传递过来的时候我们将参数展示到页面之后再将他们保存到localStorage中
         4.然后在当前页面没有传入参数的时候我们就读取localStorage中存的sendTime和title
         5最终实现的效果为如果从来没有传过params的情况展示的就是空如果第一次用parmas传递过参数后localStorage中就会保存数据
         如果下一次不是传递参数而是刷新，页面就会展示之前的数据，通过此方式我们可以实现缓存params中的参数保证刷新不失效
       -->
    </h4>
  </div>
</template>

<script>
export default {
  name: 'router-param',
  data() {
    return {}
  },
  created() {
    //首先查看this.$route对象内容,查看其内部包含的信息
    console.log(this.$route)
    // 获取通过path传入的参数
    let query = this.$route.query
    console.log(query)
    // 将接到的参数设置到本页的title中
    this.title = this.$route.query.title
  },
  methods: {
    handleRouterToNextPageByPath() {
      // 通过path方式跳转页面时可以通过query方式传参数
      this.$router.push({
        path: '/router-param1',
        query: {
          title: '我是query传入的',
          sendTime: this.getTime()
        }
      });
    },
    handleRouterToNextPageByName() {
      // 通过name方式跳转页面时可以通过params方式传参数
      this.$router.push({
        name: 'router-param1',
        params: {
          title: '我是params传入的',
          sendTime: this.getTime()
        }
      });
    },
    handleForward() {
      // 前进
      this.$router.history.go(1)
    },
    getTime() {
      let d = new Date();
      return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  }
}
</script>

<style>
</style>
