<template>
	<view>
		<view class="searchGood">
			<view class="search acea-row row-between-wrapper">
				<view class="input acea-row row-between-wrapper">
					<text class="iconfont icon-sousuo2"></text>
					<!-- <form @submit.prevent="submit"></form> -->
					<input type="text" placeholder="点击搜索商品" v-model="search" />
				</view>
				<view class="bnt" @click="submit">搜索</view>
			</view>
			<view v-if="history.length">
				<view class="acea-row row-between-wrapper">
					<view class="title">历史搜索</view>
					<view class="title clear" @click="clear">清空历史搜索</view>
				</view>
				<view class="list acea-row">
					<view v-for="(item, index) of history" :key="index" class="item" @click="toSearch(item)">{{ item }}</view>
				</view>
			</view>
			<view v-if="keywords.length">
				<view class="title">热门搜索</view>
				<view class="list acea-row">
					<view class="item" v-for="keywordsKey of keywords" :key="keywordsKey" @click="toSearch(keywordsKey)">{{ keywordsKey }}</view>
				</view>
			</view>
			<view class="line"></view>
			<!--      <GoodList></GoodList>-->
		</view>
		<!--<view class="noCommodity">-->
		<!--<view class="noPictrue">-->
		<!--<image src="@/static/images/noSearch.png" class="image" />-->
		<!--</view>-->
		<!--<recommend></recommend>-->
		<!--</view>-->
	</view>
</template>
<script>
	// import GoodList from "@/components/GoodList";
	import {
		getSearchKeyword
	} from "@/api/store";
	import {
		trim
	} from "@/utils";
	// import Recommend from "@/components/Recommend";
	export default {
		name: "GoodSearch",
		components: {
			// Recommend,
			// GoodList
		},
		props: {},
		data: function() {
			return {
				history: [],
				keywords: [],
				search: ""
			};
		},
		mounted: function() {
			this.getData();
		},
		onShow() {
			this.getHistoryWord();
		},
		methods: {
			submit() {
				const search = trim(this.search) || "";
				// if (!search) return;
				this.toSearch(search);
			},
			// 允许空字符串
			toSearch(s) {
				// console.log(s)
				// if (!s) return;
				//本地缓存
				console.log('------',s)
				this.setHistoryWord(s);
				this.$yrouter.push({
					path: "/pages/shop/GoodsList/index",
					query: {
						s,
						title:'分类'
					}
				});
			},
			getData() {
				getSearchKeyword().then(res => {
					this.keywords = res.data;
				});
			},
			getHistoryWord() {
				var _this = this;
				uni.getStorage({
					key: 'history-search',
					success: function(res) {
						_this.history = res.data
					}
				});
			},
			setHistoryWord(word) {
				if (word === null || word === '') {
					return;
				}
				var array = this.history.slice();
				console.log(array);
				for (var i = 0; i < array.length; i++) {
					let tmp = array[i];
					if (word === tmp) {
						array.splice(i, 1);
						break;
					}
				}
				array.unshift(word);
				// console.log(array);
				this.history = array;
				uni.setStorage({
					key: 'history-search',
					data: array,
					success: function() {
						console.log('success');
					}
				});
			},

			clear() {
				var _this = this;
				uni.removeStorage({
					key: 'history-search',
					success: function(res) {
						console.log('success');
						_this.history = [];
					}
				});
			}
		}
	};
</script>
<style>
	.noCommodity {
		border-top: 0.05*100rpx solid #f5f5f5;
	}

	.clear {
		float: right;
		right: 10rpx;
	}
</style>
