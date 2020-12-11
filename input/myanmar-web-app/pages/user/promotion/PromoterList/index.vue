<style lang="less">
	.promoter-list {
		background-image: none !important;
		.header {
			.promoterHeader {
				.headerCon {
					background-image: url('https://res.sdebs.com/img-tuiguan-bg.png') !important;
					width: 100%+1;
					margin-left: -4rpx;
				}
			}
		}
	}
</style>
<template>
	<view class="promoter-list" ref="container">
		<view class="header">
			<view class="promoterHeader ">
				<view class="headerCon acea-row row-between-wrapper">
					<view>
						<view class="name">ပရိုမိုးရှင်းအရေအတွက်</view>
						<view>
							<text class="num">{{ first + second||'0' }}</text>
							<text>လူ</text>
						</view>
					</view>
				</view>
			</view>
			<view class="search acea-row row-between-wrapper">
				<form @submit.prevent="submitForm">
					<view class="input">
						<input placeholder="အသင်း ၀ င်အမည်ကိုရှာရန်နှိပ်ပါ" v-model="screen.keyword" style="width: 550rpx;"/>
						<text class="iconfont icon-guanbi" @click="clearKeyword()"></text>
					</view>
				</form>
				<view class="iconfont icon-sousuo2"></view>
			</view>
		</view>
		<view class="list">
			<view class="sortNav acea-row row-middle" :class="fixedState === true ? 'on' : ''">
				<view class="sortItem" @click="sort('childCount')">
					အဖွဲ့အဆင့်
					<image src="@/static/images/sort1.png" v-if="childCount == 1" />
					<image src="@/static/images/sort2.png" v-if="childCount == 2" />
					<image src="@/static/images/sort3.png" v-if="childCount == 3" />
				</view>
				<view class="sortItem" @click="sort('numberCount')">
					ပမာဏအလိုက်စီပါ
					<image src="@/static/images/sort1.png" v-if="numberCount == 1" />
					<image src="@/static/images/sort2.png" v-if="numberCount == 2" />
					<image src="@/static/images/sort3.png" v-if="numberCount == 3" />
				</view>
				<view class="sortItem" @click="sort('orderCount')">
					အော်ဒါအမျိုးအစားခွဲခြင်း
					<image src="@/static/images/sort1.png" v-if="orderCount == 1" />
					<image src="@/static/images/sort2.png" v-if="orderCount == 2" />
					<image src="@/static/images/sort3.png" v-if="orderCount == 3" />
				</view>
			</view>
			<view :class="fixedState === true ? 'sortList' : ''">
				<view class="item acea-row row-between-wrapper" v-for="(val, spreadListIndex) in spreadList" :key="spreadListIndex">
					<view class="picTxt acea-row row-between-wrapper">
						<view class="pictrue">
							<image :src="val.avatar" />
						</view>
						<view class="text">
							<view class="name line1">{{ val.nickname }}</view>
							<view>အချိန်ပူးပေါင်းပါ: {{ val.time }}</view>
						</view>
					</view>
					<view class="right">
						<view>
							<text class="font-color-red">{{ val.childCount }}</text>လူ
						</view>
						<view>{{ val.orderCount }} တစ်ယောက်တည်း</view>
						<view>{{ val.numberCount ? val.numberCount : 0 }} ယွမ်</view>
					</view>
				</view>
			</view>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
	</view>
</template>
<script>
	import {
		getSpreadUser
	} from "@/api/user";
	import Loading from "@/components/Loading";
	export default {
		name: "PromoterList",
		components: {
			Loading
		},
		props: {},
		data: function() {
			return {
				fixedState: false,
				screen: {
					page: 1,
					limit: 15,
					grade: 0,
					keyword: "",
					sort: ""
				},
				childCount: 2,
				numberCount: 2,
				orderCount: 2,
				loaded: false,
				loading: false,
				spreadList: [],
				loadTitle: "",
				first: "",
				second: ""
			};
		},
		mounted: function() {
			this.getSpreadUsers();
		},
		onReachBottom() {
			!this.loading && this.getSpreadUsers();
		},
		watch: {
			"screen.sort": function() {
				this.screen.page = 0;
				this.loaded = false;
				this.loading = false;
				this.spreadList = [];
				this.getSpreadUsers();
			}
		},
		methods: {
			clearKeyword(){
				this.screen.keyword = ''
			},
			handleScroll: function() {
				// var scrollTop =
				//   document.documentElement.scrollTop || document.body.scrollTop;
				// var offsetTop = document.querySelector(".header").clientHeight;
				// if (scrollTop >= offsetTop) {
				//   this.fixedState = true;
				// } else {
				//   this.fixedState = false;
				// }
			},
			submitForm: function() {
				this.screen.page = 0;
				this.loaded = false;
				this.loading = false;
				this.spreadList = [];
				this.getSpreadUsers();
			},
			getSpreadUsers: function() {
				let that = this,
					screen = that.screen;
				if (that.loaded || that.loading) return;
				that.loading = true;
				getSpreadUser(screen).then(
					res => {
						that.loading = false;
						that.spreadList.push.apply(that.spreadList, res.data.list);
						that.loaded = res.data.list.length < that.screen.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
						that.loadTitle = that.loaded ? "လူတွေမှာအခြေခံကျတယ်" : "ပိုပြီးတင်ရန်တက်ပါ";
						that.screen.page = that.screen.page + 1;
						that.first = res.data.total;
						that.second = res.data.totalLevel;
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
			},
			checkGrade: function(val) {
				if (val == this.screen.grade) return;
				else {
					this.screen.page = 1;
					this.screen.grade = val;
					this.loading = false;
					this.loaded = false;
					this.spreadList = [];
					this.getSpreadUsers();
				}
			},
			sort: function(types) {
				let that = this;
				switch (types) {
					case "childCount":
						if (that.childCount == 2) {
							that.childCount = 1;
							that.orderCount = 2;
							that.numberCount = 2;
							that.screen.sort = "childCount DESC";
						} else if (that.childCount == 1) {
							that.childCount = 3;
							that.orderCount = 2;
							that.numberCount = 2;
							that.screen.sort = "childCount ASC";
						} else if (that.childCount == 3) {
							that.childCount = 2;
							that.orderCount = 2;
							that.numberCount = 2;
							that.screen.sort = "";
						}
						break;
					case "numberCount":
						if (that.numberCount == 2) {
							that.numberCount = 1;
							that.orderCount = 2;
							that.childCount = 2;
							that.screen.sort = "numberCount DESC";
						} else if (that.numberCount == 1) {
							that.numberCount = 3;
							that.orderCount = 2;
							that.childCount = 2;
							that.screen.sort = "numberCount ASC";
						} else if (that.numberCount == 3) {
							that.numberCount = 2;
							that.orderCount = 2;
							that.childCount = 2;
							that.screen.sort = "";
						}
						break;
					case "orderCount":
						if (that.orderCount == 2) {
							that.orderCount = 1;
							that.numberCount = 2;
							that.childCount = 2;
							that.screen.sort = "orderCount DESC";
						} else if (that.orderCount == 1) {
							that.orderCount = 3;
							that.numberCount = 2;
							that.childCount = 2;
							that.screen.sort = "orderCount ASC";
						} else if (that.orderCount == 3) {
							that.orderCount = 2;
							that.numberCount = 2;
							that.childCount = 2;
							that.screen.sort = "";
						}
						break;
					default:
						that.screen.sort = "";
				}
			}
		}
	};
</script>
