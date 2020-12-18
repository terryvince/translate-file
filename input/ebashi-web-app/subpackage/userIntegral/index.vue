<style lang="less">
	/*我的账户*/
	.user-account .wrapper {
		background-color: none !important;
		// padding: 0.32*100rpx 0 0.34*100rpx 0;
		padding-top: 0rpx;
		// margin-bottom: 0.14*100rpx;
	}

	.user-account .wrapper .header {
		width: 100%;
		height: 2.0*100rpx;
		// background-image: linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		// background-image: -moz-linear-gradient(to right, #eb3729 0%, #eb3729 100%);
		border-radius: 0.16*100rpx;
		margin: 0 auto;
		margin-top: 0rpx;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.24*100rpx;
	}

	.user-account .wrapper .header .headerCon {
		background-image: url('https://res.sdebs.com/img-usercredit-bg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		height: 100%;
		width: 100%+1;
		margin-left: -4rpx;
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
		width: 1.2*100rpx;
		height: 0.44*100rpx;
		border-radius: 0.27*100rpx;
		text-align: center;
		line-height: 0.44*100rpx;
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

	.table {
		// margin-top: 270rpx-100;
		width: auto;
		left: 20rpx;
		right: 20rpx;
		// padding-bottom: 140rpx;
		// background-color: #F0AD4E;
		border-radius: 10rpx;
		overflow: hidden;
		// height: 900rpx;

		position: fixed;
		top: 190rpx;
		bottom: 0rpx;

		.cell {
			background-color: #FFF;
			padding: 0;
			margin-left: 0rpx;
			width: 100%;
			margin-right: 0rpx;
			margin-bottom: 2rpx;
			height: 140rpx;
			position: relative;
			background-color: #FFF;

			.status,
			.date {
				margin-left: 25rpx;
			}

			.status {
				padding-top: 35rpx;
				color: #303030;
				font-size: 28rpx;
			}

			.date {
				font-size: 24rpx;
				color: #909090;
			}

			.amount {
				color: #F11B09;
				position: relative;
				float: right;
				bottom: 50%;
				right: 20rpx;
			}
		}
	}

	.fixed-header {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		// background: #fff;
		// box-shadow: 0 0 20rpx -10rpx #aaa;
	}
</style>

<template>
	<view class="user-account">
		<view class="wrapper fixed-header">
			<view class="header">
				<view class="headerCon">
					<view class="account acea-row row-top row-between">
						<view class="assets">
							<view>{{title}}</view>
							<view class="money">{{ point }}</view>
						</view>
						<navigator url="/subpackage/integralDesc/integralDesc" class="recharge font-color-whitle">
							积分说明
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="table" :refresher-triggered="refresher" scroll-y="true" refresher-enabled="true"
		 @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
			<view class="cell " v-for="(item, index) in list" :key="index" :data-item="item" @click="cellAction">
				<view class="status">
					{{item.title}}
				</view>
				<view class="date">
					{{item.createTime}}
				</view>
				<view class="amount">
					{{item.pm===0?'-':'+'}}{{item.number}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getIntegralList,
		postSignUser,
		postExchangeApi
	} from "@/api/user";
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
				info: {
					integral: 0,
				},
				loaded: false,
				refresher: false,
				where: {
					page: 1,
					limit: 10,
					type:0
				},
				list: [],
				from:''
			};
		},
		computed:{
			point(){
				return this.from == 'user' ? this.info.integral : this.info.brokeragePrice
			},
			title(){
				return this.from == 'user' ? '账户积分' : '推广积分'
			}
		},
		onShow: function() {
			let that = this;
			if (that.$yroute.query.type !== undefined) {
				that.where.type = that.$yroute.query.type;
			}
			if(this.$yroute.query.from){
				this.from = this.$yroute.query.from
			}
			this.onRefresh()
		},
		onLoad() {},
		methods: {
			onRefresh() {
				this.where.page = 1;
				this.refresher = true;
				this.loaded = false;
				this.getIntegral();
				this.getIntegralList();
			},
			onLoadMore() {
				if (this.refresher == false) {
					this.getIntegralList();
					console.log("onLoadMore")
				}
			},
			cellAction() {

			},
			continueAction() {
				this.$yrouter.push({
					path: "/subpackage/userIntegral/transfer",
					query: {}
				});
			},
			getIntegralList: function() {
				let that = this;
				if (that.loaded == true) return;
				// that.loaded = true;
				getIntegralList(that.where).then(
					res => {
						this.refresher = false;
						that.loaded = res.data.length < that.where.limit; // 存在下一页为false，不存在下一页为true，true则不会再加载
						if (+that.where.page === 1) {
							that.list = res.data;
						} else {
							that.list.push.apply(that.list, res.data);
						}
						if(!that.loaded) that.where.page += 1;
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
			getIntegral: function() {
				let that = this;
				postSignUser(that.data).then(
					res => {
						that.info = res.data;
						this.refresher = false;
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
			}
		}
	};
</script>
