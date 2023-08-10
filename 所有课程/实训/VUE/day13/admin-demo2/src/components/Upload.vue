<template>
	<div class="p-upload">
		<el-upload
			:action="action"
			:file-list="fileList"
			:limit="limit"
			:data="data"
			:http-request="handleRequest"
			:on-exceed="handleExceed"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:before-remove="handleBeforeRemove"
			:on-remove="handleRemove"
			:on-error="handleError"
			:list-type="listType"
			ref="p-upload"
		>
			<template v-if="listType=='picture-card'" v-slot:file="{file}">
				<img
				class="el-upload-list__item-thumbnail"
				:src="file.url" alt="" style="object-fit: cover;"
				>
				<span class="el-upload-list__item-actions">
					<span
						class="el-upload-list__item-preview"
						style="position: relative;"
					>
						<el-image 
							class="preview-img"
							style="position: absolute;left: 0;top: 0;width: 20px;height: 36px;" 
							:src="file.url"  :preview-src-list="[file.url]"></el-image>
						<!-- @click="handlePictureCardPreview(file)" -->
						<i class="el-icon-zoom-in" >
						</i>
					</span>
					<span
						class="el-upload-list__item-delete"
						@click="handleRemoveCustom(file)"
					>
						<i class="el-icon-delete"></i>
					</span>
				</span>
			</template>
				
			<slot>
				<el-button v-if="listType!='picture-card'" size="small" type="primary">点击上传</el-button>
				<el-button v-else type="text">+</el-button>
			</slot>
			<!-- upload提供的自定义插槽 -->
			<div slot="tip" class="el-upload__tip">
				<slot name="tip">
					<!-- 只能上传jpg,png,jpeg,gif格式的图片 -->
				</slot>
			</div>
		</el-upload>
	</div>
</template>

<script>
	export default{
		name:'p-upload',
		props:{
			action:{
				required:true,
				type:String
			},
			'list-type':{
				required:false,
				type:String,
				default(){
					return 'text'
				}
			},
			'file-list':{
				required:true,
				type:Array,
				default(){
					return []
				}
			},
			limit:{
				required:false,
				type:Number,
				default(){
					return 10
				}
			},
			data:{
				required:false,
				type:Object,
				default(){
					return {}
				}
			},
			'before-upload':{
				required:false,
				type:Function,
				default(){
					return function(){}
				}
			},
			'on-success':{
				required:false,
				type:Function,
				default(){
					return function(){}
				}
			},
			'on-error':{
				required:false,
				type:Function,
				default(){
					return function(){}
				}
			}
		},
		model:{
			event:'change-file-list',
			prop:'file-list'
		},
		methods:{
			// 在请求错误时触发
			handleError(err){
				this.onError(err)
			},
			async handleRequest(upload){
				let f = new FormData();
				f.append('file',upload.file)
				for(let key in upload.data){
					f.append(key,upload.data[key])
				}
				let res =await this.$http({
					url:this.action,
					method:'post',
					data:f,
					headers:{
						'Content-Type':'multipart/form-data'
					}
				})
				if(res.data.code == 200){
					return Promise.resolve(res.data)
				}else{
					return Promise.reject(res.data)
				}
			},
			// 在选择完文件之后，执行上传文件之前触发
		  handleBeforeUpload(file){
				let res = this.beforeUpload(file)
				console.log(res)
				return res;
			},
			handleSuccess(res,file,fileList){
				fileList[fileList.length-1].name = res.data.fileName;
				fileList[fileList.length-1].url = res.data.url;
				this.$emit('change-file-list',fileList)
				this.onSuccess(res,file,fileList)
			},
			// 在上传的文件数量超过limit时触发
			handleExceed(){
				this.$notify({
					title:'提示',
					message:'文件最多只能上传'+this.limit+'个',
					type:'error'
				})
			},
			async handleBeforeRemove(file,fileList){
				// console.log(file)
				if(file.url.indexOf('blob') == -1){
					// 这里我们先询问用户是否确定要删除
					let confirm = await this.$confirm('正在删除该文件，点击确认继续','提示',{type:'warning'}).catch(err => err)
					if(confirm == 'confirm'){
						// 确定之后我们调用服务器上的删除接口
						let res =await this.$http({
							url:'/file/delete',
							params:{
								path:file.url
							},
							method:'get'
						})
						//调用完接口就返回，防止服务器上图片丢失导致本地无法删除
						return true
						
					}else{
						return Promise.reject()
					}
				}else{
					return true
				}
			},
			// 在beforeRemove不被中断后执行
			handleRemove(file,fileList){
				this.$emit('change-file-list',fileList)
			},
			async handleRemoveCustom(file){
				console.log(this.$refs['p-upload'])
				this.$refs['p-upload'].handleRemove(file)
				// console.log(this.$refs['p-upload'])
				// let res = await this.handleBeforeRemove(file,this.$refs['p-upload'].fileList).catch(err => err)
				// if(res){
					
				// 	this.handleRemove(file,this.$refs['p-upload'].fileList)
				// }
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.p-upload{
		.preview-img{
			::v-deep{
				.el-image__preview{
					opacity: 0;
				}
			}
			
		}
	}
</style>
