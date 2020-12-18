<style scoped>
	.excha{
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		min-height: 100vh;
	}
	.excha-list{
		background-color: #fff;
		border-radius: 8rpx;
		padding: 0rpx 0rpx 0rpx 30rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}
	.excha-list-li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #f8f8f8;
	}
	.excha-list-li:last-of-type{
		border-bottom: none;
	}
	.excha-list-title{
		width: 200rpx;
		font-size: 28rpx;
		color: #999;
		text-align: left;
	}
	.excha-list-rig{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 80rpx;
		height: 80rpx;
	}
	.excha-list-rig-text{
		text-align: left;
		font-size: 28rpx;
		color: #333;
		flex: 1;
	}
	.excha-list-rig-text input{
		height: 80rpx;
		line-height: 80rpx;
		padding: 6rpx 10rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
	}
	.excha-list-rig-img{
		text-align: right;
		margin-right: 20rpx;
		box-sizing: border-box;
	}
	.excha-list-rig-img text{
		font-size: 28rpx;
		color: #999;
	}
	.excha-btn{
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
	.model-info{
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		height: 600rpx;
		border-radius: 8rpx 8rpx 0rpx 0rpx;
	}
	.model-info-li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #f8f8f8;
	}
	.model-info-li-color{
		color: #f16356 !important;
	}
	.model-info-li-left{
		color: #333;
		flex: 1;
	}
	.model-info-li-right{
		width:60rpx
	}
	.model-info-li-right image{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-top: -4rpx;
	}
</style>


<template>
	<view class="excha">
		<view class="excha-list">
			<view class="excha-list-li">
				<view class="excha-list-title">订单编号</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text">{{form.orderId}}</view>
					<view class="excha-list-rig-img"><text v-if='isShowJt' class="iconfont icon-jiantou"></text></view>
				</view>
			</view>
			<view class="excha-list-li">
				<view class="excha-list-title">发票类型</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text">电子普通发票</view>
					<view class="excha-list-rig-img"><text v-if='isShowJt' class="iconfont icon-jiantou"></text></view>
				</view>
			</view>
			<view class="excha-list-li">
				<view class="excha-list-title">发票内容</view>
				<view class="excha-list-rig" @click="contTap">
					<view class="excha-list-rig-text">{{ contName }}</view>
					<!-- <view class="excha-list-rig-img"><text class="iconfont icon-jiantou"></text></view> -->
				</view>
			</view>
			<view class="excha-list-li">
				<view class="excha-list-title">发票抬头</view>
				<view class="excha-list-rig" @click="unitTap">
					<view class="excha-list-rig-text">{{ dwName }}</view>
					<view class="excha-list-rig-img"><text class="iconfont icon-jiantou"></text></view>
				</view>
			</view>
		</view>
		<view class="excha-list" v-if="form.type == 1">
			<view class="excha-list-li">
				<view class="excha-list-title">单位名</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text"><input type="text" v-model="form.receiptName" placeholder="必选" /></view>
				</view>
			</view>
			<view class="excha-list-li">
				<view class="excha-list-title">税号</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text"><input type="text" v-model="form.receiptCode" placeholder="必选" /></view>
				</view>
			</view>
		</view>
		<view class="excha-list">
			<view class="excha-list-li">
				<view class="excha-list-title">电话</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text"><input type="text" v-model="form.phone" placeholder="必选" /></view>
				</view>
			</view>
			<view class="excha-list-li">
				<view class="excha-list-title">邮箱</view>
				<view class="excha-list-rig">
					<view class="excha-list-rig-text"><input type="text" v-model="form.email" placeholder="非必选" /></view>
				</view>
			</view>
		</view>
		<view class="excha-btn" @click="continueAction">提交</view>

		<uni-popup ref="modulone" type="bottom">
			<view class="model-info">
				<view class="model-info-li" v-for="(item,index) in danwei" :key="item.id" @click="modelDwTap(item.id,item.name)">
					<view class="model-info-li-left" :class="item.id == dwNum?'model-info-li-color':''">{{ item.name }}</view>
					<view class="model-info-li-right">
						<image v-if="item.id == dwNum" src="../static/gouxuan.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="modultwo" type="bottom">
			<view class="model-info">
				<view class="model-info-li" v-for="(item,index) in contArr" :key="item.id" @click="modelContTap(item.id,item.name)">
					<view class="model-info-li-left" :class="item.id == contNum?'model-info-li-color':''">{{ item.name }}</view>
					<view class="model-info-li-right">
						<image v-if="item.id == contNum" src="../static/gouxuan.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getReceiptDetail,
		postReceiptConfirm
	} from "@/api/receipt";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				isShowJt: false,
				isShowDw: false,
				dwNum: 0,
				dwName: '请选择',
				danwei: [{
						id: 0,
						name: '个人'
					},
					{
						id: 1,
						name: '单位'
					}
				],
				contNum: 0,
				contName: '商品明细',
				dwName: "个人",
				contArr: [{
						id: 1,
						name: '商品明细'
					},
					{
						id: 2,
						name: '商品类别'
					}
				],
				form: {
					email: "",
					oid: '',
					orderId: "",
					phone: "",
					receiptCode: "",
					receiptName: "",
					type: 0
				}
			}
		},

		onShow() {
			this.form.orderId = this.$yroute.query.orderId;
			console.log(this.form.orderId);
			this.form.oid = this.$yroute.query.oid;
			var orderId = this.$yroute.query.orderId;
			getReceiptDetail(this.form.orderId)
				.then((result) => {
					if(result.data){
						this.form = result.data;
					}
				})
				.catch(() => {});
		},
		methods: {
			continueAction() {
				if (!this.form.phone) {
					uni.showToast({
						title: '请填写手机号',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (this.form.type == 1) {
					if (!this.form.receiptCode) {
						uni.showToast({
							title: '请填写税号',
							icon: 'none',
							duration: 2000
						});
						return;
					}
					if (!this.form.receiptName) {
						uni.showToast({
							title: '请填写单位名',
							icon: 'none',
							duration: 2000
						});
						return;
					}
				}
				console.log(this.form);
				uni.showLoading({
					title: '提交中..'
				});
				postReceiptConfirm(this.form)
					.then(() => {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 2000,
							complete: function(res) {
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									});
								}, 1000);
							}
						});
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			unitTap() {
				this.$refs.modulone.open()
			},
			contTap() {
				// this.$refs.modultwo.open()
			},
			modelDwTap(id, name) {
				let _this = this;
				_this.dwNum = id;
				_this.form.type = id
				_this.dwName = name;
				_this.$refs.modulone.close();
			},
			modelContTap(id, name) {
				let _this = this;
				_this.contNum = id;
				_this.contName = name;
				_this.$refs.modultwo.close();
			}
		}
	}
</script>
