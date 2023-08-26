<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view>
			<button @tap="handleClick">
				我是按钮
			</button>
			<input type="text" v-model="title">
		</view>
		<!-- 由于小程序的点击事件名称叫做tap所以我们使用vue绑定事件也需要命名为tap -->
		<button @tap="handleClick1">跳页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onReady() {
			console.log('onReady')
		},
		onLoad() {
			console.log('onLoad')
		},
		onShow() {
			console.log('onShow')
		},
		beforeCreate() {
			console.log('beforeCreate')
		},
		created() {
			console.log('created')
		},
		beforeUpdate() {
			console.log('beforeUpdate')
		},
		updated() {
			console.log('updated')
		},
		beforeMount() {
			console.log('beforeMount')
		},
		mounted() {
			console.log('mounted')
		},
		methods: {
			handleClick() {
				uni.showToast({
					title: '我是点击事件',
					mask: true
				})
				//在uni中写法出了标签名之外其他完全遵从vue写法
				this.title = '我改变了你'
			},
			//methods中追加点击事件
			handleClick1() {
				// 跳页要使用uni对象来获取wx对象的内容
				uni.navigateTo({
					url: '/pages/test/test?id=' + 123
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>