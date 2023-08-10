<template>
	<div>
		<p-page-header title="文件上传练习"></p-page-header>
		<!-- 
		 阅读顺序按照从上到下，将所有的代码和组件都阅读一遍
		 -->
		<h4>无鉴权时</h4>
		<!-- 首先参考upload-test1.vue -->
		<upload-test1></upload-test1>
		<h4>有鉴权时</h4>
		<upload-test2></upload-test2>
		<h4>组件样式</h4>
		<upload-test3></upload-test3>
		<h1>二次封装自定义组件</h1>
		<!-- 
			参考上述三个upload组件的案例我们发现自带的upload组件其实并不好用，他使用方式很复杂
			并且需要处理的生命周期也特别多，这个主要是因为开发组件的人为了组件的通用性更加良好
			所以提供了特别丰富的功能，这也让组件在使用场景变得及其难以维护，这种情况在公司中都会有
			前端架构师岗位的工程师将这种组件针对我们项目本身的需求进行二次封装，进而简化组件的复杂度
		 -->
		<el-select placeholder="请选择" size="small" v-model="listType">
					 <el-option label="text" value="text"></el-option>
					 <el-option label="picture" value="picture"></el-option>
					 <el-option label="picture-card" value="picture-card"></el-option>
		</el-select>
		<!--
			我们来学习二次封装的组件p-upload
			v-model:这里我们将fileList改造成了双向绑定，无需处理他的变化
			data:依然是追加的参数使用方式与原组件相同
			action:请求的路径，这里已经基于axios进行封装所以与普通接口传入的路径相同
			before-upload:这里与原组件参数和用法完全一致
			on-success:这里与原组件一样成功时的回调
			on-error:这里与原组件一样失败时的回调
			list-type:这里与原组件一样依然是三个参数
			至此我们将复杂的upload组件简化成了只有7个属性，这样我们学习p-upload的使用即可
			学习完这里我们回到笔记中
			-->
		<p-upload 
			action="/file/upload" 
			v-model="fileList"
			:data="data" 
			:limit="3"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:on-error="handleError"
			:list-type="listType"
			>
			<!-- 组件默认是按钮化组件可通过default插槽进行替换 -->
			<!-- <el-button size="mini" type="text">上传</el-button> -->
			<!-- slot插槽，名称依然是tip -->
			<template slot="tip">123123</template>
		</p-upload>{{fileList}}
	</div>
</template>

<script>
	import UploadTest1 from './upload-test1.vue'
	import UploadTest2 from './upload-test2.vue'
	import UploadTest3 from './upload-test3.vue'
	export default{
		components:{
			UploadTest1,
			UploadTest2,
			UploadTest3
		},
		name:'upload',
		data(){
			return {
				data:{
					folder:'test',
				},
				fileList:[],
				listType:'text'
			}
		},
		methods:{
			handleBeforeUpload(file){
				// 判断当前的文件类型如果不是这些类型的文件就弹出错误提示并中断上传操作
				if(!(file.name.indexOf('png') != -1
					||file.name.indexOf('jpg') != -1
					||file.name.indexOf('jpeg') != -1
					||file.name.indexOf('gif') != -1)){
					this.$notify({
						title:'提示',
						message:'只能上传图片格式的文件',
						type:'error'
					})
					// 通过return Promise.reject()可以实现中断上传操作，不在触发上传的函数
					// 但是这里要注意的是，组件内部会自动处理已经传入的fileList，在选择文件的时候就会对fileList增加一个
					// 本地数据，当我们中断上传时，组件内部会自动自行删除fileList，这样就会触发下面的beforeRemove和remove
					return Promise.reject()
				}
			},
			handleSuccess(res,file,fileList){
				console.log(res,file,fileList)
			},
			handleError(err){
				console.log(err)
			}
		}
	}
</script>

<style>
</style>
