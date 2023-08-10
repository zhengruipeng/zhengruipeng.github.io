<template>
	<div>
		<!-- 
			组件中还有一个属性就是list-type属性我们可以通过他来决定组件的样式他有三个值 text，picture，picture-cards
			这里我们体验一下upload组件的样式切换
			体验完毕即可跳到下一个例子
		 -->
		 <el-select placeholder="请选择" size="small" v-model="listType">
			 <el-option label="text" value="text"></el-option>
			 <el-option label="picture" value="picture"></el-option>
			 <el-option label="picture-card" value="picture-card"></el-option>
		 </el-select>
		<el-upload
			:action="url"
			:file-list="fileList"
			:limit="2"
			:data="uploadData"
			:http-request="handleRequest"
			:on-exceed="handleExceed"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:before-remove="handleBeforeRemove"
			:on-remove="handleRemove"
			:on-error="handleError"
			:list-type="listType"
		>
			
			<el-button v-if="listType!='picture-card'" size="small" type="primary">点击上传</el-button>
			<el-button v-else type="text">+</el-button>
			<!-- upload提供的自定义插槽 -->
			<div slot="tip" class="el-upload__tip">只能上传jpg,png,jpeg,gif格式的图片</div>
		</el-upload>
		fileList的值:{{fileList}}
	</div>
</template>

<script>
	export default{
		name:'upload-test1',
		data(){
			return {
				fileList:[],//已上传文件列表的数组
				//这里我们将url改成了有鉴权的接口地址
				url:'/shop-service/v1/file/upload',
				// 组件默认上传文件是会将文件以file:文件的值的形式传输，与后台接口的file对象能对应
				// 我们的后台接口除了file还有一个folder参数，所以可以通过这个对象传输
				uploadData:{
					folder:'test'
				},
				listType:'text'
			}
		},
		methods:{
			// 在请求错误时触发
			handleError(err){
				console.log(err)
			},
			async handleRequest(upload){
				//当Content-Type为multipart/form-data时，我们的参数需要放在FormData对象中
				//对象通过append添加数据格式为key，value的形式与json类似
				let f = new FormData();
				f.append('file',upload.file)
				f.append('folder',upload.data.folder)
				// 我们根据后台接口的参数，method，contentType来配置请求对象
				let res =await this.$http({
					url:'/file/upload',
					method:'post',
					data:f,
					headers:{
						'Content-Type':'multipart/form-data'
					}
				})
				if(res.data.code == 200){
					// 当请求成功时我们通过Promise.resolve来结束当前方法，组件就会自动执行on-success函数
					return Promise.resolve(res.data)
				}else{
					// 当请求失败是我们通过Promise.reject()就会执行on-error函数
					//比如我们将url改成错误路径
					return Promise.reject(res.data)
				}
				
			},
			// 在选择完文件之后，执行上传文件之前触发
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
			// 在文件上传的接口http协议状态码为200时触发
			//res为上传接口返回的数据，file为upload封装的文件对象，包含上传返回的数据和上传前读取的本地文件对象
			//fileList是上传成功时组件内自动处理完的文件列表，这里我们需要手动将他赋值给this.fileList来实现组件
			//内外的数据同步（由于不是双向绑定所以需要人工处理）
			handleSuccess(res,file,fileList){
				console.log(res,file,fileList)
				//这里再次查看函数上的注释，然后我们打印res，会发现返回的是服务器上的错误信息
				//也就是说我们的上传接口调用并没有成功，这是因为我们这里调用的是有鉴权的接口
				//而el-upload组件并没有使用我们自己封装axios请求包，所以请求并没有携带token，
				//那么我们如何能让上传成功呢？回到代码最上方的注释查看第二步
				fileList[fileList.length-1].name = res.data.fileName;
				fileList[fileList.length-1].url = res.data.url;
				this.fileList = fileList
			},
			// 在上传的文件数量超过limit时触发
			handleExceed(){
				this.$notify({
					title:'提示',
					message:'文件最多只能上传两个',
					type:'error'
				})
			},
			// 在执行删除之前执行
			/**
			 * 这里着重说明，如果beforeRemove和remove我们不做处理，组件内部会自动的在页面去掉我们删除的那一项数据
			 * 但是这个做法不会改变我们传入的this.fileList的值，会造成数据不同步问题，还有一个问题就是，如果我们不
			 * 处理的话，本地删除的文件其实在服务器上还在，这样我们就无形中创造了多余的垃圾文件。
			 * 所以我们要在删除之前先调用服务器的删除文件接口，这里由于业务复杂，所以我们调用接口采用直接卸载vue文件内
			 * 的方式不与vuex关联
			 * 
			 */
			async handleBeforeRemove(file,fileList){
				//这里判断是由于如果我们在上传文件时选择了错误的文件类型，upload组件也会走一遍删除逻辑
				//根据逻辑分析，我们上传成功的file中会保存我们创建的url属性
				//所以当file中含有url的时候表示是有人在删除已经上传成功的文件
				if(file.url){
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
						// 当用户确定删除且服务器上删除成功时我们才让删除逻辑向下走
						if(res.data.code == 200){
							return true
						}else{
							//不满足条件时我们不允许删除逻辑向下走也就是remove事件不会执行
							return Promise.reject()
						}
					}else{
						return Promise.reject()
					}
				}else{
					console.log('在取消上传时实际上我也执行了一次beforeRemove')
					return true
				}
			},
			// 在beforeRemove不被中断后执行
			handleRemove(file,fileList){
				console.log('在取消上传时实际上我也执行了一次remove')
				this.fileList = fileList
			}
		}
	}
</script>

<style>
</style>
