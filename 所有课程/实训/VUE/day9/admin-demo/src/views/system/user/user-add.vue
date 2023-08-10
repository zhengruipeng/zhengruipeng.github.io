<template>
	<div>
		<el-page-header @back="handleBack" content="增加用户信息"></el-page-header>
		<el-row>
			<el-col :span="6">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="username" label="账号">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.username" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="password" label="密码">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.password" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="nickname" label="昵称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.nickname" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="roleId" label="角色">
						<el-select placeholder="请选择" clearable v-model.trim="addForm.roleId">
							<el-option v-for="item in roleList" 
								:key="item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
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
		name:'user-add',
		data(){
			return {
				addForm:{
					username:'',
					password:'',
					nickname:'',
					roleId:''
				},
				rules:{
					username:[{
						required:true,
						message:'账号不可以为空'
					}],
					password:[{
						required:true,
						message:'密码不可以为空'
					}],
					nickname:[{
						required:true,
						message:'昵称不可以为空'
					}],
					roleId:[{
						required:true,
						message:'角色不可以为空'
					}]
				},
				subLoading:false
			}
		},
		async created(){
			await this.getRoleListAll()
		},
		computed:{
			...mapState('userModel',['roleList'])
		},
		methods:{
			...mapActions('userModel',['getRoleListAll','insert']),
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
