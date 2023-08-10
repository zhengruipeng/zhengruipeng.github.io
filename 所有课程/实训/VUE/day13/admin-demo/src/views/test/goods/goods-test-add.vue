<!-- 将页面改造成如下效果并阅读注释学习form的新属性 -->
<template>
  <div>
    <el-page-header @back="handleBack" content="新增商品信息"></el-page-header>
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
      <el-form-item label="商品名称" size="mini" prop="name">
        <!-- v-model绑定了addForm.username并且通过外层嵌套的prop关联到了rules中的username  v-model.trim代表输入的内容前后不允许输入空格-->
        <el-input clearable placeholder="请输入" v-model.trim="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" size="mini" prop="price">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="折扣" size="mini" prop="zheKou">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.zheKou"></el-input>
      </el-form-item>
      <el-form-item label="剩余货物量" size="mini" prop="count">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.count"></el-input>
      </el-form-item>
      <el-form-item label="备注" size="mini" prop="remark">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="简介" size="mini" prop="description">
        <el-input clearable placeholder="请输入" v-model.trim="addForm.description"></el-input>
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
import {getAllRoleList, addUser} from '../../../api/role-api.js'

export default {
  // 定义了组件的名称，用来结合keep-alive缓存页面
  name: 'goods-test-add',
  data() {
    return {
      loading: false,

      addForm: {
        name: "",
        price: "",
        zheKou: "",
        count: "",
        remark: "",
        description: "",
      },
      rules: {
        /*username: [
          {required: true, message: '用户名不可以为空', trigger: 'change'},
          {
            validator: function (rule, value, callback) {
              //下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
              if (value.length < 6) {
                //不满足条件，返回错误信息
                callback(new Error('用户账号不能少于6位'))
              } else {
                //满足条件调用callback让验证通过
                callback()
              }
            }, trigger: 'change'
          }
        ],
        nickname: [],
        password: [
          {
            required: true,
            message: '用户名不可以为空',
            trigger: 'change'
          }
        ],
        roleId: [],*/
        name: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        price: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        zheKou: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        count: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        remark: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ],
        description: [
          {required: true, message: '不可以为空', trigger: 'change'}
        ]
      }
    }
  },

  computed: {
    // ...mapState('goodsModel', ['roleList'])
  },
// 当第一次打开页面时会执行created生命周期
  async created() {
    // await this.getRoleList();
  },
// 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
  async activated() {

  },
  methods: {
    ...mapActions('goodsModel', ["insert"]),
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

      //让按钮转圈
      this.loading = true;
      console.log(this.addForm)
      // return ;
      //调用insert函数并将参数addForm传入
      await this.insert(this.addForm)
      //取消动画
      this.loading = false;
      //回到查询页面
      this.$router.push('/goods')

    }
  }
}
</script>

<style>
</style>
