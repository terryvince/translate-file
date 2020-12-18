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
		<div class="coupon-list" v-if="couponsList.length > 0">
			<div class="item acea-row flex-column" v-cloak v-for="(item, index) in couponsList" :key="index">
				<view class="acea-row">
					<div class="money" :class="item._type === 0 ? 'moneyGray' : ''">
						<div>
							￥<span class="num">{{ item.couponPrice }}</span>
						</div>
						<div class="pic-num">满{{ item.useMinPrice }}元可用</div>
					</div>
					<div class="text">
						<div class="condition line1">
							{{ item.couponTitle }}
						</div>
						<div class="data acea-row row-between-wrapper">
							<div v-if="item.endTime === 0">不限时</div>
							<div v-else>{{ item.createTime }}-{{ item.endTime }}</div>
							<div class="bnt gray" v-if="item._type === 0">{{ item._msg }}</div>
							<div class="bnt bg-color-red" v-else>{{ item._msg }}</div>
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
		<!--暂无优惠券-->
		<view class="noCommodity" v-if="couponsList.length === 0 && loading === true">
			<view class="noPictrue">
				<image src="@/static/images/noCoupon.png" class="image" />
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getCouponsUser
	} from "@/api/user";
	import DataFormatT from "@/components/DataFormatT";

	const NAME = "UserCoupon";

	export default {
		name: "UserCoupon",
		components: {
			DataFormatT
		},
		props: {},
		data: function() {
			return {
				couponsList: [],
				loading: false
			};
		},
		watch: {
			$yroute: function(n) {
				var that = this;
				if (n.name === NAME) {
					that.getUseCoupons();
				}
			}
		},
		mounted: function() {
			this.getUseCoupons();
		},
		methods: {
			more(item) {
				item.isMore = !item.isMore
			},
			getUseCoupons: function() {
				let that = this,
					type = 0;
				getCouponsUser(type).then(res => {
					//apply();js将一个数组插入另一个数组;
					res.data.forEach(v => v.isMore = false)
					that.couponsList = res.data;
					that.loading = true;
				});
			}
		}
	};
</script>
