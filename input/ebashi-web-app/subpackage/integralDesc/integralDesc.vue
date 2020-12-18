<style lang="less">
	page{
		background-color: #EDF4FC;
		padding-bottom: 24rpx;
	}
	.inde{
		.header{
			height: 508rpx;
			background: linear-gradient(56deg, #00BEAE, #00FFAE);
		}
		.body{
			position: absolute;
			left: 41rpx;
			right: 38rpx;
			top: 69rpx;
			min-height: 936rpx;
			border-radius: 20rpx 20rpx 0 0;
			padding:0 0rpx 40rpx;
			box-sizing: border-box;
			background-color: white;
		}
		.title{
			background-color: #FBFBFB;
			height: 178rpx;
			color: #4F4F4F;
			font-size: 38rpx;
			border-radius: 20rpx 20rpx 0 0;
		}
		.content{
			margin: 68rpx 26rpx 0;
			color: #333333;
			font-size: 26rpx;
		}
		.letter-box{
			position: absolute;
			height: 220rpx;
			left: -32rpx;
			right: -30rpx;
			bottom: -200rpx;
			background: url(https://res.sdebs.com/protocol-1-v1.png)no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
<template>
	<view class="inde">
		<view class="header"></view>
		<view class="body">
			<view class="title flex-main-center">
				<span class="txt-bold">积分说明</span>
			</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="letter-box">
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRuleWitTypeApi
	} from "@/api/user";
	export default {
		data() {
			return {
				content: ""
			}
		},
		onShow() {
			console.log("getRuleWitTypeApi");
			getRuleWitTypeApi("2")
				.then((result) => {
					this.content = result.data.integralRule;
				}).catch(() => {});
		},
		methods: {
	
		},
	}
</script>
