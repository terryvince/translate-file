<style lang="less">
	/*我的账户*/
	.user-account {
		// padding-top: 350rpx;
		// padding-bottom: 140rpx;
	}

	.user-account .wrapper {
		background-color: transparent;
		// padding: 0.32*100rpx 0 0.34*100rpx 0;
		// margin-bottom: 0.14*100rpx;
	}

	.user-account .wrapper .header {

		width: 100%;
		height: 2.5*100rpx;
		// background-image: linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		// background-image: -moz-linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		border-radius: 0.16*100rpx;
		margin: 0 auto;
		margin-top: 0rpx;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.24*100rpx;
	}

	.user-account .wrapper .header .headerCon {
		background-image: url('https://res.chunghengtrade.com/background.png');
		background-repeat: no-repeat;
		background-size: 100%;
		height: 100%;
		width: 100%+2rpx;
		// padding: 0.36*100rpx 0 0.29*100rpx 0;
	}

	.user-account .wrapper .header .headerCon .account {
		padding: 0 0.35*100rpx;
		padding-top: 25rpx;
		color: #fff;
	}

	.user-account .wrapper .header .headerCon .account .assets .money {
		font-size: 0.72*100rpx;
		color: #fff;
		font-family: 'GuildfordProBook 5';
		margin-top: 0.15*100rpx;
		height: 0.75*100rpx;
		line-height: 0.75*100rpx;
	}

	.user-account .wrapper .header .headerCon .account .recharge {
		font-size: 0.20*100rpx;
		// margin-top: 40rpx;
		width: 1.6*100rpx;
		height: 0.54*100rpx;
		border-radius: 0.27*100rpx;
		text-align: center;
		line-height: 0.54*100rpx;
		margin-top: 60rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #fff;
	}

	.user-account .wrapper .header .headerCon .rechargeIcon {
		width: 22rpx;
		height: 22rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.user-account .wrapper .nav {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: -65rpx;
		background-color: #fff;
		height: 1.55*100rpx;
		border-bottom: 1px solid #f5f5f5;
		border-radius: 10rpx;
	}

	.user-account .wrapper .nav .on {
		color: #FF0000 !important;
	}

	.user-account .wrapper .nav .item {
		flex: 1;
		-o-flex: 1;
		-ms-flex: 1;
		text-align: center;
		font-size: 0.26*100rpx;
		color: #999;
		// position: relative;
	}

	.user-account .wrapper .nav .item .title {
		padding: 0;
		position: relative;
		width: 100%;
	}

	.user-account .wrapper .nav .item .line {
		width: 2rpx;
		z-index: 99;
		background-color: #EDEDED;
		height: 60rpx;
		margin-top: 20rpx;
		right: 0rpx;
		float: right;
		bottom: -15rpx;
		position: absolute;
	}

	.table {
		// padding-top: 2.5*100rpx+110;
		// height: 100%;
		// width: 100%;
		// padding-bottom: 140rpx;
		// padding: 0;
		position: fixed;
		top: 350rpx;
		bottom: 150rpx;
		border-radius: 10rpx;
		overflow: hidden;
		// height: 700rpx;
		margin: 0;
		// height: auto;

		.cell {
			padding: 0;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-bottom: 2rpx;
			min-height: 140rpx;
			position: relative;
			background-color: #FFF;

			.date,
			.status {
				margin-left: 25rpx;
			}

			.status {
				padding-top: 35rpx;
				color: #303030;
				font-size: 28rpx;
				margin-right: 100rpx;
			}

			.date {
				font-size: 24rpx;
				color: #909090;
			}

			.amount {
				color: #F11B09;
				position: absolute;
				float: right;
				bottom: 50%;
				right: 20rpx;
			}
		}
	}


	.user-account .continueView {
		background-color: #fff;
		width: 100%;
		height: 140rpx;
		position: fixed;
		bottom: 0rpx;

		.continue {
			background-color: #FA9C36;
			width: auto;
			height: 100rpx;
			right: 20rpx;
			left: 20rpx;
			bottom: 25rpx;
			position: fixed;
			border-radius: 10rpx;
			text-align: center;
			align-items: center;
			color: #ffffff;
			font-size: 30rpx;
			line-height: 100rpx;
		}
	}

	.fixed-header {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;
		box-shadow: 0 0 20rpx -10rpx #aaa;
	}
</style>


<template>
	<view class="user-account">
		<view class="wrapper fixed-header">
			<view class="header">
				<view class="headerCon">
					<view class="account acea-row row-top row-between">
						<view class="assets">
							<view>账户余额</view>
							<view class="money">{{ now_money }}</view>
						</view>
						<navigator url="/subpackage/userAccount/withdrawRule" class="recharge font-color-whitle">
							<image class="rechargeIcon" src="/subpackage/static/userAccount/withdraw.png" mode="aspectFit"></image>
							提现规则
						</navigator>
					</view>
				</view>
			</view>
			<view class="nav acea-row row-middle">
				<view :class="types === 0 ? 'on item' : 'item'" @click="userBill(0)">
					<view class="title">提现中
						<view class="line"></view>
					</view>
				</view>
				<view :class="types === 1 ? 'on item' : 'item'" @click="userBill(1)">
					<view class="title">提现失败
						<view class="line"></view>
					</view>
				</view>
				<view :class="types === 2 ? 'on item' : 'item'" @click="userBill(2)">
					<view class="title">已提现
					</view>
				</view>
			</view>
		</view>

		<!-- -1 未通过 0 审核中 1 已提现 -->
		<scroll-view class="table" :refresher-triggered="refresher" scroll-y="true" refresher-enabled="true"
		 @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
			<view class="cell " v-for="(item, index) in list" :key="index" :data-item="item" @click="cellAction">
				<view class="status">
					{{["未通过","审核中","已提现"][item.status+1]}}
					{{item.failMsg?"(":""}}
					{{item.failMsg||""}}
					{{item.failMsg?")":""}}
				</view>
				<view class="date">
					{{item.createTime|timeFormat("datetime")}}
				</view>
				<view class="amount">
					-{{item.extractPrice}}
				</view>
			</view>
		</scroll-view>

		<view class="continueView">
			<view class="continue" style="background-color: #fb9017;" @click="continueAction">
				立即提现
			</view>
		</view>

	</view>
</template>
<script>
	import {
		getIntegralList,
		postSignUser,
		postExchangeApi,
		getCashOutList
	} from "@/api/user";
	import {
		dateFormatT
	} from "@/utils";
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
				refresher: false,
				types: 0,
				now_money: 0,
				orderStatusSum: 0,
				recharge: 0,
				where: {
					page: 1,
					limit: 10,
					type: 0
				},
				list: []
			};
		},
		onShow: function() {
			this.onRefresh()
		},
		onLoad() {
			
		},
		methods: {
			onRefresh() {
				this.where.page = 1;
				this.loaded = false;
				this.refresher = true;
				this.getIndex();
				this.getCashOutList();
			},
			onLoadMore() {
				console.log("onLoadMore")
				this.getCashOutList();
			},
			userBill(types) {
				this.types = types;
				if (this.types === 0) {
					this.where.type = 0
				} else if (this.types === 1) {
					this.where.type = -1
				} else if (this.types === 2) {
					this.where.type = 1
				}
				this.onRefresh()
			},
			cellAction() {

			},
			continueAction() {
				this.$yrouter.push({
					path: "/subpackage/userAccount/withdraw",
					query: {}
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
			getCashOutList: function() {
				let that = this;
				if (that.loaded == true) return;
				getCashOutList(this.where.page, this.where.limit, that.where.type).then(
					res => {
						this.refresher = false;
						that.loaded = res.data.length < that.where.limit;
						if (that.where.page === 1) {
							that.list = res.data;
						} else {
							that.list.push.apply(that.list, res.data);
						}
						that.where.page = that.where.page + 1;
					},
					err => {
						this.refresher = false;
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				);
			},
		}
	};
</script>
