<style scoped lang="less">
	.order-submission {
		padding-left: 30rpx !important;
		padding-right: 30rpx !important;
	}

	.order-submission .wrapper .shipping select {
		color: #999;
		padding-right: 0.15 * 100rpx;
	}

	.order-submission .wrapper .shipping .iconfont {
		font-size: 0.3 * 100rpx;
		color: #515151;
	}

	.order-submission .allAddress {
		width: 100%;
		padding-top: 40rpx;
	}

	.order-submission .allAddress .nav {
		margin: 0 auto;
		padding: 0 30rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.order-submission .allAddress .nav .item {
		flex: 1;
		position: relative;
	}

	.order-submission .allAddress .nav .item.on {
		position: relative;
	}

	.order-submission .allAddress .address {
		height: 1.5 * 100rpx;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.order-submission .allAddress .line {
		width: 6.80 * 100rpx;
		margin: 0 auto;
	}

	.order-submission .wrapper .item .discount input::placeholder {
		color: #fff;
	}

	.settlement {
		background-color: #71D676 !important;
	}

	order-goods::v-deep {
		.item {
			margin-left: 0rpx !important;
		}

		.orderGoods {
			overflow: hidden;
			border-radius: 20rpx;
		}
	}

	.font-color-light {
		color: #A6A6A6;
	}

	.order-submission .allAddress {
		margin-top: 40rpx;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 0;
	}

	.order-goods-list {
		overflow: hidden;
		border-radius: 20rpx;
		margin: 20rpx 0;

		.goods-item {
			background-color: white;
			border-radius: 20rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			padding: 40rpx 20rpx;
		}

		.goods-img {
			width: 140rpx;
			height: 140rpx;
		}
	}

	.white-block {
		width: 200rpx;
		height: 46rpx;
		background: #FFFFFF;
		border-radius: 23rpx;
	}

	.icon-jiantou {
		&.down {
			transform: rotateZ(90deg);
		}

		&.up {
			transform: rotateZ(-90deg);
		}
	}

	.order-submission .wrapper {
		margin-top: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.order-submission .address .addressCon{
		width: unset;
	}
</style>
<template>
	<view class="order-submission">
		<view class="allAddress" :style="systemStore ? '' : 'padding-top: 0.2*100rpx'">
			<view class="address acea-row row-between-wrapper" v-if="shipping_type === 0" @click="addressTap">
				<view class="addressCon" v-if="addressInfo.realName">
					<view class="name">
						{{ addressInfo.realName }}
						<text class="phone">{{ addressInfo.phone }}</text>
					</view>
					<view>
						<text class="default font-color-red" v-if="addressInfo.isDefault">[默认]</text>
						{{ addressInfo.province }}{{ addressInfo.city}}{{ addressInfo.district }}{{ addressInfo.detail }}
					</view>
				</view>
				<view class="addressCon" v-else>
					<view class="setaddress">设置收货地址</view>
				</view>
				<view class="iconfont icon-jiantou"></view>
			</view>
			<div class="address acea-row row-between-wrapper" v-else @click="showStoreList">
				<div class="addressCon">
					<div class="name">
						{{ storeItems.name || systemStore.name }}
						<span class="phone">{{storeItems.phone || systemStore.phone}}</span>
					</div>
					<div>{{ storeItems.address || systemStore.address }}</div>
				</div>
				<div class="iconfont icon-jiantou"></div>
			</div>
			<view class="line">
				<image src="@/static/images/line.jpg" />
			</view>
		</view>
		<!-- <OrderGoods :evaluate="0" :cartInfo="orderGroupInfo.cartInfo" class="order-goods-wrap"></OrderGoods> -->

		<view class="order-goods-list color-text">
			<view class="goods-item flex-main-between" v-for="(cart,i) in orderGroupInfo.cartInfo" :key="cart.id" v-show="i<2 || isShowMore">
				<view class="goods-img flex-none">
					<image :src="cart.productInfo.image" mode="widthFix" class="width-full"></image>
				</view>
				<view class="goods-right flex-1 left-20">
					<view class="goods-title txt-ellipsis row-2 fs-26">{{cart.productInfo.storeName}}</view>
					<view class="flex-main-start fs-20 txt-bold lh-1 color-gray" style="margin-top: 18rpx;">
						<text>{{cart.shopName}}</text>
						<text class="left-10" v-if="cart.productInfo.attrInfo">{{cart.productInfo.attrInfo.sku}}</text>
					</view>
					<view class="flex-main-end lh-1 fs-28 txt-bold">
						<text>x</text>
						<text class="left-15">{{cart.cartNum}}</text>
					</view>
					<view class="color-danger fs-28 txt-bold lh-1 ">
						<text v-if="mode!='point'">￥</text>
						<text>{{cart.truePrice}} {{mode=='point'?'积分':''}}</text>
					</view>
				</view>
			</view>

			<view class="flex-main-center txt-medium fs-26">
				<view @click="switchMore()" class="white-block flex-main-center" style="color: #A6A6A6;">
					<text>共{{orderGroupInfo.cartInfo ? orderGroupInfo.cartInfo.length : 0}}件</text>
					<text :class="[isShowMore? 'up':'down','iconfont icon-jiantou fs-16 left-10']"></text>
				</view>
			</view>

		</view>

		<view class="wrapper">
			<view v-if="shipping_type === 0">
				<view class="item acea-row row-between-wrapper">
					<view>运费</view>
					<view :class="[orderPrice.payPostage > 0?'txt-bold':'', 'discount fs-28']">
						{{
							  orderPrice.payPostage > 0
							  ? orderPrice.payPostage
							  : "免运费"
							  }}
					</view>
				</view>
			</view>

			<view class="item acea-row row-between-wrapper" @click="couponTap" v-if="deduction === false && mode!='vip' && mode!='point'">
				<view>优惠券</view>
				<view class="discount">
					{{ usableCoupon.length ? couponTitle : "请选择" }}
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>


			<!-- 		<view v-else>
				<view class="item acea-row row-between-wrapper">
					<view>联系人</view>
					<view class="discount">
						<input type="text" placeholder="请填写您的联系姓名" v-model="contacts" />
					</view>
				</view>
				<view class="item acea-row row-between-wrapper">
					<view>联系电话</view>
					<view class="discount">
						<input type="text" placeholder="请填写您的联系电话" v-model="contactsTel" />
					</view>
				</view>
			</view> -->

			<view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
				<view>商品总价：</view>
				<view class="money txt-bold fs-28">
					<text v-if="mode!='point'">￥</text>
					<text>{{ orderPrice.totalPrice }} {{mode=='point'?'积分':''}}</text>	
				</view>
			</view>

		</view>

		<view class="wrapper">
			<view v-if="mode=='point'" class="item acea-row row-between-wrapper">
				<view>当前积分</view>
				<view class="discount">
					{{userInfo.integral}}
				</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>支付方式</view>
				<view class="discount">{{mode=='point'?'积分/积分+微信':'微信'}}
				</view>
			</view>
			<view class="item">
				<view>备注信息（150字以内）</view>
				<textarea v-model="mark"></textarea>
			</view>
		</view>

		<!-- 		<view class="moneyList">
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
				<view>商品总价：</view>
				<view class="money">￥{{ orderPrice.totalPrice }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.payPostage > 0">
				<view>运费：</view>
				<view class="money">￥{{ orderPrice.payPostage }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.couponPrice > 0">
				<view>优惠券抵扣：</view>
				<view class="money">-￥{{ orderPrice.couponPrice }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.deductionPrice > 0">
				<view>积分支付：</view>
				<view class="money">-￥{{ orderPrice.deductionPrice }}</view>
			</view>
		</view> -->
		<view style="height:120rpx"></view>
		<view class="footer acea-row row-between-wrapper">
			<view class="flex-1 flex-column flex-cross-start">
				<view class="flex-none flex-main-start " style="
font-size: 32rpx;
font-weight: bold;
color: #333333;">
					<view class="color-text txt-bold fs-32">
						<text>￥</text>
						<text>{{ orderPrice.payPrice }}</text>
					</view>
				</view>
				<view class="font-color-light fs-24">
					<text>已抵扣</text>
					<text v-if="mode!='point'">￥</text>
					<text>{{ preferPrice||0 }} {{mode=='point'?'积分':''}}</text>
				</view>
			</view>
			<view class="settlement flex-none" @click="createOrder">{{mode=='point'?'立即兑换':'立即支付'}}</view>
		</view>
		<!-- v-on:couponchange="changecoupon($event)" -->
		<CouponListWindow v-model="showCoupon" :price="orderPrice.totalPrice"
		 :checked="usableCoupon" @checked="changeCoupon" :cartid="cartid"></CouponListWindow>
		<AddressWindow @checked="changeAddress($event)" @redirect="addressRedirect" v-model="showAddress" :checked="addressInfo.id"
		 ref="mychild"></AddressWindow>
	</view>

</template>


<script>
	import OrderGoods from "@/components/OrderGoods";
	import CouponListWindow from "@/components/CouponListWindow";
	import AddressWindow from "@/components/AddressWindow";
	import cookie from '@/utils/store/cookie';
	import {
		postOrderConfirm,
		postOrderComputed,
		createOrder
	} from "@/api/order";
	import {
		mapGetters
	} from "vuex";
	import {
		weappPay
	} from "@/libs/wechat";
	import {
		isWeixin
	} from "@/utils";

	const NAME = "OrderSubmission",
		_isWeixin = isWeixin();
	export default {
		name: NAME,
		components: {
			OrderGoods,
			CouponListWindow,
			AddressWindow
		},
		props: {},
		data: function() {
			return {
				cardName: '',
				cardNumber: '',
				cardType: '',
				offlinePayStatus: 2,
				from: this.$deviceType,
				deduction: true,
				enableIntegral: true,
				enableIntegralNum: 0,
				isWeixin: _isWeixin,
				pinkId: 0,
				active: _isWeixin ? "weixin" : "yue",
				showCoupon: false,
				showAddress: false,
				addressInfo: {},
				couponId: 0,
				orderGroupInfo: {
					priceGroup: {}
				},
				usableCoupon: [],
				addressLoaded: false,
				useIntegral: false,
				orderPrice: {
					payPrice: "计算中"
				},
				mark: "",
				systemStore: {},
				shipping_type: 0,
				contacts: "",
				contactsTel: "",
				storeSelfMention: 0,
				cartid: "",
				mode: '',
				isShowInput: false,
				isShowInput2: false,
				isShowInput3: false,
				isShowMore: false
			};
		},
		computed: {
			...mapGetters(["userInfo", "storeItems"]),
			couponTitle(){
				const nullItem = this.usableCoupon.find(v=>v.id==0)  // id 0 空项
				const length = this.usableCoupon.length;
				if(nullItem){
					return nullItem.couponTitle
				}
				return length>2 ? this.usableCoupon.map(v=>v.couponTitle).slice(0,2).join(',') + '...' :
				 this.usableCoupon.map(v=>v.couponTitle).slice(0,2).join(',')  // 有多个数据
			},
			// 优惠价格
			preferPrice(){
				if(this.mode=='point'){
					return this.orderPrice.deductionPrice
				}
				// 商品总价 + 运费 - 支付价格即抵扣
				let price = ((this.orderPrice.totalPrice+this.orderPrice.payPostage)*1000 - this.orderPrice.payPrice*1000)/1000
				//<!-- 解决精度问题，小数点后三位可精确计算 -->
				return price<0 ? 0 : price
			}
			
		},
		watch: {
			useIntegral() {
				this.computedPrice();
			},
			$yroute(n) {
				if (n.name === NAME) this.getCartInfo();
			},
			shipping_type() {
				this.computedPrice();
			}
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
			this.isShowInput = (e.scrollTop > 85)
			this.isShowInput2 = (e.scrollTop > 70)
			this.isShowInput3 = (e.scrollTop > 195)
		},
		mounted: function() {
			let that = this;
			this.$store.dispatch("getUser", true);
			that.getCartInfo();
			console.log(that.$yroute);
			if (that.$yroute.query.pinkid !== undefined) {
				that.pinkId = that.$yroute.query.pinkid;
			}
			if (that.$yroute.query.id !== undefined) {
				that.cartid = that.$yroute.query.id;
				console.log(that.cartid)
			}
			that.mode = that.$yroute.query.mode || ''
			if (that.mode == 'point') { // 默认勾选积分抵扣
				this.useIntegral = 'true'
			}
		},
		methods: {
			switchMore() {
				if (this.orderGroupInfo.cartInfo.length < 3) {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
					return;
				}
				this.isShowMore = !this.isShowMore
			},
			changeCardType(e) {
				this.cardType = e.detail.value
			},
			showStoreList() {
				this.$store.commit("get_to", "orders");
				this.$yrouter.push({
					path: "/pages/shop/StoreList/index"
				});
			},
			addressType: function(index) {
				if (index && !this.systemStore.id) {
					uni.showToast({
						title: "暂无门店信息，您无法选择到店自提！",
						icon: "none",
						duration: 2000
					});
					return;
				}
				this.shipping_type = index;
			},
			changeUseIntegral: function(e) {
				// this.computedPrice();
				this.useIntegral = e.mp.detail.value[0];
			},
			computedPrice() {
				let shipping_type = this.shipping_type;
				const couponId = this.mode == 'point' ? 0 : this.usableCoupon.map(v=>v.id).join(',') // 积分商城不传优惠券
				postOrderComputed(this.orderGroupInfo.orderKey, {
					addressId: this.addressInfo.id,
					useIntegral: this.useIntegral ? 1 : 0,
					couponId: couponId || 0,
					shipping_type: parseInt(shipping_type) + 1,
					type: this.mode == 'point' ? 1 : 0
				}).then(res => {
					const data = res.data;
					if (data.status === "EXTEND_ORDER") {
						this.$yrouter.replace({
							path: "/pages/order/OrderDetails/index",
							query: {
								id: data.result.orderId
							}
						});
					} else {
						this.orderPrice = data.result;
					}
				});
			},
			getCartInfo() {
				const cartIds = this.$yroute.query.id;
				if (!cartIds) {
					uni.showToast({
						title: "参数有误",
						icon: "none",
						duration: 2000
					});
					return this.$yrouter.back();
				}
				// 获取订单数据
				postOrderConfirm(cartIds)
					.then(res => {
						this.offlinePayStatus = res.data.offline_pay_status;
						this.orderGroupInfo = res.data;
						this.deduction = res.data.deduction;
						this.usableCoupon = Array.isArray(res.data.usableCoupon) ?  res.data.usableCoupon : []
						this.usableCoupon =  [];
						this.addressInfo = res.data.addressInfo || {};
						this.systemStore = res.data.systemStore || {};
						this.storeSelfMention = res.data.storeSelfMention;
						// this.cardName = this.addressInfo.realName || '' // 清关人信息
						this.cardNumber = this.addressInfo.cardNumber || ''
						this.cardType = this.addressInfo.cardType || ''
						this.computedPrice();
					})	
					.catch((err) => {
						console.error(err)
						uni.showToast({
							title: "加载订单数据失败",
							icon: "none",
							duration: 2000
						});
					});
			},
			addressTap: function() {
				this.showAddress = true;
				if (!this.addressLoaded) {
					this.addressLoaded = true;
					this.$refs.mychild.getAddressList();
				}
			},
			addressRedirect() {
				this.addressLoaded = false;
				this.showAddress = false;
			},
			couponTap: function() {
				this.showCoupon = true;
			},
			changeCoupon: function(couponList) {
				if (couponList.length == 0) { 
					this.usableCoupon = [{
						couponTitle: "不使用优惠券",
						id: 0
					}];
				} else {
					this.usableCoupon = couponList;
				}
				this.computedPrice();
			},
			payItem: function(index) {
				this.active = index;
			},
			changeAddress(addressInfo) {
				console.log('addressInfo:', addressInfo)
				this.addressInfo = addressInfo;
				this.cardName = addressInfo.realName || '' // 清关人信息
				this.cardNumber = addressInfo.cardNumber || ''
				this.cardType = addressInfo.cardType || ''
				this.computedPrice();
			},
			createOrder() {
				let shipping_type = this.shipping_type;
				// if (this.mode == 'point' && this.orderPrice.payPrice > 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '积分不足！'
				// 	})
				// 	return
				// }
				if (!this.active) {
					uni.showToast({
						title: "请选择支付方式",
						icon: "none",
						duration: 2000
					});
					return;
				}
				if (!this.addressInfo.id && !this.shipping_type) {
					uni.showToast({
						title: "请选择收货地址",
						icon: "none",
						duration: 2000
					});
					return;
				}

				uni.showLoading({
					title: "生成订单中"
				});
				let from = {};
				if (this.$deviceType == "app") {
					from.from = "app";
				}
				console.log(this.storeItems, this.systemStore);
				let origin = this.from
				// #ifdef H5
				origin = 'wechat_pay'
				// #endif
				const couponId = this.mode == 'point' ? 0 : this.usableCoupon.map(v=>v.id).join(',') // 积分商城不传优惠券
				createOrder(this.orderGroupInfo.orderKey, {
						// cardNumber: this.cardNumber, // 清关人姓名和身份证
						// cardName: this.cardName,
						// cardType: this.cardType,
						type: this.mode == 'point' ? 1 : 0, // 积分商品要多传个type
						realName: this.contacts,
						phone: this.contactsTel,
						addressId: this.addressInfo.id,
						useIntegral: this.useIntegral ? 1 : 0,
						couponId: couponId || 0,
						payType: this.active,
						pinkId: this.pinkId,
						seckillId: this.orderGroupInfo.seckill_id,
						combinationId: this.orderGroupInfo.combination_id,
						bargainId: this.orderGroupInfo.bargain_id,
						from: origin,
						mark: this.mark || "",
						shippingType: parseInt(shipping_type) + 1,
						storeId: this.storeItems ? this.storeItems.id : this.systemStore.id,
						...from
					})
					.then(res => {
						uni.hideLoading();
						const data = res.data;
						switch (data.status) {
							case "ORDER_EXIST":
							case "EXTEND_ORDER":
								uni.showToast({
									title: res.msg,
									icon: "none",
									duration: 2000
								});
								this.$yrouter.replace({
									path: "/pages/order/OrderDetails/index",
									query: {
										id: data.result.orderId
									}
								});
								break;
							case "PAY_DEFICIENCY":
								break;

							case "PAY_ERROR":
								uni.showToast({
									title: res.msg,
									icon: "none",
									duration: 2000
								});
								this.$yrouter.replace({
									path: "/pages/order/OrderDetails/index",
									query: {
										id: data.result.orderId
									}
								});
								break;
							case "SUCCESS":
								uni.showToast({
									title: res.msg,
									icon: "none",
									duration: 2000
								});
								this.$yrouter.replace({
									path: "/pages/order/OrderDetails/index",
									query: {
										id: data.result.orderId
									}
								});
								break;
							case "WECHAT_H5_PAY":
								// H5支付
								this.$yrouter.replace({
									path: "/pages/order/OrderDetails/index",
									query: {
										id: data.result.orderId
									}
								});
								setTimeout(() => {
									location.href = data.result.jsConfig.mweb_url;
								}, 100);
								break;
							case "WECHAT_PAY":
								// 小程序支付
								weappPay(data.result.jsConfig)
									.then(() => {
										this.$yrouter.replace({
											path: "/pages/order/PaymentStatus/index",
											query: {
												orderNo: data.result.orderId,
												createTime: res.time,
												payMoney: this.orderPrice.payPrice
											}
										});
									})
									.catch(() => {
										this.$yrouter.replace({
											path: "/pages/order/OrderDetails/index",
											query: {
												id: data.result.orderId
											}
										});
									})
									.finally(() => {

									});
								break;

							case "WECHAT_APP_PAY":
								// APP支付
								weappPay(data.result.jsConfig)
									.then(() => {
										this.$yrouter.replace({
											path: "/pages/order/PaymentStatus/index",
											query: {
												orderNo: data.result.orderId,
												createTime: res.time,
												payMoney: this.orderPrice.payPrice
											}
										});
									})
									.catch(() => {
										this.$yrouter.replace({
											path: "/pages/order/OrderDetails/index",
											query: {
												id: data.result.orderId
											}
										});
									})
									.finally(() => {

									});
								break;
								// 下面为原先微信支付方式，
								// pay(data.result.jsConfig).finally(() => {
								//   this.$yrouter.replace({
								//     path: "/pages/order/OrderDetails/index" ,query: { id: data.result.orderId}
								//   });
								// });
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.msg ||
								err.response.data.msg ||
								err.response.data.message ||
								"创建订单失败",
							icon: "none",
							duration: 2000
						});
					});
			}
		}
	};
</script>
