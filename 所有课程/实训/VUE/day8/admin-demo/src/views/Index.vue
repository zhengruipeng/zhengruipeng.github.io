<template>
  <div class="p-index">
    <el-container class="p-el-container">
      <el-header>
        后台管理系统训练
      </el-header>
      <el-container>
        <el-aside>
          <ul>
            <li>
              <router-link to="/test1">
                跳转到Test1.vue
              </router-link>
            </li>
            <li>
              <router-link to="/test2">
                跳转到Test2.vue
              </router-link>
            </li>
          </ul>
        </el-aside>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
</script>

<style lang="scss" >
  .p-index{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .p-el-container{
      height: 100%;
      .el-header{
        background-color: #666666;
        line-height: 60px;
        color: #fff;
      }
      .el-aside{
        background-color: #888888;
      }
      .el-main{
        background-color: #CCCCCC;
      }
    }

  }
</style>
