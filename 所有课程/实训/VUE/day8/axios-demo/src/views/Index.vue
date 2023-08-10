<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <div id="menu-container"></div>
        <!--      <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>-->


        <!--        <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>-->

        <!--
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>-->
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import {APIS} from "../api/network.js"

export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    APIS.list().then(response => {
      let status = response.data.code;
      if (status === 401) {
        this.$notify({
          type: 'warning',
          title: '提示',
          message: '获取错误'
        });
        return false;
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style lang="scss">
.p-index {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  .p-el-container {
    height: 100%;

    .el-header {
      background-color: #666666;
      line-height: 60px;
      color: #fff;
    }

    .el-aside {
      background-color: #888888;
    }

    .el-main {
      background-color: #CCCCCC;
    }
  }

}
</style>
