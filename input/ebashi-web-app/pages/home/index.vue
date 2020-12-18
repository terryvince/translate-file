<!-- page 样式不能写在scope下 -->
<style lang="less">
	page{
		background: #F6F6F6;
	}
</style>
<style scoped lang="less">
	.index {
		background-color: #F6F6F6;
		padding-bottom: 30rpx;
	}

	.fixed-header {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;
		box-shadow: 0 0 20rpx -10rpx #aaa;

		&+.fixed-header-box {
			height: 98rpx
		}
	}
	.color-black{
		color: #010001;
	}
	.color-reddish-brown{
		color: #C33725;
	}
	.notice{
		height: 110rpx;
		margin-bottom: 6rpx;
		background: white;
		padding-left: 24rpx;
		border-radius:20rpx 20rpx 0px 0px;
	}
	uni-notice-bar::v-deep .uni-noticebar{
		margin-bottom: 0!important;
	}
	.nav{
		background: white;
		margin: 0 20rpx;
		border-radius: 20rpx;
	}
	.top-20{
		margin-top: 20rpx;
	}
	.fixed-header{
		background-color: #EFEDEB;
		box-shadow: none;
	}
	// .title{
	// 	position: relative;
	// 	padding:45rpx 0;
	// 	&::after,&::before{
	// 		content: '';
	// 		width: 11rpx;
	// 		height: 11rpx;
	// 		background: #2C2C2C;
	// 		transform: rotateZ(45deg);
	// 		position: absolute;
	// 		top: 0;
	// 		bottom: 0;
	// 		margin: auto 0;
	// 	}
	// 	&::after{
	// 		right: -30rpx;
	// 	}
	// 	&::before{
	// 		left: -30rpx;
	// 	}
	// }
	goods-list::v-deep .goods-list{
		padding:0rpx 25rpx 54rpx;
	}
	.lottery-img{
		width: 648rpx;
		height: 639rpx;
	}
	.home-close{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		margin-bottom: -62rpx;
	}
	// banner
	.index .banner swiper,.index .banner image {
		border-radius: 20rpx;
	    height: 304rpx;
	}
	.slider-banner{
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0 0rpx;
	}
	.swiper-item {
		height: 100%;
	}
	.slider-banner.banner{
	  padding: 0 20rpx 0rpx;
	  height: auto;
	}
	
	.icon-notify{
		width: 33rpx;
		height: 33rpx;
		background: url(https://res.chunghengtrade.com/icon-notify.png)no-repeat center;
		background-size: 100%;
		margin-left: 20rpx;
	}
	.image-activity{
		width: 138rpx;
		height: auto;
	}
	.home-title{
		padding:45rpx 0;
		width: 210rpx;
	}
	.color-placeholder{
		color: #909090;
	}
	.y-line{
		width: 2rpx;
		height: 24rpx;
		background-color: #909090;
	}
	
	.group-list{
		min-height: 400rpx;
		background: url(https://res.sdebs.com/index-bg-green.png) no-repeat left top,#fff;
		background-size: 100% 280rpx;
		padding: 48rpx 20rpx 28rpx;
		border-radius: 20rpx;
	}
	.group-title-img{
		width: 29rpx;
		height: 29rpx;
	}
	.seckill-title-img{
		width: 31rpx;
		height: 31rpx;
	}
	.seckill-list{
		min-height: 400rpx;
		background: url(https://res.sdebs.com/index-bg-red.png)no-repeat left top,#fff;
		background-size: 100% 250rpx;
		padding: 54rpx 20rpx 28rpx;
		border-radius: 20rpx;
	}
	.pick-more{
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	[v-cloak]{
		display: none;
	}
	.countdown-item{
		width: 31rpx;
		height: 27rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border-radius: 4rpx;
	}
</style>
<template>
	<view class="index" v-cloak>
		<!-- 搜索栏 -->
		<view class="fixed-header" style="height: 86rpx;">
			<search-bar></search-bar>
		</view>
		
		<!-- 搜索栏占位 -->
		<view class="fixed-header-box"></view>
		<!-- banner -->
		<view class="slider-banner banner">
			<swiper indicatorDots="true" v-if="banner.length > 0" autoplay circular>
				<block v-for="(item, bannerIndex) in banner" :key="bannerIndex">
					<swiper-item>
						<view @click="goRoll(item)" class="swiper-item">
							<image :src="item.pic"/>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<!-- 间隙文字 -->
		<features-text></features-text>
		
		<!-- 导航 -->
		<view class="nav acea-row">
			<view @click="goWxappUrl(item)" class="item" v-for="(item, menusIndex) in menus" :key="menusIndex">
				<view class="pictrue">
					<image :src="item.pic" />
				</view>
				<view>{{ item.name }}</view>
			</view>
		</view>
		
		<coupon-list :is-home='true'></coupon-list>
		<!-- <Coupon-window :coupon-list="couponList" v-if="showCoupon" @checked="couponClose" @close="couponClose"></Coupon-window> -->
		
		<!-- 通知 -->
		<!-- <view class="notice flex-main-between top-20">
			<view class="fs-34 txt-bold txt-italic flex-none">
				<image src="https://res.chunghengtrade.com/title-avtivity.png" mode="widthFix" class="image-activity"></image>
			</view>
			<text class="y-line gray flex-none" style="height:45rpx;margin-left:20rpx"></text>
			<view class="icon-notify"></view>
			<uni-notice-bar class="flex-1" scrollable="true" @click="goRoll(singNew)" color="#212121" single="true" speed="10" :showIcon="false" :text="singNew.info" background-color="#fff"></uni-notice-bar>
		</view> -->
		
		<!-- 分类 加一个flex容器，方便模块间排序 -->
		<view class="flex flex-wrap padding-beside-20">
		<!-- 限时折扣 -->
			<!-- <view v-if="discountList.length>0" class="discount-goods flex-1" style="order:0">
				<view class="flex-main-center">
					<image src="https://res.chunghengtrade.com/home-title-2.png" class="home-title" mode="widthFix"></image>
				</view>
				<goods-list from="seckill" :list="discountList"></goods-list>
			</view> -->
			<!-- 精选商品新版 -->
			<view v-if="pickList.length > 0" class="choice-goods x-line gray flex-1" :style="{order:sort.selectedNum}">
				<view class="flex-main-center relative">
					<image src="https://res.sdebs.com/text-pick-goods.png" class="home-title" mode="widthFix"></image>
					<view @click="goPickGoods()" class="pick-more fs-20 color-text-secondary flex-main-start">
						<text class="fs-22">更多</text>
						<view class="iconfont icon-jiantou fs-20"></view>
					</view>
				</view>
				<goodsList :list="pickList"></goodsList>
			</view>
			
			<!-- 团购 无字段-->
			<view v-if="combinationList.length" class="group-list top-30 flex-1" :style="{order:sort.groupNum}">
				<view class="group-title flex-main-between color-white" style="margin-bottom: 51rpx;">
					<view class="flex-main-start fs-34 txt-heavy">
						<image src="https://res.sdebs.com/icon-mark.png" class="group-title-img"></image>
						<text class="left-10 lh-1">商品团购</text>
					</view>
					<view class="flex-main-start fs-20" @click="goGroupList()">
						<text class="txt-bold fs-22">更多</text>
						<view class="iconfont icon-jiantou fs-20 left-5"></view>
					</view>
				</view>
				<goodsList :list="combinationList" from="group"></goodsList>
			</view>
			
			<!-- 秒杀 -->
			<view v-if="discountList.length>0" class="seckill-list top-30 flex-1" :style="{order:sort.seckillNum}">
				<view class="seckill-title flex-main-between color-white" style="margin-bottom: 42rpx;">
					<view class="flex-main-start">
						<image src="http://qj5wtf3w8.hn-bkt.clouddn.com/icon-clock.png" class="seckill-title-img"></image>
						<text class="fs-34 txt-heavy left-10 lh-1">商品秒杀</text>
						<view class="count-down left-15 color-black flex-main-start txt-heavy fs-20">
							<text class="countdown-item">{{countdown.hour}}</text>
							<text style="margin: 0 5rpx;">:</text>
							<text class="countdown-item">{{countdown.minute}}</text>
							<text style="margin: 0 5rpx;">:</text>
							<text class="countdown-item">{{countdown.second}}</text>
						</view>
					</view>
					<view class="flex-main-start fs-20" @click="goSeckillList()">
						<text class="txt-bold fs-22">更多</text>
						<view class="iconfont icon-jiantou fs-20 left-5"></view>
					</view>
				</view>
				<goodsList :list="discountList" from="seckill"></goodsList>
			</view>
		</view>
		
		<!-- 抽奖弹框 -->
		<view :class="['modal-shadow modal-content-center',isShowLottery ? 'visible' : '']">
			<view class="relative" @click.stop="()=>false">
				<image @click="goLotteryType()" :src="$img_lottery" class="lottery-img" mode="widthFix"></image>
				<image @click="isShowLottery=false" src="../../static/icon-close-white.png" class="home-close" mode="widthFix" style="width: 44rpx;"></image>
			</view>
		</view>
	</view>
</template>
<script>
	// import { swiper, swiperSlide } from "vue-awesome-swiper";
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	// import GoodsList from '@/components/goodsList/goodsList';
	import { getSeckillConfig, getSeckillList,queryLotteryDialog,getCombinationList } from "@/api/activity";
	import {getModuleOrder} from '@/api/public.js'
	import { getProducts } from "@/api/store";
	import {countDown} from "../../utils/utils.js";
	// import GoodList from '@/components/GoodList';
	// import PromotionGood from '@/components/PromotionGood';
	import CouponWindow from '@/components/CouponWindow';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		getHomeData,
		getShare
	} from '@/api/public';
	import {
		bindSuperior
	} from "@/api/user";
	import cookie from '@/utils/store/cookie';
	import {
		isWeixin,
		handleUrlParam
	} from '@/utils/index';

	const HAS_COUPON_WINDOW = 'has_coupon_window';

	export default {
		name: 'Index',
		components: {
			// swiper,
			// swiperSlide,
			uniNoticeBar,
			// GoodList,
			// PromotionGood,
			CouponWindow,
			// GoodsList
		},
		props: {},
		data: function() {
			return {
				$img_lottery:'home-lottery-dialog1.png',
				// $img_url : '哈哈',
				discountList:[],
				showCoupon: true,
				logoUrl: '',
				banner: [],
				menus: [],
				roll: [],
				activity: [],
				activityOne: {},
				bastList: [], // 旧版精选商品列表
				pickList: [], // 新版精选商品列表
				firstList: [],
				info: {
					fastList: [],
					bastBanner: [],

					bastList: []
				},
				likeInfo: [],
				lovely: [],
				benefit: [],
				couponList: [],
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperRoll: {
					direction: 'vertical',
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperScroll: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true
				},
				swiperBoutique: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperProducts: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true
				},
				params:{
					page: 1,
					limit: 4,
					type: 2 // 0 普通商品 1积分商品 2精选商品
				},
				isShowLottery:false,
				countdown: {},
				combinationList:[],
				sort:{}
			};
		},
		  computed:{
    singNew() {
      return this.roll.length > 0 ? this.roll[0] : "你还没添加通知哦！";
    }
  },
		onLoad(options){
			if (options.scene) { // 处理扫码场景
				const scene = decodeURIComponent(options.scene)
				console.log('scene:',scene)
				const params = scene.split("&")
				let ob = {}
				params.forEach(v => {
					let key = v.split('=')[0]
					let value = v.split('=')[1]
					ob[key] = value
				})
				if(cookie.get('login_status')){ // 已登录的情况直接绑定分销的推广id
					bindSuperior({
						spread:ob.uid
					}).catch(err=>console.error('推广id绑定失败：',err))
					return;
				}
				cookie.set('spread',ob.uid) // 未登录情况由授权的时候绑定推广id
			}
			// 查询弹框
			// queryLotteryDialog().then(({data})=>{
			// 	this.isShowLottery = data
			// }).catch(console.error)
		},
		onShow: function() {
			this.getLocation()
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			let count=0
			getHomeData().then(res => {
				that.logoUrl = res.data.logoUrl;
				that.$set(that, 'banner', res.data.banner);
				that.$set(that, 'menus', res.data.menus);
				that.$set(that, 'roll', res.data.roll);
				that.$set(that, 'info', res.data.info);
				that.$set(that, 'firstList', res.data.firstList);
				that.$set(that, 'bastList', res.data.bastList);
				that.$set(that, 'likeInfo', res.data.likeInfo);
				that.$set(that, 'lovely', res.data.lovely);
				that.$set(that, 'benefit', res.data.benefit);
				that.$set(that, 'couponList', res.data.couponList || []);
				that.setOpenShare();
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})

			// 限时折扣同秒杀抢购
			let limitTime = 0 // 限时折扣的停止时间，同秒杀的stop
			getSeckillConfig().then(({data})=>{
				let item = data.seckillTime.find(v=>v.status===1)
				limitTime = item.stop   // 可能不存在，	
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					this.countdown = countDown(new Date(item.stop*1000))
				},1000);
				this.$once('hook:beforeDestroy',clearInterval.bind(window,this.timer));
				return getSeckillList(item.id,{page:1,limit:4,isHome:1})
			}).then(({data})=>{
				data.forEach(v=>v.stop=limitTime) // 给商品加上结束时间，方便goodsList组件跳详情用
				this.discountList = data
			}).catch(err=>{
				console.error('拉取限时折扣列表发生错误',err)
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})
			
			// 精选商品
			getProducts({...this.params,isHome:1}).then(res=>{
				this.pickList = res.data
			}).catch(err => {
				console.error("获取精选商品列表发生错误！",err)
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})
			
			// 团购
			getCombinationList({ page: 1, limit: 4,isHome:1 }).then(res => {
				this.combinationList = res.data
			});
			
			getModuleOrder().then(res=>{
				this.sort = res.data
			})
		},
		methods: {
			...mapActions(["getLocation"]),
			goSeckillList(){
				this.$yrouter.push({
					path: '/pages/activity/GoodsSeckill/index'
				});
			},
			goPickGoods(){
				this.$yrouter.push({
					path: '/pages/shop/GoodsList/index',
					query:{
						title:'综合',
						type:2
					}
				});
			},
			goGroupList(){
				this.$yrouter.push({
					path: '/pages/activity/GoodsGroup/index'
				});
			},
			goLotteryType(){
				this.$yrouter.push("/subpackage/lotteryDraw/lotteryType/lotteryType");
			},
			goMyNotify(){
				this.$yrouter.push("/subpackage/notify/index")
			},
			goRoll(item) {
				console.log(item)
				if (item.uniapp_url) {
					this.$yrouter.push(item.uniapp_url)
				}
			},
			goWxappUrl(item) {
				this.$yrouter.push(item.uniapp_url);
			},
			goHotNewGoods(type) {
				this.$yrouter.push({
					path: '/pages/shop/HotNewGoods/index',
					query: {
						type
					}
				});
			},
			goGoodsCon(item) {
				this.$yrouter.push({
					path: '/pages/shop/GoodsCon/index',
					query: {
						id: item.id
					}
				});
			},
			goGoodsPromotion() {
				this.$yrouter.push('/pages/shop/GoodsPromotion/index');
			},
			setOpenShare: function() {},
			startQr: function() {
				uni.scanCode({
					success: (res) => {
						let option = handleUrlParam(res.result)
						console.log(option)


						// {productId: "19", spread: "21", codeType: "routine"}
						// {productId: "19", spread: "21", pageType: "good", codeType: "routine"}
						switch (option.pageType) {
							case 'good':
								// 跳转商品详情
								this.$yrouter.push({
									path: '/pages/shop/GoodsCon/index',
									query: {
										q: res.result
									}
								});
								break;
							case 'group':
								// 跳转团购
								this.$yrouter.push({
									path: '/pages/activity/GroupRule/index',
									query: {
										q: res.result
									}
								});
								break;
							case 'dargain':
								// 跳转砍价
								this.$yrouter.push({
									path: '/pages/activity/DargainDetails/index',
									query: {
										q: res.result
									}
								});
								break;
							default:
								// 跳转分销
								this.$yrouter.push({
									path: '/pages/Loading/index',
									query: {

									}
								});
								break;
						}


					}
				});
			}
		}
	};
</script>
