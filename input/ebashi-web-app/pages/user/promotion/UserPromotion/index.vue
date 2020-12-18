<style lang="less">
	.my-promotion .header {
		height: 2.0*100rpx;
		background-image: none;
	}
	.s-btn {
		width: 142rpx;
		height: 98rpx;
		color: white;
	}
	.header {
		width: 100%;
		height: 2.0*100rpx;
		border-radius: 0.16*100rpx;
		margin: 0 auto;
		margin-top: 0rpx;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.24*100rpx;
		.headerCon {
			background-image: url('https://res.sdebs.com/img-tuiguan-bg.png');
			background-repeat: no-repeat;
			background-size: 100%;
			height: 100%;
			width: 100%+1;
			margin-left: -4rpx;
			.account {
				padding: 0 0.35*100rpx;
				padding-top: 25rpx;
				color: #fff;
			}
			.assets .money {
				font-size: 0.72*100rpx;
				color: #fff;
				font-family: 'GuildfordProBook 5';
				margin-top: 0.15*100rpx;
				height: 0.75*100rpx;
				line-height: 0.75*100rpx;
			}
		}
	}
	.recharge {
		font-size: 0.20*100rpx;
		// margin-top: 40rpx;
		min-width: 1.1*100rpx !important;
		height: 0.44*100rpx;
		border-radius: 0.27*100rpx;
		text-align: center;
		line-height: 0.44*100rpx;
		margin-top: 60rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #fff;
	}
</style>
<template>
	<view class="my-promotion">
		<view class="header">
			<view class="headerCon">
				<view class="account acea-row row-top row-between">
					<view class="assets">
						<view>账户积分</view>
						<view class="money">{{ Info.commissionCount||0 }}</view>
					</view>
					<navigator url="/subpackage/integralDesc/integralDesc" class="recharge font-color-whitle">
						积分说明
					</navigator>
				</view>
			</view>
		</view>
		
		<view class="list acea-row row-between-wrapper">
			<view class="item acea-row row-center-wrapper row-column" @click="goPoster()">
				<text class="iconfont icon-erweima"></text>
				<view>推广名片</view>
			</view>
			<view class="item acea-row row-center-wrapper row-column" @click="goPromoterList()">
				<text class="iconfont icon-tongji"></text>
				<view>推广人统计</view>
			</view>
			<view class="item acea-row row-center-wrapper row-column" @click="goCommissionDetails()">
				<text class="iconfont icon-qiandai"></text>
				<view>积分明细</view>
			</view>
			<view class="item acea-row row-center-wrapper row-column" @click="goPromoterOrder()">
				<text class="iconfont icon-dingdan"></text>
				<view>推广人订单</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getSpreadInfo,
		bindSuperior
	} from "@/api/user";

	export default {
		name: "UserPromotion",
		components: {},
		props: {},
		data: function() {
			return {
				spreadUid: '',
				code: '',
				uid: '',
				Info: {
					integral: 0,
					lastDayCount: 0,
					extractCount: 0,
					commissionCount: 0
				}
			};
		},
		mounted: function() {
			let userInfo = uni.getStorageSync('userInfo')
			this.uid = userInfo ? userInfo.uid : ''
			this.Info.integral = userInfo ? userInfo.integral : 0
			this.spreadUid = userInfo ? userInfo.spreadUid : 0
			if (this.spreadUid) {
				this.code = this.spreadUid
			}
			this.getInfo();
		},
		methods: {
			// goUserIntegral() {
			// 	this.$yrouter.push("/subpackage/userIntegral/index");
			// },
			goPoster() {
				this.$yrouter.push("/pages/user/promotion/Poster/index");
			},
			// goCashRecord() {
			// 	this.$yrouter.push("/pages/user/promotion/CashRecord/index");
			// },
			goPromoterList() {
				this.$yrouter.push("/pages/user/promotion/PromoterList/index");
			},
			goCommissionDetails() {
				this.$yrouter.replace({
					path: "/subpackage/userIntegral/index",
					query: {
						type: 3,
					}
				});
			},
			goPromoterOrder() {
				this.$yrouter.push("/pages/user/promotion/PromoterOrder/index");
			},
			bind() {
				if (!this.code) {
					uni.showToast({
						icon: 'none',
						title: '请填写邀请推广码'
					})
					return
				}
				uni.showLoading({
					title: '正在提交中...'
				})
				bindSuperior({
					spread: this.code
				}).then(() => {
					uni.showToast({
						icon: 'success',
						title: '绑定成功!'
					})
				}).catch(err => {
					console.log(err)
					uni.showToast({
						icon: 'none',
						title: '绑定失败!'
					})
				}).finally(uni.hideLoading)
			},
			copy() {
				uni.setClipboardData({
					data: this.uid + '',
					success: () => {
						uni.showToast({
							icon: 'none',
							title: '复制推广码成功！'
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			getInfo: function() {
				let that = this;
				getSpreadInfo().then(
					res => {
						that.Info = Object.assign(this.Info, res.data);
					},
					function(err) {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				);
			},
			toCash: function() {
				this.$yrouter.push({
					path: "/pages/user/promotion/UserCash/index"
				});
			}
		}
	};
</script>
