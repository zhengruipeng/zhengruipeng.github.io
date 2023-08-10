<template>
	<div>
		<el-page-header @back="handleBack" content="编辑角色菜单"></el-page-header>
		<el-row>
			<el-col :span="12">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="角色名称">
						<el-input placeholder="请输入" readonly v-model.trim="addForm.name" ></el-input>
					</el-form-item>
					<el-form-item label="菜单列表">
						<el-tree
						  :data="menuList"
							ref="tree"
						  show-checkbox
						  node-key="id"
							check-on-click-node
							default-expand-all
							:expand-on-click-node="false"
							@check-change="handleCheckChange"
						  >
							<template v-slot="{data}">
								{{data.name}}
							</template>
						</el-tree>
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
				subLoading:false,
				allCheckedKeys:[]
			}
		},
		computed:{
			...mapState('roleModel',['menuList','checkMenuList'])
		},
		async created(){
			let id = this.$route.query.id 
			this.addForm =await this.findById(id)
			await this.findAllMenu()
			await this.findMenuByRoleId(id)
			this.setCheckMenu()
		},
		methods:{
			...mapActions('roleModel',['update','findById','findAllMenu','findMenuByRoleId','saveMenuRole']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleAdd(){
				let valid = await this.$refs.addForm.validate().catch(err => err);
				if(valid){
					if(this.allCheckedKeys.length == 0){
						this.$notify.error({
							title:'提示',
							message:'请至少选择一个菜单'
						})
						return;
					}
					this.subLoading = true
					await this.saveMenuRole({
						roleId:this.addForm.id,
						ids:this.allCheckedKeys
					})
					this.subLoading = false
					// await this.update(this.addForm)
					this.handleBack()
				}
			},
			handleCheckChange(){
				let halfKeys = this.$refs.tree.getHalfCheckedKeys();
				let keys = this.$refs.tree.getCheckedKeys()
				this.allCheckedKeys = [...keys,...halfKeys]
				
			},
			setCheckMenu(){
				let halfKeys = this.checkMenuList.map(item => item.id);
				let keys = []
				this.checkMenuList.forEach(item => {
					if(item.children){
						item.children.forEach((itemChild) => {
							keys.push(itemChild.id)
						})
					}
				})
				this.$refs.tree.setCheckedKeys([...keys],true)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
