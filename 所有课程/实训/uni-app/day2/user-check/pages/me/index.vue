<template>
	<view>
		<view class="info-container">
			<image class="bg" src="../../static/user-bg.png"></image>
			<view class="info">
				<image class="face" :src="'http://localhost:3000'+userInfo.face"></image>
				<text class="nickname">{{userInfo.nickname}}</text>
			</view>
			<button class="logout" @click="handleLogout" size="mini">退出登陆</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'me',
		data() {
			return {
				userInfo:{}
			}
		},
		created(){
			let userInfo = uni.getStorageSync('userInfo')
			this.userInfo = userInfo
			
		},
		methods: {
			handleLogout(){				  
				uni.showModal({
					title:'提示',
					content:'您正在退出登陆，点击确认继续',
					success(res) {
						if(res.confirm){
							uni.clearStorage()
							uni.navigateTo({
								url:'/pages/login/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.info-container{
		position: relative;
		.bg{
			width: 100%;
			height: 300rpx;
		}
		.info{
			position: absolute;
			display: flex;
			align-items: center;
			top: 90rpx;
			left: 0rpx;
			padding:0rpx 100rpx;
			.face{
				width: 80rpx;
				height: 80rpx;
				object-fit: cover;
				border-radius: 100%;
				margin: 20rpx;
			}
			.nickname{
				color: #fff;
				font-weight: bold;
			}
		}
		.logout{
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			
		}
	}
</style>
