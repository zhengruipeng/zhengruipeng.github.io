<template>
	<view>
		<text>单列选择器</text>
		<view>
			选择了：{{singleValue}}
		</view>
		<u-select 
			mode="single-column"
			:list="singleList"
			v-model="singleShow"
			@confirm="handleConfirm1">
		</u-select>
		<u-button type="primary" @click="handleClick1">单列选择器</u-button>
		<text>多列选择器</text>
		<view>
			选择了：{{mutilValue}}
		</view>
		<u-select 
			mode="mutil-column"
			:list="mutilList"
			v-model="mutilShow"
			@confirm="handleConfirm2">
		</u-select>
		<u-button type="primary" @click="handleClick2">多列选择器</u-button>
		<text>省市区选择器</text>
		<view>
			选择了：{{mutilValue1}}
		</view>
		<u-select 
			mode="mutil-column-auto"
			:list="mutilList1"
			v-model="mutilShow1"
			@confirm="handleConfirm3">
		</u-select>
		<u-button type="primary" @click="handleClick3">省市区选择器</u-button>
		
	</view>
</template>

<script>
	import {position} from '../../data/position.js'
	export default{
		data(){
			return {
				singleShow:false,
				singleValue:'',
				singleList:[
					{
						label:'苹果',
						value:'1'
					},
					{
						label:'鸭梨',
						value:'2'
					},
					{
						label:'葡萄',
						value:'3'
					}
				],
				mutilShow:false,
				mutilValue:'',
				mutilList:[
					[
						{
							label:'一年级',
							value:'1'
						},
						{
							label:'二年级',
							value:'2'
						},
						{
							label:'三年级',
							value:'3'
						}
					],
					[
						{
							label:'一班',
							value:'1'
						},
						{
							label:'二班',
							value:'2'
						},
						{
							label:'三班',
							value:'3'
						}
					]
				],
				mutilList1:position,
				mutilShow1:false,
				mutilValue1:''
				
			}
		},
		methods:{
			handleClick1(){
				this.singleShow = true
			},
			handleConfirm1(res){
				console.log(res)
				this.singleValue = res[0].label
			},
			handleClick2(){
				this.mutilShow = true
			},
			handleConfirm2(res){
				this.mutilValue = res.map(item => item.label).join(',')
			},
			handleClick3(){
				this.mutilShow1 = true
			},
			handleConfirm3(res){
				this.mutilValue1 = res.map(item => item.label).join(',')
			}
		}
		
	}
</script>

<style>
</style>
