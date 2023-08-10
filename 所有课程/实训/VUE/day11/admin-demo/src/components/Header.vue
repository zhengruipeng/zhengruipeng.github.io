<template>
	<div class="p-header">
		<div class="p-title">
			<i class="el-icon-platform-eleme">
			</i>
			拼夕夕商城后台管理系统
		</div>
		<div class="p-user">
			<el-dropdown trigger="click"
				@command="handleClick">
			  <el-tag>
			  	{{getUser}}
			  	<i class="el-icon-caret-bottom"></i>
			  </el-tag>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item command="exit">退出登录</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default{
		name:'p-header',
		data(){
			return{
				userInfo:{}
			}
		},
		computed:{
			getUser(){
				return this.userInfo.nickname;
			}
		},
		created(){
			try{
				let userInfo = JSON.parse(sessionStorage.userInfo);
				this.userInfo = userInfo
			}catch(e){
				this.$notify({
					type:'error',
					title:'提示',
					message:'您还还没有登录或登录已过期,请重新登录'
				})
				this.$router.push('/login')
			}
		},
		methods:{
			async handleClick(command){
				if(command == 'exit'){
					let res = await this.$confirm('正在退出系统','提示',{
						type:'warning',
					}).catch(err => err)
					if(res == 'confirm'){
						delete sessionStorage.userInfo;
						delete sessionStorage.token;
						delete sessionStorage.menuList;
						this.$router.push('/login')
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.p-header{
		background-color: #222222;
		padding: 0px 15px;
		.p-title{
			display: inline-block;
		}
		.p-user{
			display: inline-block;
			cursor: pointer;
			float: right;
		}
	}
</style>
