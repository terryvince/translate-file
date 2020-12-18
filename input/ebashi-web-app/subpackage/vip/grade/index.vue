<style scoped lang="less">
	.swiper{
		height: 317rpx;
		margin: 48rpx 0 38rpx;
	}
	swiper-item{
		display: flex;
		align-items: center;
	}
	.swiper-item{
		transform: scaleY(.9);
		transition: transform .5s linear;
		&.active{
			transform: scaleY(1);
		}
	}
	.vip-grade,.vip-rights{
		background: #F8F1ED;
		margin: 0 20rpx;
		padding: 0rpx 77rpx 50rpx;
		position: relative;
		border-radius:0 0 10rpx 10rpx;
	}
	.vip-grade{
		background:url(https://res.chunghengtrade.com/water-mark.png) no-repeat right top,#FFDFCC;
		background-size: 50% auto;
	}
	.vip-title{
		width: 469rpx;
		height: 78rpx;
		margin-top: -35rpx;
	}
	.tips{
		margin-top: 24rpx;
	}
	.vip-tip{
		position: relative;
		&::after{
			content: '';
			position: absolute;
			width: 6rpx;
			height: 6rpx;
			border-radius: 50%;
			background: #F16356;
			left: -20rpx;
			top: 0;
			bottom: 0;
			margin: auto;
		}
	}
	.color-tip{
		color: #767575;
	}
	.top-73{
		margin-top: 73rpx;
	}
	.top-106{
		margin-top: 106rpx;
	}
	.space-wrap{
		margin-bottom: 125rpx;
	}
	.flower-wrap{
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		width:429rpx;
		height:327rpx;
	}
	.abs-full{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
</style>
<template>
	<view class="space-wrap">
		<swiper class="swiper" @change="change" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" previous-margin="40rpx" next-margin="40rpx">
			<swiper-item v-for="(item,i) in cardList" :key="i">
				<view :class="['swiper-item full', current == i ? 'active': '']">
					<vip-card :item="item" :isShowExp="true" class="abs-full"></vip-card>
				</view>
			</swiper-item>
		</swiper>
		<!-- 会员权益 -->
		<view class="vip-grade top-73">
			<view class="grade-wrap flex-main-center z-index-2">
				<image src="../../static/vip-grade.png" class="vip-title"></image>
			</view>
			<!-- <view class="flower-wrap">
				<image src="../../static/flower.png" class="full"></image>
			</view> -->
			<!-- fs-28 color-tip lh-2_ -->
			<view class="tips fs-28 color-tip lh-2_ z-index-2">
				<!-- <view class="vip-tip">每月欢乐抽奖 <text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;2&nbsp;&nbsp;</text> 次，</view>
				<view class="vip-tip">每月参与夺宝 <text class="color-danger txt-bold" :decode="true">&nbsp;1&nbsp;</text> 次，</view>
				<view class="vip-tip">每季度参加内部抽大奖活动<text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;1&nbsp;&nbsp;</text> 次，</view>
				<view class="vip-tip">参加年度旅游奖励 <text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;1&nbsp;&nbsp;</text> 次。</view> -->
				<view class="width-full" v-html="cardList[current].detail"></view>
			</view>
		</view>
		<!-- 升级权益 -->
		<view v-if="cardList[current+1]" class="vip-grade top-106">
			<view class="grade-wrap flex-main-center z-index-2">
				<image src="../../static/vip-rights.png" class="vip-title"></image>
			</view>
			<!-- <view class="flower-wrap">
				<image src="../../static/flower.png" class="full"></image>
			</view> -->
			<view class="tips fs-28 color-tip lh-2_ z-index-2">
				<view class="vip-tip">
					<text>下一等级</text>
					<text class="fs-32 txt-bold" style="margin-left: 30rpx;">L{{cardList[current].id+1}}</text>
				</view>
				<!-- <view class="vip-tip">每月欢乐抽奖 <text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;2&nbsp;&nbsp;</text> 次，</view>
				<view class="vip-tip">每月参与夺宝 <text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;2&nbsp;&nbsp;</text> 次，</view>
				<view class="vip-tip">每季度参加内部抽大奖活动<text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;1&nbsp;&nbsp;</text> 次，</view>
				<view class="vip-tip">参加年度旅游奖励 <text class="color-danger txt-bold" :decode="true">&nbsp;&nbsp;1&nbsp;&nbsp;</text> 次。</view> -->
				<view class="width-full">
					<rich-text :nodes="cardList[current+1].detail"></rich-text>
				</view>
			</view>
		</view>
		<view class="fix-bottom">
			<view @click="buyVip()" class="post-btn bg-danger">购买会员等级</view>
		</view>
	</view>
</template>

<script>
	import VipCard from '../../components/vipCard/index.vue';
	import { getProducts,getVipDetail } from "@/api/store";
	export default {
		components:{
			VipCard
		},
		data() {
			return {
				current:0,
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				params:{
					page: 1,
					limit: 99,
					// keyword: '',
					// sid: '', //二级分类id
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 2 // 0 普通商品 1积分商品 2会员卡
				},
				cardList:[],
				level:0
			};
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			})
			getProducts(this.params).then(({data}) => {
				data.sort((a,b)=>a.id-b.id)
				this.cardList = data;
				let userInfo = uni.getStorageSync('userInfo')
				this.current = this.cardList.findIndex(v=>v.id==userInfo.level)
				this.level = userInfo.level
			}).then(()=>getVipDetail(this.cardList.map(v=>v.id)))
			.then(res=>{
				res.forEach(response=>{
					const {description,id} = response.data.storeInfo
					this.cardList.forEach(v=>{
						if(v.id==id){
							this.$set(v,'detail',description)
						}
					})
				})
			})
			.catch(err=>{
				console.error('读取vip列表报错',err);
			}).finally(uni.hideLoading)		},
		methods:{
			change(e){
				this.current = e.detail.current
			},
			buyVip(){
				this.$yrouter.push('/subpackage/vip/pay/index')
			}
		}
	}
</script>
