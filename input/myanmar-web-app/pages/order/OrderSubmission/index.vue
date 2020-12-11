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
						<text class="default font-color-red" v-if="addressInfo.isDefault">[မူလက]</text>
						{{ addressInfo.province }}{{ addressInfo.city}}{{ addressInfo.district }}{{ addressInfo.detail }}
					</view>
				</view>
				<view class="addressCon" v-else>
					<view class="setaddress">ပို့သည့်လိပ်စာကိုသတ်မှတ်ပါ</view>
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
						<text>{{cart.truePrice}} {{mode=='point'?'အရေးပါသော':''}}</text>
					</view>
				</view>
			</view>

			<view class="flex-main-center txt-medium fs-26">
				<view @click="switchMore()" class="white-block flex-main-center" style="color: #A6A6A6;">
					<text>စုစုပေါင်း{{orderGroupInfo.cartInfo ? orderGroupInfo.cartInfo.length : 0}}အပိုင်းအစများ</text>
					<text :class="[isShowMore? 'up':'down','iconfont icon-jiantou fs-16 left-10']"></text>
				</view>
			</view>

		</view>

		<view class="wrapper">
			<view v-if="shipping_type === 0">
				<view class="item acea-row row-between-wrapper">
					<view>သင်္ဘောဖြင့်ကုန်ပစ္စည်းပို့ခြင်း</view>
					<view :class="[orderPrice.payPostage > 0?'txt-bold':'', 'discount fs-28']">
						{{
							  orderPrice.payPostage > 0
							  ? orderPrice.payPostage
							  : "အခမဲ့ပို့ပေးသည်"
							  }}
					</view>
				</view>
			</view>

			<view class="item acea-row row-between-wrapper" @click="couponTap" v-if="deduction === false && mode!='vip' && mode!='point'">
				<view>ကူပွန်</view>
				<view class="discount">
					{{ usableCoupon.length ? couponTitle : "ကျေးဇူးပြု။ ရွေးချယ်ပါ" }}
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>


			<!-- 		<view v-else>
				<view class="item acea-row row-between-wrapper">
					<view>ဆက်သွယ်ရန်ပုဂ္ဂိုလ်</view>
					<view class="discount">
						<input type="text" placeholder="ကျေးဇူးပြု၍ သင်၏အမည်နာမည်ဖြည့်ပါ" v-model="contacts" />
					</view>
				</view>
				<view class="item acea-row row-between-wrapper">
					<view>ဆက်သွယ်ရန်ဖုန်းနံပါတ်</view>
					<view class="discount">
						<input type="text" placeholder="ကျေးဇူးပြု၍ သင့်အဆက်အသွယ်နံပါတ်ဖြည့်ပါ" v-model="contactsTel" />
					</view>
				</view>
			</view> -->

			<view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
				<view>စုစုပေါင်းကုန်ပစ္စည်းစျေးနှုန်း：</view>
				<view class="money txt-bold fs-28">
					<text v-if="mode!='point'">￥</text>
					<text>{{ orderPrice.totalPrice }} {{mode=='point'?'အရေးပါသော':''}}</text>	
				</view>
			</view>

		</view>

		<view class="wrapper">
			<view v-if="mode=='point'" class="item acea-row row-between-wrapper">
				<view>လက်ရှိအချက်များ</view>
				<view class="discount">
					{{userInfo.integral}}
				</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>ငွေပေးချေစနစ်</view>
				<view class="discount">{{mode=='point'?'အရေးပါသော/အရေးပါသော+WeChat':'WeChat'}}
				</view>
			</view>
			<view class="item">
				<view>မှတ်ချက်များသတင်းအချက်အလက်（150စကားလုံးများအတွင်း）</view>
				<textarea v-model="mark"></textarea>
			</view>
		</view>

		<!-- 		<view class="moneyList">
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
				<view>စုစုပေါင်းကုန်ပစ္စည်းစျေးနှုန်း：</view>
				<view class="money">￥{{ orderPrice.totalPrice }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.payPostage > 0">
				<view>သင်္ဘောဖြင့်ကုန်ပစ္စည်းပို့ခြင်း：</view>
				<view class="money">￥{{ orderPrice.payPostage }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.couponPrice > 0">
				<view>ကူပွန်နှုတ်ယူခြင်း：</view>
				<view class="money">-￥{{ orderPrice.couponPrice }}</view>
			</view>
			<view class="item acea-row row-between-wrapper" v-if="orderPrice.deductionPrice > 0">
				<view>ငွေပေးချေမှုအချက်များ：</view>
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
					<text>နှုတ်ယူခဲ့သည်</text>
					<text v-if="mode!='point'">￥</text>
					<text>{{ preferPrice||0 }} {{mode=='point'?'အရေးပါသော':''}}</text>
				</view>
			</view>
			<view class="settlement flex-none" @click="createOrder">{{mode=='point'?'ယခုရွေးပါ':'ချက်ချင်းပေးဆောင်'}}</view>
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
					payPrice: "တွက်ချက်သည်"
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
				const nullItem = this.usableCoupon.find(v=>v.id==0)  // id 0 ဗလာပစ္စည်း
				const length = this.usableCoupon.length;
				if(nullItem){
					return nullItem.couponTitle
				}
				return length>2 ? this.usableCoupon.map(v=>v.couponTitle).slice(0,2).join(',') + '...' :
				 this.usableCoupon.map(v=>v.couponTitle).slice(0,2).join(',')  // ဒေတာမျိုးစုံရှိသည်
			},
			// စျေးလျှော့စျေး
			preferPrice(){
				if(this.mode=='point'){
					return this.orderPrice.deductionPrice
				}
				//<!-- တိကျမှန်ကန်မှုဆိုင်ရာပြproblemsနာများကိုဖြေရှင်းပါ，ဒdecimalမအမှတ်ပြီးနောက်ဂဏန်းသုံးလုံးတိကျစွာတွက်ချက်နိုင်ပါတယ် -->
				return (this.orderPrice.totalPrice*1000 - this.orderPrice.payPrice*1000)/1000
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
		onPageScroll: function(e) { //nvuescroll scroll ကိုမထောက်ပံ့ပါဘူး，ရရှိနိုင်bindingxအစား
			console.log("စာလိပ်အကွာအဝေးသည်：" + e.scrollTop);
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
			if (that.mode == 'point') { // အမှတ်နှုတ်ယူခြင်းကိုပုံမှန်အားဖြင့်စစ်ဆေးသည်
				this.useIntegral = 'true'
			}
		},
		methods: {
			switchMore() {
				if (this.orderGroupInfo.cartInfo.length < 3) {
					uni.showToast({
						title: 'မရှိတော့ပါ',
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
						title: "စတိုးဆိုင်သတင်းအချက်အလက်မရှိပါ，စတိုးဆိုင်မှာကောက်ဖို့သင်ရွေးလို့မရပါဘူး！",
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
				const couponId = this.mode == 'point' ? 0 : this.usableCoupon.map(v=>v.id).join(',') // အချက်များကုန်တိုက်သည်ကူပွန်များကိုမကျော်ဖြတ်နိုင်ပါ
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
						title: "မမှန်ကန်ကြောင်း parameters တွေကို",
						icon: "none",
						duration: 2000
					});
					return this.$yrouter.back();
				}
				// အမှာစာဒေတာကိုရယူပါ
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
						// this.cardName = this.addressInfo.realName || '' // ရှင်းလင်းရေးသတင်းအချက်အလက်
						this.cardNumber = this.addressInfo.cardNumber || ''
						this.cardType = this.addressInfo.cardType || ''
						this.computedPrice();
					})	
					.catch((err) => {
						console.error(err)
						uni.showToast({
							title: "အမှာစာဒေတာကိုတင်မရပါ",
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
						couponTitle: "ကူပွန်မရှိပါ",
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
				this.cardName = addressInfo.realName || '' // ရှင်းလင်းရေးသတင်းအချက်အလက်
				this.cardNumber = addressInfo.cardNumber || ''
				this.cardType = addressInfo.cardType || ''
				this.computedPrice();
			},
			createOrder() {
				let shipping_type = this.shipping_type;
				// if (this.mode == 'point' && this.orderPrice.payPrice > 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: 'အချက်များမလုံလောက်ပါ！'
				// 	})
				// 	return
				// }
				if (!this.active) {
					uni.showToast({
						title: "ကျေးဇူးပြု၍ ငွေပေးချေမှုစနစ်ကိုရွေးချယ်ပါ",
						icon: "none",
						duration: 2000
					});
					return;
				}
				if (!this.addressInfo.id && !this.shipping_type) {
					uni.showToast({
						title: "ကျေးဇူးပြု၍ ပို့ပေးသည့်လိပ်စာကိုရွေးပါ",
						icon: "none",
						duration: 2000
					});
					return;
				}

				uni.showLoading({
					title: "အမိန့်ထုတ်လုပ်ခြင်း"
				});
				let from = {};
				if (this.$deviceType == "app") {
					from.from = "app";
				}
				console.log(this.storeItems, this.systemStore);
				const couponId = this.mode == 'point' ? 0 : this.usableCoupon.map(v=>v.id).join(',') // အချက်များကုန်တိုက်သည်ကူပွန်များကိုမကျော်ဖြတ်နိုင်ပါ
				createOrder(this.orderGroupInfo.orderKey, {
						// cardNumber: this.cardNumber, // အကောက်ခွန်ရှင်းလင်းသူ၏အမည်နှင့် ID
						// cardName: this.cardName,
						// cardType: this.cardType,
						type: this.mode == 'point' ? 1 : 0, // ထုတ်ကုန်အတွက်အချက်များကိုထပ်မံပေးပို့ပါtype
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
						from: this.from,
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
								// H5ပေးဆောင်
								this.$yrouter.replace({
									path: "/pages/order/OrderDetails/index",
									query: {
										id: data.result.orderId
									}
								});
								setTimeout(() => {
									// location.href = data.result.jsConfig.mweb_url;
								}, 100);
								break;
							case "WECHAT_PAY":
								// အသေးစားအစီအစဉ်ငွေပေးချေမှု
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
								// APPပေးဆောင်
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
								// အောက်ဖော်ပြပါသည်မူလ WeChat ငွေပေးချေမှုနည်းလမ်းဖြစ်သည်，
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
								"အမိန့်ကိုဖန်တီးရန်မအောင်မြင်ပါ",
							icon: "none",
							duration: 2000
						});
					});
			}
		}
	};
</script>
