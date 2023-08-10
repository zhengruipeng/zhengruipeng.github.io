<template>
  <div>
    <el-page-header @back="handleBack" content="增加用户信息"></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
            :model="addForm"
            label-width="auto"
            ref="addForm"
            :rules="rules">
          <el-form-item size="mini" prop="username" label="账号">
            <el-input placeholder="请输入" clearable v-model.trim="addForm.username"></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="password" label="密码">
            <el-input placeholder="请输入" clearable v-model.trim="addForm.password"></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="nickname" label="昵称">
            <el-input placeholder="请输入" clearable v-model.trim="addForm.nickname"></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="roleId" label="角色">
            <el-select placeholder="请选择" clearable v-model.trim="addForm.roleId">
              <el-option v-for="item in roleList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- label是左侧标题 prop是表单验证对象rules的key -->
          <el-form-item size="mini" label="头像" prop="face">
            <!--
            list-type：设置组件样式有三个，text,picture,picture-card
            limit:设置最大上传图片的数量必须传数字类型
            v-model:放置一个数组数组中包含上传成功的文件的全部信息
            action：上传接口的地址，前面通用的部分已经设置好了，直接写/file开头
            before-upload：是上传前触发的回调函数可以在上传之前做拦截或者验证操作
            on-error：上传失败的回调如果不失败就不会触发
            -->
            <!--
            关于fileList中的内容，如果图片是自己上传的，fileList中会包含大量的图片文件信息，
          这里面我们只需要关心内容中的name和url属性，这两个属性是必须有的，其他的都是可以没有的
          -->
            <p-upload
                list-type="picture-card"
                :limit="1"
                v-model="fileList"
                action="/file/upload"
                :before-upload="handleBeforeUpload"
                :on-error="handleError">
            </p-upload>
          </el-form-item>
          <el-form-item size="mini">
            <el-button :loading="subLoading" @click="handleAdd" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'user-add',
  data() {
    const that = this;
    return {
      rules: {
        username: [{
          required: true,
          message: '账号不可以为空'
        }],
        password: [{
          required: true,
          message: '密码不可以为空'
        }],
        nickname: [{
          required: true,
          message: '昵称不可以为空'
        }],
        roleId: [{
          required: true,
          message: '角色不可以为空'
        }],
        face: [{//++++++++++
          required: true,//required为true时会自动增加*，并且不与自定义验证冲突
          validator(rules, value, callback) {
            //由于validator中的this对象不是本页面vue对象的实例
            //但是我们的data数据是一个函数，所以我们可以在data中把本页的this赋值给_this
            //这样我们就可以在验证器中拿到本页的fileList
            if (that.fileList.length > 0 && that.fileList[0].url !== undefined) {
              callback()
            } else {
              callback(new Error('请上传一个头像'))
            }
          }
        }]
      },
      fileList: [],//+++++++++++++++
      addForm: {
        username: '',
        password: '',
        nickname: '',
        roleId: '',
        face: ''//+++++++
      },
      subLoading: false
    }
  },
  async created() {
    await this.getRoleListAll()
  },
  computed: {
    ...mapState('userModel', ['roleList'])
  },
  methods: {
    ...mapActions('userModel', ['getRoleListAll', 'insert']),
    handleBack() {
      this.$router.history.go(-1)
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch(err => err);
      if (valid) {
        this.addForm.face = this.fileList[0].url
        this.subLoading = true
        await this.insert(this.addForm)
        this.subLoading = false
        this.handleBack()
      }
    },

    handleBeforeUpload(file) {//+++++++++++
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
        // 注意组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
        // 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
        return Promise.reject()
      }
    },
    handleError(err) {//+++++++++++++++
      this.$notify({
        title: '提示',
        message: '上传失败',
        type: 'error'
      })
    }

  }
}
</script>

<style scoped="scoped" lang="scss">
</style>
