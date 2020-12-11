<template>
	<view class="my-order" ref="container">
		<!--    <view class="header bg-color-red">
      <view class="picTxt acea-row row-between-wrapper">
        <view class="text">
          <view class="name">အမိန့်သတင်းအချက်အလက်</view>
          <view>တိုးပွားလာသောအမိန့်：{{ orderData.orderCount || 0 }} စုစုပေါင်းစားသုံးမှု：￥{{orderData.sumPrice || 0 }}</view>
        </view>
      </view>
    </view>
    <view class="nav acea-row row-around">
      <view class="item" :class="{ on: type === 0 }" @click="changeType(0)">
        <view>ငွေပေးချေမှုကိုဆိုင်းငံ့ထား</view>
        <view class="num">{{ orderData.unpaidCount || 0 }}</view>
      </view>
      <view class="item" :class="{ on: type === 1 }" @click="changeType(1)">
        <view>ကယ်နှုတ်ခံရဖို့</view>
        <view class="num">{{ orderData.unshippedCount || 0 }}</view>
      </view>
      <view class="item" :class="{ on: type === 2 }" @click="changeType(2)">
        <view>လက်ခံရရှိရန်</view>
        <view class="num">{{ orderData.receivedCount || 0 }}</view>
      </view>
      <view class="item" :class="{ on: type === 3 }" @click="changeType(3)">
        <view>မှတ်ချက်</view>
        <view class="num">{{ orderData.evaluatedCount || 0 }}</view>
      </view>
      <view class="item" :class="{ on: type === 4 }" @click="changeType(4)">
        <view>ပြီးစီးခဲ့သည်</view>
        <view class="num">{{ orderData.completeCount || 0 }}</view>
      </view>
    </view> -->
		<view class="list">
			<view class="item" v-for="(order,orderListIndex) in orderList" :key="orderListIndex">
				<view class="title acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<span class="sign cart-color acea-row row-center-wrapper" v-if="order.combinationId > 0">အုပ်စုတစ်ခုနှင့်ဆက်သွယ်ပါ</span>
						<span class="sign cart-color acea-row row-center-wrapper" v-if="order.seckillId > 0">ဆူး</span>
						<span class="sign cart-color acea-row row-center-wrapper" v-if="order.bargainId > 0">ညှိနှိုင်း</span>
						<span class="sign cart-color acea-row row-center-wrapper" v-if="order.storeId > 0">စတိုးဆိုင်</span>
						{{ order.createTime }}
					</view>
					<view class="font-color-red">{{ getStatus(order) }}</view>
				</view>
				<view @click="goOrderDetails(order)">
					<view class="item-info acea-row row-between row-top" v-for="(cart,cartInfoIndex) in order.cartInfo" :key="cartInfoIndex">
						<view class="pictrue">
							<image :src="cart.productInfo.image" @click.stop="
                  $yrouter.push({ path: '/pages/shop/GoodsCon/index',query:{id:cart.productInfo.id}  })
                "
							 v-if="cart.combinationId === 0 && cart.bargainId === 0 &&cart.seckillId === 0" />
							<image :src="cart.productInfo.image" @click.stop="
                  $yrouter.push({
                    path: '/pages/activity/GroupDetails/index',query:{id:cart.combinationId}
                  })
                "
							 v-else-if="cart.combinationId > 0" />
							<image :src="cart.productInfo.image" @click.stop="
                  $yrouter.push({
                    path: '/pages/activity/DargainDetails/index',query:{id:cart.bargainId}
                  })
                "
							 v-else-if="cart.bargainId > 0" />
							<image :src="cart.productInfo.image" @click.stop="
                  $yrouter.push({
                    path: '/pages/activity/SeckillDetails/index',query:{id:cart.seckillId}
                  })
                "
							 v-else-if="cart.seckillId > 0" />
						</view>
						<view class="text acea-row row-between">
							<view class="name line2">{{ cart.productInfo.storeName }}</view>
							<view class="money">
								<view>
									￥{{
                  cart.productInfo.attrInfo
                  ? cart.productInfo.attrInfo.price
                  : cart.productInfo.price
                  }}
								</view>
								<view>x{{ cart.cartNum }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="totalPrice">
					စုစုပေါင်း{{ order.cartInfo.length || 0 }}ပစ္စည်းများ，စုစုပေါင်းပမာဏ
					<text class="money font-color-red">￥{{ order.payPrice }}</text>
				</view>
				<view class="bottom acea-row row-right row-middle">
					<view class="bnt continueBtn" @click="goOrderDetails(order)">ငွေတောင်းခံလွှာကိုကြည့်ပါ</view>
				</view>
			</view>
		</view>
		<view class="noCart" v-if="orderList.length === 0 && page > 1">
			<view class="pictrue">
				<image src="@/static/images/noOrder.png" />
			</view>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
		<Payment v-model="pay" :types="payType" @checked="toPay" :balance="userInfo.nowMoney"></Payment>
	</view>
</template>
<script>
	import {
		getOrderData,
		getOrderList
	} from "@/api/order";
	import {
		cancelOrderHandle,
		payOrderHandle,
		takeOrderHandle
	} from "@/libs/order";
	import Loading from "@/components/Loading";
	import Payment from "@/components/Payment";
	import DataFormat from "@/components/DataFormat";
	import {
		mapGetters
	} from "vuex";
	import {
		isWeixin,
		dataFormat
	} from "@/utils";

	const STATUS = [
		"ငွေပေးချေမှုကိုဆိုင်းငံ့ထား",
		"ကယ်နှုတ်ခံရဖို့",
		"လက်ခံရရှိရန်",
		"မှတ်ချက်",
		"ပြီးစီးခဲ့သည်",
		"",
		"",
		"",
		"",
		"ငွေပေးချေမှုကိုဆိုင်းငံ့ထား"
	];

	const NAME = "MyOrder";

	export default {
		name: NAME,
		data() {
			return {
				offlinePayStatus: 2,
				orderData: {},
				type: "5",
				page: 1,
				limit: 20,
				loaded: false,
				loading: false,
				orderList: [],
				pay: false,
				payType: ["weixin"],
				from: this.$deviceType
			};
		},
		components: {
			Loading,
			Payment,
			DataFormat
		},
		computed: mapGetters(["userInfo"]),
		onShow: function() {
			console.log(this);
			this.type = '5';
			this.changeType(this.type);
			this.getOrderData();
			this.getOrderList();
		},
		onHide: function() {
			this.orderList = [];
			this.page = 1;
			this.limit = 20;
			this.loaded = false;
			this.loading = false;
		},
		methods: {
			goLogistics(order) {
				// this.$yrouter.push({
				//   path: "/pages/order/Logistics/index",
				//   query: { id: order.orderId }
				// });
			},
			goOrderDetails(order) {
				// this.$yrouter.push({
				//   path: "/pages/order/OrderDetails/index",
				//   query: { id: order.orderId }
				// });
				if (order.receipt === 0 || order.receipt === '0') {
					this.$yrouter.push({
						path: "/subpackage/invoiceExchang/invoiceExchang",
						query: {
							orderId: order.orderId,
							oid: order.id
						}
					});
				} else {
					this.$yrouter.push({
						path: "/subpackage/receiptInfo/receiptInfo",
						query: {
							orderId: order.orderId,
							oid: order.id
						}
					});
				}
			},
			dataFormat,
			setOfflinePayStatus: function(status) {
				var that = this;
				that.offlinePayStatus = status;
				if (status === 1) {
					if (that.payType.indexOf("offline") < 0) {
						that.payType.push("offline");
					}
				}
			},
			getOrderData() {
				getOrderData().then(res => {
					this.orderData = res.data;
				});
			},
			takeOrder(order) {
				takeOrderHandle(order.orderId).finally(() => {
					this.reload();
					this.getOrderData();
				});
			},
			reload() {
				this.changeType(this.type);
			},
			changeType(type) {
				this.type = type;
				this.orderList = [];
				this.page = 1;
				this.loaded = false;
				this.loading = false;
				this.getOrderList();
			},
			getOrderList() {
				if (this.loading || this.loaded) return;
				this.loading = true;
				const {
					page,
					limit,
					type
				} = this;
				getOrderList({
					page,
					limit,
					type
				}).then(res => {
					this.orderList = this.orderList.concat(res.data);
					this.page++;
					this.loaded = res.data.length < this.limit;
					this.loading = false;
				});
			},
			getStatus(order) {
				return STATUS[order._status._type];
			},
			cancelOrder(order) {
				cancelOrderHandle(order.orderId)
					.then(() => {
						this.getOrderData();
						this.orderList.splice(this.orderList.indexOf(order), 1);
					})
					.catch(() => {
						this.reload();
					});
			},
			paymentTap: function(order) {
				var that = this;
				if (
					!(order.combinationId > 0 || order.bargainId > 0 || order.seckillId > 0)
				) {
					that.setOfflinePayStatus(order.offlinePayStatus);
				}
				this.pay = true;
				this.toPay = type => {
					payOrderHandle(order.orderId, type, that.from)
						.then(() => {
							const type = parseInt(this.$yroute.query.type) || 0;
							that.changeType(type);
							that.getOrderData();
						})
						.catch(() => {
							const type = parseInt(that.$yroute.query.type) || 0;
							that.changeType(type);
							that.getOrderData();
						});
				};
			},
			toPay() {}
		},
		mounted() {},
		onReachBottom() {
			!this.loading && this.getOrderList();
		}
	};
</script>

<style scoped lang="less">
	.noCart {
		margin-top: 0.17 * 100rpx;
		padding-top: 0.1 * 100rpx;
	}

	.noCart .pictrue {
		width: 4 * 100rpx;
		height: 3 * 100rpx;
		overflow: hidden;
		margin: 0.7 * 100rpx auto 0.5 * 100rpx auto;
	}

	.noCart .pictrue image {
		width: 4 * 100rpx;
		height: 3 * 100rpx;
	}

	.continueBtn {
		background-color: #0A72B9;
	}
</style>
