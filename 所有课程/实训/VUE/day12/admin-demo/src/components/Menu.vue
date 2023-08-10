<template>
	<!-- 
		自定义菜单组件，基于el-menu二次封装，主要用于与tabs联动实现菜单和标签页对应变化
		这里的全局数据同步采用Vuex的方式进行同步
	 -->
	<div class="p-menu">
		<el-menu
			:default-active="getActiveMenuId"
			router
			background-color="#333744"
			text-color="#fff"
			@select="handleSelect"
			class="el-menu-vertical-demo">
			<!-- 
				我们参考list的数据结构，可以看出菜单是两层，外层循环的是可折叠部分的菜单，也就是list的第一层
				index相当于每个菜单的id用来决定菜单的唯一性
			 -->
			<el-submenu v-for="menu in getMenuList" :key="menu.id" :index="''+menu.id">
				<!-- template为submenu自带的插槽功能，可以传入菜单名称和图标 -->
				<template slot="title">
					<i :class="menu.icon"></i>
					<span>{{menu.name}}</span>
				</template>
				<!-- 
					这里是折叠菜单中嵌套的子菜单，由于list数据结构可知道，系统设置和商城管理中都存在子菜单，
				  外层循环中我们实现的是折叠菜单的循环，这里的v-for是对每个折叠菜单的子菜单进行循环
					index同上
					route为跳转页面的path，当el-menu上配置router为true是才能实现跳页
				 -->
				<el-menu-item v-for="menuChild in menu.children " 
					:key="menuChild.id"
					:index="''+menuChild.id"  :route="menuChild.url">
					<i :class="menuChild.icon"></i>
					<span slot="title">{{menuChild.name}}</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	// 从Vuex中导入mutation和state的映射对象
	import { mapMutations,mapState,mapGetters } from 'vuex'
	export default{
		name:'p-menu',
		computed:{
			// 将vuex中定义的state映射到本对象的计算属性中，state中的属性为只读不可以直接修改
			...mapState(['tabsList','activeMenuId']),
			...mapGetters(['getMenuList','getActiveMenuId'])
		},
		methods:{
			// 将vuex中的mutations定义的函数映射到本组件的methods中
			// 想要修改state中的值必须通过调用mutations中的函数来操作
			...mapMutations(['setActiveMenuId','setTabsList']),
			handleSelect(res){
				let selectedMenu = {}
				this.getMenuList.forEach(item => {
					if(item.children){
						item.children.forEach(itemChild => {
							if(itemChild.id == res){
								selectedMenu = itemChild;
							}
						})
					}
				})
				let arr = [...this.tabsList];
				let has = false
				arr.forEach(item => {
					if(item.id == res){
						has = true;
					}
				})
				if(has == false){
					arr.push(selectedMenu)
				}
				this.setActiveMenuId(res);
				this.setTabsList(arr)
			}
		}
		
	}
</script>

<style>
</style>
