<style lang="less">
	page{
		background-color: #f5f5f5!important;
	}
</style>
<style scoped lang="less">
	// 我的订单部分
.user .header{
	margin-left:-1px !important;
}
.user .wrapper .myOrder{
	border-radius: 20rpx;
}
.user .wrapper .myOrder .orderState .item{
	flex: 0 0 20%;
	margin-bottom: 20rpx;
	&:nth-last-child(-n + 5){
		margin-bottom: 0;
	}
}
.user .wrapper .myOrder .orderState{
	height: auto;
	padding: 25rpx 0;
}

.footer-line-height {
  height: 1 * 100rpx;
}

.order-status-num {
  min-width: 16rpx;
  background-color: #fff;
  color: #eb3729;
  border-radius: 50%;
  position: absolute;
  right: -0.14 * 100rpx;
  top: -0.15 * 100rpx;
  font-size: 20rpx;
  padding: 0 0.08 * 100rpx;
  border: 1px solid #eb3729;
}

.pictrue {
  position: relative;
}

.switch-h5 {
  margin-left: 0.2 * 100rpx;
}

.binding {
  margin-top: 0.1 * 100rpx;
  display: inline-block;
  padding: 0.05 * 100rpx 0.2 * 100rpx;
  background-color: transparent;
  border-radius: 50px;
  font-size: 0.22 * 100rpx;
  line-height: 1.5;
  border: 2rpx solid #E3E3E3;
  color: #ffffff;
  margin-top: 20rpx;
  &::after{
	  border: none;
  }
}

.by {
  text-align: center;
  padding: 30rpx 0;
}
.by-text {
  text-align: center;
  font-size: 24rpx;
}
.identity{
	height: 33rpx;
	background: url(https://res.sdebs.com/personal-2.png)no-repeat left top,#fff;
	background-size: 98rpx 100%;
	padding-left:40rpx;
	padding-right: 16rpx;
	box-sizing: border-box;
	border-radius: 10rpx;
}
.my-point{
	background: url(https://res.sdebs.com/personal-3.png)no-repeat center;
	background-size: 100% 100%;
}
.shopping-point{
	background: url(https://res.sdebs.com/personal-4.png)no-repeat center;
	background-size: 100% 100%;
}
.my-point,.shopping-point{
	height: 140rpx;
}

.fun-box{
	border-radius: 20rpx;
	background-color: #fff;
	.fun-title{
		height: 88rpx;
		padding: 0 30rpx;
		border-bottom: 1px dashed #eee;
		font-size: 30rpx;
		color: #282828;
	}
	.fun-list{
		display: flex;
		justify-content: flex-start;
		padding: 25rpx 0;
	}
	.fun-item{
		flex: 0 0 25%;
		margin-bottom: 82rpx;
		font-size: 26rpx;
		color: #454545;
		text-align: center;
		&:nth-last-child(-n + 4){
			margin-bottom: 0;
		}
	}
	.fun-img{
		width: 47rpx;
		height: 47rpx;
	}
}
</style>
<template>
	<view class="user">
		<view v-if="$store.getters.token||userInfo.uid">
			<view class="header acea-row row-between-wrapper">
				<view class="picTxt acea-row row-between-wrapper">
					<view class="pictrue">
						<image :src="userInfo.avatar" />
					</view>
					<view class="text">
						<view class="acea-row row-middle">
							<view class="name line1">{{ userInfo.nickname }}</view>
							<!-- <view class="member acea-row row-middle" v-if="userInfo.vip">
                <image :src="userInfo.vipIcon" />
                <text>{{ userInfo.vipName }}</text>
              </view> -->
							<!-- vip -->
							<view class="identity color-cyan fs-24 txt-normal left-10">{{(userInfo.mark&&userInfo.mark=='平台农户')?'养殖户':'普通用户'}}</view>
						</view>
						<view @click="goPersonalData()" class="id" v-if="userInfo.phone">
							<text>{{ userInfo.phone || 0}}</text>
							<!-- <text class="iconfont icon-bianji1"></text> -->
						</view>
						<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="binding" @click="setPhone()" v-else>
							<text>绑定手机号</text>
						</button>
					</view>
				</view>
				<text class="iconfont icon-shezhi" @click="goPersonalData()"></text>
			</view>
			<view class="wrapper z-index-2 relative" style="margin-top: 20rpx;">
				<!-- <view class="nav acea-row row-middle">
          <view @click="goUserAccount()" class="item">
            <text>我的余额</text>
            <text class="num">{{ userInfo.nowMoney || 0 }}</text>
          </view>
          <view
            @click="goUserPromotion()"
            class="item"
            v-if="userInfo.isPromoter === 1 || userInfo.statu === 2"
          >
            <text>当前佣金</text>
            <text class="num">{{ userInfo.brokeragePrice || 0 }}</text>
          </view>
          <view @click="goIntegral()" class="item" v-else>
            <text>当前积分</text>
            <text class="num">{{ userInfo.integral || 0 }}</text>
          </view>
          <view @click="goUserGame()" class="item">
            <text>转盘活动</text>
            <text class="num">{{ lotteryTypeNum || 0 }}</text>
          </view>
        </view> -->
				<!-- 我的积分,积分商城 -->
				<view class="flex-main-between fs-26 color-white txt-heavy lh-1">
					<view @click="goIntegral()" class="my-point flex-main-center flex-column flex-1">
						<text>我的积分</text>
						<text class="top-25 txt-medium">{{userInfo.integral || 0}}</text>
					</view>
					<view @click="goShopping()" class="shopping-point flex-main-center left-10 flex-1">
						<text>积分商城</text>
					</view>
				</view>

				<view class="myOrder top-20">
					<view class="title acea-row row-between-wrapper">
						<text class="txt-medium">我的订单</text>
						<text @click="goMyOrder()" class="allOrder">
							<text>全部订单</text>
							<text class="iconfont icon-jiantou"></text>
						</text>
					</view>
					<view class="orderState acea-row row-middle">

						<view @click="goMyOrder(0)" class="item">
							<view class="pictrue">
								<image src="https://res.sdebs.com/personal-5.png" style="width: 54rpx;height: 51rpx;" />
								<text class="order-status-num" v-if="userInfo.orderStatusNum.unpaidCount > 0">{{ userInfo.orderStatusNum.unpaidCount }}</text>
							</view>
							<view>待付款</view>
						</view>

						<view @click="goMyOrder(1)" class="item">
							<view class="pictrue">
								<image src="https://res.sdebs.com/personal-6.png" style="width: 51rpx;height: 48rpx;" />
								<text class="order-status-num" v-if="userInfo.orderStatusNum.unshippedCount > 0">{{ userInfo.orderStatusNum.unshippedCount }}</text>
							</view>
							<view>待发货</view>
						</view>

						<view @click="goMyOrder(2)" class="item">
							<view class="pictrue">
								<image src="https://res.sdebs.com/personal-7.png" style="width: 55rpx;height: 49rpx;" />
								<text class="order-status-num" v-if="userInfo.orderStatusNum.receivedCount > 0">{{ userInfo.orderStatusNum.receivedCount }}</text>
							</view>
							<text>待收货</text>
						</view>

						<view @click="goMyOrder(3)" class="item">
							<view class="pictrue">
								<image src="https://res.sdebs.com/personal-8.png" style="width: 54rpx;height: 50rpx;" />
								<text class="order-status-num" v-if="userInfo.orderStatusNum.evaluatedCount > 0">{{ userInfo.orderStatusNum.evaluatedCount }}</text>
							</view>
							<text>待评价</text>
						</view>

						<view @click="goReturnList()" class="item">
							<view class="pictrue">
								<image src="https://res.sdebs.com/personal-9.png" style="width: 48rpx;height: 53rpx;" />
								<text class="order-status-num" v-if="userInfo.orderStatusNum.refundCount > 0">{{ userInfo.orderStatusNum.refundCount }}</text>
							</view>
							<text>售后/退款</text>
						</view>

					</view>
				</view>

				<view class="fun-box top-20">
					<view class="fun-title acea-row row-between-wrapper">
						<text class="txt-medium">常用功能</text>
					</view>
					<view class="fun-list lh-1 flex-wrap">
						<view v-for="(item, MyMenusIndex) in MyMenus" :key="MyMenusIndex" @click="goPages(MyMenusIndex)" class="fun-item relative">
							<!-- 客服特殊处理 -->
							<button v-if="item.uniapp_url == 'contact'" type="default" class="hide-full" @click="goChat()"></button>
							<image :src="item.pic" class="fun-img"></image>
							<view class="top-20">{{ item.name }}</view>
						</view>
					</view>
				</view>

				<!-- <view class="myService">
          <view class="serviceList acea-row row-middle">
            <template v-for="(item, MyMenusIndex) in MyMenus">
              <view class="item" :key="MyMenusIndex" @click="goPages(MyMenusIndex)"> -->
				<!-- 客服特殊处理 -->
				<!-- <button v-if="item.uniapp_url == 'contact'" type="default" open-type="contact" class="hide-full"></button>
                <view class="pictrue">
                  <image :src="item.pic" />
                </view>
                <view class="cell">{{ item.name }}</view>
                <text class="iconfont icon-jiantou"></text>
              </view>
            </template>
          </view>
        </view> -->

			</view>
			<view class="by"></view>
			<!-- <SwitchWindow
        v-on:changeswitch="changeswitch"
        :switchActive="switchActive"
        :login_type="userInfo.login_type"
      ></SwitchWindow>-->
		</view>
		<Authorization v-if="!$store.getters.token" />
	</view>
</template>
<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from "vuex";
	import {
		getUserInfo,
		getMenuUser,
		bindingPhone,
		logout,
		setDetection
	} from "@/api/user";
	import {
		getLotteryImages
	} from '@/api/activity.js'
	import {
		isWeixin,
		VUE_APP_RESOURCES_URL
	} from "@/utils";
	import SwitchWindow from "@/components/SwitchWindow";
	import Authorization from "@/pages/authorization/index";

	const NAME = "User";

	export default {
		name: NAME,
		components: {
			SwitchWindow,
			Authorization
		},
		props: {},
		data: function() {
			return {
				MyMenus: [],
				switchActive: false,
				isWeixin: false,
				lotteryTypeNum: 0
			};
		},
		computed: mapGetters(["userInfo"]),
		methods: {
			...mapMutations(["updateAuthorizationPage"]),
			setPhone(){
				// #ifdef MP
				return
				// #endif
				this.goPersonalData()
			},
			goChat(){
				// #ifdef H5
				location.href = 'https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97db7501c277179ebc1ab5b833cab53aa7491a67bfd430360aa1062ff0008e6c2a431b73b8d72d09514207ad87907925a2'
				// #endif
				// #ifndef H5
				this.$yrouter.push("/subpackage/chat/chat");
				// #endif
			},
			goReturnList() {
				this.$yrouter.push("/pages/order/ReturnList/index");
			},
			goMyOrder(type) {
				this.$yrouter.push({
					path: "/pages/order/MyOrder/index",
					query: {
						type
					}
				});
			},
			// 积分商城
			goShopping() {
				this.$yrouter.push("/subpackage/pointShopping/index");
			},
			goUserCoupon() {
				this.$yrouter.push("/pages/user/coupon/UserCoupon/index");
			},
			goUserGame() {
				this.$yrouter.push("/subpackage/lotteryDraw/lotteryType/lotteryType");
			},
			goIntegral() {
				// this.$yrouter.push("/pages/user/signIn/Integral/index");
				this.$yrouter.push({
					path:"/subpackage/userIntegral/index",
					query:{
						from:'user'
					}
				});
			},
			goUserPromotion() {
				this.$yrouter.push("/pages/user/promotion/UserPromotion/index");
			},
			goUserAccount() {
				this.$yrouter.push({
					path: "/subpackage/userAccount/index"
				});
			},
			goPersonalData() {
				this.$yrouter.push("/pages/user/PersonalData/index");
			},
			getPhoneNumber: function(e) {
				let thit = this;
				// 判断一下这里是不是小程序 如果是小程序，走获取微信手机号进行绑定
				if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
					uni.showLoading({
						title: "绑定中"
					});
					// 获取当前环境的服务商
					uni.getProvider({
						service: "oauth",
						success: function(res) {
							// 此处可以排除h5
							if (res.provider) {
								uni.login({
									success: loginRes => {
										bindingPhone({
												code: loginRes.code,
												encryptedData: e.mp.detail.encryptedData,
												iv: e.mp.detail.iv
											})
											.then(res => {
												console.log(res);
												// this.User();
												thit.$store.dispatch("userInfo", true);
												uni.hideLoading();
												uni.showToast({
													title: res.msg,
													icon: "success",
													duration: 2000
												});
											})
											.catch(error => {
												uni.hideLoading();
												thit.$store.dispatch("userInfo", true);
												console.log(error);
												uni.showToast({
													title: error.msg ||
														error.response.data.msg ||
														error.response.data.message,
													icon: "none",
													duration: 2000
												});
											});
									},
									fail() {
										reject("绑定失败");
									}
								});
							}
						},
						fail() {
							reject("获取环境服务商失败");
						}
					});
				} else {
					uni.showToast({
						title: "已拒绝授权",
						icon: "none",
						duration: 2000
					});
				}
			},
			
			changeswitch: function(data) {
				this.switchActive = data;
			},
			User: function() {
				let that = this;
				getUserInfo().then(res => {
					that.user = res.data;
					that.orderStatusNum = res.data.orderStatusNum;
				});
			},
			MenuUser: function() {
				let that = this;
				getMenuUser()
					.then(res => {
						uni.hideLoading();
						that.MyMenus = res.data.routine_my_menus;
					})
					.catch(error => {
						uni.hideLoading();
						console.log(error);
					});
			},
			goPages: function(index) {
				let url = this.MyMenus[index].uniapp_url;

				if (url === "contact") { // 由按钮去跳客服
					return;
				}

				if (url === "logout") { // 退出登录
					logout().then(() => {
						uni.clearStorageSync()
						uni.showToast({
							icon: 'success',
							title: '退出登录成功！'
						})
						this.$yrouter.switchTab({
							path: "/pages/home/index"
						});
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: '退出登录失败!'
						})
						console.error(err)
					})
					return
				}

				if (
					url === "/pages/user/promotion/UserPromotion/index" &&
					this.userInfo.statu === 1
				) {
					if (!this.userInfo.isPromoter) {
						uni.showToast({
							title: "您还没有推广权限！！",
							icon: "none",
							duration: 2000
						});
						return;
					}
				}

				if (
					url === "/pages/orderAdmin/OrderIndex/index" &&
					!this.userInfo.adminid
				) {
					uni.showToast({
						title: "您还不是管理员！！",
						icon: "none",
						duration: 2000
					});
					return;
				}
				console.log(this.userInfo)
				if (url === "/pages/orderAdmin/OrderCancellation/index" && !this.userInfo.checkStatus) {
					uni.showToast({
						title: "您没有核销权限,请后台店员设置！！",
						icon: "none",
						duration: 2000
					});
					return;
				}

				this.$yrouter.push({
					path: this.MyMenus[index].uniapp_url
				});
			},
			goPages2: function() {
				this.$yrouter.push({
					path: "/pages/orderAdmin/OrderCancellation/index"
				});
			}
		},
		watch: {
			userInfo() {
				this.MenuUser();
			}
		},
		onLoad() {
			// 抽奖类型
			getLotteryImages().then(({
				data
			}) => {
				this.lotteryTypeNum = data.content ? data.content.length : 0
			}).catch(console.error)
		},
		onShow() {
			if (this.$store.getters.token) {
				// setDetection()
				//
				uni.showLoading({
					title: "加载中"
				});
				this.$store.dispatch("getUser", true);
				this.MenuUser();
				this.isWeixin = isWeixin();
			}
		},
		onHide() {
			console.log("离开用户中心");
			this.updateAuthorizationPage(false);
		}
	};
</script>
