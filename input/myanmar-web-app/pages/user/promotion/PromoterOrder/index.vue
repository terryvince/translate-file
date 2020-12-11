<style lang="less">
	.promoterHeader {
		.headerCon {
			background-image: url('https://res.sdebs.com/img-tuiguan-bg.png') !important;
			width: 100%+1;
			margin-left: -4rpx;
		}
	}
</style>
<template>
	<view class="promoter-order" ref="container">
		<view class="promoterHeader">
			<view class="headerCon acea-row row-between-wrapper">
				<view>
					<text class="name">တိုးပွားလာသောမြှင့်တင်ရေးအမိန့်</text>
					<view>
						<text class="num">{{ count||'0' }}</text>
						<text>တစ်ယောက်တည်း</text>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, listIndex) in list" :key="listIndex">
				<view class="title acea-row row-column row-center">
					<view class="data">{{ item.time }}</view>
					<text>ဒီလတိုးပွားလာသောမြှင့်တင်ရေးအမိန့်：{{ item.count ? item.count : 0 }}တစ်ယောက်တည်း</text>
				</view>
				<view class="listn">
					<view class="itenm" v-for="(val, indexn) in item.child" :key="indexn">
						<view class="top acea-row row-between-wrapper">
							<view class="pictxt acea-row row-between-wrapper">
								<view class="pictrue">
									<image :src="val.avatar" />
								</view>
								<text class="text line1">{{ val.nickname }}</text>
							</view>
							<view class="money">
								<text>ပြန်အမှတ်：</text>
								<text class="font-color-red">{{ val.number ? val.number : 0 }}</text>
							</view>
						</view>
						<view class="bottom">
							<view>
								<text class="name">အမှာစာနံပါတ်：</text>
								{{ val.orderId }}
							</view>
							<view>
								<text class="name">မှာယူမည့်အချိန်：</text>
								{{ val.time }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
	</view>
</template>
<script>
	import {
		getSpreadOrder
	} from "@/api/user";
	import Loading from "@/components/Loading";
	export default {
		name: "PromoterOrder",
		components: {
			Loading
		},
		props: {},
		data: function() {
			return {
				list: [],
				where: {
					page: 1,
					limit: 15
				},
				loaded: false,
				loading: false,
				loadTitle: "",
				count: ""
			};
		},
		mounted: function() {
			this.getIndex();
		},
		onReachBottom() {
			!this.loading && this.getIndex();
		},
		methods: {
			getIndex: function() {
				let there = this;
				if (there.loaded == true || there.loading == true) return;
				there.loading = true;
				getSpreadOrder(there.where).then(
					res => {
						there.loading = false;
						there.loaded = res.data.list.length < there.where.limit;
						there.loadTitle = there.loaded ? "လူတွေမှာအခြေခံကျတယ်" : "ပိုပြီးတင်ရန်တက်ပါ";
						there.where.page = there.where.page + 1;
						there.list.push.apply(there.list, res.data.list);
						there.count = res.data.count;
					},
					err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					},
					300
				);
			}
		}
	};
</script>
