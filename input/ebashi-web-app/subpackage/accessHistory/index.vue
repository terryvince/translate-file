<style scoped lang="less">
	.access-history{
		padding: 30rpx 25rpx 30rpx;
	}
</style>
<template>
	<view class="access-history">
		<goods-list :list="list"></goods-list>
	</view>
</template>

<script>
	import { getHistroy } from "@/api/user.js"
	import GoodsList from "@/components/goodsList/goodsList"
	export default {
		components:{
			GoodsList
		},
		data() {
			return {
				list:[],
				params:{
					page:1,
					limit:10
				}
			};
		},
		onLoad(){
			this.getList(1)
		},
		onPullDownRefresh(){
			// uni.startPullDownRefresh()
			this.getList(1).finally(uni.stopPullDownRefresh)
		},
		onReachBottom(){
			this.getList()
		},
		methods:{
			getList(page=1){
				if(page){
					this.params.page = page
				}
				uni.showLoading({
					title:'加载中...'
				})
				return getHistroy(this.params).then(res=>{
					if(this.params.page == 1) {
						this.list = res.data
						return
					}
					this.list = this.list.concat(res.data)
					this.params.page++
				}).catch(err => {
					console.error("获取访问记录列表发生错误！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
