<template>
  <div>
    <details>
      <div>
        <!--form组件的垂直布局使用格式 -->
        <el-form>
          <el-form-item label="账号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <!--form组件的水平布局使用格式 -->
        <el-form inline>
          <el-form-item label="账号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
    </details>
    <details>
      <summary>label</summary>
      <el-form label-width="100px" label-position="left">
        <el-form-item label="账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </details>
    <details>
      <summary>size</summary>
        <el-form label-width="100px" label-position="left">
          <!-- 这种做法在form-item内部的所有input都会按照form-item上面的size展示 -->
          <el-form-item label="账号" size="mini">
            <el-input></el-input><el-input></el-input>
          </el-form-item>
          <el-form-item label="密码" size="small">
            <el-input></el-input><el-input></el-input>
          </el-form-item>
        </el-form>
    </details>
  </div>
</template>

<script>
export default {
  name: 'index',

  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleClick() {
      //我们做一个定时处理，首先让loading变成true，1秒之后在变成false
      let _this = this;
      this.loading = true
      setTimeout(function () {
        //注意在非Vue框架本身的回调函数里如果使用了function方法体
        //那么在这个function的内部的this与function外部的this指向的内容是不一样的
        //如果我们想要在setTimeout的function中使用Vue的this需要在方法外先将他附给一个变量
        //如let _this = this;此时的_this才相当于Vue的对象
        _this.loading = false
      }, 1000)
      //setTimeout(()=>{
      //在箭头函数 中this不需要处理
      // this.loading = false
      //},1000)
    }
  }
}
</script>

<style>
</style>
