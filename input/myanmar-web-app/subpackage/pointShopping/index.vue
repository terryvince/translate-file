<style scoped lang="less">
 .list-wrap{
	 padding: 0 20rpx;
 }
</style>
<template>
	<view class="point-shopping">
		<view class="padding-beside-20">
			<image class="width-full block" src="https://res.sdebs.com/point-shopping-baner-v1.png" mode="widthFix"></image>
		</view>
		<features-text></features-text>
		<view v-if="list.length>0" class="list-wrap">
			<goodsList :list="list" from="point"></goodsList>
		</view>
		<view v-else class="flex-main-center top-20 color-text-secondary fs-24">အချက်အလက်မရှိပါ</view>
	</view>
</template>

<script>
	import { getProducts } from "@/api/store";
	export default {
		data() {
			return {
				params:{
					page: 1,
					limit: 8,
					// keyword: '',
					// sid: '', //အလယ်တန်းခွဲခြားid
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 1 // 0 အထွေထွေကုန်ပစ္စည်း 1ကုန်ပစ္စည်းအမှတ် 2အသင်း ၀ င်ကဒ်
				},
				list:[
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "အစိုင်အခဲသစ်သားပေါင်းစပ်အသံတိတ်တံခါး",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "အစိုင်အခဲသစ်သားပေါင်းစပ်အသံတိတ်တံခါး",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "အစိုင်အခဲသစ်သားပေါင်းစပ်အသံတိတ်တံခါး",
					// 	point: 400
					// }
				]
			};
		},
		created(){
			this.getProductList(1)
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
					title:'တင်နေသည်...'
				})
				return getProducts(this.params).then(res=>{
					if(this.params.page == 1) {
						this.list = res.data
						return
					}
					this.list = this.list.concat(res.data)
					this.params.page++
				}).catch(err => {
					console.error("အချက်များထုတ်ကုန်စာရင်းရရှိသည့်အခါအမှားတစ်ခုဖြစ်ပွားခဲ့သည်！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
