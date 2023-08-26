<template>
	<view>
		<u-field
			v-model="username"
			label="账号"
			placeholder="请填写手机号"
		>
		</u-field>
		<u-field
			v-model="password"
			label="密码"
			type="password"
			placeholder="请填写密码" 
		>
		</u-field>
		<u-button type="primary" @click="handleSubmit">登陆</u-button> 
	</view>
</template>
<script>
	//引入部分
	import {login} from '@/api/user-api.js'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			//点击事件部分
			async handleSubmit() {
				let res = await login({
					username: this.username,
					password: this.password
				})
				if (res.data.code == 200) {
					// 在本地存储中存储token
					uni.setStorageSync('token', res.data.data.token)
					// 在本地存储中存储用户信息
					uni.setStorageSync('userInfo', res.data.data.userInfo)
					// 使用switchTab跳转到被tabbar页面
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		}
	}
</script>