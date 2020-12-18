<template>
	<view class="receipt">
		<view class="receipt-list" v-if="list.length>0">
			<navigator url="/subpackage/receiptInfo/receiptInfo">
				<view class="receipt-li" v-for="item in list" :key="item.id">
					<view class="receipt-li-img">
						<image :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="receipt-li-text">
						<view class="receipt-li-text-title">{{ item.title }}</view>
						<view class="receipt-li-text-fot">
							<view class="receipt-li-text-fot-money">￥{{ item.price }}</view>
							<view class="receipt-li-text-fot-btn">查看发票</view>
						</view>
					</view>
				</view>
			</navigator>
			<!-- 加载中/没有更多数据 -->
			<uni-load-more iconType="snow" :iconSize="14" :status="status" />
		</view>
		<!-- 没有数据 -->
		<view class="null" v-else>
			<Null :title="title"></Null>
		</view>
	</view>
</template>

<script>
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		getOrderData,
		getOrderList
	} from "@/api/order"
	export default {
		components: {
			Null,
			uniLoadMore
		},
		data() {
			return {
				status: 'more',
				isListNull: true,
				title: '您的发票空空如也~',
				list: [
					{
						id: 1,
						img: '../static/logo.jpg',
						title: '牧师 ( RU CC ) 简约，爱慕床布牧师',
						price: '23.00'
					},
					{
						id: 2,
						img: '../static/logo.jpg',
						title: '牧师 ( RU CC ) 简约，爱慕床布牧师',
						price: '23.00'
					}
				],
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				type: "5",
				page: 1,
				limit: 20,
				loaded: false
			}
		},
		onLoad() {

		},
		methods: {
			clickTap: function() {
				this.status = 'noMore'
			},
			getOrderList:function() {
				if (this.loaded) return;
				const {
					page,
					limit,
					type
				} = this;
				getOrderList({
					page,
					limit,
					type
				}).then(res => {
					this.list = this.list.concat(res.data);
					this.page++;
					this.loaded = res.data.length < this.limit;
					uni.stopPullDownRefresh();
				});
			},
		},
		onPullDownRefresh() {
			console.log('下拉开始')
			this.getOrderList();
			setTimeout(function() {
				console.log('下拉结束')
			}, 1000);
		},
		onReachBottom() {
			console.log('上拉开始')
			let _this = this;
			_this.status = 'loading'
			setTimeout(function() {
				console.log('上拉结束')
				_this.status = 'noMore'
				console.log(_this.status)
			}, 2000);
		}
	}
</script>

<style>
	.receipt {
		background-color: #f3f3f3;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
		min-height: 100vh;
		position: relative;
	}

	.receipt-li {
		background-color: #fff;
		border-radius: 8rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.receipt-li-img {
		width: 160rpx;
		height: 160rpx;
		margin-right: 30rpx;
		border-radius: 6rpx;
	}

	.receipt-li-img image {
		width: 100%;
		height: 100%;
	}

	.receipt-li-text {
		flex: 1;
		height: 160rpx;
		position: relative;
	}

	.receipt-li-text-title {
		font-size: 28rpx;
		font-weight: bolder;
		color: #333;
		max-height: 80rpx;
		min-height: 40rpx;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.receipt-li-text-fot {
		position: absolute;
		width: 100%;
		bottom: 0;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.receipt-li-text-fot-money {
		font-size: 30rpx;
		font-weight: bolder;
		color: red;
	}

	.receipt-li-text-fot-btn {
		display: inline;
		padding: 6rpx 20rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		font-size: 26rpx;
		color: #fff;
		background: -webkit-linear-gradient(to right, #2a92db, #0972b9) !important;
		background: -o-linear-gradient(to right, #2a92db, #0972b9) !important;
		background: -moz-linear-gradient(to right, #2a92db, #0972b9) !important;
		background: linear-gradient(to right, #2a92db, #0972b9) !important;
	}
</style>
