<template>
	<!-- tabs组件，用于展示标签页 -->
	<div class="p-tabs">
		<el-tabs type="card" :value="getActiveMenuId" 
			@tab-click="handleClick"
			@tab-remove="handleRemove">
			<el-tab-pane v-for="item in getTabsList" :key="item.id"
				closable :label="item.name" :name="''+item.id"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		name:'p-tabs',
		data(){
			return {
				activeTab:''
			}
		},
		computed:{
			...mapState(['tabsList','activeMenuId']),
			...mapGetters(['getActiveMenu','getActiveMenuId','getTabsList'])
		},
		methods:{
			...mapMutations(['setActiveMenuId','setTabsList']),
			handleClick(res){
				this.setActiveMenuId(res.name)
				if(this.$route.path!=this.getActiveMenu.url){
					this.$router.push(this.getActiveMenu.url)
				}
			},
			handleRemove(res){
				let arr = [...this.getTabsList];
				if(res != this.activeMenuId){
					
					arr.forEach((item,index) => {
						if(item.id == res){
							arr.splice(index,1)
						}
					})
					this.setTabsList(arr)
				}else{
					if(arr.length>1){
						arr.forEach((item,index) => {
							if(item.id == res){
								
								if(index == 0){
									this.$router.push(arr[index+1].url)
									this.setActiveMenuId(arr[index+1].id)
								}else{
									this.$router.push(arr[index-1].url)
									this.setActiveMenuId(arr[index-1].id)
								}
								arr.splice(index,1)
								this.setTabsList(arr)
							}
						})
					}else{
						this.$notify({
							type:'warning',
							title:'提示',
							message:'最后一个菜单不可以关闭'
						})
					}
				}
				
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.p-tabs{
		::v-deep{
			.el-tabs{
				.el-tabs__item{
					background-color: #fff;
				}
				.el-tabs__header{
					margin: 0;
				}
			}
		}
		
	}
</style>
