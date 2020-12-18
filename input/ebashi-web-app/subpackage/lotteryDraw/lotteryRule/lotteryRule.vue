<style lang="less">
page{
	background-color:#FE4501;
}
.rule-content{
	background: #FFDFCB;
}
.lottery-rule-content{
	background:url(https://res.chunghengtrade.com/water-mark.png) no-repeat right top,#FFDFCC;
	background-size: 90% auto;
	padding: 84rpx 51rpx 64rpx 28rpx;
	color: #484848;
	position: absolute;
	top: 480rpx;
	left: 19rpx;
	right: 19rpx;
	margin: auto;
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
	<view class="lottery-rule">
		<image :src="$img_rule" class="width-full" mode="widthFix"></image>
		<view class="lottery-rule-content fs-26 lh-2_">
			<image src="../../static/lo-rule-title.png" mode="widthFix" class="lottry-title"></image>
			<rich-text :nodes="rule"></rich-text>
		</view>
	</view>
</template>

<script>
	import {getRuleWitTypeApi} from '@/api/user.js'
	export default {
		data() {
			return {
				$img_rule: 'lo-rules-bg.png',
				rule:''
			};
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			})
			// 规则
			getRuleWitTypeApi(3).then(({data})=>{
				this.rule = data.lotteryRule
			}).catch(console.error).finally(uni.hideLoading)
		},
		methods:{
			
		}
	}
</script>
