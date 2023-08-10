<template>
  <div>
    <details>
      <summary>代码示例</summary>
      <el-button>按钮</el-button>

      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-button-group>
    </details>
    <details>
      <summary>type属性</summary>
      <el-button type="default">第一个按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="text">文字按钮</el-button>
    </details>
    <details>
      <summary>plain属性</summary>
      <el-row>
        <!--
          自定义组件的属性如果是boolean类型可以简写为只写属性名称
          plain 相当于:plain="true"以便于让代码更加简洁
        -->
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>
    </details>
    <details>
      <summary>round属性</summary>
      <el-row>
        <!-- round属性仍然是boolean类型 -->
        <el-button round>朴素按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </el-row>
    </details>
    <details>
      <summary>circle属性</summary>
      <el-row>
        <!-- 圆按钮不要输入文字会破坏圆形按钮的样式 -->
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
    </details>
    <details>
      <summary>icon属性</summary>
      <el-row>
        <el-button type="primary" icon="el-icon-orange" round>主要按钮</el-button>
        <el-button type="success" icon="el-icon-orange" round>成功按钮</el-button>
        <el-button type="info" icon="el-icon-orange" round>信息按钮</el-button>
        <el-button type="warning" icon="el-icon-orange" round>警告按钮</el-button>
        <el-button type="danger" icon="el-icon-orange" round>危险按钮</el-button>
      </el-row>
    </details>
    <details>
      <summary>disabled属性</summary>
      <el-row>
        <!--
          自定义组件的属性如果是boolean类型可以简写为只写属性名称
          plain 相当于:plain="true"以便于让代码更加简洁
        -->
        <el-button plain disabled>朴素按钮</el-button>
        <el-button type="primary" disabled plain>主要按钮</el-button>
        <el-button type="success" disabled plain>成功按钮</el-button>
        <el-button type="info" disabled plain>信息按钮</el-button>
        <el-button type="warning" disabled plain>警告按钮</el-button>
        <el-button type="danger" disabled plain>危险按钮</el-button>
      </el-row>
    </details>
    <details>
      <summary>size属性</summary>
      <el-row>
        <el-button size="normal">普通按钮</el-button>
        <el-button size="medium">中等按钮</el-button>
        <el-button size="small">小按钮</el-button>
        <el-button size="mini">迷你按钮</el-button>
      </el-row>
    </details>
    <details>
      <summary>加载状态</summary>
      <el-row>
        <el-button loading>
          按钮
        </el-button>
      </el-row>
    </details>
    <details>
      <summary>事件</summary>

      <el-button @click="handleClick" :loading="loading">加载按钮</el-button>
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
