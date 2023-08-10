<template>
  <div>
    <el-page-header @back="handleBack" content="编辑用户信息"></el-page-header>
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
          <el-form-item size="mini" label="头像" prop="face">
            <p-upload list-type="picture-card" :limit="1"
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
  name: 'user-edit',
  data() {
    const _this = this;
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
        face: [{
          required: true,
          validator(rules, value, callback) {
            //由于validator中的this对象不是本页面vue对象的实例
            //但是我们的data数据是一个函数，所以我们可以在data中把本页的this赋值给_this
            //这样我们就可以在验证器中拿到本页的fileList
            if (_this.fileList.length > 0 && _this.fileList[0].url !== undefined) {
              callback()
            } else {
              callback(new Error('请上传一个头像'))
            }

          }
        }]
      },
      fileList: [],
      addForm: {
        username: '',
        password: '',
        nickname: '',
        roleId: '',
        face: "",
      },
      subLoading: false
    }
  },
  async created() {
    let id = this.$route.query.id;
    await this.getRoleListAll()
    this.addForm = await this.findById(id);

    //当头像已经上传了就设置到fileList中
    if (this.addForm.face !== undefined && this.addForm.face !== '') {
      let file = {
        //将数据中的头像放到file对象中
        url: this.addForm.face,
        //从url中截取文件名
        name: this.addForm.face.substring(this.addForm.face.lastIndexOf('/') + 1)
      }
      //将设置好的值放到fileList中
      this.fileList = [file]
    }

  },
  computed: {
    ...mapState('userModel', ['roleList'])
  },
  methods: {
    ...mapActions('userModel', ['getRoleListAll', 'findById', 'update']),
    handleBack() {
      this.$router.history.go(-1)
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch(err => err);
      if (valid) {
        //将头像设置回addForm中的face里
        this.addForm.face = this.fileList[0].url
        this.subLoading = true
        await this.update(this.addForm)
        this.subLoading = false
        this.handleBack()
      }
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

<style scoped="scoped" lang="scss">
</style>
