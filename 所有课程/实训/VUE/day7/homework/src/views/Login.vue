<!-- Index.vue -->
<template>
  <div id="container">
    <h1>Login</h1>
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submit" :loading="loading">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      username: "",
      password: "",
      loading: false
    }
  },


  methods: {
    submit() {
      let that = this;

      let check = function () {
        if (that.username.trim() === "" ||
          that.password.trim() === "") {
          that.$notify({
            type: 'warning',
            title: '提示',
            message: '账户名或密码为空'
          });
          return false;

        }
        if (that.password.trim().length < 6 ||
          that.password.trim().length > 8) {
          that.$notify({
            type: 'warning',
            title: '提示',
            message: '密码长度必须小于8且大于6'
          });
          return false;
        }
        return true;
      };

      if (!check()) return false;

      if (this.username !== "admin" ||
        this.password !== "12345678") {
        this.$notify({
          type: 'warning',
          title: '提示',
          message: '账户名或密码错误'
        });
        return false;

      }

      this.loading = true
      setTimeout(function () {
        that.loading = false;
        localStorage.setItem("username", that.username);
        that.$router.push({
          path: '/'
        });
      }, 500)


    }
  }
}
</script>

<style>
#container {
  width: 60vw;
  margin: 0 auto;
  text-align: center;
}

#container > h1 {
  font-weight: 100;
  font-family: "微软雅黑", Arial, sans-serif;
  color: #639;
}
</style>
