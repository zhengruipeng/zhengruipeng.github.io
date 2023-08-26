<template>
	<view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="账号">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="密码">
				<u-input v-model="form.password" />
			</u-form-item>
			<u-form-item >
				<u-button 
					type="primary" 
					:loading="loading"
					size="default"
					@click="handleLogin">登陆</u-button>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					username:'',
					password:''
				},
				loading:false
			}
		},
		methods: {
			async handleLogin(){
				this.loading = true 
				await (()=>{
					return new Promise(resolve => {
						setTimeout(() => {
							resolve()
						},1000)
					})
				})()
				this.loading = false 
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>

</style>
