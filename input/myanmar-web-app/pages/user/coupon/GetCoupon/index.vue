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
				ရရှိနိုင်သောကူပွန်များ
			</view>
			<view @click="couponAction" style="margin-right:0rpx; line-height: 60rpx; margin-top: 20rpx;color: #999999;">
				အသုံးပြုရန်အတွက်ညွှန်ကြားချက်များ>
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
						<div class="pic-num">ပြည့်ပြည့်စုံစုံ{{ item.useMinPrice }}Meta ရရှိနိုင်</div>
					</div>
					<div class="text">
						<div class="condition line1">
							<span class="line-title bg-color-check" v-if="item.ctype === 0">Universal ဘောက်ချာ</span>
							<span class="line-title bg-color-check" v-else-if="item.ctype === 1">ကုန်စည်ဘောက်ချာ</span>
							<span class="line-title bg-color-check" v-else>မသိဘူး</span>
							<span>{{ item.cname }}</span>
						</div>
						<div class="data acea-row row-between-wrapper">
							<div v-if="item.endTime !== 0">{{ item.startTime }}-{{ item.endTime }}</div>
							<div v-else>အကန့်အသတ်မဲ့အချိန်</div>
							<div class="bnt gray" v-if="item.isUse === true">လက်ခံရရှိခဲ့သည်</div>
							<div class="bnt gray" v-else-if="item.isUse === 2">ပြီးပြီ</div>
							<div class="bnt bg-color-red" v-else @click="getCoupon(item.id, index)">အခုရပြီ</div>
						</div>
					</div>
				</view>
				<view class="explian" :style="{height:item.isMore ? 'auto':'40rpx'}">
					<view style=" font-size: 26rpx; color: #999999;">{{item.explains||"ဖော်ပြချက်မရှိပါ"}}</view>
					<view @click="" class="flex-none left-10">
						<view @click="more(item)" class="white-block flex-main-center" style="color: #A6A6A6;">
							<text :class="[item.isMore? 'up':'down','iconfont icon-jiantou fs-26 left-10']"></text>
						</view>
					</view>
				</view>
			</div>


		</div>

		<Loading :loaded="loadend" :loading="loading"></Loading>
		<!--ကူပွန်မရှိပါ-->
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
							title: "အောင်မြင်စွာလက်ခံရရှိခဲ့သည်",
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
				if (that.loading) return; //လာမည့်တောင်းဆိုမှုကိုပိတ်ပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
				if (that.loadend) return; //လက်ရှိတောင်းဆိုမှုကိုအဆုံးသတ်ခြင်းကိုတားဆီးပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
				that.loading = true;
				let q = {
					page: that.page,
					limit: that.limit,
					merId: that.$yroute.query.merId || ''
				};
				getCoupon(q).then(res => {
					that.loading = false;
					//apply();jsarray တစ်ခုကိုအခြား array ထဲသို့ထည့်ပါ;
					res.data.forEach(v => v.isMore = false)
					that.couponsList.push.apply(that.couponsList, res.data);
					that.loadend = res.data.length < that.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
					that.page = that.page + 1;
				});
			}
		}
	};
</script>
