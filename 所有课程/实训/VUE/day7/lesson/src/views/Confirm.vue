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
      //confirm的经典用法
      this.$confirm('我是询问框的内容','标题',{
        type:'success',//success / info / warning / error
        showClose:false,//true/false 是否右上角的关闭按钮
        showCancelButton:true,//默认为true是否显示取消按钮
        showConfirmButton:true,//默认为true是否显示确认按钮
        cancelButtonText:'取消',//取消按钮的文本，取消按钮的文本
        confirmButtonText:'确认',//确认按钮的文本，确认按钮的文本
      }).then(res => {
        //点击确认时的回调，res为confirm
        this.$notify({
          type:'success',
          title:'提示',
          message:'点击了确认'
        })
      }).catch(err=>{
        //点击取消时的回调，err为cancel
        this.$notify({
          type:'warning',
          title:'提示',
          message:'点击了取消'
        })
      })
    }
  }
}
</script>

<style>
</style>
