<style lang="less">
	.vip-card{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 0 0 66rpx;
		box-sizing: border-box;
	}
	.top-33{
		margin-top: 33rpx;
	}
	.top-9{
		margin-top: 9rpx;
	}
	.top-28{
		margin-top: 28rpx;
	}
	.color-vip{
		color: #F0F0F0;
	}
	.card-img{
		position:absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
	.top-15{
		margin-top: 15rpx;
	}
</style>
<template>
	<view class="vip-card fs-24 color-vip">
		<image :src="item.image" class="card-img full z-index-1"></image>
		<view class="relative z-index-2">
			<view class="color-white fs-48 txt-bold">{{item.storeName}}</view>
			<!-- <view></view> -->
			<!-- <view v-if="isShowExp" class="top-33">
				<text>积分999</text>
				<text class="y-line" style="margin:0 10rpx"></text>
				<text>在积累9999可升级</text>
			</view> -->
			<view v-if="!isShowExp" class="top-15 fs-28">当前等级</view>
			<!-- <view v-if="isShowExp" class="top-9" style="width: 130rpx;">
				 <progress :percent="60" stroke-width="3px" activeColor="#FFFFFF" backgroundColor="#737373" :active="true"/>
			</view> -->
			<!-- <view class="top-28">2020.7.24日到期</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "VipCard",
		props:{
			// vip等级
			// grade:{
			// 	type: [String,Number],
			// 	default:1
			// },
			item:{
				type: [Object],
				default:{}
			},
			// 是否显示经验
			isShowExp:{
				type: [Boolean],
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			// img(){
			// 	return {
			// 		'0': require('../../static/vip-0.png'),
			// 		'1': require('../../static/vip-1.png'),
			// 		'2': require('../../static/vip-2.png'),
			// 		'3': require('../../static/vip-3.png'),
			// 		'4': require('../../static/vip-4.png'),
			// 		'5': require('../../static/vip-5.png'),
			// 		'6': require('../../static/vip-6.png'),
			// 	}[this.grade]
			// }
		}
	}
</script>
