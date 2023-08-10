<template>
	<div class="page">
		<p-page-header title="用户管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="mini" label="用户账号">
				<el-input placeholder="请输入" clearable v-model="queryForm.username"></el-input>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
		</el-form>
		<!-- 
			使用table组件 
			border为展示边框
			size与表单控件的size用法相同
			data为表格的数据属性传入表格的数据格式为[{key:value,key:value}]必须是json数组
		-->
		<el-table
			border
			size="mini"
			:data="list">
			<!-- 表格的列对象
				每一个el-table-column代表一列
				label表示table的thead中的th内的内容
				prop代表当前这一列引用的数据是传入的[{key:value,key:value}]哪个key的数据
			 -->
			<el-table-column label="账号" prop="username"></el-table-column>
			<el-table-column label="昵称" prop="nickname"></el-table-column>
			<el-table-column label="角色" prop="roleName">
				<!-- 
					这个是el-table-column
				 中通过slot插槽来实现自定义插入数据的写法，
				 通过template嵌套之后可以在v-slot="{row}"拿到每一行的数据
				 row存的就是list中每一行的json对象
				 -->
				<template v-slot="{row}">
					<el-tag size="small">
						{{row.roleName}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" prop="insertTime">
				<template v-slot="{row}">
					{{formatTime(row.insertTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作" >
				<!--
					这个是el-table-column
				 中通过slot插槽来实现自定义插入数据的写法，
				 通过template嵌套之后可以在v-slot="{row}"拿到每一行的数据
				 row存的就是list中每一行的json对象
				 -->
				<template v-slot="{row}">
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
	// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
	import { mapState,mapActions } from 'vuex'
	export default{
		// 定义了组件的名称，用来结合keep-alive缓存页面
		name:'user',
		data(){
			return {
				// 调用查询接口需要的参数
				queryForm:{
					username:'',
					pno:1,
					psize:10
				},
				// 查询按钮的加载动画开关
				queryLoading:false
			}
		},
		computed:{
			// 将vuex中定义的userModel模块的数据加载到本页的计算属性中，这样我们在本页就可以
			// 直接通过this.list和this.page访问到vuex中的数据，这里的数据只能读取不能写入
			...mapState('userModel',['list','page']),
			// 格式化日期的计算属性
			formatTime(){
				return function(time){
					let d = new Date(time);
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		// 当第一次打开页面时会执行created生命周期
		async created(){
			await this.getListForPage(this.queryForm)
		},
		// 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
		async activated(){
			await this.getListForPage(this.queryForm)
		},
		methods:{
			// 将vuex中定义的getListForPage，deleteById绑定到本页的methods对象中
			//绑定后可以直接通过this.getListForPage和this.deleteById调用这两个函数
			...mapActions('userModel',['getListForPage','deleteById']),
			// 点击查询按钮触发的⌚️
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				// 这里调用的getListForPage就是在user-model.js中的actions里定义的方法
				//通过mapActions绑定后就能直接调用，之所以这样做是为了把复杂的接口访问过程，拆分到页面外，这样
				//可以让页面内部的逻辑更加清晰并且方便维护
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			// 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				// 数据发生变化之后我们重新的调用查询方法
				await this.getListForPage(this.queryForm)
			},
			// 点击分页组件上一页下一页切换页面时触发的回调，参数就是跳到哪一页
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				// 改变请求的参数重新查询当页的数据
				await this.getListForPage(this.queryForm)
			},
			// 跳转到添加数据的页面
			handleAdd(){
				this.$router.push('/user-add')
			},
			// 删除数据调用的方法
			async handleRemove(id){
				// 通过同步化写法调用$confirm方法
				let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					// 如果点击确定
					//首先调用删除业务
					await this.deleteById(id)
					//删除业务调用完毕之后我们重新调用一次查询业务，来实现数据的更新
					await this.getListForPage(this.queryForm)
				}
			},
			// 跳转到编辑用户的页面
			handleEdit(id){
				this.$router.push({path:'/user-edit',query:{id}})
			}
		}
	}
</script>

<style>
</style>
