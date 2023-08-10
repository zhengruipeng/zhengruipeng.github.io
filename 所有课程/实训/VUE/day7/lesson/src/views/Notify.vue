<template>
  <div>
    <el-button @click="handleShowNotify">点我弹出提示</el-button>
  </div>
</template>

<script>
export default {
  name: 'notify',
  methods:{
    handleShowNotify(){
      this.$notify({
        type:'warning',
        title:'提示',
        message:'我是一个通知'
      })
    }
  }
}
</script>

<style>
</style>
