<template>
	<view class="content">
		<view class="user-info">
			<view class="icon">
				{{getFirstName}}
			</view>
			<view class="info">
				<view class="name">
					{{userInfo.nickname}}
				</view>
				<view class="dept">
					{{userInfo.deptName}}
				</view>
			</view>
		</view>
		<view class="check-info">
			<view class="check-record">
				<view class="item">
					<view class="title">
						上班8:20
					</view>
					<view class="info">
						15:18已打卡
					</view>
				</view>
				<view class="item">
					<view class="title">
						下班17:30
					</view>
					<view class="info">
						17:30已打卡
					</view>
				</view>
			</view>
			<view class="check-btn">
				<view class="check-circle">
					<view class="title">上班打卡</view>
					<!-- 时间位置 -->
					<view class="time">
						<!-- 时间位置 -->
						<time-run></time-run>
					</view>
				</view>
				位置部分
				<view class="location">
					<!--如果地理位置授权未获取就展示鉴权按钮打开权限设置 -->
					<button v-if="getLocationFail" type="primary" open-type="openSetting">请打开位置授权</button>
					<view v-else>
						{{locationInfo}}
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TimeRun from '../../components/time-run.vue'
    //引入判断考勤范围接口函数
    import {checkPosition} from '@/api/user-api.js'
	export default {
		components: {
			TimeRun
		},
		data() {
			return {
				userInfo: {},
				getLocationFail: false, //用于判断当前用户是否开放了位置授权
				locationInfo: '当前位置信息', //用于展示当前的用户的位置信息
				lat: 0, //用于存储当前用户纬度
				lng: 0 ,//用于存储当前用户经度
				 checkTypeList:{
				    "0":"上/下班打卡",//正常的上下班打卡按照时间是否过12点来分开
				    "1":"迟到打卡",//只有在考勤范围内我们来确定是否是迟到，在范围内切过了上班时间
				    "2":"早退打卡",//在范围内且没到下班时间并且过了中午
				    "3":"外勤打卡"//如果不在考勤范围内我们就认为是外勤打卡，只要是外勤打卡就不考虑迟到早退
				  }
			}
		},
		onLoad() {

		},
		//这段替换调原有的onShow
		onShow() {
		  // 因为当前页面被配置到了tabbar中相当于被keepalive缓存起来了，所以我们
		  //只能子啊onShow生命周期中自定触发获取用户信息
		  this.userInfo = uni.getStorageSync('userInfo')
		
		  uni.getLocation({
		    geocode:true,
		    success:async (res)=>{
		      console.log(res)
		      this.getLocationFail = false
		      this.lat = res.latitude
		      this.lng = res.longitude
		      this.$http({
		        url:'https://apis.map.qq.com/ws/geocoder/v1/',
		        method:'get',
		        data:{
		          location:`${res.latitude},${res.longitude}`,
		          key:'PN2BZ-XWHW2-ZIAU7-CQW7K-LSY4J-WYBOO'
		        }
		      }).then(r => {
		        if(r.data.status == 0){
		          this.locationInfo = r.data.result.address
		        }else{
		          this.locationInfo = '获取位置信息失败请重新登陆'
		        }
		      })
		      //判断当前是否在考勤范围内
		      let r = await checkPosition({
		        lat:this.lat,
		        lng:this.lng
		      })
		      console.log(r.data)
		    },
		    fail:()=>{
		      this.getLocationFail = true
		    }
		
		  })
		},
				
		methods: {

		},
		computed: {
			getFirstName() {
		 	if (this.userInfo.nickname) {
		 		return this.userInfo.nickname.charAt(0)
				} else {
					return '未知'
				}

			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
		height: 100%;
	}

	.content {
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.user-info {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;

		.icon {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			background-color: #2979FF;
			color: #fff;
			line-height: 100rpx;
			text-align: center;
			margin-right: 30rpx;

		}

		.info {
			.name {
				font-size: 40rpx;

			}

			.dept {
				font-size: 28rpx;
				color: #aaa;
			}
		}
	}

	.check-info {
		flex-grow: 1;
		margin-top: 30rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;

		.check-record {

			display: flex;

			.item {
				flex-grow: 1;
				background: #eee;
				margin: 0rpx 10rpx;
				border-radius: 9rpx;
				padding: 10rpx 15rpx;

				.info {
					font-size: 24rpx;
					color: #999;
				}
			}
		}

		.check-btn {
			.check-circle {
				background-color: #2B85E4;
				color: #fff;
				width: 270rpx;
				height: 270rpx;
				border-radius: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(0, 50, 180, 0.6);
				margin: auto;
				margin-top: 30rpx;

				.title {
					font-size: 40rpx;
					font-weight: bold;
				}

				.time {
					opacity: 0.5;
				}

			}

			.location {
				color: #666;
				font-size: 24rpx;
				text-align: center;
				margin-top: 30rpx;
			}

		}
	}
</style>
