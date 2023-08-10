<template>
  <div class="p-index">
    <el-container class="p-el-container">
      <el-header>
        后台管理系统训练
      </el-header>
      <el-container>
        <el-aside>
          <!-- <ul>
            <li>
              <router-link to="/test1">
                跳转到Test1.vue
              </router-link>
            </li>
            <li>
              <router-link to="/test2">
                跳转到Test2.vue
              </router-link>
            </li>
          </ul> -->
					<!-- 
						导航菜单默认为垂直模式，通过mode属性可以使导航菜单变更为水平模式。
						另外，在菜单中通过submenu组件可以生成二级菜单。
						el-menu的固定嵌套使用模式 
						学会本示例中的属性和用法即可，其他的可以课后自己查看文档练习
						default-active="11"要结合menuList中的id来看，因为submenu和menu-item绑定的index就是数据中
						的每一个元素的id，所以default-active的值为哪一个菜单，默认打开并激活的就是哪一个菜单，由于submenu是
						折叠部分的菜单，非子菜单，所以我们要将default-active配置成可以打开页面的菜单id才能实现默认展开
						
						router属性代表当前菜单是否可以实现路由跳转功能，只有router为true时menu-item上的route属性绑定的path就可以实现
						点击菜单跳转到指定的页面
						
						class是给el-menu单独绑定的样式
					-->
					<el-menu
						default-active="11"
						router
						class="el-menu-vertical-demo">
						<!-- 
							我们参考menuList的数据结构，可以看出菜单是两层，外层循环的是可折叠部分的菜单，也就是menuList的第一层
							index相当于每个菜单的id用来决定菜单的唯一性
						 -->
						<el-submenu v-for="menu in menuList" :key="menu.id" :index="menu.id">
							<!-- template为submenu自带的插槽功能，可以传入菜单名称和图标 -->
							<template slot="title">
								<i :class="menu.icon"></i>
								<span>{{menu.name}}</span>
							</template>
							<!-- 
								这里是折叠菜单中嵌套的子菜单，由于menuList数据结构可知道，系统设置和商城管理中都存在子菜单，
							  外层循环中我们实现的是折叠菜单的循环，这里的v-for是对每个折叠菜单的子菜单进行循环
								index同上
								route为跳转页面的path，当el-menu上配置router为true是才能实现跳页
							 -->
							<el-menu-item v-for="menuChild in menu.children " 
								:key="menuChild.id"
								:index="menuChild.id"  :route="menuChild.url">
								<i :class="menuChild.icon"></i>
								<span slot="title">{{menuChild.name}}</span>
							</el-menu-item>
						</el-submenu>
						
						
					</el-menu>
        </el-aside>
        <el-main>
					<router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	export default{
		data(){
			return {
				// 菜单的数据结构
				menuList:[
					{
						id:'1',
						name:'系统设置',
						icon:'el-icon-setting',
						children:[
							{
								id:'11',
								name:'用户管理',
								icon:'el-icon-user',
								url:'/user'
							},
							{
								id:'12',
								name:'菜单管理',
								icon:'el-icon-menu',
								url:'/menu'
							}
						]
					},
					{
						id:'2',
						name:'商城管理',
						icon:'el-icon-setting',
						children:[
							{
								id:'21',
								name:'商品类型管理',
								icon:'el-icon-user',
								url:'/goods-type'
							},
							{
								id:'22',
								name:'商品管理',
								icon:'el-icon-menu',
								url:'/goods'
							}
						]
					}
				]
			}
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
      .el-header{
        background-color: #666666;
        line-height: 60px;
        color: #fff;
      }
      .el-aside{
        background-color: #888888;
      }
      .el-main{
        background-color: #CCCCCC;
      }
    }

  }
</style>
