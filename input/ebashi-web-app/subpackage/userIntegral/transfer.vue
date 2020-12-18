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
		background-image: url('/subpackage/static/userIntegral/background.png');
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
		height: 400rpx;
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
				border-color: #3A86FF;
				border: solid 1px #3A86FF;
			}
		}

		.transfer {
			margin-left: 25rpx;
			margin-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			background-color: #F5F5F5;
			font-size: 26rpx;
			height: 96rpx;
			border-radius: 8;
			width: auto;
			flex: 6;
		}
	}

	.user-account .desrc {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		font-size: 22rpx;
		color: #A8A8A8;
		height: 200rpx;
		line-height: 1.5;
	}


	.user-account .continueView {
		background-color: #fff;
		width: 100%;
		height: 140rpx;
		position: fixed;
		bottom: 0rpx;

		.continue {
			background-color: #3B89FF;
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
				padding-top: 235rpx;
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
							<view>账户积分</view>
							<view class="money">{{ info.integral }}</view>
						</view>
						<navigator url="/subpackage/userAccount/withdrawRule" class="recharge font-color-whitle">
							<image class="rechargeIcon" src="/subpackage/static/userAccount/withdraw.png" mode="aspectFit"></image>
							转换规则
						</navigator>
					</view>
				</view>
			</view>
			<view class="nav">
				<view class="acea-row row-middle row-center title">积分转换到余额</view>
				<view class="acea-row row-middle uni-form-item uni-column input-row">
					<input class="uni-input input" v-model="inputValue" type="number" @input="onKeyInput" placeholder="¥ 请输入转换积分" />
					<view class="all" @click="allAction">
						全部
					</view>
				</view>
				<input class="uni-input transfer" disabled="false":value="'¥' +rmb" type="number" @input="" placeholder="¥ 0" />
			</view>
		</view>

		<view class="desrc">
			<view class="">
				1.积分根据管理员提供转换比例转换为余额
			</view>
			<view class="">
				2.提交积分余额申请后立即生效
			</view>
		</view>

		<view class="continueView">
			<view class="continue" @click="continueAction">
				立即转换
			</view>
		</view>

		<!-- 弹窗模板 -->
		<uni-popup class="popup" ref="popup" type="center">

			<view class="content">
				<image class="image" style="width: 100%; height: 100%;" mode="scaleToFill" :src="popup.image" @error="imageError"></image>
				<view class="title">
					{{popup.title}}
				</view>
				<!-- <view class="message">
					{{popup.message}}
				</view> -->
				<view class="button" @click="popupAction">
					{{popup.action}}
				</view>
			</view>

		</uni-popup>

	</view>
</template>
<script>
	import {
		getIntegralList,
		postSignUser,
		postExchangeApi,
		getProportionApi
	} from "@/api/user";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		getActivityStatus,
		getBalance
	} from "@/api/user";
	var sucessImg = "/subpackage/static/userAccount/transferSucess.png";
	var failImg = "/subpackage/static/userAccount/failed.png";
	var sucess = {
		image: sucessImg,
		title: "转换成功",
		message: "转换申请将在7天内到账,如遇高峰期,可能延迟到账,劳烦耐心等待.",
		action: "返回积分"
	}
	var failed = {
		image: failImg,
		title: "提交失败",
		message: "有疑问请咨询客服！",
		action: "返回积分"
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
				inputValue: null,
				info: {
					integral: 0,
				},
				result:false,
				rate:1,
				rmb:0
			};
		},
		onShow: function() {
			this.getIntegral();
			this.getProportionApi();
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
				this.rmb = this.inputValue/this.rate;
			},
			allAction() {
				this.inputValue = this.info.integral;
				this.rmb = this.inputValue/this.rate;
			},
			continueAction() {
				var obj = {
					integral: this.inputValue
				}
				postExchangeApi(obj).then(
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
				)
			},
			getIntegral: function() {
				let that = this;
				postSignUser(that.data).then(
					res => {
						that.info = res.data;
						that.refresher = false;
					},
					err => {
						that.refresher = false;
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				);
			},
			getProportionApi: function() {
				let that = this;
				getProportionApi(that.data).then(
					res => {
						console.log(res.data)
						that.rate = res.data;
					},
					err => {
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
		background-image: url('/subpackage/static/userIntegral/background.png');
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
		height: 400rpx;
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
				border-color: #3A86FF;
				border: solid 1px #3A86FF;
			}
		}

		.transfer {
			margin-left: 25rpx;
			margin-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			background-color: #F5F5F5;
			font-size: 26rpx;
			height: 96rpx;
			border-radius: 8;
			width: auto;
			flex: 6;
		}
	}

	.user-account .desrc {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		font-size: 22rpx;
		color: #A8A8A8;
		height: 200rpx;
		line-height: 1.5;
	}


	.user-account .continueView {
		background-color: #fff;
		width: 100%;
		height: 140rpx;
		position: fixed;
		bottom: 0rpx;

		.continue {
			background-color: #3B89FF;
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
				padding-top: 235rpx;
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
							<view>账户积分</view>
							<view class="money">{{ info.integral }}</view>
						</view>
						<navigator url="/subpackage/userAccount/withdrawRule" class="recharge font-color-whitle">
							<image class="rechargeIcon" src="/subpackage/static/userAccount/withdraw.png" mode="aspectFit"></image>
							转换规则
						</navigator>
					</view>
				</view>
			</view>
			<view class="nav">
				<view class="acea-row row-middle row-center title">积分转换到余额</view>
				<view class="acea-row row-middle uni-form-item uni-column input-row">
					<input class="uni-input input" v-model="inputValue" type="number" @input="onKeyInput" placeholder="¥ 请输入转换积分" />
					<view class="all" @click="allAction">
						全部
					</view>
				</view>
				<input class="uni-input transfer" disabled="false":value="'¥' +rmb" type="number" @input="" placeholder="¥ 0" />
			</view>
		</view>

		<view class="desrc">
			<view class="">
				1.积分根据管理员提供转换比例转换为余额
			</view>
			<view class="">
				2.提交积分余额申请后立即生效
			</view>
		</view>

		<view class="continueView">
			<view class="continue" @click="continueAction">
				立即转换
			</view>
		</view>

		<!-- 弹窗模板 -->
		<uni-popup class="popup" ref="popup" type="center">

			<view class="content">
				<image class="image" style="width: 100%; height: 100%;" mode="scaleToFill" :src="popup.image" @error="imageError"></image>
				<view class="title">
					{{popup.title}}
				</view>
				<!-- <view class="message">
					{{popup.message}}
				</view> -->
				<view class="button" @click="popupAction">
					{{popup.action}}
				</view>
			</view>

		</uni-popup>

	</view>
</template>
<script>
	import {
		getIntegralList,
		postSignUser,
		postExchangeApi,
		getProportionApi
	} from "@/api/user";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		getActivityStatus,
		getBalance
	} from "@/api/user";
	var sucessImg = "/subpackage/static/userAccount/transferSucess.png";
	var failImg = "/subpackage/static/userAccount/failed.png";
	var sucess = {
		image: sucessImg,
		title: "转换成功",
		message: "转换申请将在7天内到账,如遇高峰期,可能延迟到账,劳烦耐心等待.",
		action: "返回积分"
	}
	var failed = {
		image: failImg,
		title: "提交失败",
		message: "有疑问请咨询客服！",
		action: "返回积分"
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
				inputValue: null,
				info: {
					integral: 0,
				},
				result:false,
				rate:1,
				rmb:0
			};
		},
		onShow: function() {
			this.getIntegral();
			this.getProportionApi();
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
				this.rmb = this.inputValue/this.rate;
			},
			allAction() {
				this.inputValue = this.info.integral;
				this.rmb = this.inputValue/this.rate;
			},
			continueAction() {
				var obj = {
					integral: this.inputValue
				}
				postExchangeApi(obj).then(
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
				)
			},
			getIntegral: function() {
				let that = this;
				postSignUser(that.data).then(
					res => {
						that.info = res.data;
						that.refresher = false;
					},
					err => {
						that.refresher = false;
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				);
			},
			getProportionApi: function() {
				let that = this;
				getProportionApi(that.data).then(
					res => {
						console.log(res.data)
						that.rate = res.data;
					},
					err => {
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
