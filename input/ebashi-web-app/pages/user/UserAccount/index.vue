<template>
	<view class="my-account">
		<view class="wrapper">
			<view class="header">
				<view class="headerCon">
					<view class="account acea-row row-top row-between">
						<view class="assets">
							<view>账户余额</view>
							<view class="money">{{ now_money }}</view>
						</view>
						<navigator url="/pages/user/Recharge/index" class="recharge font-color-red">提现规则</navigator>
					</view>
				</view>
			</view>
			<view class="nav acea-row row-middle">
				<view class="item" @click="goUserBill(0)">
					<view>提现中</view>
				</view>
				<view class="item" @click="goUserBill(1)">
					<view>提现成功</view>
				</view>
				<view class="item" @click="goUserBill(2)">
					<view>提现失败</view>
				</view>
			</view>
			<view class="advert acea-row row-between-wrapper"></view>
		</view>
		<!-- <Recommend></Recommend> -->
	</view>
</template>
<script>
	import Recommend from "@/components/Recommend";
	import {
		getActivityStatus,
		getBalance
	} from "@/api/user";
	export default {
		name: "UserAccount",
		components: {
			Recommend
		},
		props: {},
		data: function() {
			return {
				now_money: 0,
				orderStatusSum: 0,
				recharge: 0,
				activity: {
					is_bargin: false,
					is_pink: false,
					is_seckill: false
				}
			};
		},
		onShow: function() {
			this.getIndex();
			this.getActivity();
		},
		methods: {
			goUserBill(types) {
				this.$yrouter.push({
					path: "/pages/user/UserBill/index",
					query: {
						types
					}
				});
			},
			getIndex: function() {
				let that = this;
				getBalance().then(
					res => {
						that.now_money = res.data.now_money;
						that.orderStatusSum = res.data.orderStatusSum;
						that.recharge = res.data.recharge;
					},
					err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					}
				);
			},
			getActivity: function() {
				let that = this;
				getActivityStatus().then(
					res => {
						that.activity.is_bargin = res.data.is_bargin;
						that.activity.is_pink = res.data.is_pink;
						that.activity.is_seckill = res.data.is_seckill;
					},
					err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					}
				);
			}
		}
	};
</script>

<style lang="less">
	/*我的账户*/
	.my-account .wrapper {
		background-color: #fff;
		padding: 0.32*100rpx 0 0.34*100rpx 0;
		margin-bottom: 0.14*100rpx;
	}

	.my-account .wrapper .header {
		width: 100%;
		height: 2.5*100rpx;
		background-image: linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		background-image: -moz-linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		border-radius: 0.16*100rpx;
		margin: 0 auto;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.24*100rpx;
	}

	.my-account .wrapper .header .headerCon {
		background-image: url('https://h5.yixiang.co/static/images/accountBg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		height: 100%;
		width: 100%;
		padding: 0.36*100rpx 0 0.29*100rpx 0;
	}

	.my-account .wrapper .header .headerCon .account {
		padding: 0 0.35*100rpx;
	}

	.my-account .wrapper .header .headerCon .account .assets .money {
		font-size: 0.72*100rpx;
		color: #fff;
		font-family: 'GuildfordProBook 5';
		margin-top: 0.1*100rpx;
		height: 0.75*100rpx;
		line-height: 0.75*100rpx;
	}

	.my-account .wrapper .header .headerCon .account .recharge {
		font-size: 0.28*100rpx;
		width: 1.5*100rpx;
		height: 0.54*100rpx;
		border-radius: 0.27*100rpx;
		background-color: #fff9f8;
		text-align: center;
		line-height: 0.54*100rpx;
	}

	.my-account .wrapper .header .headerCon .cumulative {
		margin-top: 0.46*100rpx;
	}

	.my-account .wrapper .header .headerCon .cumulative .item {
		flex: 1;
		-o-flex: 1;
		-ms-flex: 1;
		padding-left: 0.35*100rpx;
	}

	.my-account .wrapper .header .headerCon .cumulative .item .money {
		font-size: 0.48*100rpx;
		font-family: 'GuildfordProBook 5';
		color: #fff;
		margin-top: 0.06*100rpx;
	}

	.my-account .wrapper .nav {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: -40rpx;
		
		background-color: #0000FF;
		height: 1.55*100rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.my-account .wrapper .nav .item {
		flex: 1;
		-o-flex: 1;
		-ms-flex: 1;
		text-align: center;
		font-size: 0.26*100rpx;
		color: #999;
	}

	.my-account .wrapper .nav .item .pictrue {
		width: 0.44*100rpx;
		height: 0.44*100rpx;
		margin: 0 auto;
		margin-bottom: 0.2*100rpx;
	}

	.my-account .wrapper .nav .item .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-account .wrapper .advert {
		padding: 0 0.3*100rpx;
		margin-top: 0.3*100rpx;
	}

	.my-account .wrapper .advert .item {
		background-color: #fff6d1;
		width: 3.32*100rpx;
		height: 1.18*100rpx;
		border-radius: 0.1*100rpx;
		padding: 0 0.27*100rpx 0 0.25*100rpx;
		font-size: 0.24*100rpx;
		color: #e44609;
	}

	.my-account .wrapper .advert .item.on {
		background-color: #fff3f3;
		color: #e96868;
	}

	.my-account .wrapper .advert .item .pictrue {
		width: 0.78*100rpx;
		height: 0.78*100rpx;
	}

	.my-account .wrapper .advert .item .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-account .wrapper .advert .item .text .name {
		font-size: 0.3*100rpx;
		font-weight: bold;
		color: #f33c2b;
		margin-bottom: 0.07*100rpx;
	}

	.my-account .wrapper .advert .item.on .text .name {
		color: #f64051;
	}

	.my-account .wrapper .list {
		padding: 0 0.3*100rpx;
	}

	.my-account .wrapper .list .item {
		margin-top: 0.44*100rpx;
	}

	.my-account .wrapper .list .item .picTxt .iconfont {
		width: 0.82*100rpx;
		height: 0.82*100rpx;
		border-radius: 50%;
		background-image: linear-gradient(to right, #ff9389 0%, #f9776b 100%);
		background-image: -moz-linear-gradient(to right, #ff9389 0%, #f9776b 100%);
		text-align: center;
		line-height: 0.82*100rpx;
		color: #fff;
		font-size: 0.4*100rpx;
	}

	.my-account .wrapper .list .item .picTxt .iconfont.yellow {
		background-image: linear-gradient(to right, #ffccaa 0%, #fea060 100%);
		background-image: -moz-linear-gradient(to right, #ffccaa 0%, #fea060 100%);
	}

	.my-account .wrapper .list .item .picTxt .iconfont.green {
		background-image: linear-gradient(to right, #a1d67c 0%, #9dd074 100%);
		background-image: -moz-linear-gradient(to right, #a1d67c 0%, #9dd074 100%);
	}

	.my-account .wrapper .list .item .picTxt {
		width: 4.28*100rpx;
		font-size: 0.3*100rpx;
		color: #282828;
	}

	.my-account .wrapper .list .item .picTxt .text {
		width: 3.17*100rpx;
	}

	.my-account .wrapper .list .item .picTxt .text .infor {
		font-size: 0.24*100rpx;
		color: #999;
		margin-top: 0.05*100rpx;
	}

	.my-account .wrapper .list .item .bnt {
		font-size: 0.26*100rpx;
		color: #282828;
		width: 1.56*100rpx;
		height: 0.52*100rpx;
		border: 1px solid #ddd;
		border-radius: 0.26*100rpx;
		text-align: center;
		line-height: 0.5*100rpx;
	}

	.my-account .wrapper .list .item .bnt.end {
		font-size: 0.26*100rpx;
		color: #aaa;
		background-color: #f2f2f2;
		border-color: #f2f2f2;
	}
</style>
