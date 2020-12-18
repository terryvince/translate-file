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

		<!-- 价格分享栏 -->
		<view class='florid-box flex-main-center padding-beside-30 bg-v0'>
			<view class="meta-wrap flex-1">
				<view class="flex-main-between">
					<view class="flex-main-start flex-baseline">
						<text class="left-20 fs-28 color-orange style-type">秒杀</text>
						<text class="fs-36 left-20">￥</text>
						<text style="font-size: 38rpx;">{{ storeInfo.price }}</text>
						<text class="fs-30 left-20 del-price-line">原价{{ `&yen;${storeInfo.otPrice}` }}</text>
					</view>
					<view class="flex-main-start">
						<count-down :isDay="false" :tipText="false" :dayText="false" :hourText="' : '" :minuteText="' : '" :secondText="false"
						 :datatime="datatime"></count-down>
						<view class="share flex-main-end relative left-20">
							<button type="default" class="hide-full" @click="share()" open-type="share"></button>
							<!-- @click="setPosterImageStatus" 生成海报 -->
							<image src="@/static/share.png" style="width:40rpx;height: 40rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品属性 -->
		<view class="list bg-white">
			<view class="txt-bold fs-32 txt-ellipsis row-2 line-down" style="padding: 38rpx 20rpx 32rpx;" v-text="storeInfo.title"></view>
			<view class="list-item list-item-between fs-24 txt-medium color-number line-down">
				<text>运费：{{storeInfo.isPostage==1?'包邮':storeInfo.postage+'元'}}</text>
				<view>
					<text>库存{{storeInfo.stock}}{{storeInfo.unitName}}</text>
					<text class="left-30">已售{{storeInfo.sales}}{{storeInfo.unitName}}</text>
				</view>
			</view>
			<view @click="selecAttrTap" class="list-item list-item-between">
				<text class="color-text txt-medium">数量选择</text>
				<text class="iconfont icon-jiantou fs-24 color-gray"></text>
			</view>
		</view>

		<!-- 新版评价 v-if="replyCount"-->
		<view class="top-20">
			<user-comment :reply="reply" :reply-count="replyCount" :reply-chance="replyChance" :product-id="storeInfo.productId"></user-comment>
		</view>

		<!-- 店铺介绍 -->
		<shop-intro v-if="shopInfo" :shop-info="shopInfo"></shop-intro>

		<!-- 新版产品介绍 -->
		<view class="bg-white">
			<view class="flex-main-center">
				<view class="gd-title fs-32 color-text">商品详情</view>
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
        <view>客服</view>
      </view> -->
		<!-- <view class="bnt bg-danger" @click="tapBuy">立即购买</view>
    </view> -->

		<view class="footer flex-main-between">
			<view class="flex-main-start flex-1">
				<view @click="goShopManage()" class="item relative">
					<image src="@/static/icon-shop.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>店铺</text>
				</view>
				<view class="item relative" style="margin-left: 43rpx;">
					<button type="default" class="hide-full" open-type="contact"></button>
					<image src="@/static/gd-kefu.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>客服</text>
				</view>
			</view>
			<view class="bnt acea-row flex-none">
				<view @click="tapBuy" class="btn-right" style="background:linear-gradient(0deg,#FF9322,#FFB435);">
					<text>立即秒杀</text>
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
					// 	sku: '商品',
					// 	comment: '真的不错哦！',
					// 	picturesArr: [require('@/static/images/logo.png'), require('@/static/images/logo.png')],
					// 	merchantReplyContent: '店员回复'
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
				}).then(getStoreInfo).then(res => { // 椅子的店铺id为0，取到的数据为null
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
			//将父级向子集多次传送的函数合二为一；
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
