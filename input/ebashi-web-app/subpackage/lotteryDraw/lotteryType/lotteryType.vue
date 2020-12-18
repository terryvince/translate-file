<style scoped lang="less">
.lottery-type{
	padding: 26rpx 0 17rpx;
	margin: 0 21rpx;
}
.types{
	image{
		margin-bottom: 26rpx;
	}
}
.lottery-history{
	background:rgba(235,70,89,1);
	height:98rpx;
	border-radius:10rpx;
}
.lottery-rule{
	background:url(https://res.chunghengtrade.com/water-mark.png) no-repeat right top,#FFDFCC;
	background-size: 90% auto;
	padding: 84rpx 51rpx 64rpx 28rpx;
	margin-top: 73rpx;
	color: #484848;
	position: relative;
	border-radius:10rpx;
}
.lottry-title{
	width: 450rpx;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	margin: -37rpx auto 0;
}
</style>
<template>
	<view class="lottery-type">
		<view class="types">
			<image @click="goLottery(item)" v-for="(item,i) in imgList" :key="item.id" :src="item.name" mode="widthFix" class="width-full"></image>
		</view>
		<view @click="goHistory()" class="lottery-history flex-main-between color-white fs-32 padding-beside-30">
			<text>中奖记录</text>
			<view class="iconfont icon-jiantou arrow fs-18"></view>
		</view>
		<view class="lottery-rule fs-26 lh-2_">
			<image src="../../static/lo-rule-title.png" mode="widthFix" class="lottry-title"></image>
			<rich-text :nodes="rule"></rich-text>
		</view>
	</view>
</template>

<script>
	import {getLotteryImages} from '@/api/activity.js'
	import {getRuleWitTypeApi} from '@/api/user.js'
	export default {
		name: 'lottery-type',
		data() {
			return {
				// require('../../static/lo-type-1.png'),require('../../static/lo-type-2.png'),require('../../static/lo-type-3.png')
				imgList:[],
				rule:''
			};
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			})
			// 抽奖类型
			getLotteryImages().then(({data})=>{
				this.imgList = data.content
			}).catch(console.error).finally(uni.hideLoading)
			
			// 规则
			getRuleWitTypeApi(3).then(({data})=>{
				this.rule = data.lotteryRule
			}).catch(console.error).finally(uni.hideLoading)
		},
		methods:{
			goHistory(){
				this.$yrouter.push({
				  path: "/subpackage/lotteryDraw/lotteryHistory/lotteryHistory"
				});
			},
			goLottery(item){
				this.$yrouter.push({
				  path: "/subpackage/lotteryDraw/lottery/lottery",
				  query:{
					  id: item.id
				  }
				});
			}
		}
	}
</script>
