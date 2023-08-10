<template>
	<div class="page">
		<p-page-header title="菜单管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			border
			size="mini"
			:data="list"
			row-key="id"
			default-expand-all
			:tree-props="{children:'children', hasChildren: 'hasChildren'}"	>
			<el-table-column width="300" label="菜单id" prop="id"></el-table-column>
			<el-table-column label="菜单名称" prop="name"></el-table-column>
			<el-table-column label="菜单路由" prop="url"></el-table-column>
			<el-table-column label="菜单图标" prop="icon">
				<template v-slot="{row}">
					<i :class="row.icon"></i>
				</template>
			</el-table-column>
			
			<el-table-column width="300" label="操作" >
				<template v-slot="{row}">
					<el-button v-if="!row.url" type="success" icon="el-icon-plus" @click="handleAddChildren(row)" size="mini">增加子菜单</el-button>
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row)" type="warning">修改</el-button>
					<el-button size="mini" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { mapState,mapActions } from 'vuex'
	export default{
		name:'role',
		data(){
			return {
				queryForm:{
					pno:1,
					psize:10
				},
				queryLoading:false
			}
		},
		computed:{
			...mapState('menuModel',['list','page']),
			formatTime(){
				return function(time){
					let d = new Date(time);
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		async created(){
			await this.getListForPage(this.queryForm)
		},
		async activated(){
			await this.getListForPage(this.queryForm)
		},
		methods:{
			...mapActions('menuModel',['getListForPage','deleteById']),
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
			},
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				await this.getListForPage(this.queryForm)
			},
			handleAdd(){
				this.$router.push('/menu-add')
			},
			async handleRemove(id){
				let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					await this.deleteById(id)
					await this.getListForPage(this.queryForm)
				}
			},
			handleEdit(row){
				if(row.url){
					this.$router.push({path:'/menu-edit-child',query:{id:row.id}})
				}else{
					this.$router.push({path:'/menu-edit',query:{id:row.id}})
				}
				
			},
			handleAddChildren(row){
				this.$router.push({path:'/menu-add-child',query:{id:row.id,name:row.name}})
			}
		}
	}
</script>

<style>
</style>
