<!-- 将页面改造成如下效果并阅读注释学习form的新属性 -->
<template>
  <div>
    <el-page-header @back="handleBack" content="新增会员卡信息"></el-page-header>
    <!--
      model绑定的addForm是为了关联rules中表单验证对象使用的，相当于指定了这个表单要验证的对象是哪个对象
      ref相当于对这个表单组件进行命名，我们可以通过this.$refs.addForm来直接拿到这个表单组件。
      rules代表表单验证对象，绑定了表单验证对象之后就可以在rules中编写校验规则
      label-width="auto"是让左侧的label可以自适应排列

    -->
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="auto">
      <!--
        label代表表单的标题
        prop="username"代表用户账号的addForm.username这个值在rules里对应的key也是username，结合rules中定义的key理解

      -->
      <el-form-item label="名称" size="mini" prop="name">
        <!-- v-model绑定了addForm.username并且通过外层嵌套的prop关联到了rules中的username  v-model.trim代表输入的内容前后不允许输入空格-->
        <el-input clearable placeholder="请输入" v-model.trim="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.status"></el-input>
      </el-form-item>
      <el-form-item label="卡号" size="mini" prop="num">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="数量" size="mini" prop="count">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.count"></el-input>
      </el-form-item>
      <el-form-item label="类型" size="mini" prop="cardTypeId">
        <el-select
            placeholder="请选择"
            clearable
            v-model.trim="addForm.cardTypeId">
          <el-option v-for="item in cardTypeIdList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" label="logo"
                    prop="logo">
        <p-upload
            list-type="picture-card"
            :limit="1"
            v-model="fileList"
            action="/file/upload"
            :before-upload="handleBeforeUpload"
            :on-error="handleError">
        </p-upload>
      </el-form-item>
      <el-form-item label="备注" size="mini" prop="remark">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.remark"></el-input>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
import {mapState, mapActions} from 'vuex'
import {getGoodsTypeList} from "@/api/card-type-api.js";

export default {
  // 定义了组件的名称，用来结合keep-alive缓存页面
  name: 'goods-test-add',
  data() {
    return {
      loading: false,

      addForm: {
        name: "",
        status: "",
        num: "",
        count: "",
        cardTypeId: "",
        remark: ""
      },
      cardTypeIdList: [],
      fileList: [],
      rules: {
        name: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        status: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        num: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        count: [{
          required: true,//required为true时会自动增加*，并且不与自定义验证冲突
          validator(rules, value, callback) {
            if (Number.isNaN(value - 0) ||
                value - 0 <= 0 ||
                value - 0 > 100)
              callback(new Error('数量不对'));

            callback();
          }
        }]
      }
    }
  },

  computed: {},

  async created() {
    let response = await getGoodsTypeList();
    this.cardTypeIdList = response.data.data.list;
    console.log(this.list)
  },

  async activated() {
    await getGoodsTypeList();
  },
  methods: {
    ...mapActions('cardModel', ["insertMultiple"]),
    handleBack() {
      this.$router.history.go(-1)
    },
    async submit() {
      //在提交逻辑执行之前先调用手动表单验证
      let valid = await this.$refs.addForm.validate().catch(err => err);
      //验证通过后在执行提交逻辑
      if (!valid) {
        return this.$notify({
          type: "warning",
          message: "请注意填写的格式",
          title: "警告"
        });
      }

      this.addForm.logo = this.fileList[0].url
      console.log(this.addForm)
      this.subLoading = true
      await this.insertMultiple(this.addForm)
      this.subLoading = false
      this.$router.push('/card')

    },
    handleBeforeUpload(file) {
      // 判断当前的文件类型如果不是这些类型的文件就弹出错误提示并中断上传操作
      if (!(file.name.indexOf('png') !== -1
          || file.name.indexOf('jpg') !== -1
          || file.name.indexOf('jpeg') !== -1
          || file.name.indexOf('gif') !== -1)) {
        this.$notify({
          title: '提示',
          message: '只能上传图片格式的文件',
          type: 'error'
        })
        // 通过return Promise.reject()可以实现中断上传操作，不在触发上传的函数
        // 但是这里要注意的是，组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
        // 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
        return Promise.reject()
      }
    },
    handleError(err) {
      this.$notify({
        title: '提示',
        message: '上传失败',
        type: 'error'
      })
    }
  }
}
</script>

<style>
</style>
