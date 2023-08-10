<template>
	<div>
		<!-- 
			action代表要上传文件的接口路径
			
			file-list代表当前已经上传的文件列表fileList的结构为[{name:'文件名',url:'文件访问路径'},...]
			该值决定当前展示的文件列表的内容由于fileList并不是v-model进行双向绑定的数据所以我们需要在upload组件的
			不同的回调函数中通过参数对当前的fileList进行重新附值来实现已上传文件列表的更新
			
			limit表示当前组件最多可以上传的文件数量
			
			data表示上传文件时发送的请求中携带的其他参数，格式为json，参考实际的值
			
			以下需要注意on-的属性均为props中的参数通过v-bind绑定，并不是通过v-on绑定的函数，
			但是:on-exceed="handleExceed"仍然可以定义到methods中，因为参数的类型为Function
			
			on-exceed是当上传文件的数量超过limit设置的值时触发的回调，可以在其中做提示
			
			on-success是文件上传请求执行成功时执行的回调函数，他以http协议的状态码为200时视为成功，而我们项目
			的后台接口的成功失败是在返回数据的data中设置的，并没有修改http协议的状态码，所以请求我们项目的接口无论
			成功还是失败都会触发on-success函数
			
			before-upload是文件执行上传操作之前的一个回调，可以在这里处理对文件类型的限制
			
			before-remove是当点击文件列表中删除某个文件的按钮时在执行删除操作之前触发，由于自带的删除功能仅仅是删除
			网页内的fileList中的数据，所以我们经常通过before-remove在删除本地数据之前先请求服务器接口删除服务器上的
			数据，然后在执行本地的文件列表数据删除
			
			on-remove在before-remove正常执行完之后会触发on-remove事件，我们通常在这里将处理完的fileList更新
			
			接下来我们看一下下面的逻辑处理
		 -->
		<el-upload
			:action="url"
			:file-list="fileList"
			:limit="2"
			:data="uploadData"
			:on-exceed="handleExceed"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:before-remove="handleBeforeRemove"
			:on-remove="handleRemove"
		>
			<el-button size="small" type="primary">点击上传</el-button>
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
				//文件上传的接口名，这里为什么会加上/shop-service/v1是因为
				//我们使用el-upload组件是通过内部的http对象发送的请求，并没有使用我们项目中的axios所以
				//我们在axios中设置的baseUrl在这里是不管用的
				url:'/shop-service/v1/file/upload/test',
				// 组件默认上传文件是会将文件以file:文件的值的形式传输，与后台接口的file对象能对应
				// 我们的后台接口除了file还有一个folder参数，所以可以通过这个对象传输
				uploadData:{
					folder:'test'
				}
			}
		},
		methods:{
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
				// 由于每次上传的新文件一定是fileList的最后一个，所以在这里
				//直接将文件列表最后一个的name和url改成我们的后台接口返回的文件名和文件url
				//这么操作是因为如果不手动处理upload组件默认只会将选择文件时从本地读取的文件名name，并且不存在url属性
				//fileList上这样数据展示就有差异了，可以将下面两行注释掉体验一下
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
