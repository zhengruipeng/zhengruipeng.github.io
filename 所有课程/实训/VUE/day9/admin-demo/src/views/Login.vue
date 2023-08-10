<template>
  <div class="p-login">
    <!-- 增加进入的过渡动画 -->
    <transition name="fade-down" appear>
      <div class="p-login-bar">
        <div class="p-title">
          后台管理系统
        </div>
        <!-- 利用form组件构造的结构 -->
        <el-form :model="formData" ref="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" clearable v-model="formData.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-key" clearable v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="handleLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
	import { login } from '../api/user-api.js'
	import { mapActions,mapGetters } from 'vuex'
	export default{
		data(){
			return {
				// 表单验证对象必须是一个json对象
				formData:{
					username:'',
					password:''
				},
				// 表单验证规则，固定格式
				rules:{
					username:[
						{required:true,message:'用户名不可以为空',trigger:'change'}
					],
					password:[
						{required:true,message:'密码不可以为空',trigger:'change'}
					]
				}
			}
		},
		computed:{
			...mapGetters(['getActiveMenu'])
		},
		methods:{
			// 绑定Vuex中的根据角色id查询菜单的逻辑函数到本组件的methods中，这样就可以通过this.fetchMenuByRoleId嗲用他
			...mapActions(['fetchMenuByRoleId']),
			// 定义异步函数
			async handleLogin(){
				// 通过await进行表单验证,this.$refs.loginForm可以调用el-form的验证方法并返回表单验证的结果
				let valid = await this.$refs.loginForm.validate().catch(err => err)
				if(valid){
					let res = await login(this.formData.username,this.formData.password);
					if(res.data.code == 200 ){
						sessionStorage.userInfo = JSON.stringify(res.data.data.userInfo);
						sessionStorage.token = res.data.data.token;
						
						await this.fetchMenuByRoleId(res.data.data.userInfo.roleId)
						this.$router.push(this.getActiveMenu.url)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
  .p-login{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/bg.jpg);
    background-size: cover;
    .p-login-bar{
      width: 400px;
      margin: auto;
      margin-top: 180px;
      padding: 15px 30px;
      background-color: rgba(0,0,0,0.3);
      border-radius: 9px;
      backdrop-filter: blur(2px);
      .p-title{
        color: #fff;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        padding: 15px 0px;
      }
      .el-input{
        background-color: rgba(0,0,0,0.3) !important;
        ::v-deep{
          .el-input__inner{
            background: rgba(0,0,0,0.3) !important;
          }
        }
      }
      .form-btn{
        text-align: center;
      }
    }
    .fade-down-enter-active{
      animation: fade-down .3s;
    }
    .fade-down-leave-active{
      animation: fade-down .3s reverse;
    }
    @keyframes fade-down{
      from{opacity: 0;transform: translateY(-100px);}
      to{opacity: 1;transform: translateY(0px);}
    }
  }

</style>
