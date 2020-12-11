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
			<text class="col-8">ရက်စွဲ</text>
			<text class="col-12">ဆု</text>
			<text class="col-4">operating</text>
		</view>
		<view v-for="(item,i) in recordList" :key="item.id" class="item flex-main-start padding-30 color-text fs-26 row line-top">
			<text class="col-8">{{item.createTime|timeFormat('date')}}</text>
			<text class="col-12 txt-ellipsis row-1">{{item.content}}</text>
			<view v-if="item.status==0" class="col-4 color-primary relative">
				<text>ဖောက်သည်ဝန်ဆောင်မှုကိုဆက်သွယ်ပါ</text>
				<button type="default" open-type="contact" class="hide-full"></button>
			</view>
			<view v-else class="col-4 color-primary relative">
				ထုတ်ပြန်ခဲ့သည်
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
					type: 1 // 0 အားလုံး，1ပုဂ္ဂိုလ်ရေး
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
					title:'တင်နေသည်...'
				})
				return getLotteryRecord(this.params).then(({data})=>{
					if(this.params.page == 1) {
						this.recordList = data.content
						return
					}
					this.recordList = this.recordList.concat(data.data)
					this.params.page++
				}).catch(err => {
					console.error("တစ် ဦး ချင်းစီထီမှတ်တမ်းများ၏စာရင်းရယူနေစဉ်အမှားတစ်ခုဖြစ်ပွားခဲ့သည်！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
