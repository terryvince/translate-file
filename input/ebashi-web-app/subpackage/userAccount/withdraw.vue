<style lang="less">
	/*我的账户*/
	.user-account .wrapper {
		background-color: #fff;
		// padding: 0.32*100rpx 0 0.34*100rpx 0;
		padding-top: 0rpx;
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
		background-image: url('/subpackage/static/userAccount/background.png');
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
		height: 3*100rpx;
		// border-bottom: 1px solid #f5f5f5;
		border-radius: 10rpx;
		justify-content: space-between;

		.title {
			line-height: 160rpx;
			font-size: 26rpx;
		}

		.input-row {
			display: fixed;

			.input {
				margin-left: 25rpx;
				padding-left: 20rpx;
				background-color: #F5F5F5;
				font-size: 26rpx;
				height: 96rpx;
				border-radius: 8;
				width: auto;
				flex: 6;
			}

			.all {
				flex: 1.3;
				margin-left: 20rpx;
				margin-right: 20rpx;
				width: 108rpx;
				height: 96rpx;
				line-height: 96rpx;
				background-color: #fff;
				border-radius: 8;
				font-size: 26rpx;
				text-align: center;
				border-color: #FB9F33;
				border: solid 1px #FB9F33;
			}
		}
	}

	.user-account .desrc {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		font-size: 22rpx;
		color: #A8A8A8;
		height: 200rpx;
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

	.popup {
		// position: relative;
		// text-align: center;
		// align-items: center;

		.content {
			background-repeat: no-repeat;
			background-size: 100%;
			// background-image: url('/subpackage/static/userAccount/withdrawSucess.png');
			// background-image: url('/subpackage/static/userAccount/background.png');
			width: 500rpx;
			height: 500rpx;

			// background-color: #F11B09;
			.image {
				position: absolute;
				z-index: -1;
			}

			.title {
				padding-top: 220rpx;
				text-align: center;
				font-size: 50rpx;
				color: #fff;
			}

			.message {
				margin-top: 20rpx;
				text-align: center;
				font-size: 20rpx;
				margin-left: 80rpx;
				margin-right: 80rpx;
				color: #fff;
			}

			.button {
				text-align: center;
				margin-left: 30rpx;
				margin-right: 30rpx;
				margin-top: 20rpx;
				width: auto;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 8;
				font-size: 26rpx;
				text-align: center;
				background-color: #FFD225;
				border-color: #FB9F33;
				border: solid 1px #FB9F33;
				border-radius: 40rpx;
				color: #EE1500;
			}
		}
	}
</style>


<template>
	<view class="user-account">
		<view class="wrapper">
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
			<view class="nav">
				<view class="acea-row row-middle row-center title">提现到微信钱包</view>
				<view class="acea-row row-middle uni-form-item uni-column input-row">
					<input class="uni-input input" v-model="post.money" type="number" @input="onKeyInput" placeholder="¥ 请输入提现金额" />
					<view class="all" @click="allAction">
						全部
					</view>
				</view>
			</view>
		</view>

		<view class="desrc">
			<view class="">
				1.你将提现当前授权微信账号
			</view>
			<view class="">
				2.提现申请将在7天内到账,如遇高峰期,可能延迟到账,劳烦耐心等待.
			</view>
		</view>

		<view class="continueView">
			<view class="continue" style="background-color: #fb9017;" @click="continueAction">
				立即提现
			</view>
		</view>

		<!-- 弹窗模板 -->
		<uni-popup class="popup" ref="popup" type="center">

			<view class="content">
				<image class="image" style="width: 100%; height: 100%;" mode="scaleToFill" :src="popup.image" @error="imageError"></image>
				<view class="title">
					{{popup.title}}
				</view>
				<view class="message">
					{{popup.message}}
				</view>
				<view class="button" @click="popupAction">
					{{popup.action}}
				</view>
			</view>

		</uni-popup>

	</view>
</template>
<script>
	import {
		getBank,
		postCashInfo
	} from "@/api/user";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		getActivityStatus,
		getBalance
	} from "@/api/user";
	var sucessImg = "/subpackage/static/userAccount/withdrawSucess.png";
	var failImg = "/subpackage/static/userAccount/failed.png";
	var sucess = {
		image: sucessImg,
		title: "提交成功",
		message: "提现申请将在7天内到账，如遇高峰期，可能延迟到账，劳烦耐心等待.",
		action: "返回余额"
	}
	var failed = {
		image: failImg,
		title: "提交失败",
		message: "有疑问请咨询客服！",
		action: "返回余额"
	}

	export default {
		name: "UserAccount",
		components: {
			uniPopup,
		},
		props: {},
		data: function() {
			return {
				popup: failed,
				inputValue: 0,
				types: 0,
				now_money: 0,
				orderStatusSum: 0,
				recharge: 0,
				commissionCount: 0,
				minPrice: 0,
				post: {
					money: 0
				}
			};
		},
		onShow: function() {
			this.getIndex();
			this.getBank();
			// this.$nextTick(function() {
			// 	this.$refs.popup.open();
			// })
		},
		methods: {
			popupAction() {
				this.$refs.popup.close();
				console.log('result='+this.result)
				if(this.result === true){
					uni.navigateBack({
					    delta: 1
					});
				}
			},
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			allAction() {
				this.post.money = this.now_money;
				console.log(this.post.money)
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
			getBank: function() {
				let that = this;
				getBank().then(
					res => {
						that.minPrice = res.data.minPrice;
						that.commissionCount = res.data.commissionCount;
					},
					function(err) {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					}
				);
			},
			async continueAction() {
				let that = this;
				let money = this.post.money;
				let weixin = this.post.weixin;
				// if (
				// 	parseFloat(money) > parseFloat(that.commissionCount) ||
				// 	parseFloat(that.commissionCount) == 0
				// ) {
				// 	uni.showToast({
				// 		title: '可提现余额不足',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				// if (parseFloat(money) < parseFloat(that.minPrice)) {
				// 	uni.showToast({
				// 		title: '最低提现金额',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				
				if (parseFloat(money) <= 0) {
					uni.showToast({
						title: '请输入正确的提现金额',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				let save = {
					extractType: "weixin",
					weixin: "",
					money: money
				};
				that.save(save);
			},
			save: function(info) {
				postCashInfo(info).then(
					res => {
						this.popup = sucess;
						this.$refs.popup.open();
						this.result = true;
					},
					err => {
						this.popup = failed;
						this.$refs.popup.open();
						this.result = false;
					}
				);
			}
		}
	}
</script>
