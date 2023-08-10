<!-- 将页面改造成如下效果并阅读注释学习form的新属性 -->
<template>
	<div>
		<el-page-header @back="handleBack" content="新增用户信息"></el-page-header>
		<!-- 
			model绑定的addForm是为了关联rules中表单验证对象使用的，相当于指定了这个表单要验证的对象是哪个对象
		  ref相当于对这个表单组件进行命名，我们可以通过this.$refs.addForm来直接拿到这个表单组件。
			rules代表表单验证对象，绑定了表单验证对象之后就可以在rules中编写校验规则
			label-width="auto"是让左侧的label可以自适应排列
		
		-->
		<!-- {{roleList}} -->
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="auto">
			<!-- 
				label代表表单的标题
				size不多做解释了
				prop="username"代表用户账号的addForm.username这个值在rules里对应的key也是username，结合rules中定义的key理解
					
			-->
      <el-form-item label="用户账号" size="mini" prop="username">
        <!-- v-model绑定了addForm.username并且通过外层嵌套的prop关联到了rules中的username  v-model.trim代表输入的内容前后不允许输入空格-->
				<el-input clearable placeholder="请输入" v-model.trim="addForm.username"></el-input>
			</el-form-item>
			<el-form-item label="用户昵称" size="mini" prop="nickname">
				<el-input clearable placeholder="请输入" v-model.trim="addForm.nickname"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" size="mini" prop="password">
				<el-input clearable placeholder="请输入" v-model.trim="addForm.password"></el-input>
			</el-form-item>
			<el-form-item label="角色" size="mini" prop="roleId">
				<el-select clearable v-model="addForm.roleId">
				  <!-- 循环roleList将角色的id设置到value中，将角色的名称设置到label中展示到页面 -->
					<el-option v-for="item in roleList"
				             :key="item.id"
				             :value="item.id"
				             :label="item.name">
				  </el-option>
				</el-select>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { mapState,mapActions } from 'vuex'
	export default{
		name:'user-test-add',
		data(){
		  return {
				loading:false,
		    addForm:{
		      username:'',//用户账号
		      nickname:'',//用户昵称
		      password:'',//用户密码
		      roleId:'',//角色id,
					
		    },
        //表单校验对象,表单校验对象rules绑定在form之后会根据每个el-form-item上绑定的prop建立关联关系，如第一行的prop为username，所以这里的username就是用来校验用户账号的
				rules:{
      		//校验对象的结构是一个数组每个元素有固定写法    
					username:[
            //这里是校验非空对象的基本写法，required代表是否必填，message是验证不通过时的提示内容，trigger代表通过什么事件触发校验事件（支持input可用的所有事件）
            {required:true,message:'用户名不可以为空',trigger:'change'},
						{validator:function(rule,value,callback){
							//下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
							if(value.length<6){
								//不满足条件，返回错误信息
								callback(new Error('用户账号不能少于6位'))
							}else{
								//满足条件调用callback让验证通过
								callback()
							}
						},trigger:'change'}
          ],
					nickname:[
						{required:true,message:'昵称不可以为空',trigger:'change'},
					],
					password:[
						{required:true,message:'密码不可以为空',trigger:'change'},
						{validator:function(rule,value,callback){
							//下面我们来对表单增加一个校验，要求用户账号必须满足6位以上包含六位
							if(value.length<6||value.length>8){
								//不满足条件，返回错误信息
								callback(new Error('密码的长度只能在6-8位'))
							}else{
								//满足条件调用callback让验证通过
								callback()
							}
						},trigger:'change'}
					],
					roleId:[
						{required:true,message:'角色不可以为空',trigger:'change'}
					]
				}
		  }
		},
		computed:{
			...mapState('userTestModel',['roleList'])
		},
		methods:{
			...mapActions('userTestModel',['getRoleList','insert']),
			handleBack(){
				this.$router.history.go(-1)
			},
			async handleSubmit(){
			  //在提交逻辑执行之前先调用手动表单验证
			  let valid =await this.$refs.addForm.validate().catch(err => err);
			  //验证通过后在执行提交逻辑
			  if(valid){
			    //让按钮转圈
			    this.loading = true;
			    //调用insert函数并将参数addForm传入
			    await this.insert(this.addForm)
			    //取消动画
			    this.loading = false;
			    //回到查询页面
			    this.$router.push('/user-test')
			  }
			
			}
		},
		async created(){
			await this.getRoleList();
		}
	}
</script>

<style>
</style>

