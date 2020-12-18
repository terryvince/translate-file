<style scoped lang="less">
	.aboutUs{
		// padding-bottom: 428rpx;
	}
	.img-box{
		width: 100%;
		height: 1122rpx;
	}
	.content-box{
		position: absolute;
		left: 0;
		right: 0;
		top: 186rpx;
		// bottom: 44rpx;
		margin: 0 44rpx;
		padding: 140rpx 36rpx 50rpx;
		background:rgba(255,255,255,1);
		box-shadow:1rpx 6rpx 18rpx 0 rgba(50,78,126,0.33);
		border-radius: 20rpx;
	}
	.atu-logo{
		position: absolute;
		top: 0rpx;
		left: 0;
		right: 0;
		margin: -44rpx auto 0;
		width: 100rpx;
		height: 100rpx;
	}
	.top-30{
		margin-top: 30rpx;
	}
	.au-location{
		width: 16rpx;
		height: 20rpx;
	}
	.badge-margin{
		margin: 35rpx 0 42rpx;
	}
	.blue-bar{
		width: 100%;
		height: 29rpx;
	}
	.size-31{
		width: 31rpx;
		height: 31rpx;
	}
	.profile{
		margin: 29rpx 0 58rpx;
	}
	.company-img{
		padding-top: 38rpx;
		image{
			// height: 257rpx;
			width: 100%;
			margin-bottom: 36rpx;
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
</style>
<template>
	<view class="aboutUs" :style="{height: boxHeight}">
		<!-- ../static/au-map.png -->
		<image :src="profile.addressImage" class="img-box"></image>
		<view class="content-box" id="content">
			<image :src="profile.logo" class="atu-logo"></image>
			<view class="fs-32 color-text txt-bold">{{profile.name}}</view>
			<view class="top-30 flex-main-start">
				<image src="../static/au-location.png" class="au-location"></image>
				<text style="margin-left:14rpx;" class="fs-22 color-text-secondary">{{profile.address}}</text>
			</view>
			<view class="badge-margin badge badge-mini badge-defalut">企业</view>
			<image src="../static/au-blue-bar.png" class="blue-bar"></image>
			<view class="flex-main-start top-30">
				<image src="../static/au-tip.png" class="size-31"></image>
				<text class="fs-24 color-text txt-bold">公司简介</text>
			</view>
			<text class="profile color-text-secondary fs-26 lh-1_8 block" :decode="true">
				{{profile.content}}                          
			</text>
			<view class="flex-main-start">
				<image src="../static/au-tip.png" class="size-31"></image>
				<text class="fs-24 color-text txt-bold">企业照片</text>
			</view>
			<view class="company-img">
				<image v-for="(item,i) in profile.images" mode="widthFix" :key="i" :src="item"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCompanyProfile} from '@/api/user.js'
	import {querySelector} from '@/utils/utils.js'
	export default {
		data() {
			return {
				boxHeight: 0,
				profile:{}
			};
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			});
			getCompanyProfile().then(res=>{
				// console.log(data)
				try {
					res.data.images = JSON.parse(res.data.images)
				} catch(err){console.error(err)}
				this.profile = res.data
			}).catch(console.error).finally(uni.hideLoading)
		},
		mounted(){
			querySelector('#content').then(data => {
			  this.boxHeight = (data.height + data.top + 20)+'px'
			})
		}
	}
</script>
