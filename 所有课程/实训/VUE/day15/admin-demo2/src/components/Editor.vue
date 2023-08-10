<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" ref="editor" :init="init" :disabled="disabled" @onClick="onClick">
    </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name:'p-editor',
  components: {
    Editor:() => import(/* webpackChunkName: "editor" */ '@tinymce/tinymce-vue')
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    },
    imgType:{//base64,upload
      type:String,
      default:'base64'
    },
    height:{
      type:String,
      default(){
        return '100%'
      }
    }
  },
  data() {
    let _this = this;
    return {
      init: {
        language_url: 'js/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'tinymce/skins/ui/oxide',
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,
        // 此处为图片上传处理函数
        images_upload_handler: (blobInfo, success) => {
          if(_this.imgType == 'upload'){
            let file = blobInfo.blob();
            if(file instanceof File){
              let f = new FormData();
              f.append('file',file);
              _this.$http({
                url:'/file/upload',
                method:'post',
                headers:{
                  "Content-Type":'multipart/form-data'
                },
                data:f,
              }).then(res => {
                if(res.data.code == 200){
                  console.log(res,res.data.data.url,success)
                  // _this.formData.filePath = res.data.link;
                  success(res.data.data.url)
                }
              }).catch(err => {
                throw(err);
              })
            }
          }else{
            let file = blobInfo.blob();
            const img = `data:${file.type};base64,` + blobInfo.base64()
            success(img)
          }
        }
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.value = ''
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
