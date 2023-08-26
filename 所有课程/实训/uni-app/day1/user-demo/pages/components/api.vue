<template>
	<view>
		<text>直接在vue文件中使用接口对象</text>
		<u-button type="danger" @click="clearAll">clear</u-button>
		<view>
			返回的数据内容是:{{getRes1}}
		</view>
		<u-button type="primary" @click="handleRequest1">调用测试接口</u-button>
	</view>
</template>

<script>
	/*
		这里需要参考一下http文件夹内部的代码，
		这里直接使用了uniapp封装好的uni.request集中封装了
		一个请求对象，用来模仿普通的vue项目中的axios对象
		全局的请求对象直接挂在到了vue的$http对象上
		这里我们可以先参考一下官方文档的uni.request对象的参数
	*/
	export default{
		data(){
			return {
				res1:{}
			}
		},
		computed:{
			getRes1(){
				return JSON.stringify(this.res1)
			}
		},
		methods:{
			async handleRequest1(){
				let res = await this.$http({
					url:'/api-test/get/demo1',
					method:'get'
				})
				console.log(res)
				if(res.data.code == 200){
					this.res1 = res
				}
			},
			clearAll(){
				this.res1 = {}
			}
		}
	}
</script>

<style>
</style>
