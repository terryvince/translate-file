<style lang="less">
.lottery-history{
	background: white;
	margin: 20rpx;
	border-radius: 10rpx;
}
// .item{
// 	text{
// 		margin: auto;
// 	}
// }
</style>
<template>
	<view class="lottery-history">
		<view class="item flex-main-start padding-30 color-text fs-26 row txt-bold">
			<text class="col-8">日期</text>
			<text class="col-12">奖品</text>
			<text class="col-4">操作</text>
		</view>
		<view v-for="(item,i) in recordList" :key="item.id" class="item flex-main-start padding-30 color-text fs-26 row line-top">
			<text class="col-8">{{item.createTime|timeFormat('date')}}</text>
			<text class="col-12 txt-ellipsis row-1">{{item.content}}</text>
			<view v-if="item.status==0" class="col-4 color-primary relative">
				<text>联系客服</text>
				<button type="default" open-type="contact" class="hide-full"></button>
			</view>
			<view v-else class="col-4 color-primary relative">
				已发放
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLotteryRecord
	} from '@/api/activity.js'
	export default {
		data() {
			return {
				recordList:[],
				params:{
					page:1,
					size:15,
					type: 1 // 0 全部，1个人
				},
			};
		},
		onLoad(){
			this.getList(1)
		},
		onPullDownRefresh(){
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
				return getLotteryRecord(this.params).then(({data})=>{
					if(this.params.page == 1) {
						this.recordList = data.content
						return
					}
					this.recordList = this.recordList.concat(data.data)
					this.params.page++
				}).catch(err => {
					console.error("获取个人抽奖记录列表发生错误！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
