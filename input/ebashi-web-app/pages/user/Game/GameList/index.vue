<template>
	<view ref="container">
		<div class="game-list" v-if="couponsList.length > 0">
			<div class="item " v-for="(item, index) in couponsList" :key="index"  :data-item="item" @click="userGameAction">

				<image style="width: 100%; height: 100%; background-color: #eeeeee;" :mode="aspectFill" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596108792460&di=b749c9b85d1e582841ffbbad02b8b780&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg"
				 @error="imageError"></image>

				<!-- 			<div class="money" :class="item.isUse ? 'moneyGray' : ''">
					<div>
						￥
						<span class="num">{{ item.couponPrice }}</span>
					</div>
					<div class="pic-num">满{{ item.useMinPrice }}元可用</div>
				</div> -->
				<!-- 				<div class="text">
					<div class="condition line1">
						<span class="line-title bg-color-check" v-if="item.ctype === 0">通用劵</span>
						<span class="line-title bg-color-check" v-else-if="item.ctype === 1">商品券</span>
						<span class="line-title bg-color-check" v-else>未知</span>
						<span>{{ item.cname }}</span>
					</div>
					<div class="data acea-row row-between-wrapper">
						<div v-if="item.endTime !== 0">{{ item.startTime }}-{{ item.endTime }}</div>
						<div v-else>不限时</div>
						<div class="bnt gray" v-if="item.isUse === true">已领取</div>
						<div class="bnt gray" v-else-if="item.isUse === 2">已领完</div>
						<div class="bnt bg-color-red" v-else @click="getCoupon(item.id, index)">立即领取</div>
					</div>
				</div> -->
			</div>
		</div>

		<Loading :loaded="loadend" :loading="loading"></Loading>
		
		<!--暂无优惠券-->
		<view class="noCommodity" v-if="couponsList.length === 0 && page > 1">
			<view class="noPictrue">
				<image src="@/static/images/noCoupon.png" class="image" />
			</view>
		</view>
		
	</view>
</template>
<script>
	import {
		getCoupon,
		getCouponReceive
	} from "@/api/user";
	import Loading from "@/components/Loading";
	import DataFormatT from "@/components/DataFormatT";
	export default {
		name: "getCoupon",
		components: {
			Loading,
			DataFormatT
		},
		props: {},
		data: function() {
			return {
				page: 1,
				limit: 10,
				couponsList: [],
				loading: false,
				loadend: false
			};
		},
		mounted: function() {
			this.getUseCoupons();
		},
		onReachBottom() {
			!this.loading && this.getUseCoupons();
		},
		methods: {
			getCoupon: function(id, index) {
				let that = this;
				let list = that.couponsList;
				getCouponReceive(id)
					.then(function(res) {
						list[index].isUse = true;
						uni.showToast({
							title: "领取成功",
							icon: "success",
							duration: 2000
						});
					})
					.catch(function(err) {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					});
			},
			getUseCoupons: function() {
				let that = this;
				if (that.loading) return; //阻止下次请求（false可以进行请求）；
				if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
				that.loading = true;
				let q = {
					page: that.page,
					limit: that.limit
				};
				getCoupon(q).then(res => {
					that.loading = false;
					//apply();js将一个数组插入另一个数组;
					that.couponsList.push.apply(that.couponsList, res.data);
					that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
					that.page = that.page + 1;
				});
			},
			userGameAction: function(event) {
				console.log(event)
				this.$yrouter.push("/pages/user/Game/UserGame/index");
			}
		}
	};
</script>

<style lang="less">
	/*优惠券列表公共*/

	.game-list {
		margin: 0 0 0.5*100rpx 0;
		height: 5.5*100rpx;
		overflow: hidden;

		padding: 0 0.3*100rpx;
		margin-top: 0.25*100rpx;
		box-sizing: border-box;
	}

	.game-list .item {
		width: 100%;
		height: 2.7*100rpx;
		margin-bottom: 0.16*100rpx;
		background-color: #000000;
		border-radius: 5rpx;
		overflow: hidden;
	}

	// .game-list .item .money {
	// 	background-image: url('https://h5.yixiang.co/static/images/coupon1.png');
	// 	background-repeat: no-repeat;
	// 	background-size: 100% 100%;
	// 	width: 2.4*100rpx;
	// 	height: 100%;
	// 	color: #fff;
	// 	font-size: 0.36*100rpx;
	// 	font-weight: bold;
	// 	text-align: center;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// }

	// .game-list .item .money.moneyGray {
	// 	background-image: url('https://h5.yixiang.co/static/images/coupon2.png');
	// }

	// .game-list .item .money .num {
	// 	font-size: 0.6*100rpx;
	// }

	// .game-list .item .text {
	// 	width: 4.5*100rpx;
	// 	padding: 0 0.17*100rpx 0 0.24*100rpx;
	// 	background-color: #fff;
	// 	box-sizing: border-box;
	// }

	// .game-list .item .text .condition {
	// 	font-size: 0.3*100rpx;
	// 	color: #282828;
	// 	height: 0.93*100rpx;
	// 	line-height: 0.93*100rpx;
	// 	border-bottom: 1px solid #f0f0f0;
	// }

	// .coupon-list .item .text .data {
	// 	font-size: 0.2*100rpx;
	// 	color: #999;
	// 	height: 0.76*100rpx;
	// }

	// .coupon-list .item .text .data .bnt {
	// 	width: 1.36*100rpx;
	// 	height: 0.44*100rpx;
	// 	border-radius: 0.22*100rpx;
	// 	font-size: 0.22*100rpx;
	// 	color: #fff;
	// 	text-align: center;
	// 	line-height: 0.44*100rpx;
	// }

	// .game-list .item .text .data .bnt.gray {
	// 	background-color: #ccc;
	// }

	// .condition .line-title {
	// 	width: 0.9*100rpx;
	// 	height: 0.3*100rpx;
	// 	line-height: 0.3*100rpx;
	// 	padding: 0 0.1*100rpx;
	// 	box-sizing: border-box;
	// 	background: rgba(255, 247, 247, 1);
	// 	border: 1rpx solid rgba(232, 51, 35, 1);
	// 	opacity: 1;
	// 	border-radius: 0.22*100rpx;
	// 	font-size: 0.2*100rpx !important;
	// 	color: #e83323;
	// 	margin-right: 0.12*100rpx;
	// }

	// .game-list .pic-num {
	// 	color: #ffffff !important;
	// 	font-size: 0.24*100rpx !important;
	// }
</style>
