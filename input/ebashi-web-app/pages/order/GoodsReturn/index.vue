<style lang="less">
	@import "@/assets/css/public.less";
	.continue{
		.fade(#eb3723)
	}
</style>
<template>
	<view class="apply-return">
		<view class="goodsStyle acea-row row-between" v-for="cart in orderInfo.cartInfo" :key="cart.id">
			<view class="pictrue">
				<image :src="cart.productInfo.image" class="image" />
			</view>
			<view class="text acea-row row-between">
				<view class="name line2">{{ cart.productInfo.storeName||'' }}</view>
				<view class="money">
					<view>
						￥{{
            cart.productInfo.attrInfo
            ? cart.productInfo.attrInfo.price
            : cart.productInfo.price
            }}
					</view>
					<view class="num">x{{ cart.cartNum||0 }}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item acea-row row-between-wrapper">
				<view>退货件数</view>
				<view class="num">{{ orderInfo.totalNum||0 }}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>退款金额</view>
				<view class="num">￥{{ orderInfo.payPrice||0 }}</view>
			</view>

			<picker :value="reason" :range="reasonList" @change="changeReason">
				<view class="item acea-row row-between-wrapper">
					<view>退款原因</view>
					<view class="num">{{reason}}</view>
					<text class="iconfont icon-jiantou"></text>
				</view>
			</picker>

			<view class="item acea-row row-between-wrapper">
				<view>退款方式</view>
				<radio-group @change="radioChange">
					<view class="flex-main-start">
						<label class="radio right-10 flex-main-start" v-model="refund_type">
							<radio :value="0" :checked="refund_type == 0" />仅退款</label>
						<block v-if="status!=0">
							<label class="radio flex-main-start">
								<radio :value="1" :checked="refund_type == 1" />退货退款</label>
						</block>
					</view>
				</radio-group>
			</view>

			<template v-if="refundStatus == 3  || refundStatus == 4 ">
				<view class="item flex-main-between row">
					<view class="col-7">商家收货姓名</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realName}}
					</text>
				</view>
				<view class="item flex-main-between row">
					<view class="col-7">商家收货电话</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realPhone}}
					</text>
				</view>
				<view class="item flex-main-between row">
					<view class="col-7">商家收货地址</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realAddress}}
					</text>
				</view>

				<view class="item acea-row row-between-wrapper">
					<view>物流单号</view>
					<input type="text" class="txt-right " v-model="refundDeliveryId" placeholder="请输入退货物流号" />
				</view>

				<picker :range="expressList" range-key="name" value="id" @change="changeExpress">
					<view class="item acea-row row-between-wrapper">
						<view>物流公司</view>
						<view class="num">{{express.name}}</view>
						<text class="iconfont icon-jiantou"></text>
					</view>
				</picker>
			</template>

			<view class="item textarea acea-row row-between">
				<view>备注说明</view>
				<textarea placeholder="填写备注信息，100字以内" class="num" v-model="refund_reason_wap_explain"></textarea>
			</view>
		</view>
		<block v-if="!(refundStatus == 2 || refundStatus == 4 || refundStatus == 1)">
			<view class="returnBnt bg-color-red" @click="submit">
				{{refundStatus == 3?"确认退货":"申请退款"}}
			</view>
		</block>
		<block v-else>
			<view class="returnBnt bg-color-red continue">
				退款处理中
			</view>
		</block>
	</view>
</template>

<script>
	// import {
	// 	getAddress
	// } from "@/api/user";
	import {
		orderDetail,
		getRefundReason,
		postOrderRefund,
		getExpressName,
		getAdressByStoreId
	} from "@/api/order";
	import {
		trim
	} from "@/utils";
	import {
		VUE_APP_API_URL
	} from "@/config";

	export default {
		name: "goodsReturn",
		components: {
			// VueCoreImageUpload
		},
		data() {
			return {
				url: `${VUE_APP_API_URL}/upload/image`,
				headers: {
					Authorization: "Bearer " + this.$store.state.token
				},
				id: 0,
				status: 0,
				refundStatus: 0,
				refund_type: 0,
				refundDeliveryId: "",
				orderInfo: {},
				reasonList: [],
				reason: "",
				expressList: [],
				express: {},
				refund_reason_wap_explain: "",
				refund_reason_wap_img: [],
				postInfo: {},
				isPoint: true
			};
		},
		methods: {
			radioChange: function(evt) {
				console.log(evt)
				this.refund_type = evt.target.value;
			},
			changeExpress(e) {
				this.express = this.expressList[e.mp.detail.value];
			},
			changeReason(e) {
				this.reason = this.reasonList[e.mp.detail.value];
			},
			imageuploaded(res) {
				if (res.status !== 200) {
					uni.showToast({
						title: err.msg || err.response.data.msg || err.response.data.message,
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.refund_reason_wap_img.push(res.data.url);
			},
			getOrderDetail() {
				orderDetail(this.id)
					.then(res => {
						this.orderInfo = res.data;
						this.isPoint = !!res.data.useIntegral;
						return getAdressByStoreId(res.data.merId)
					})
					.then(res=>{
						this.postInfo = res.data;
					})
					.catch(err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					});
			},
			getRefundReason() {
				getRefundReason().then(res => {
					this.reasonList = res.data;
				});

				getExpressName().then(res => {
					this.expressList = res.data;
				});
			},
			submit() {
				if(this.isPoint){
					uni.showToast({
						title:'积分商品不能申请退货!',
						icon:'none'
					})
					return
				}
				const refund_reason_wap_explain = trim(this.refund_reason_wap_explain),
					text = this.reason;
				if (!text) {
					uni.showToast({
						title: "请选择退款原因",
						icon: 'none',
						duration: 2000
					});
					return
				}
				//0 仅退款 1退货退款
				var refund_type = this.refund_type;
				var refundDeliveryId = "";
				var refundDeliveryName = "";
				var refundDeliverySn = "";
				if (this.refundStatus === 3 || this.refundStatus === '3') {
					refundDeliveryName = this.express.name;
					refundDeliverySn = this.express.code;
					refundDeliveryId = this.refundDeliveryId;
					if (!refundDeliveryName) {
						uni.showToast({
							title: "请选择物流公司",
							icon: 'none',
							duration: 2000
						});
						return
					}
					if (!refundDeliveryId) {
						uni.showToast({
							title: "请填写物流单号",
							icon: 'none',
							duration: 2000
						});
						return
					}
				}
				var info = {
					text,
					uni: this.orderInfo.extendOrderId,
					refund_reason_wap_img: this.refund_reason_wap_img.join(","),
					refund_reason_wap_explain: refund_reason_wap_explain,
					refund_type: refund_type,
					refundDeliveryName: refundDeliveryName,
					refundDeliveryId: refundDeliveryId,
					refundDeliverySn: refundDeliverySn,
				};
				console.log(info);
				postOrderRefund(info)
					.then(res => {
						uni.showToast({
							title: res.msg,
							icon: "success",
							duration: 2000
						});
						setTimeout(() => {
							this.$yrouter.back();
						}, 1500);
					})
					.catch(err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					});
			}
		},
		mounted() {
			console.log(this.$yroute.query);
			this.id = this.$yroute.query.id || 0;
			this.status = this.$yroute.query.status || 0;
			if(this.$yroute.query.refundType>-1){
				this.refund_type = this.$yroute.query.refundType
			}

			//0未退款 1申请中 2已退款 3待退货 4买家已发货
			this.refundStatus = this.$yroute.query.refundStatus || 0;
			this.reason = this.$yroute.query.refundReasonWap || "";
			this.refund_reason_wap_explain = this.$yroute.query.refundReasonWapExplain || "";
			this.refundDeliveryId = this.$yroute.query.refundDeliveryId || "";
			this.express.name = this.$yroute.query.refundDeliveryName || "";

			if (this.refundStatus === 3 || this.refundStatus === '3') {
				this.refund_type = 1;
			}
			this.getOrderDetail();
			this.getRefundReason();
		}
	};
</script>
