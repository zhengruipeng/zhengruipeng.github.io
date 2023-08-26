<template>
	<view>
		<text>输入框</text>
		
		<view>
			输入的内容：{{value}}
		</view>
		<u-input v-model="value"
			trim
			border placeholder="请输入"></u-input>
		<text>开关</text>
		<view>
			选择的内容:{{checked}}
		</view>
		<u-switch v-model="checked"></u-switch>
		<text>步进器</text>
		<view>
			选择的内容:{{value1}}
		</view>
		<u-number-box 
			v-model="value1" 
			@change="valChange"></u-number-box>
		<text>field输入框</text>
		<view>
			输入的内容：{{mobile}},{{code}}
		</view>
		<view>
			<u-field
				v-model="mobile"
				label="手机号"
				border-bottom
				placeholder="请填写手机号"
			>
			</u-field>
			<u-field
				v-model="code"
				label="验证码"
				border-bottom
				placeholder="请填写验证码"
			>
			</u-field>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				checked:false,
				value1:0,
				mobile:'',
				code:''
			}
			
		},
		methods:{
			valChange(res){
				console.log(res)
			}
		}
	}
</script>

<style>
</style>
