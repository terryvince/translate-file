<style scoped lang="less">
 .list-wrap{
	 padding: 0 20rpx;
 }
</style>
<template>
	<view class="point-shopping">
		<view class="padding-beside-20">
			<!-- https://res.sdebs.com/point-shopping-baner-v1.png -->
			<image class="width-full block" :src="banner" mode="widthFix"></image>
		</view>
		<features-text></features-text>
		<view v-if="list.length>0" class="list-wrap">
			<goodsList :list="list" from="point"></goodsList>
		</view>
		<view v-else class="flex-main-center top-20 color-text-secondary fs-24">暂时没有数据哦</view>
	</view>
</template>

<script>
	import { getProducts } from "@/api/store";
	import {getModuleOrder} from '@/api/public.js'
	export default {
		data() {
			return {
				params:{
					page: 1,
					limit: 8,
					// keyword: '',
					// sid: '', //二级分类id
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 1 // 0 普通商品 1积分商品 2会员卡
				},
				list:[
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// }
				],
				banner:''
			};
		},
		created(){
			this.getProductList(1)
			getModuleOrder().then(({data})=>{
				this.banner = data.integralBanner ? data.integralBanner : 'https://res.sdebs.com/point-shopping-baner-v1.png'
			})
		},
		onPullDownRefresh(){
			this.getProductList(1).finally(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){
			this.getProductList()
		},
		methods:{
			goDetail(item){
				this.$yrouter.push({
				  path: "/pages/shop/GoodsCon/index",
				  query: {
					  id: item.id,
					  mode:'point'
				  }
				});
			},
			getProductList(page=1){
				if(page){
					this.params.page = page
				}
				uni.showLoading({
					title:'加载中...'
				})
				return getProducts(this.params).then(res=>{
					if(this.params.page == 1) {
						this.list = res.data
						return
					}
					this.list = this.list.concat(res.data)
					this.params.page++
				}).catch(err => {
					console.error("获取积分商品列表发生错误！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
