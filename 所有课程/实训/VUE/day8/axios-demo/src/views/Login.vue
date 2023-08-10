<template>
  <div class="p-login">
    <!-- 增加进入的过渡动画 -->
    <transition name="fade-down" appear>
      <div class="p-login-bar">
        <div class="p-title">
          后台管理系统
        </div>
        <!-- 利用form组件构造的结构 -->
        <el-form>
          <el-form-item>
            <el-input prefix-icon="el-icon-user" placeholder="请输入账号" clearable v-model="username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-key" type="password" placeholder="请输入密码" clearable
                      v-model="password"></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="click" :loading="loading">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {APIS} from "../api/network.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,

    }
  },
  methods: {
    async click() {
      let that = this;
      this.loading = true;

      let res = await APIS.login().catch(err => {
        this.$notify({
          type: 'warning',
          title: '提示',
          message: '登录失败'
        })
        that.loading = false;
      });
      if (res.data.code !== 200) {
        this.$notify({
          type: 'warning',
          title: '提示',
          message: res.data.msg
        });
        that.loading = false;

      }

      this.$notify({
        type: 'success',
        title: '提示',
        message: '登录成功'
      });
      that.loading = false;
      sessionStorage.setItem("token", res.data.data.token);

      await this.$router.push({
        path: "/"
      });
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.p-login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg.jpg);
  background-size: cover;

  .p-login-bar {
    width: 400px;
    margin: auto;
    margin-top: 180px;
    padding: 15px 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 9px;
    backdrop-filter: blur(2px);

    .p-title {
      color: #fff;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      padding: 15px 0px;
    }

    .el-input {
      background-color: rgba(0, 0, 0, 0.3) !important;

      ::v-deep {
        .el-input__inner {
          background: rgba(0, 0, 0, 0.3) !important;
        }
      }
    }

    .form-btn {
      text-align: center;
    }
  }

  .fade-down-enter-active {
    animation: fade-down .3s;
  }

  .fade-down-leave-active {
    animation: fade-down .3s reverse;
  }

  @keyframes fade-down {
    from {
      opacity: 0;
      transform: translateY(-100px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
}

</style>
