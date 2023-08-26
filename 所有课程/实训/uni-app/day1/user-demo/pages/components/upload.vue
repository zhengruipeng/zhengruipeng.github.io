<template>
	<view>
		<text>文件上传（手动）</text>
		<view>
			选择的文件:{{fileList}}
		</view>
		<view>
			<u-upload 
				ref="upload1"
				:action="url"
				:form-data="data"
				:max-count="3"
				upload-text="选择图片"
				:auto-upload="false"
				:file-list="fileList"
				:before-upload="beforeUpload"
				@on-success="onSuccess"
				@on-remove="onRemove"
				@on-list-change="onListChange"
				name="file"
			></u-upload>
			<u-button @click="handleUpload">上传</u-button>
		</view>
		<text>文件上传（自动）</text>
		<view>
			选择的文件:{{fileList1}}
		</view>
		<view>
			<u-upload 
				ref="upload2"
				:action="url"
				:form-data="data"
				:max-count="3"
				upload-text="选择图片"
				:auto-upload="true"
				:file-list="fileList1"
				@on-success="onSuccess1"
				@on-remove="onRemove1"
				@on-list-change="onListChange1"
				name="file"
			></u-upload>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				fileList:[{
					url:'http://localhost:3000/public/face/st2jcf1608607189120.jpeg'
				}],
				url:'http://localhost:3000/shop-service/v1/file/upload/test',
				data:{
					folder:'face'
				},
				fileList1:[{
					url:'http://localhost:3000/public/face/st2jcf1608607189120.jpeg'
				}],
			}
		},
		methods:{
			beforeUpload(res){
				console.log(res)
				console.log(this.fileList[res])
			},
			// 删除图片时触发
			onRemove(index,list,name){
				console.log(index,list,name)
			},
			// 当文件列表改变时触发，添加，更改删除都会
			onListChange(list,name){
				// 本步骤将本地的fileList动态设置成回调的list一样
				//由于fileList不是双向绑定所以需要在回调中动态的的修改
				this.fileList = list
				console.log(list,name)
			},
			handleUpload(){
				this.$refs.upload1.upload()
			},
			// 上传成功的回调
			onSuccess(data,index,list,name){
				// 上传成功后的data为后台的返回结果
				//要根据返回结果将本页的fileList对应的index的url路径改成线上的地址
				if(data.code == 200){
					list[index].url = 'http://localhost:3000'+data.data.url
					this.fileList = list
				}
				console.log(this.fileList)
				console.log(data,index,list,name)
			},
			// 当文件列表改变时触发，添加，更改删除都会
			onListChange1(list,name){
				// 本步骤将本地的fileList动态设置成回调的list一样
				//由于fileList不是双向绑定所以需要在回调中动态的的修改
				this.fileList1 = list
				console.log(list,name)
			},
			// 上传成功的回调
			onSuccess1(data,index,list,name){
				// 上传成功后的data为后台的返回结果
				//要根据返回结果将本页的fileList对应的index的url路径改成线上的地址
				if(data.code == 200){
					list[index].url = 'http://localhost:3000'+data.data.url
					this.fileList1 = list
				}
				console.log(this.fileList1)
				console.log(data,index,list,name)
			},
			// 删除图片时触发
			onRemove1(index,list,name){
				console.log(index,list,name)
			},
		}
	}
</script>

<style>
</style>
