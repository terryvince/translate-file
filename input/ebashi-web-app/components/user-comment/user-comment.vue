<style scoped lang="less">
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
.pictrue{
	width: 49%;
	margin-right: auto;
	margin-bottom: 10rpx;
}
</style>
<template>
	<view  class="user-comment bg-white top-5">
		<view class="list">
			<view @click="goEvaluateList()" class="list-item list-item-between">
				<text class="fs-28 color-text">商品评价（{{replyCount||0}}）</text>
				<view class="flex-main-start color-text fs-28">
					<text class="color-danger">{{replyChance||0}}%</text>
					<text>好评率</text>
					<view class="iconfont icon-jiantou fs-22 color-arrow left-10"></view>
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
				<view class="img-list top-20 flex-main-between width-full flex-wrap">
					<view class="pictrue" v-for="(itemn, eq) in item.picturesArr" :key="eq">
						<image :src="itemn" class="image width-full" mode="widthFix"/>
					</view>
				</view>
				<view v-show="item.merchantReplyContent" class="comment-reply fs-24 top-20">
					<text>掌柜回复：{{item.merchantReplyContent}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['replyCount','replyChance','reply','productId'], // 评论数，好评率，首评论
		data() {
			return {
			};
		},
		methods:{
			goEvaluateList() {
				this.$yrouter.push({
					path: "/pages/shop/EvaluateList/index",
					query: {
						id: this.productId
					}
				});
			},
		}
	}
</script>
