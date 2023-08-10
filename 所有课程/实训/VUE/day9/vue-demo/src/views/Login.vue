<template>
  <div>
    <button @click="login">登录</button>
    <router-link to="/show">link to show.vue</router-link>
    <!-- 这里方便查看 -->
    <h2>{{ $store.state.username }}</h2>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$store.commit('saveName', 'huahua')
    }
  },
}
</script>
