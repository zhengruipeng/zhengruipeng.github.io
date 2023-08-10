<template>
	<div class="p-page-header">
		{{title}}
		<el-divider></el-divider>
	</div>
</template>

<script>
	export default{
		name:'p-page-header',
		props:{
			title:{
				required:false,
				type:String,
				default(){
					return '标题'
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.p-page-header{
		padding-top:10px;
		.el-divider{
			margin:10px 0px;
		}
	}
</style>
