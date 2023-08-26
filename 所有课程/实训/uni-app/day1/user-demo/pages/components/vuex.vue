<template>
	<view>
		<u-table class="u-table" >
			<u-tr class="u-tr" width="100%">
				<u-th class="u-th">账号</u-th>
				<u-th class="u-th">密码</u-th>
				<u-th class="u-th">昵称</u-th>
			</u-tr>
			<u-tr v-for="item in list" class="u-tr" :key="item.id">
				<u-td class="u-th">{{item.username}}</u-td>
				<u-td class="u-th">{{item.password}}</u-td>
				<u-td class="u-th">{{item.nickname}}</u-td>
			</u-tr>
			
		</u-table>
	</view>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default{
		computed:{
			...mapState('meModel',['list'])
		},
		async created(){
			console.log(this.$store)
			await this.getListAll()
		},
		methods:{
			...mapActions('meModel',['getListAll'])
		}
	}
</script>

<style scoped lang="scss">
	
	.u-tr{
		
		width: 100%;
	}
	.u-th{
		width: 100%;
	}
	
	
</style>
