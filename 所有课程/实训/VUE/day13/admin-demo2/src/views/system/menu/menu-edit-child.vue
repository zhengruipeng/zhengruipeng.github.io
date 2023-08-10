<template>
	<div>
		<el-page-header @back="handleBack" content="编辑子菜单信息"></el-page-header>
		<el-row>
			<el-col :span="6">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="菜单名称">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					<el-form-item size="mini" prop="icon" label="菜单图标">
						<el-select  clearable  v-model.trim="addForm.icon">
							<el-option v-for="item in iconList"
								:key="item"
								:label="item"
								:value="item">
								<template v-slot>
									<i :class="item"></i>
									{{item}}
								</template>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item size="mini" prop="url" label="路由">
						<el-input placeholder="请输入" clearable v-model.trim="addForm.url" ></el-input>
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
					icon:'',
					url:''
				},
				rules:{
					name:[{
						required:true,
						message:'名称不可以为空'
					}],
					icon:[
						{
							required:true,
							message:'图标不可以为空'
						}
					],
					url:[
						{
							required:true,
							message:'路由不可以为空'
						}
					],
				},
				subLoading:false
			}
		},
		computed:{
			...mapState('menuModel',['iconList'])
		},
		async created(){
			let id = this.$route.query.id;
			this.addForm = await this.findById(id);
		},
		methods:{
			...mapActions('menuModel',[,'updateChild','findById']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleAdd(){
				let valid = await this.$refs.addForm.validate().catch(err => err);
				if(valid){
					this.subLoading = true
					await this.updateChild(this.addForm)
					this.subLoading = false
					this.handleBack()
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
