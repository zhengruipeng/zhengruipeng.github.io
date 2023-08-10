<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
	export default{
		watch:{
			$route(to,from){
				if(to.path!= '/login'){
					if(!sessionStorage.token){
						this.$notify({
							type:'error',
							title:'提示',
							message:'您还还没有登录或登录已过期,请重新登录'
						})
						this.$router.push('/login')
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.el-page-header{
		padding: 10px 0px;
		border-bottom: 1px solid #eee;
		margin-bottom: 15px;
	}
	
</style>
