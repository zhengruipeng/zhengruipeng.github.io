<template>
	<view>
		<text>日期选择器</text>
		<view>
			选择的值为：{{value}}
		</view>
		<u-picker v-model="show" mode="time" 
			:params="timeConfig"
			@confirm="handleConfirm"></u-picker>
		<u-button @click="handleClick">日期选择器</u-button>
		<text>地区选择器（框架自带）</text>
		<view>
			选择的值为：{{value1}}
		</view>
		<u-picker v-model="show1" mode="region" 
			:params="positionConfig"
			@confirm="handleConfirm1"></u-picker>
		<u-button @click="handleClick1">地区选择器</u-button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				show:false,
				value:'',
				timeConfig:{
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: true,
					city: true,
					area: true,
					timestamp: true, // 1.3.7版本提供
				},
				show1:false,
				value1:'',
				positionConfig:{
					province: true,
					city: true,
					area: true
				}
			}
		},
		methods:{
			handleClick(){
				this.show = true
			},
			handleConfirm(res){
				console.log(res)
				this.value = res.year+'-'+res.month+'-'+res.day
			},
			handleClick1(){
				this.show1 = true
			},
			handleConfirm1(res){
				console.log(res)
				// this.value = res.year+'-'+res.month+'-'+res.day
				this.value1 = res.province.label+','+res.city.label+','+res.area.label
			}
		}
	}
</script>

<style>
</style>
