<template>
	<div>
		
		<el-page-header @back="handleBack" content="新闻预览"></el-page-header>
		<div>
			<div class="title">
				{{addForm.name}}
			</div>
			<div class="info">
				作者：{{addForm.author}} 日期：{{formatTime(addForm.insertTime)}}
			</div>
			<div class="description">
				摘要：{{addForm.description}}
			</div>
			<div class="content" v-html="addForm.content">
			</div>
		</div>
		{{addForm}}
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default{
		name:'news-preview',
		data(){
			return {
				addForm:{},
			}
		},
		computed:{
			formatTime(){
				return function(time){
					let d = new Date(time);
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		async created(){
			let id = this.$route.query.id
			this.addForm = await this.findById(id);
		},
		methods:{
			...mapActions('newsModel',['findById']),
			handleBack(){
				this.$router.history.go(-1)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.title{
		font-size: 24px;
		text-align: center;
		font-weight: bold;
		line-height: 40px;
	}
	.info{
		background-color: lightblue;
		color: #666;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
	}
	.description{
		color: #444;
		font-size: 14px;
		padding: 10px 15px;
		border-bottom: 1px solid #eee;
	}
	.content{
		padding: 10px 15px;
	}
</style>