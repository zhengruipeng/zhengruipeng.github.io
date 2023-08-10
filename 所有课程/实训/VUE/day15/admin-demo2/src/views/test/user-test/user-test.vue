<!--将如下内容粘贴到user-test.vue中 -->
<template>
	<div>
		<p-page-header title="用户管理练习"></p-page-header>
		<!-- 将以下代码插入到页面的合适位置 -->
		<!-- 
			由于表单中通常有很多的属性，所以我们通常也会吧表单中使用的属性封装到json对象中，在这里我们就创建了一个queryForm对象来存放请求参数
			这里的model对象就是用来绑定当前表单数据的对象，绑定后可以将表单内部通过v-model指令双向绑定的对象中的值结合表单验证做处理，这里我们作为初步了解
		-->
		<el-form :model="queryForm" inline>
		  <el-form-item size="mini" label="用户账号">
		    <el-input placeholder="请输入账号" clearable v-model="queryForm.username"></el-input>
		  </el-form-item>
		  <el-form-item size="mini">
		  	<el-button icon="el-icon-search" :loading="loading" @click="handleSearch" type="primary">查询</el-button>
		  </el-form-item>
			<el-form-item size="mini">
				<el-button icon="el-icon-plus" @click="handleAdd" type="success">增加</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" size="mini" border>
			<el-table-column label="id" prop="id"></el-table-column>
			<el-table-column label="账号" prop="username"></el-table-column>
			<el-table-column label="密码" prop="password"></el-table-column>
			<el-table-column label="昵称" prop="nickname"></el-table-column>
			<el-table-column label="创建时间" prop="insertTime">
				<template v-slot="{row}">
				<!-- 将每行的时间传入计算属性并输出-->
			  	{{formmatDate(row.insertTime)}}
			  </template>
			</el-table-column>
			<el-table-column label="角色名称" prop="roleName">
				<template v-slot="{row}">
					<el-tag>
			      {{row.roleName}}
			    </el-tag>
			  </template>
			</el-table-column>
			<el-table-column label="我是自定义列">
				<template v-slot="{row}">
					账号是:{{row.username}},密码是{{row.password}}
				</template>
			</el-table-column>
			<el-table-column label="操作"
				width="200px">
				<template v-slot="{row}">
					<el-button type="warning" @click="handleEdit(row.id)" size="mini" icon="el-icon-edit">修改</el-button>
					<el-button type="danger" @click="handleDelete(row.id)" size="mini">删除</el-button>
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
  //从vuex对象中引入mapState模块
  //增加mapActions对象的引入，用来映射model中定义的业务函数
	import {mapState,mapActions} from 'vuex';
	export default{
    //name属性用于在keep-alive中缓存当前页面
		name:'user-test',
		data(){
			return {
				queryForm:{
				  pno:1,//页号
				  psize:10,//每页多少条
				  username:''//用户账号
				},
				loading:false
			}
		},
		computed:{
      //...为es6解构赋值的写法，意义为将mapState执行并将返回值合并到computed中
      //mapState意义为state的映射对象，mapState(模块名称，['state中的属性','state中的属性'...]),这个意思就是将我们自己定义的user-test-model.js中创建的state中的list加载到本组件的computed中
			...mapState('userTestModel',['list','page']),
			formmatDate(){
			  return function(time){
			    //将时间戳转成日期
			    let d = new Date(time)
			    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
			  }
			}
		},
    methods:{
      //将mapActions合并到methods中，并且映射userTestModel模块将getListForPage这个函数一起合并到vue组件中
      ...mapActions('userTestModel',['getListForPage','deleteById']),
			async handleSearch(){
				this.loading = true;
				//为了防止分页功能导致页号变更，保证每次条件查询都要从第一页开始展示结果
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
				this.loading = false;
			},
			//分页组件的psize发生变化会触发并传入psize
			async handleSizeChange(psize){
			  //将每页多少条的值重新设置
			  this.queryForm.psize = psize
			  //重新调用查询
			  await this.getListForPage(this.queryForm)
			},
			  //通过分页组件触发跳页会执行并会传入pno
			async handleCurrentChange(pno){
			  //将新的页号设置到参数重
			  this.queryForm.pno = pno
			  //重新调用查询
			  await this.getListForPage(this.queryForm)
			},
			handleAdd(){
				this.$router.push('/user-test-add')
			},
			handleEdit(id){
			  this.$router.push({path:'/user-test-edit',query:{id}})
			},
			async handleDelete(id){
				console.log(id)
				let confirm = await this.$confirm('正在删除当前数据，点击确认继续','提交',{type:'warning'}).catch(err => err)
				console.log(confirm)
				if(confirm=='confirm'){
				      //如果点击确认就执行删除功能
				      await this.deleteById(id)
				      //执行完删除功能之后需要再次调用查询才能看到数据变化
				      await this.getListForPage(this.queryForm)
				    }
				    
			}
    },
    //由于被缓存的组件生命周期只有第一次生效所以这里我们在activated中调用接口，这样每次访问user-test.vue时都会执行一次查询
    async activated(){
      //这里就相当于调用了user-test-model.js中的getListForPage方法，也就是间接的调用了api中定义的接口函数并且将queryForm作为参数传入
      //这里依然使用async配合await的语法进行使用
      await this.getListForPage(this.queryForm)
    },
		async created(){
		  //这里就相当于调用了user-test-model.js中的getListForPage方法，也就是间接的调用了api中定义的接口函数并且将queryForm作为参数传入
		  //这里依然使用async配合await的语法进行使用
		  await this.getListForPage(this.queryForm)
		}
    
	}
</script>

<style>
</style>