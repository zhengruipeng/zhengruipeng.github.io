<!-- Index.vue -->
<template>
  <div>
    <div class="p-layout">
      <el-header>
        <el-button type="primary" plain id="button" @click="show">选项</el-button>
        <el-button type="primary" plain id="quit-btn" class="hidden" @click="quit">退出</el-button>

      </el-header>
      <el-container>
        <el-aside>
          <nav>
            <router-link to="/index/son1">son1</router-link>
            <router-link to="/index/son2">son2</router-link>
          </nav>
        </el-aside>
        <el-main>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    show() {
        const quitBtn = document.querySelector("#quit-btn");
        quitBtn.classList.toggle("hidden");
    },
    quit() {
      this.$confirm('我是询问框的内容','标题',{
        type:'success',//success / info / warning / error
        showClose:false,//true/false 是否右上角的关闭按钮
        showCancelButton:true,//默认为true是否显示取消按钮
        showConfirmButton:true,//默认为true是否显示确认按钮
        cancelButtonText:'取消',//取消按钮的文本，取消按钮的文本
        confirmButtonText:'确认',//确认按钮的文本，确认按钮的文本
      }).then(_ => {
        localStorage.removeItem("username");
        this.$router.push({
          path: '/login'
        });
      }).catch(e => {})
    }
  },
  created() {
    if (!localStorage.getItem("username")) {
      this.$router.push({
        path: '/login'
      });
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
#quit-btn.hidden{
  display: none;

}
.p-layout {
  .el-header {
    background-color: #f003;
  }

  .el-container {
    height: 200px;

    .el-aside {
      a {
        display: block;
        color: #000;
        text-decoration: none;
        padding: 15px;
        transition: .3s;
        background-color: #fff0;

      }

      a:hover {
        background-color: #fffa;
      }

      background-color: #0f03;
    }

    .el-main {
      background-color: #00f3;
    }
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: .5s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: .5s;
}
</style>
