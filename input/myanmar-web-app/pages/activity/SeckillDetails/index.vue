<style scoped lang="less">
	.product-con .nav {
  padding: 0 0.2*100rpx;
}
.product-con .footer .bnt {
    width: auto;
}
.style-type{
	padding:0 8rpx;
	background-color: #fff;
	border-radius: 6rpx;
}
.bg-v0{
	background:linear-gradient(90deg,#FF9322,#FFC13D);
}
.florid-box{
	font-size: 24rpx;
	color: white;
	height: 100rpx;
}

.avatar-wrap{
	width: 118rpx;
	height: 118rpx;
}

.gd-intro {
	padding: 64rpx 0 38rpx;
}

.gd-title {
	font-weight: bold;
	text-align: center;
	width: 280rpx;
	background: url('@/static/images/gd-detail-bg.png')no-repeat center;
	background-size: 280rpx 4rpx;
}

.btn-right {
	border-radius: 50rpx;
}
count-down::v-deep .styleAll{
	padding: 0 7rpx;
	font-size: 22rpx;
	color: #FFBD3B;
	background-color: #fff;
	border-radius: 4rpx;
}
</style>
<template>
	<view :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']" v-show="domStatus">
		<product-con-swiper :imgUrls="imgUrls" themeColor="#FFA72E"></product-con-swiper>

		<!-- စျေးနှုန်းခွဲဝေမှုဘား -->
		<view class='florid-box flex-main-center padding-beside-30 bg-v0'>
			<view class="meta-wrap flex-1">
				<view class="flex-main-between">
					<view class="flex-main-start flex-baseline">
						<text class="left-20 fs-28 color-orange style-type">ဆူး</text>
						<text class="fs-36 left-20">￥</text>
						<text style="font-size: 38rpx;">{{ storeInfo.price }}</text>
						<text class="fs-30 left-20 del-price-line">မူလစျေးနှုန်း{{ `&yen;${storeInfo.otPrice}` }}</text>
					</view>
					<view class="flex-main-start">
						<count-down :isDay="false" :tipText="false" :dayText="false" :hourText="' : '" :minuteText="' : '" :secondText="false"
						 :datatime="datatime"></count-down>
						<view class="share flex-main-end relative left-20">
							<button type="default" class="hide-full" @click="share()" open-type="share"></button>
							<!-- @click="setPosterImageStatus" ပိုစတာထုတ်လုပ်ရန် -->
							<image src="@/static/share.png" mode="widthFix" style="width:40rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- ကုန်စည် attribute တွေ -->
		<view class="list bg-white">
			<view class="txt-bold fs-32 txt-ellipsis row-2 line-down" style="padding: 38rpx 20rpx 32rpx;" v-text="storeInfo.title"></view>
			<view class="list-item list-item-between fs-24 txt-medium color-number line-down">
				<text>သင်္ဘောဖြင့်ကုန်ပစ္စည်းပို့ခြင်း：{{storeInfo.isPostage==1?'အခမဲ့ပို့ပေးသည်':storeInfo.postage+'ယွမ်'}}</text>
				<view>
					<text>ကုန်ပစ္စည်းလက်ဝယ်ရှိ{{storeInfo.stock}}{{storeInfo.unitName}}</text>
					<text class="left-30">ရောင်းချခဲ့သည်{{storeInfo.sales}}{{storeInfo.unitName}}</text>
				</view>
			</view>
			<view @click="selecAttrTap" class="list-item list-item-between">
				<text class="color-text txt-medium">အရေအတွက်ရွေးချယ်ရေး</text>
				<text class="iconfont icon-jiantou fs-24 color-gray"></text>
			</view>
		</view>

		<!-- သုံးသပ်ချက်အသစ် v-if="replyCount"-->
		<view class="top-20">
			<user-comment :reply="reply" :reply-count="replyCount" :reply-chance="replyChance" :product-id="storeInfo.productId"></user-comment>
		</view>

		<!-- မိတ်ဆက်မိတ်ဆက် -->
		<shop-intro v-if="shopInfo" :shop-info="shopInfo"></shop-intro>

		<!-- ထုတ်ကုန်အသစ်မိတ်ဆက် -->
		<view class="bg-white">
			<view class="flex-main-center">
				<view class="gd-title fs-32 color-text">ကုန်ပစ္စည်းအသေးစိတ်</view>
			</view>
			<view class="width-full">
				<rich-text :nodes="storeInfo.description"></rich-text>
			</view>
			<!-- <view class="width-full" v-html=""></view> -->
		</view>

		<view style="height:100rpx;"></view>

		<!-- <view class="footerRush acea-row row-between-wrapper"> -->
		<!-- <view
        class="customerSer acea-row row-center-wrapper row-column"
        @click="routerGo()"
      >
        <view class="iconfont icon-kefu"></view>
        <view>ဧည့်ဝန်ဆောင်မှု</view>
      </view> -->
		<!-- <view class="bnt bg-danger" @click="tapBuy">အခုဝယ်ပါ</view>
    </view> -->

		<view class="footer flex-main-between">
			<view class="flex-main-start flex-1">
				<view @click="goShopManage()" class="item relative">
					<image src="@/static/icon-shop.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>ဆိုင်</text>
				</view>
				<view class="item relative" style="margin-left: 43rpx;">
					<button type="default" class="hide-full" open-type="contact"></button>
					<image src="@/static/gd-kefu.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>ဧည့်ဝန်ဆောင်မှု</text>
				</view>
			</view>
			<view class="bnt acea-row flex-none">
				<view @click="tapBuy" class="btn-right" style="background:linear-gradient(0deg,#FF9322,#FFB435);">
					<text>ချက်ချင်းသတ်ပစ်</text>
				</view>
			</view>
		</view>

		<ProductWindow v-on:changeFun="changeFun" :attr="attr" :cartNum="cartNum"></ProductWindow>
		<StorePoster v-on:setPosterImageStatus="setPosterImageStatus" :posterImageStatus="posterImageStatus" :posterData="posterData"></StorePoster>
	</view>
</template>
<style scoped lang="less">
	.noscroll {
		height: 100%;
		overflow: hidden;
	}
</style>
<script>
	import ProductConSwiper from "@/components/ProductConSwiper";
	import CountDown from "@/components/CountDown";
	import ProductWindow from "@/components/ProductWindow";
	import StorePoster from "@/components/StorePoster";
	import {
		getSeckillDetail
	} from "@/api/activity";
	import {
		postCartAdd,
		getStoreInfo
	} from "@/api/store";
	import {
		imageBase64
	} from "@/api/public";
	import {
		parseRoute
	} from "@/utils"
	const NAME = "SeckillDetails";

	export default {
		name: "SeckillDetails",
		components: {
			ProductConSwiper,
			CountDown,
			ProductWindow,
			StorePoster
		},
		props: {},
		data: function() {
			return {
				domStatus: false,
				posterData: {
					image: "",
					title: "",
					price: "",
					code: ""
				},
				posterImageStatus: false,
				action: "",
				imgUrls: [],
				storeInfo: [],
				replyCount: 0,
				reply: [],
				cartNum: 1,
				shopInfo: {},
				attr: {
					cartAttr: false,
					productSelect: {
						image: "",
						store_name: "",
						price: "",
						stock: "",
						unique: "",
						cart_num: 1
					}
				},
				datatime: 0
			};
		},
		watch: {
			$yroute: function(n) {
				var that = this;
				if (n.name === NAME) {
					that.mountedStart();
				}
			}
		},
		mounted: function() {
			this.mountedStart();
		},
		onShareAppMessage() {
			return {
				title: this.storeInfo.title,
				path: `/pages/activity/SeckillDetails/index?id=${this.$yroute.query.id}&time=${this.$yroute.query.time}&from=share&mode=${this.$yroute.query.mode}`
			}
		},
		methods: {
			share() {
				// #ifdef MP
				return;
				// #endif
				// #ifdef H5
				// to do
				// #endif
			},
			goShopManage() {
				this.$yrouter.push({
					path: "/subpackage/shop/shop",
					query: {
						merId: this.storeInfo.merId
					}
				});
			},
			routerGo(item) {
				this.$yrouter.push({
					path: '/pages/user/CustomerList/index'
				})
			},
			mountedStart: function() {
				var that = this;
				let id = that.$yroute.query.id;
				that.datatime = parseInt(that.$yroute.query.time);
				getSeckillDetail(id).then(res => {
					res.data.storeInfo.otPrice = (+res.data.storeInfo.otPrice).toFixed(2)
					res.data.storeInfo.description = res.data.storeInfo.description.replace(
						/\<img/gi,
						'<img style="max-width:100%;height:auto;"'
					);
					that.$set(that, "storeInfo", res.data.storeInfo);
					that.$set(that, "imgUrls", res.data.storeInfo.sliderImageArr);
					that.$set(that, "reply", res.data.reply ? [res.data.reply] : [
					// 	{
					// 	avatar: require('@/static/images/logo.png'),
					// 	nickname: 'dsfsdf',
					// 	star: 3,
					// 	createTime: '2019-12-01 10:00:00',
					// 	sku: 'ကုန်ပစ္စည်း',
					// 	comment: 'တကယ်ကောင်းတယ်！',
					// 	picturesArr: [require('@/static/images/logo.png'), require('@/static/images/logo.png')],
					// 	merchantReplyContent: 'စာရေးပြန်ကြားချက်'
					// },
					]);
					that.$set(that, "replyCount", res.data.replyCount);
					that.$set(that, "replyChance", res.data.replyChance);
					that.posterData.image = that.storeInfo.image_base;
					that.updateTitle();
					if (that.storeInfo.title.length > 30) {
						that.posterData.title = that.storeInfo.title.substring(0, 30) + "...";
					} else {
						that.posterData.title = that.storeInfo.title;
					}
					that.posterData.price = that.storeInfo.price;
					that.posterData.code = that.storeInfo.code_base;
					that.setProductSelect();
					that.domStatus = true;
					return Promise.resolve(res.data.storeInfo.merId)
				}).then(getStoreInfo).then(res => { // ကုလားထိုင်ဆိုင်idအဘို့0，ရရှိသောအချက်အလက်များမှာnull
					this.shopInfo = res.data
				});
			},
			updateTitle() {
				// document.title = this.storeInfo.title || this.$yroute.meta.title;
			},
			setPosterImageStatus: function() {
				// var sTop = document.body || document.documentElement;
				// sTop.scrollTop = 0;
				this.posterImageStatus = !this.posterImageStatus;
			},
			//မိဘမှအစုအဝေးတစ်ခုသို့လွှဲပြောင်းမှုအမျိုးမျိုး၏လုပ်ဆောင်ချက်များကိုတစ်ခုသို့ပေါင်းစပ်ပါ；
			changeFun: function(opt) {
				if (typeof opt !== "object") opt = {};
				let action = opt.action || "";
				let value = opt.value === undefined ? "" : opt.value;
				this[action] && this[action](value);
			},
			changeattr: function(res) {
				var that = this;
				that.attr.cartAttr = res;
			},
			ChangeCartNum: function(res) {
				var that = this;
				if (res) {
					if (that.attr.productSelect.cart_num < that.storeInfo.stock) {
						that.attr.productSelect.cart_num++;
						this.cartNum++;
					}
				} else {
					if (that.attr.productSelect.cart_num > 1) {
						that.attr.productSelect.cart_num--;
						this.cartNum--;
					}
				}
			},
			setProductSelect: function() {
				var that = this;
				var attr = that.attr;
				attr.productSelect.image = that.storeInfo.image;
				attr.productSelect.store_name = that.storeInfo.title;
				attr.productSelect.price = that.storeInfo.price;
				attr.productSelect.stock = that.storeInfo.stock;
				attr.cartAttr = false;
				that.$set(that, "attr", attr);
			},
			selecAttrTap: function() {
				this.attr.cartAttr = true;
			},
			tapBuy: function() {
				var that = this;
				if (that.attr.cartAttr == false) {
					that.attr.cartAttr = !this.attr.attrcartAttr;
				} else {
					var data = {};
					data.productId = that.storeInfo.productId;
					data.cartNum = that.attr.productSelect.cart_num;
					data.uniqueId = that.attr.productSelect.unique;
					data.secKillId = that.storeInfo.id;
					data.new = 1;
					postCartAdd(data)
						.then(res => {
							that.$yrouter.push({
								path: "/pages/order/OrderSubmission/index",
								query: {
									id: res.data.cartId
								}
							});
						})
						.catch(err => {
							uni.showToast({
								title: err.msg || err.response.data.msg || err.response.data.message,
								icon: 'none',
								duration: 2000
							});
						});
				}
			}
		}
	};
</script>
