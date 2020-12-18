<style lang="less">
	.coupon-list .item {
		width: 100%;
		height: unset !important;
		// min-height: 2.2*100rpx;
		margin-bottom: 0.16*100rpx;
		background-color: #FFFFFF;
		padding-bottom: 10rpx;
	}

	.coupon-list .item .text {
		// margin-top: 0rpx;
	}

	.coupon-list .item .money {
		height: unset !important;
	}

	.explian {
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		margin: 10rpx 20rpx;
		background-color: #FFFFFF;
	}

	.icon-jiantou {
		&.down {
			transform: rotateZ(90deg);
		}

		&.up {
			transform: rotateZ(-90deg);
		}
	}
</style>

<template>
	<view ref="container">
		<!-- 		<view class="flex-main-between" style="height: 60rpx; font-size: 30rpx; padding-left: 30rpx;padding-right: 30rpx;">
			<view style="margin-left:0rpx; line-height: 60rpx; margin-top: 20rpx;">
				可领取的优惠券
			</view>
			<view @click="couponAction" style="margin-right:0rpx; line-height: 60rpx; margin-top: 20rpx;color: #999999;">
				使用说明>
			</view>
		</view> -->
		<div class="coupon-list" v-if="couponsList.length > 0">
			<div class="item flex-column" v-for="(item, index) in couponsList" :key="index">
				<view class="acea-row">
					<div class="money" :class="item.isUse ? 'moneyGray' : ''">
						<div>
							￥
							<span class="num">{{ item.couponPrice }}</span>
						</div>
						<div class="pic-num">满{{ item.useMinPrice }}元可用</div>
					</div>
					<div class="text">
						<div class="condition line1">
							<span class="line-title bg-color-check" v-if="item.ctype === 0">通用劵</span>
							<span class="line-title bg-color-check" v-else-if="item.ctype === 1">商品券</span>
							<span class="line-title bg-color-check" v-else>店铺券</span>
							<span>{{ item.cname }}</span>
						</div>
						<div class="data acea-row row-between-wrapper">
							<div v-if="item.endTime !== 0">{{ item.startTime }}-{{ item.endTime }}</div>
							<div v-else>不限时</div>
							<div class="bnt gray" v-if="item.isUse === true">已领取</div>
							<div class="bnt gray" v-else-if="item.isUse === 2">已领完</div>
							<div class="bnt bg-color-red" v-else @click="getCoupon(item.id, index)">立即领取</div>
						</div>
					</div>
				</view>
				<view class="explian" :style="{height:item.isMore ? 'auto':'40rpx'}">
					<view style=" font-size: 26rpx; color: #999999;">{{item.explains||"暂无说明"}}</view>
					<view @click="" class="flex-none left-10">
						<view @click="more(item)" class="white-block flex-main-center" style="color: #A6A6A6;">
							<text :class="[item.isMore? 'up':'down','iconfont icon-jiantou fs-26 left-10']"></text>
						</view>
					</view>
				</view>
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
			more(item) {
				item.isMore = !item.isMore
			},
			couponAction: function() {
				console.log("couponAction");
				this.$yrouter.push("/subpackage/couponProtocol/couponProtocol");
			},
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
					limit: that.limit,
					merId: that.$yroute.query.merId || ''
				};
				getCoupon(q).then(res => {
					that.loading = false;
					//apply();js将一个数组插入另一个数组;
					res.data.forEach(v => v.isMore = false)
					that.couponsList.push.apply(that.couponsList, res.data);
					that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
					that.page = that.page + 1;
				});
			}
		}
	};
</script>
