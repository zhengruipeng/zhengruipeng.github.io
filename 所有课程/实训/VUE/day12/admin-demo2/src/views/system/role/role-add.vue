<template>
	<div>
		<el-page-header @back="handleBack" content="增加角色信息"></el-page-header>
		<el-row>
			<el-col :span="6">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="角色名称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					
					<el-form-item size="mini">
						<el-button :loading="subLoading" @click="handleAdd" type="primary">提交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
	export default{
		name:'role-add',
		data(){
			return {
				addForm:{
					name:'',
				},
				rules:{
					name:[{
						required:true,
						message:'名称不可以为空'
					}],
				},
				subLoading:false
			}
		},
		async created(){
		},
		methods:{
			...mapActions('roleModel',[,'insert']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleAdd(){
				let valid = await this.$refs.addForm.validate().catch(err => err);
				if(valid){
					this.subLoading = true
					await this.insert(this.addForm)
					this.subLoading = false
					this.handleBack()
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
