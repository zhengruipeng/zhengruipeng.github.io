<template>
  <div>
    <el-page-header @back="handleBack" content="增加新闻"></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
            :model="addForm"
            label-width="auto"
            ref="addForm"
            :rules="rules">
          <el-form-item size="mini"
                        prop="name"
                        label="新闻标题">
            <el-input placeholder="请输入"
                      clearable
                      v-model.trim="addForm.name"></el-input>
          </el-form-item>
          <el-form-item
              size="mini"
              prop="description"
              label="摘要">
            <el-input
                type="textarea"
                placeholder="请输入"
                maxlength="200"
                show-word-limit
                clearable v-model.trim="addForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item
              size="mini"
              prop="newsTypeId" label="新闻类型">
            <el-select
                placeholder="请选择"
                clearable
                v-model.trim="addForm.newsTypeId">
              <el-option v-for="item in newsTypeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              size="mini" label="logo"
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
          <el-form-item
              size="mini"
              prop="content"
              label="新闻内容">
            <p-editor
                v-model="addForm.content"
                img-type="upload"
                height="500px">
            </p-editor>
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
import PEditor from '@/components/Editor.vue'
import {mapActions, mapState} from 'vuex';

export default {
  name: 'user-add',
  components: {
    PEditor
  },
  data() {
    let _this = this;
    return {
      rules: {
        name: [{
          required: true,
          message: '新闻标题不可以为空'
        }],
        newsTypeId: [
          {
            required: true,
            message: '新闻类型不可以为空'
          }
        ],
        description: [
          {
            required: true,
            message: '新闻摘要不可以为空'
          }
        ],
        content: [
          {
            required: true,
            message: '新闻内容不可以为空'
          }
        ],
        logo: [{
          required: true,
          validator(rules, value, callback) {
            //由于validator中的this对象不是本页面vue对象的实例
            //但是我们的data数据是一个函数，所以我们可以在data中把本页的this赋值给_this
            //这样我们就可以在验证器中拿到本页的fileList
            if (_this.fileList.length > 0 && _this.fileList[0].url !== undefined) {
              callback()
            } else {
              callback(new Error('请上传一个logo'))
            }

          }
        }]
      },
      fileList: [],
      addForm: {
        name: '',
        content: '',
        logo: '',
        description: '',
        newsTypeId: ''
      },
      subLoading: false
    }
  },
  async created() {
    await this.getNewsTypeListAll()
  },
  computed: {
    ...mapState('newsModel', ['newsTypeList'])
  },
  methods: {
    ...mapActions('newsModel', ['getNewsTypeListAll', 'insert']),
    handleBack() {
      this.$router.history.go(-1)
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch(err => err);
      if (valid) {
        //将头像
        this.addForm.logo = this.fileList[0].url
        console.log(this.addForm)
        this.subLoading = true
        await this.insert(this.addForm)
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
