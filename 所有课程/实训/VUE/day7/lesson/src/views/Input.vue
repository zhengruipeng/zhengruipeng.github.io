<template>
  <div>

    <details>
      <summary>代码示例</summary>
      <el-row>
        <el-input></el-input>
      </el-row>
    </details>
    <details>
      <summary>placeholder</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入"></el-input>
        </el-col>
      </el-row>
    </details>
    <details>
      <summary>v-model</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" v-model="inputStr"></el-input>
        </el-col>
      </el-row>
      {{inputStr}}
    </details>
    <details>
      <summary>disabled，和readonly</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" disabled></el-input>
          <el-input placeholder="请输入" readonly></el-input>
        </el-col>
      </el-row>
    </details>
    <details>
      <summary>clearable</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" clearable></el-input>
        </el-col>
      </el-row>
    </details>
    <details>
      <summary>prefix-icon和suffix-icon</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" prefix-icon="el-icon-user" clearable></el-input>
          <el-input placeholder="请输入" prefix-icon="el-icon-remove" clearable></el-input>
        </el-col>
      </el-row>
    </details>
    <details>
      <summary>size</summary>
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" size="10" type="number" clearable></el-input>
        </el-col>
      </el-row>
    </details>
    <details>
      <summary>type属性</summary>
      <el-row>
        <el-col :span="4">
          <el-input type="number"></el-input>
          <el-input type="text"></el-input>
          <el-input type="textarea"></el-input>
          <el-input type="range" max="10" min="1" step='1'></el-input>
          <el-input type="checkbox"></el-input>
        </el-col>
      </el-row>
    </details>
  </div>
</template>

<script>
export default {
  name: 'index',

  data() {
    return {
      loading: false,
      inputStr: ""
    }
  },
  created() {
    this.$notify({
      type:'warning',
      title:'提示',
      message:'这个页面上的input标签默认不能输入，需要绑定v-model'
    })
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
