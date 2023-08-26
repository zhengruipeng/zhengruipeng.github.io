<template>
	<view>
		{{getTime}}
	</view>
</template>

<script>
	export default{
		data(){
			return {
				time:new Date()
			}
		},
		computed:{
			getTime(){
				let hour = this.time.getHours()
				let minute = this.time.getMinutes()
				let second = this.time.getSeconds()
				return `${hour}:${minute}:${second}`
			}
		},
		created(){
			let rn = uni.getStorageSync('time')
			clearInterval(rn)
			rn = setInterval(() => {
				this.time = new Date()
				
			},900)
			uni.setStorageSync('time')
		}
	}
</script>

<style>
</style>
