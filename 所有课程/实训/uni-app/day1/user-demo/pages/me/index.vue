<template>
	<view>
		<navigator url="/pages/components/api">1.简单的接口调用</navigator>
		<navigator url="/pages/components/vuex">2.结合vuex使用</navigator>
		
		
	</view>
</template>

<script>
	export default{
		onReady() {
			console.log('ready')
		},
		
	}
</script>

<style scoped lang="scss">
	navigator{
		padding: 10rpx 30rpx;
		border-bottom: 1rpx solid #eee;
		color: #2979FF;
		font-weight: bold;
	}
</style>
