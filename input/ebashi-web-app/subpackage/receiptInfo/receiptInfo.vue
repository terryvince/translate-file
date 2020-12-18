<style scoped>
	.receipt-info{
		background-color: #f8f8f8;
		padding: 30rpx;
		box-sizing: border-box;
		min-height: 100vh;
	}
	.info-cont{
		border-radius: 8rpx;
		padding: 0rpx 0rpx 0rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.info-fot-btn{
		position: fixed;
		left: 4%;
		bottom: 60rpx;
		width: 92%;
		text-align: center;
		line-height: 90rpx;
		font-size: 30rpx;
		color: #fff;
		border-radius: 8rpx;
		background-color: #f16356;
	}
	.info-cont-li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #f5f5f5;
		height: 90rpx;
		line-height: 90rpx;
	}
	.info-cont-li:last-of-type{
		border-bottom: none;
	}
	.info-cont-li-title{
		width: 200rpx;
		color: #999;
		text-align: left;
		font-size: 28rpx;
	}
	.info-cont-li-text{
		flex: 1;
		color: #333;
		font-size: 30rpx;
		text-align: left;
	}
	.info-btn{
		padding: 40rpx 0rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info-btn-one,.info-btn-two{
		width: 45%;
		text-align: center;
		line-height: 90rpx;
		font-size: 30rpx;
		color: #fff;
		border-radius: 8rpx;
	}
	.info-btn-one{
		background-color: #f16356;
	}
	.info-btn-two{
		background-color: #999;
	}
	.info-btn-two1{
		background-color: #f16356 !important;
	}
	.emile-model{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 690rpx;
		height: 400rpx;
		background-color: #fff;
		border-radius: 10rpx;
		z-index: 9999;
	}
	.emile-model-title{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #333;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.emile-model-input{
		padding: 20rpx 40rpx;
		box-sizing: border-box;
	}
	.emile-model-input input{
		width: 100%;
		line-height: 80rpx;
		height: 80rpx;
		font-size: 28rpx;
		border-radius: 6rpx;
		color: #333;
		background-color: #f3f3f3;
		margin-top: 40rpx;
		padding: 4rpx 20rpx;
		box-sizing: border-box;
	}
	.emile-model-btn{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.emile-model-btn-one,.emile-model-btn-two{
		width: 45%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		border-radius: 6rpx;
	}
	.emile-model-btn-one{
		background-color: #999;
	}
	.emile-model-btn-two{
		background-color: #f16356;
	}
</style>

<template>
	<view class="receipt-info">
		<view class="info-cont">
			<view class="info-cont-li">
				<view class="info-cont-li-title">订单编号</view>
				<view class="info-cont-li-text">{{detail.orderId}}</view>
			</view>
			<view class="info-cont-li">
				<view class="info-cont-li-title">下单时间</view>
				<view class="info-cont-li-text">{{detail.createTime}}</view>
			</view>
			<view class="info-cont-li">
				<view class="info-cont-li-title">发票类型</view>
				<view class="info-cont-li-text">电子普通发票</view>
			</view>
			<view class="info-cont-li">
				<view class="info-cont-li-title">发票抬头</view>
				<view class="info-cont-li-text">{{detail.type == 1?"单位":"个人"}}</view>
			</view>
			<view v-if="detail.type == 1">
				<view class="info-cont-li">
					<view class="info-cont-li-title">单位名</view>
					<view class="info-cont-li-text">{{detail.receiptName}}</view>
				</view>
				<view class="info-cont-li">
					<view class="info-cont-li-title">税号</view>
					<view class="info-cont-li-text">{{detail.receiptCode}}</view>
				</view>
			</view>

			<view class="info-cont-li">
				<view class="info-cont-li-title">发票内容</view>
				<view class="info-cont-li-text">商品明细</view>
			</view>

			<view class="info-cont-li">
				<view class="info-cont-li-title">邮箱</view>
				<view class="info-cont-li-text">{{detail.email}}</view>
			</view>

		</view>

		<view class="info-btn">
			<view v-if="detail.image.length>0" class="info-btn-two info-btn-two1" @click="lookImg">查看发票</view>
			<view v-else class="info-btn-two" @click="lookImg">查看发票 </view>

			<view v-if="detail.image.length>0" class="info-btn-two info-btn-two1" @click="open">发送邮件</view>
			<view v-else class="info-btn-two" @click="open">发送邮件 </view>
		</view>
		<view class="info-fot-btn" @click="invoiceExc">申请换开</view>

		<uni-popup ref="popup" type="center">
			<view class="emile-model">
				<view class="emile-model-title">请输入邮箱地址</view>
				<view class="emile-model-input">
					<input class="uni-input" type="text" value='detail.email' v-model="email" />
				</view>
				<view class="emile-model-btn">
					<view class="emile-model-btn-one" @click="closeTap">取消</view>
					<view class="emile-model-btn-two" @click="confirmTap">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getReceiptDetail,
		postReceiptConfirm,
		getSendEmail
	} from "@/api/receipt";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				uniPopup,
				uniPopupMessage,
				uniPopupDialog,
				orderId: "",
				email: "",
				detail: {}
			}
		},
		onShow() {
			this.orderId = this.$yroute.query.orderId;
			console.log(this.orderId);

			getReceiptDetail(this.orderId)
				.then((result) => {
					this.detail = result.data;
				}).catch(() => {});
		},
		methods: {
			open() {
				if (this.detail.image && this.detail.image.length) {
					if (this.email.length <= 0) {
						this.email = this.detail.email;
					}
					this.$refs.popup.open()
				}
			},
			confirmTap() {
				this.$refs.popup.close();
				console.log(this.email);
				console.log(this.detail.image);
				getSendEmail(this.orderId, this.email)
					.then((result) => {
						uni.showToast({
							title: '发送成功',
							icon: 'none',
							duration: 2000
						});
					}).catch(() => {});
			},
			closeTap() {
				this.$refs.popup.close()
			},
			lookImg() {
				if (this.detail.image && this.detail.image.length) {
					this.$yrouter.push({
						path: "/subpackage/receiptInfoImg/receiptInfoImg",
						query: {
							image: this.detail.image
						}
					});
				}
			},
			invoiceExc() {
				if (this.detail.image && this.detail.image.length) {
					uni.showToast({
						title: '发票已经上传，请点击查看发票',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				this.$yrouter.push({
					path: "/subpackage/invoiceExchang/invoiceExchang",
					query: {
						orderId: this.detail.orderId,
						oid: this.detail.oid
					}
				});
			}
		}
	}
</script>
