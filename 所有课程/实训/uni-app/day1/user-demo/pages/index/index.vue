<template>
	<view class="content">
		<navigator url="/pages/components/button">1.按钮</navigator>
		<navigator url="/pages/components/select">2.选择器</navigator>
		<navigator url="/pages/components/picker-select">3.picker选择器</navigator>
		<navigator url="/pages/components/input">4.常用表单控件</navigator>
		<navigator url="/pages/components/upload">5.文件上传</navigator>
		<navigator url="/pages/components/swiper">6.轮播</navigator>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				list:[
					'/static/lb1.jpg',
					'/static/lb2.jpg',
					'/static/lb3.jpg'
				]
			}
		},
		computed:{
			...mapState(['name'])
		},
		onLoad() {
			
		},
		created(){
			// console.dir(this.$http)
			this.$http({
				url:'/api-test/get/demo1',
				method:'get'
			}).then(res => {
				console.log(res)
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	navigator{
		padding: 10rpx 30rpx;
		border-bottom: 1rpx solid #eee;
		color: #2979FF;
		font-weight: bold;
	}
</style>
