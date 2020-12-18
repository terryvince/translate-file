<style scoped lang="less">
	.geoPage {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 10000;
	}

	.product-con .store-info {
		margin-top: 0.2 * 100rpx;
		background-color: #fff;
	}

	.product-con .store-info .title {
		padding: 0 0.3 * 100rpx;
		font-size: 0.28 * 100rpx;
		color: #282828;
		height: 0.8 * 100rpx;
		line-height: 0.8 * 100rpx;
		border-bottom: 0.01 * 100rpx solid #f5f5f5;
	}

	.product-con .store-info .info {
		padding: 0 0.3 * 100rpx;
		height: 1.26 * 100rpx;
	}

	.product-con .store-info .info .picTxt {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.product-con .store-info .info .picTxt .pictrue {
		width: 0.76 * 100rpx;
		height: 0.76 * 100rpx;
		margin-right: 0.2 * 100rpx;
	}

	.product-con .store-info .info .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 0.06 * 100rpx;
	}

	.product-con .store-info .info .picTxt .text {
		flex: 1;
	}

	.product-con .store-info .info .picTxt .text .name {
		font-size: 0.3 * 100rpx;
		color: #282828;
	}

	.product-con .store-info .info .picTxt .text .address {
		font-size: 0.24 * 100rpx;
		color: #666;
		margin-top: 0.03 * 100rpx;
	}

	.product-con .store-info .info .picTxt .text .address .iconfont {
		color: #707070;
		font-size: 0.18 * 100rpx;
		margin-left: 0.1 * 100rpx;
	}

	.product-con .store-info .info .picTxt .addressBox {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.product-con .store-info .info .picTxt .addressBox .iconfont {
		font-size: 0.4 * 100rpx;
	}

	.product-con .store-info .info .picTxt .addressBox .addressTxt {
		font-size: 0.24 * 100rpx;
		color: #eb3729;
	}

	.product-con .store-info .praise {
		font-size: 0.28 * 100rpx;
		color: #808080;
	}

	.product-con .store-info .praise .iconfont {
		font-size: 0.28 * 100rpx;
	}

	.product-con .superior {
		background-color: #fff;
		margin-top: 0.2 * 100rpx;
	}

	.product-con .superior .title {
		height: 0.98 * 100rpx;
	}

	.product-con .superior .title image {
		width: 0.3 * 100rpx;
		height: 0.3 * 100rpx;
	}

	.product-con .superior .title .titleTxt {
		margin: 0 0.2 * 100rpx;
		font-size: 0.3 * 100rpx;
		background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		background-image: -webkit-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		background-image: -moz-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.product-con .superior .slider-banner {
		width: 6.9 * 100rpx;
		margin: 0 auto;
		padding-bottom: 0.2 * 100rpx;
	}

	.product-con .superior .slider-banner .list {
		width: 100%;
		padding-bottom: 0.2 * 100rpx;
	}

	.product-con .superior .slider-banner .list .item {
		width: 2.15 * 100rpx;
		margin: 0 0.22 * 100rpx 0.3 * 100rpx 0;
		font-size: 0.26 * 100rpx;
	}

	.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
		margin-right: 0;
	}

	.product-con .superior .slider-banner .list .item .pictrue {
		width: 100%;
		height: 2.15 * 100rpx;
	}

	.product-con .superior .slider-banner .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 0.06 * 100rpx;
	}

	.product-con .superior .slider-banner .list .item .name {
		color: #282828;
		margin-top: 0.12 * 100rpx;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet {
		background-color: #999;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet-active {
		background-color: #e93323;
	}

	.mask {
		-webkit-filter: blur(2px);
		-moz-filter: blur(2px);
		-ms-filter: blur(2px);
		filter: blur(2px);
	}

	.footer .icon-shoucang1 {
		color: #eb3729;
	}

	.product-con .product-intro .conter view {
		width: 100% !important;
	}

	.generate-posters {
		width: 100%;
		height: 1.7 * 100rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		transform: translate3d(0, 100%, 0);
		-webkit-transform: translate3d(0, 100%, 0);
		-ms-transform: translate3d(0, 100%, 0);
		-moz-transform: translate3d(0, 100%, 0);
		-o-transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		-webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		-moz-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		-o-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
	}

	.generate-posters.on {
		transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-o-transform: translate3d(0, 0, 0);
	}

	.generate-posters .item {
		flex: 50%;
		-webkit-flex: 50%;
		-ms-flex: 50%;
		text-align: center;
	}

	.generate-posters .item .iconfont {
		font-size: 0.8 * 100rpx;
		color: #5eae72;
	}

	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}

	.noscroll {
		height: 100%;
		overflow: hidden;
	}

	.gd-swiper {
		height: 500rpx;
		width: 100%;
	}

	.florid-blue {
		font-size: 24rpx;
		color: white;
		height: 100rpx;
		// background-color: linear-gradient(90deg,#6A77FF,#A779FF);

	}

	.list {
		padding: 0 30rpx;

		.list-item {
			position: relative;
			padding: 27rpx 0;
			display: flex;

			&.list-between {
				justify-content: space-between;
			}

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 1px;
				background-color: #F5F5F5;
				transform: scaleY(.5);
			}
		}
	}

	.arrow-atr {
		font-size: 22rpx !important;
		color: #B5B5B5 !important;
		display: flex;
		align-items: center;
	}

	.comment-box {
		padding: 40rpx 30rpx 56rpx;

		.avator {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
		}

		.comment-reply {
			flex: 1;
			padding: 33rpx 18rpx 57rpx;
			background-color: #F5F5F5;
		}
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

	.toBtn {
		justify-content: flex-end;
	}

	.btn-left {
		border-radius: 50rpx 0 0 50rpx;
	}

	.btn-right {
		border-radius: 0 50rpx 50rpx 0;
	}

	.btn-exchange {
		border-radius: 50rpx;
	}

	.bg-v5 {
		background: linear-gradient(90deg, #6A77FF, #A779FF);
	}

	.bg-v0 {
		background: linear-gradient(90deg, #71D676, #60CB56);
	}

	.bg-v1 {
		background: linear-gradient(90deg, #6A77FF, #A779FF);
		// background: linear-gradient(90deg, #0072FF, #45B2FF);
	}

	.bg-v2 {
		background: linear-gradient(90deg, #71D676, #60CB56);
	}

	.bg-v3 {
		background: linear-gradient(90deg, #34487A, #335593);
	}

	.bg-v4 {
		background: linear-gradient(90deg, #2C8AA0, #2C849D);
	}

	.bg-v6 {
		background: linear-gradient(90deg, #DBC59C, #C9A66E);
	}

	.pictrue {
		.image {
			width: 49%;
			margin-right: auto;
			margin-bottom: 10rpx;
		}
	}

	.style-type {
		padding: 0 8rpx;
		background-color: #fff;
		border-radius: 6rpx;
	}

	.style-receive {
		padding: 6rpx 16rpx;
		background-color: #64CE5E;
		border-radius: 10rpx;
	}
</style>
<template>
	<view :class="productConClass">
		<view v-if="storeInfo.id || storeInfo.id===0">

			<!-- 头部 -->
			<!-- <product-con-swiper :img-urls="storeInfo.sliderImageArr"></product-con-swiper> -->
			<!-- <swiper class="gd-swiper bg-white" :indicator-dots="true" :autoplay="false" :duration="1000" indicator-color="#FEF2F2"
			 indicator-active-color="#00A0E9">
				<swiper-item v-for="(url,i) in storeInfo.sliderImageArr" :key="i">
					<view class="swiper-item full">
						<image :src="url" class="full"></image>
					</view>
				</swiper-item>
			</swiper>
			<view :class="['florid-blue flex-main-center padding-beside-30', 'bg-v'+goodsType]"> -->

			<!-- swiper -->
			<product-con-swiper :img-urls="storeInfo.sliderImageArr" :theme-color="mode=='point'? '#00A0E9':'#64CE5E'"></product-con-swiper>
			

			<!-- 价格分享栏 -->
			<view :class="['florid-blue flex-main-center padding-beside-30', 'bg-v'+goodsType]">

			<!-- 价格分享栏 +level||0 vip等级没得了，先隐藏-->
			<!-- <view :class="['florid-blue flex-main-center padding-beside-30', 'bg-v0']"> -->
				<view class="meta-wrap flex-1">
					<!-- <view class="v-grade flex-main-start fs-32">
						<text>L{{level}}</text>
						<text class="left-10">会员价</text>
					</view> -->
					<view class="flex-main-between">
						<view class="flex-main-start flex-baseline">
							<text class="left-20 fs-28 color-type style-type" style="color: #6E77FF;" v-if="storeInfo.type===1">积分</text>
							<text class="left-20 fs-28 color-type style-type" v-if="storeInfo.type==2">精选</text>
							<text v-if="storeInfo.vipPrice && storeInfo.vipPrice > 0" class="left-20" style="font-size: 38rpx;">{{ mode=='point' ? `${storeInfo.vipPrice}积分` : `&yen;${storeInfo.vipPrice}` }}</text>
							<text class="fs-30 left-20 del-price-line" v-if="storeInfo.type!=1">原价{{ `&yen;${storeInfo.otPrice}` }}</text>
						</view>
						<!-- <view class="flex-main-start">
							<text>库存{{ storeInfo.stock }}{{ storeInfo.unitName }}</text>
							<text class="left-30">已售{{ storeInfo.sales }}{{ storeInfo.unitName }}</text>
						</view> -->
						<!-- <view class="share flex-main-end">
							<image @click="listenerActionSheet" src="../../../static/share.png" mode="widthFix" style="width:40rpx;"></image>
						</view> -->
						<view class="share flex-main-end relative">
							<button type="default" class="hide-full" @click="share()" open-type="share"></button>
							<image src="@/static/share.png" style="width:40rpx;height: 40rpx;"></image>
						</view>
					</view>
				</view>
			</view>

			<!-- 商品规格 -->
			<view class="wrapper over-hide">
				<view class="introduce txt-ellipsis row-2">{{ storeInfo.storeName }}</view>
				<view class="share flex-main-between line-top">
					<view>
						<text class="fs-24 color-number">运费：{{ tempName }}</text>
					</view>
					<view>
						<text class="fs-24 color-number">库存{{ storeInfo.stock }}{{ storeInfo.unitName }}</text>
						<text class="fs-24 color-number left-30">已售{{ storeInfo.sales }}{{ storeInfo.unitName }}</text>
					</view>
				</view>
				<view @click="selecAttrTap" class="list">
					<view class="list-item list-between">
						<text class="fs-28 color-text">数量选择</text>
						<view class="iconfont icon-jiantou arrow-atr"></view>
					</view>
				</view>
			</view>
			<view v-if="mode!='point'" class="attribute flex-main-between">
				<text class="fs-28 color-text">优惠券</text>
				<text @click="toCoupon()" class="fs-28 style-receive color-white">领取</text>
			</view>

			<!-- 新版评价 v-if="replyCount"-->
			<view class="top-15">
				<user-comment :reply="reply" :reply-count="replyCount" :reply-chance="replyChance" :product-id="storeInfo.productId||storeInfo.id"></user-comment>
			</view>
			<!-- <view class="user-comment bg-white top-20">
				<view class="list">
					<view class="list-item list-between" @click="goEvaluateList(id)">
						<text class="fs-28 color-text">商品评价（{{replyCount||0}}）</text>
						<view class="flex-main-start color-text fs-28">
							<text class="color-danger">{{replyChance}}%</text>
							<text>好评率</text>
							<view class="iconfont icon-jiantou arrow-atr"></view>
						</view>
					</view>
				</view>
				<view v-for="(item,i) in reply" :key="i" class="comment-box flex-main-between color-text line-top">
					<image :src="item.avatar" class="avator flex-none flex-item-align-start"></image>
					<view class="comment-info flex-1 left-15">
						<view class="flex-main-between">
							<text class="fs-28 txt-bold">{{item.nickname|nameFilter}}</text>
							<text class="color-gray fs-24">{{item.createTime}}</text>
						</view>
						<view class="width-full fs-24 top-20">
							{{item.comment}}
						</view>
						<view class="img-list top-20">
							<view class="pictrue flex flex-wrap" v-for="(itemn, eq) in item.picturesArr" :key="eq">
								<image :src="itemn" class="image" mode="widthFix" />
							</view>
						</view>
						<view v-show="item.merchantReplyContent" class="comment-reply fs-24 top-20">
							<text>掌柜回复：{{item.merchantReplyContent}}</text>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 店铺介绍 -->
			<!-- <view class="bg-white top-20 comment-box">
				<view class="flex-main-between">
					<view class="flex-main-start">
						<image class="avator flex-none" :src="shopInfo.headImage"></image>
						<text class="left-15 fs-34">{{shopInfo.name}}</text>
					</view>
					<view>
						<text @click="goShopManage()" class="fs-28 style-receive color-white">进入店铺</text>
					</view>
				</view>
				<view class="padding30 bg-gray top-20 boder-radius fs-24 color-text">
					{{shopInfo.content}}
				</view>
			</view> -->
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

			<!-- 占位 -->
			<view style="height:100rpx;"></view>
			
			<!-- 底部栏 -->
			<view class="footer acea-row row-between-wrapper">
				<!-- <block v-if="mode!='point'"> -->
				<!-- <view @click="goShoppingCart()" class="item animated bounceIn">
						<image src="../../../static/icon-shop.png" mode=""></image>
						<text>店鋪</text>
					</view> -->
				<view @click="goShopManage()" class="item relative">
					<!-- <view class="iconfont icon-shoucang1"></view> -->
					<image src="@/static/icon-shop.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>店鋪</text>
				</view>
				<!-- 					<view @click="goShoppingCart()" class="item animated" v-if="!animated">
						<view class="iconfont icon-gouwuche1">
							<text class="num bg-color-red" v-if="CartCount > 0">{{CartCount}}</text>
						</view>
						<text>购物车</text>
					</view> -->
				<!-- </block> -->
				<view class="item relative" @click="contactCustomer()">
					<button type="default" class="hide-full" open-type=""></button>
					<!-- <view class="iconfont icon-shoucang1"></view> -->
					<image src="@/static/gd-kefu.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>客服</text>
				</view>
				<view class="item" @click="setCollect" v-if="storeInfo.userCollect">
					<image src="@/static/icon-collection-hot.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>收藏</text>
				</view>
				<view class="item" @click="setCollect" v-if="!storeInfo.userCollect">
					<image src="@/static/icon-collection.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
					<text>收藏</text>
				</view>
				<view>
					<view v-if="goodsType===1" class="bnt acea-row toBtn">
						<view class="btn-exchange" style="background: linear-gradient(90deg, #6A77FF, #A779FF);" @click="tapExchange()">
							<text>立即兑换</text>
						</view>
					</view>
					<view v-else class="bnt acea-row">
						<view v-if="mode=='point'" style="background-color:#0972B9" class="btn-left" @click="joinCart">
							<text>加入购物车</text>
						</view>
						<view v-else class="btn-left" style="background-color: #72B0F6;" @click="joinCart">
							<text>加入购物车</text>
						</view>
						<view class="btn-right" style="background-color: #64CE5E;" @click="tapBuy()">
							<text>立即购买</text>
						</view>
					</view>
				</view>

			</view>
			
			<CouponPop v-on:changeFun="changeFun" :coupon="coupon"></CouponPop>
			<ProductWindow v-on:changeFun="changeFun" :attr="attr" :cartNum="cart_num" :type="storeInfo.type"></ProductWindow>
			<StorePoster v-on:setPosterImageStatus="setPosterImageStatus" :posterImageStatus="posterImageStatus" :posterData="posterData"
			 :goodId="id"></StorePoster>
			<ShareInfo v-on:setShareInfoStatus="setShareInfoStatus" :shareInfoStatus="shareInfoStatus"></ShareInfo>
			<view class="generate-posters acea-row row-middle on" v-if="posters">
				<view class="item" @click="setPosterImageStatus">
					<view class="iconfont icon-haibao"></view>
					<view>生成海报</view>
				</view>
			</view>
			<view class="generate-posters acea-row row-middle" v-if="!posters">
				<view class="item" @click="setPosterImageStatus">
					<view class="iconfont icon-haibao"></view>
					<view>生成海报</view>
				</view>
			</view>
			<view class="mask" @touchmove.prevent @click="listenerActionClose" v-show="posters"></view>
			<view class="posterCanvasWarp">
				<canvas class="posterCanvas" canvas-id="myCanvas"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	// import { swiper, swiperSlide } from "vue-awesome-swiper";

	import ProductConSwiper from "@/components/ProductConSwiper";
	import UserEvaluation from "@/components/UserEvaluation";
	import CouponPop from "@/components/CouponPop";
	import ProductWindow from "@/components/ProductWindow";
	import StorePoster from "@/components/StorePoster";
	import ShareInfo from "@/components/ShareInfo";
	import {
		getProductDetail,
		postCartAdd,
		getCartCount,
		getProductCode,
		getStoreInfo
	} from "@/api/store";
	import {
		getCoupon,
		getCollectAdd,
		getCollectDel,
		getUserInfo,
		addHistroy,
		bindSuperior
	} from "@/api/user";
	import {
		isWeixin,
		PosterCanvas,
		handleQrCode
	} from "@/utils";
	// import { wechatEvevt } from "@/libs/wechat";
	import {
		imageBase64
	} from "@/api/public";
	import {
		mapGetters
	} from "vuex";

	export default {
		name: "GoodsCon",
		components: {
			// swiper,
			// swiperSlide,
			ProductConSwiper,
			UserEvaluation,
			CouponPop,
			ProductWindow,
			StorePoster,
			ShareInfo
		},
		data: function() {
			return {
				// 原来的评价数据
				// testReply: [{
				// 	avatar: require('../../../static/images/logo.png'),
				// 	nickname: 'dsfsdf',
				// 	star: 3,
				// 	createTime: '2019-12-01 10:00:00',
				// 	sku: '商品',
				// 	comment: '真的不错哦！',
				// 	picturesArr: [require('../../../static/images/logo.png'), require('../../../static/images/logo.png')],
				// 	merchantReplyContent: '店员回复'
				// }],
				shareInfoStatus: false,
				weixinStatus: false,
				mapShow: false,
				mapKey: "",
				posterData: {
					image: "",
					title: "",
					price: "",
					code: ""
				},
				posterImageStatus: false,
				animated: false,
				coupon: {
					coupon: false,
					list: []
				},
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				isOpen: false, //是否打开属性组件
				productValue: [],
				id: 0,
				uid: 0,
				// 商品信息
				storeInfo: {},
				// 商品类型
				goodsType: 0,
				// 店铺信息
				shopInfo: {},
				couponList: [],
				attrTxt: "请选择",
				attrValue: "",
				cart_num: 1, //购买数量
				replyCount: "",
				replyChance: "",
				reply: [],
				priceName: 0,
				CartCount: 0,
				posters: false,
				banner: [{}, {}],
				swiperRecommend: {
					pagination: {
						el: ".swiper-pagination",
						clickable: true
					},
					autoplay: false,
					loop: false,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				goodList: [],
				systemStore: {},
				qqmapsdk: null,
				productConClass: "product-con",
				tempName: "全国包邮",
				mode: '',
			};
		},
		computed: mapGetters(["isLogin", "location"]),
		onLoad(options) {
			// console.log(options)
			if (options.scene) { // 处理扫码场景
				const scene = decodeURIComponent(options.scene)
				const params = scene.split("&")
				let ob = {}
				params.forEach(v => {
					let key = v.split('=')[0]
					let value = v.split('=')[1]
					ob[key] = value
				})
				this._route.query = ob
			}
			// console.log('onload:', options, this._route.query)
		},
		mounted: function() {
			let url = handleQrCode();
			console.log('mounted:url', url)
			// console.log('this._route.query:', this._route.query)
			if (url && (url.productId || url.id)) {
				this.id = url.productId || url.id
				this._route.query = url
			} else {
				this.id = this._route.query.id || this._route.query.productId;
			}
			this.mode = this._route.query.mode || ''
			this.productCon();
			// 如果不是积分商品则添加访问记录
			if (this.mode != 'point') {
				addHistroy({
					id: this.id
				}).catch(console.error)
			}
			// 获取vip等级
			// var userinfo = uni.getStorageSync('userInfo')
			// this.level = userinfo ? userinfo.level : 0
			// this.uid = userinfo ? userinfo.uid : 0
			// if (this._route.query.uid && this._route.query.uid != this.uid) { // 存在上级id,并且不是自己，发起上级绑定
			// 	bindSuperior({
			// 		spread: this._route.query.uid
			// 	}).then(() => console.log('绑定上级成功！')).catch(err => {
			// 		console.log('绑定上级失败：', err)
			// 	})
			// }
		},
		watch: {
			posterImageStatus(status) {
				// console.log(status);
				if (status) {
					this.productConClass = "noscroll product-con";
				} else {
					this.productConClass = "product-con";
				}
			}
		},
		onShareAppMessage() {
			return {
			  title: this.storeInfo.storeName,
			  path: `/pages/shop/GoodsCon/index?id=${this.$yroute.query.id}&time=${this.$yroute.query.time}&from=share&mode=${this.$yroute.query.mode}`
			};
		},
		methods: {
			// callPhone(number) {
			// 	if (!number) {
			// 		return;
			// 	}
			// 	uni.makePhoneCall({
			// 		phoneNumber: number
			// 	});
			// },
			bindShare(){
				// #ifdef H5
				this.wxReady.then(res=>{
					if(res){
						wx.updateAppMessageShareData({ // 分享到朋友
						    title: '', // 分享标题
						    desc: '', // 分享描述
						    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						    imgUrl: '', // 分享图标
						    success: function () {
						      // 设置成功
						    }
						  })
						wx.updateTimelineShareData({ // 分享到朋友圈和qq空间
						    title: '', // 分享标题
						    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						    imgUrl: '', // 分享图标
						    success: function () {
						      // 设置成功
						    }
						  })
					}
				}).catch(err=>{
					// console.log('',err)
				})
				// #endif
			},
			// 进入店铺
			goShopManage() {
				this.$yrouter.push({
					path: "/subpackage/shop/shop",
					query: {
						merId: this.storeInfo.merId
					}
				});
			},
			// goCustomerList() {
			// 	this.$yrouter.push({
			// 		path: "/pages/user/CustomerList/index"
			// 	});
			// },
			// goStoreList() {
			// 	this.$yrouter.push({
			// 		path: "/pages/shop/StoreList/index"
			// 	});
			// },
			// 领取优惠券
			toCoupon() {
				this.$yrouter.push({
					path: "/pages/user/coupon/GetCoupon/index",
					query: {
						'merId': this.shopInfo.id
					}
				})
			},
			// 用户评价
			goEvaluateList(id) {
				this.$yrouter.push({
					path: "/pages/shop/EvaluateList/index",
					query: {
						id
					}
				});
			},
			// showChang: function(data) {
			// 	this.$yrouter.push({
			// 		path: "/pages/map/index",
			// 		query: data
			// 	});
			// },
			updateTitle() {
				// document.title = this.storeInfo.storeName || this.$yroute.meta.title;
			},
			// 分享
			setShareInfoStatus: function() {
				this.shareInfoStatus = !this.shareInfoStatus;
				this.posters = false;
			},
			// shareCode: function() {
			// 	var that = this;
			// 	getProductCode(that.id).then(res => {
			// 		that.posterData.code = res.data.code;
			// 		that.listenerActionSheet();
			// 	});
			// },
			// 生成海报
			setPosterImageStatus: function() {
				this.posterImageStatus = !this.posterImageStatus;
				this.posters = false;
			},
			//产品详情接口；
			productCon: function() {
				let that = this;
				let from = this.location;
				if (this.$deviceType == "app") {
					from.from = "app";
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				getProductDetail(that.id, from)
					.then(res => {
						res.data.storeInfo.description = res.data.storeInfo.description.replace(
							/\<img/gi,
							'<img style="max-width:100%;height:auto;"'
						);
						that.$set(that, "storeInfo", res.data.storeInfo);
						// 商品类型
						that.$set(that, "goodsType", res.data.storeInfo.type);
						// 给 attr 赋值，将请求回来的规格赋值给 attr
						that.$set(that.attr, "productAttr", res.data.productAttr);
						that.$set(that, "productValue", res.data.productValue);
						that.$set(that, "replyCount", res.data.replyCount);
						that.$set(that, "replyChance", res.data.replyChance);
						that.$set(that, "reply", res.data.reply ? [res.data.reply] : [
							// {
							// 	avatar: require('@/static/images/logo.png'),
							// 	nickname: 'dsfsdf',
							// 	star: 3,
							// 	createTime: '2019-12-01 10:00:00',
							// 	sku: '商品',
							// 	comment: '真的不错哦！',
							// 	picturesArr: [require('@/static/images/logo.png'), require('@/static/images/logo.png')],
							// 	merchantReplyContent: '店员回复'
							// }
						]);
						that.$set(that, "priceName", res.data.priceName);
						that.$set(that, "tempName", res.data.tempName);
						that.posterData.image = that.storeInfo.image;
						if (that.storeInfo.storeName.length > 30) {
							that.posterData.title =
								that.storeInfo.storeName.substring(0, 30) + "...";
						} else {
							that.posterData.title = that.storeInfo.storeName;
						}
						that.posterData.price = that.storeInfo.price;
						that.posterData.code = that.storeInfo.codeBase;
						that.systemStore = res.data.systemStore;
						let good_list = res.data.goodList || [];
						let goodArray = [];
						let count = Math.ceil(good_list.length / 6);
						for (let i = 0; i < count; i++) {
							var list = good_list.slice(i * 6, 6);
							if (list.length)
								goodArray.push({
									list: list
								});
						}
						that.mapKay = res.data.mapKay;
						that.$set(that, "goodList", goodArray);
						// that.updateTitle();
						that.DefaultSelect();
						that.getCartCount();
						that.getStoreInfo();
					})
					.catch(err => {
						console.error(err)
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					})
					.finally(() => {
						uni.hideLoading();
					});

			},
			// 获取店铺信息
			getStoreInfo: function() {
				getStoreInfo(this.storeInfo.merId).then(res => {
					this.shopInfo = res.data;
				})
			},
			//默认选中属性；
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], "index", 0);
					value.push(productAttr[i].attrValueArr[0]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.sort().join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", value.sort().join(","));
					this.$set(this, "attrTxt", "已选择");
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.storeName
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
					this.$set(
						this.attr.productSelect,
						"unique",
						this.storeInfo.unique || ""
					);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			//购物车；
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length) {
					productSelect = this.attr.productSelect;
				}
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock);
						this.$set(this, "cart_num", stock);
					} else {
						this.$set(this.attr.productSelect, "cart_num", num.cart_num);
						this.$set(this, "cart_num", num.cart_num);
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					} else {
						this.$set(this.attr.productSelect, "cart_num", num.cart_num);
						this.$set(this, "cart_num", num.cart_num);
					}
				}
			},
			//将父级向子集多次传送的函数合二为一；
			changeFun: function(opt) {
				if (typeof opt !== "object") opt = {};
				let action = opt.action || "";
				let value = opt.value === undefined ? "" : opt.value;
				this[action] && this[action](value);
			},
			//打开优惠券插件；
			couponTap: function() {
				let that = this;
				that.coupons();
				that.coupon.coupon = true;
			},
			changecoupon: function(msg) {
				this.coupon.coupon = msg;
				this.coupons();
			},
			currentcoupon: function(res) {
				let that = this;
				that.coupon.coupon = false;
				that.$set(that.coupon.list[res], "is_use", true);
			},
			//可领取优惠券接口；
			coupons: function() {
				let that = this,
					q = {
						page: 1,
						limit: 20
					};
				getCoupon(q).then(res => {
					that.$set(that, "couponList", res.data || []);
					that.$set(that.coupon, "list", res.data);
				});
			},
			//打开属性插件；
			selecAttrTap: function() {
				this.attr.cartAttr = true;
				this.isOpen = true;
			},
			changeattr: function(msg) {
				// 修改了规格
				// console.log(msg);
				this.attr.cartAttr = msg;
				this.isOpen = false;
			},
			//选择属性；
			ChangeAttr: function(res) {
				// 修改了规格
				// console.log(res);
				let productSelect = this.productValue[res.value];
				if (productSelect) {
					this.attr.productAttr[res.indexw].index = res.indexn;
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res.value);
					this.$set(this, "attrTxt", "已选择");
				} else {
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			//收藏商品
			setCollect: function() {
				let that = this,
					id = that.storeInfo.id,
					category = "product";
				if (that.storeInfo.userCollect) {
					getCollectDel(id, category).then(function() {
						that.storeInfo.userCollect = !that.storeInfo.userCollect;
					});
				} else {
					getCollectAdd(id, category).then(function() {
						that.storeInfo.userCollect = !that.storeInfo.userCollect;
					});
				}
			},
			//  点击加入购物车按钮
			joinCart: function() {
				if (this.mode == 'point') {
					uni.showToast({
						icon: 'none',
						title: '积分商品不能加入哦'
					})
					return
				}
				//0=加入购物车
				this.goCat(0);
			},
			// 加入购物车；
			goCat: function(news) {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				//打开属性
				if (that.attrValue) {
					//默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
					that.attr.cartAttr = !that.isOpen ? true : false;
				} else {
					if (that.isOpen) that.attr.cartAttr = true;
					else that.attr.cartAttr = !that.attr.cartAttr;
				}
				//只有关闭属性弹窗时进行加入购物车
				if (that.attr.cartAttr === true && that.isOpen === false)
					return (that.isOpen = true);
				//如果有属性,没有选择,提示用户选择
				if (
					that.attr.productAttr.length &&
					productSelect === undefined &&
					that.isOpen === true
				) {
					uni.showToast({
						title: "产品库存不足，请选择其它",
						icon: "none",
						duration: 2000
					});
					return;
				}
				let q = {
					productId: that.id,
					cartNum: that.attr.productSelect.cart_num,
					new: news,
					uniqueId: that.attr.productSelect !== undefined ?
						that.attr.productSelect.unique : ""
				};
				postCartAdd(q)
					.then(function(res) {
						that.isOpen = false;
						that.attr.cartAttr = false;
						if (news) {
							that.$yrouter.push({
								path: "/pages/order/OrderSubmission/index",
								query: {
									id: res.data.cartId,
									mode: that.mode
								}
							});
						} else {
							uni.showToast({
								title: "添加购物车成功",
								icon: "success",
								duration: 2000,
								complete: () => {
									that.getCartCount(true);
								}
							});
						}
					})
					.catch(error => {
						that.isOpen = false;
						uni.showToast({
							title: error.msg,
							icon: "none",
							duration: 2000
						});
					});
			},
			//获取购物车数量
			getCartCount: function(isAnima) {
				let that = this;
				const isLogin = that.isLogin;
				if (isLogin) {
					getCartCount({
						numType: 0
					}).then(res => {
						that.CartCount = res.data.count;
						//加入购物车后重置属性
						if (isAnima) {
							that.animated = true;
							setTimeout(function() {
								that.animated = false;
							}, 500);
						}
					});
				}
			},
			//立即购买；
			tapBuy: function() {
				//  1=直接购买
				this.goCat(1);
			},
			//立即兑换
			tapExchange: function() {
				this.goCat(1);
			},
			listenerActionSheet: function() {
				if (isWeixin() === true) {
					this.weixinStatus = true;
				}
				this.posters = true;
			},
			listenerActionClose: function() {
				this.posters = false;
			},
			share(){
				// #ifdef MP
				return;
				// #endif
				// #ifdef H5
					// to do
				// #endif
			},
			// 联系客服
			contactCustomer() {
				let H5Sign,wechatSign;
				this.shopInfo.list.forEach(function (item) {
				    if (item.channelName == "小程序插件") {
						wechatSign = item.webSign;
				    }
					if (item.channelName == "网站-h5") {
						H5Sign = item.webSign;
					}
				    console.log(item);
				});
				
				// #ifdef H5
				if(H5Sign == undefined){
					H5Sign = "37ef9b97db7501c277179ebc1ab5b833cab53aa7491a67bfd430360aa1062ff0008e6c2a431b73b8d72d09514207ad87907925a2"
				}
				location.href =
					'https://yzf.qq.com/xv/web/static/chat/index.html?sign=' + H5Sign
				// #endif
				// #ifndef H5
				this.$yrouter.push({
					path: "/subpackage/chat/chat",
					query: {
						sign: wechatSign,
					}
				});
				// #endif
			},
		}
	};
</script>
