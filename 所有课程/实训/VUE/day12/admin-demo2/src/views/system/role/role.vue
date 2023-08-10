<template>
	<div class="page">
		<p-page-header title="角色管理"></p-page-header>
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
			:data="list">
			<el-table-column label="角色id" prop="id"></el-table-column>
			<el-table-column label="角色名称" prop="name"></el-table-column>
			<el-table-column label="创建时间" prop="insertTime">
				<template v-slot="{row}">
					{{formatTime(row.insertTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作"
				width="300">
				<template v-slot="{row}">
					<el-button size="mini" icon="el-icon-menu" @click="handleMenu(row.id)">绑定菜单</el-button>
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
					<el-button size="mini" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page.pno"
			:page-size="page.psize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="page.totalElements">
		</el-pagination>
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
			...mapState('roleModel',['list','page']),
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
			...mapActions('roleModel',['getListForPage','deleteById']),
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
				this.$router.push('/role-add')
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
			handleEdit(id){
				this.$router.push({path:'/role-edit',query:{id}})
			},
			handleMenu(id){
				this.$router.push({path:'/role-menu',query:{id}})
			}
		}
	}
</script>

<style>
</style>
