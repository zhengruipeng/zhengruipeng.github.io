<template>
  <div>
    <h4>
      路由传参数1（接参数页面）
      <button @click="handleGoBack">返回</button>
    </h4>
    <div>
      1.时间:{{ sendTime }}<br/>
      2.通过query传入的参数:{{ queryTitle }}<br/>
      3.通过params传入的参数:{{ paramsTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'router-param1',
  data() {
    return {
      queryTitle: '',
      sendTime: '',
      paramsTitle: ''
    }
  },
  created() {
    //通过$route数据对象从query中获取参数
    let query = this.$route.query;
    //通过$route数据对象从params中获取参数
    let params = this.$route.params;

    if (params.title)
      localStorage.setItem("params", params.title);

    this.queryTitle = query.title;
    this.sendTime = params.sendTime ?? query.sendTime;
    this.paramsTitle = params.title ?? localStorage.getItem("params");
  },
  methods: {
    handleGoBack() {
      // 后退
      this.$router.history.go(-1)
    }
  }

}
</script>

<style>
</style>
