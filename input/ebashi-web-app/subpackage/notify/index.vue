<style scoped lang="less">
	page{
		background: #F5F5F5;
		padding: 0 21rpx;
	}
	.list{
		overflow: hidden;
		.list-item{
			margin: 16rpx 20rpx;
			background: white;
			padding: 33rpx 23rpx 43rpx;
		}
		.title-image{
			width: 38rpx;
			height: 38rpx;
		}
	}
	.top-19{
		margin-top:19rpx;
	}
	.top-29{
		margin-top: 29rpx;
	}
	.left-13{
		margin-left: 13rpx;
	}
</style>

<template>
	<view class="list">
		<view v-if="list.length>0">
			<view v-for="item in list" :key="item.id" class="list-item">
				<view class="title flex-main-start">
					<image :src="item.type|typeToImg" mode="widthFix" class="title-image"></image>
					<text class="left-13 fs-32 color-text">{{item.type |typeToName }}</text>
				</view>
				<view class="color-text-secondary fs-26 top-29">{{item.info}}</view>
				<view class="color-light-gray fs-20 top-19">{{item.createTime |timeFormat('dateTime') }}</view>
			</view>
		</view>
		<view v-else class="flex-main-center top-20 color-text-secondary fs-24">暂时没有数据哦</view>
	</view>
</template>

<script>
	import {getMyMessage} from '@/api/user.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		filters:{
			// type 1 订单消息 2 活动消息 3系统消息
			typeToImg(type){
				return {
				  1:require("../static/notify-order.png"),
				  2:require("../static/notify-activity.png"),
				  3:require("../static/notify-system.png")
				}[type]
			},
			typeToName(type){
				return {
				  1:'订单消息',
				  2:'活动消息',
				  3:'系统消息'
				}[type]
			}
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			})
			getMyMessage().then(({data})=>{
				this.list = data
			}).catch(err => {
				console.error("获取我的消息列表发生错误！",err)
			}).finally(uni.hideLoading)
		},
		methods: {
			
		}
	}
</script>
