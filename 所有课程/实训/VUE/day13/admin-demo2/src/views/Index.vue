<template>
  <div class="p-index">
    <el-container class="p-el-container">
      <el-header>
        <p-header></p-header>
      </el-header>
      <el-container>
        <el-aside>
					<p-menu></p-menu>
        </el-aside>
        <el-main>
					<el-container class="main-container" direction="vertical" >
						<p-tabs></p-tabs>
						<div class="pages">
							<keep-alive :include="getKeepAliveList">
								<router-view></router-view>
							</keep-alive>
						</div>
					</el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	// 这里引用对象前面加了P，如Header写成了PHeader是因为
	// 通过import引用的组件我们没有在全局注册组件名称，如果直接使用对象名注册到App.vue中
	// Vue会自动将组件（首字母大写驼峰形式的）拆分成分词-分词的形式，如PHeader就会被自动解析成p-header
	// 具体可以看template中引用的写法
	// 引用Header组件
	import PHeader from '../components/Header.vue'
	//引用Menu组件
	import PMenu from '../components/Menu.vue'
	// 引用Tabs组件
	import PTabs from '../components/Tabs.vue'
	// 引用vuex中的state和getter映射对象
	import { mapState,mapGetters } from 'vuex';
	export default{
		// 将组件注册到App.vue中，这种引入方式只能在App.vue中使用这三个组件如果需要在别的页面使用，需要单独做引入
		components:{
			PHeader,
			PMenu,
			PTabs
		},
		computed:{
			// 获取vuex中getters内定义的getKeepAliveList，和getActiveMenu，
			//打开store/index.js尝试找到他们定义的位置做一个预习
			//在数组内写的字符串会自动注册到当前Vue页面的computed函数中当作计算属性使用，并能获得在store中运行的结果
			...mapGetters(['getKeepAliveList','getActiveMenu'])
		},
		created() {
			//在这里调用接口，通过远程数据获取菜单内容
			
		}
	}
</script>

<style lang="scss" >
  .p-index{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .p-el-container{
      height: 100%;
			overflow: auto;
			.el-container{
				overflow: auto;
			}
      .el-header{
				padding: 0;
        background-color: #666666;
        line-height: 60px;
        color: #fff;
      }
      .el-aside{
        background-color: #333744;
				padding: 0;
      }
      .el-main{
				padding: 0;
        background-color: #CCCCCC;
				.main-container{
					height: 100%;
					display: flex;
					flex-direction: column;
					.pages{
						flex-grow: 1;
						overflow: auto;
						max-height: 100%;
						padding: 0px 15px;
						background-color: #fff;
					}
				}
      }
    }

  }
</style>
