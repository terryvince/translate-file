<style lang="less">
	.lottery {
		padding-bottom: 79rpx;
	}

	page {
		background-color: #FE6229;
	}

	.lo-btn {
		position: absolute;
		width: 57rpx;
		height: 81rpx;
		right: 41rpx;
		top: 0;
		z-index: 2;
		background: url(../../static/lo-rule-btn.png)no-repeat center;
		background-size: 100% 100%;
		text-align: center;
	}

	.lottery-wrap {
		width: 658rpx;
		height: 683rpx;
		margin: -151rpx auto 31rpx;
		position: relative;
		z-index: 3;
	}

	.name-list {
		color: #393333;
		background: #FFBD97;
		padding: 15rpx;
		margin: 88rpx 46rpx 0;
		border-radius: 8rpx;
		position: relative;
	}

	.name-item {
		height: 70rpx;
		align-items: center;
		background: #FFDECB;
		padding:0 10rpx;
		&:nth-child(2n-1) {
			height: 50rpx;
			background: #FFBD97;
		}
	}

	.lo-names {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 462rpx;
		margin-top: -38rpx;
	}
	.lottery-dialog-img{
		width: 503rpx;
		height: 624rpx;
	}
	.lottery-get-text{
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 200rpx;
		width: 80%;
		text-align: center;
		color: white;
		font-size: 36rpx;
	}
</style>
<template>
	<view class="lottery relative">
		<view @click="goRule" class="lo-btn flex-main-center color-white fs-22">
			လှုပ်ရှားမှု၏စည်းမျဉ်း
		</view>
		<!-- <image src="https://res.chunghengtrade.com/1763852.jpg" mode="widthFix" class="width-full"></image> -->
		<image :src="$img_banner" mode="widthFix" class="width-full"></image>
		<view class="lottery-wrap">
			<almost-lottery v-if="prizeList.length>0" :prize-list="prizeList" :prize-index="prizeIndex" @reset-index="prizeIndex = -1" @draw-start="handleDrawStart"
			 @draw-end="handleDrawEnd" @finish="handleDrawFinish" :canvasWidth="canvasWidth"
			 :canvasHeight="canvasHeight" :number="count"/>
		</view>
		<!-- <view class="color-white fs-28 txt-bold txt-center">ပြည်တွင်းရေးဆုတွင်ပါ ၀ င်ပါကလေးပုံတစ်ပုံတိုင်းဆွဲသည်1Times。</view> -->
		<view class="name-list">
			<image src="../../static/lo-names.png" mode="widthFix" class="lo-names"></image>
			<view v-for="(item,i) in recordList" :key="item.id" :class="['name-item flex row txt-center fs-24']">
				<text class="col-6">{{item.createTime|timeFormat('date')}}</text>
				<text class="col-7 txt-ellipsis row-1">{{item.realName|nameFilter}}</text>
				<text class="col-4">ဆွဲပါ</text>
				<text class="col-7 txt-ellipsis row-1">{{item.content}}</text>
			</view>
		</view>
		<!-- ကျည်ဆံဘောင် -->
		<view @click="isShowDialog = false" :class="['modal-shadow modal-content-center', isShowDialog?'visible':'']">
			<view @click.stop="goHistory()" class="relative">
				<image src="images" :src="$img_dialog" class="lottery-dialog-img"></image>
				<view class="lottery-get-text">{{prizeName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AlmostLottery from '../../components/almost-lottery/almost-lottery.vue'
	import {
		getPrizes,
		getLotteryRecord,
		lotteryDraw,
		queryLotteryCount
	} from '@/api/activity.js'
	import {
		querySelector,
		objectMap
	} from '@/utils/utils.js'
	export default {
		components: {
			AlmostLottery
		},
		data() {
			return {
				$img_dialog:'lottery-get-dialog.png',
				$img_banner:'lo-banner.png',
				// ချီးမြှင့်သည့်အမှတ်စဉ်နံပါတ်，၎င်းကိုပြန်လည်သတ်မှတ်ရန်လိုအပ်သည် -1
				prizeIndex: -1,
				// ဆုဒေတာ
				prizeList: [
					// {
					// 	prizeId: 1,
					// 	name: '0.1ယွမ်ငွေသား',
					// 	stock: 10,
					// 	weight: 1,
					// 	imgSrc: require('../../static/au-logo.png')
					// },
					// {
					// 	prizeId: 2,
					// 	name: '10ယွမ်ငွေသား',
					// 	stock: 0,
					// 	weight: 0
					// },
					// {
					// 	prizeId: 3,
					// 	name: '5ယွမ်ဖုန်းငွေတောင်းခံလွှာ',
					// 	stock: 1,
					// 	weight: 0
					// },
					// {
					// 	prizeId: 4,
					// 	name: '50ယွမ်ငွေသား',
					// 	stock: 0,
					// 	weight: 0
					// },
					// {
					// 	prizeId: 5,
					// 	name: '1စက္ကူလိပ်',
					// 	stock: 3,
					// 	weight: 3
					// },
					// {
					// 	prizeId: 6,
					// 	name: '0.20ယွမ်ငွေသား',
					// 	stock: 8,
					// 	weight: 2
					// },
					// {
					// 	prizeId: 7,
					// 	name: 'ပါဝင်မှုအတွက်ကျေးဇူးတင်ပါသည်',
					// 	stock: 100,
					// 	weight: 10000
					// },
					// {
					// 	prizeId: 8,
					// 	name: '100ရွှေ',
					// 	stock: 100,
					// 	weight: 1000
					// }
				],
				recordList:[],
				params:{
					// page:1,
					// size:10,
					type: 0 // 0 အားလုံး，1ပုဂ္ဂိုလ်ရေး
				},
				canvasWidth: '',
				canvasHeight: '',
				count: 0,
				drawConfigId: '',
				uid: '',
				isShowDialog:false,
				prizeName:''
			};
		},
		onLoad() {
			// wx.showLoading({
			// 	title:'ဆုပြင်ဆင်မှုများအတွက်ဖြစ်ကြသည်...',
			// 	mask:true
			// })
			const title = {
				1:'ပျော်ရွှင်ပါစေ',
				2:'ကံကောင်းခြင်းဘဏ္Treာ',
				3:'ပြည်တွင်းဆုများ'
			}[this._route.query.id] || 'ထီ'
			uni.setNavigationBarTitle({
			    title: title
			});
			this.init()
		},
		methods: {
			init(){
				this.drawConfigId = this._route.query.id
				uni.showLoading({
					title: 'ဆုပြင်ဆင်မှုများအတွက်ဖြစ်ကြသည်..',
					mask: true
				})
				// ဆုရယူပါ nameEmpty သည်အစိတ်အပိုင်းအားအမှားအယွင်းတစ်ခုဖော်ပြစေလိမ့်မည်
				getPrizes(this.drawConfigId).then(async ({
					data
				}) => {
					let imgs = [];
					data.forEach(v=>{
						v.name=v.name||'' // ဒိုင်းnullတန်ဖိုး
						imgs.push(this.getTempPath(v.image))
					});
					let res = await Promise.all(imgs) // ဓါတ်ပုံအားလုံးကို download လုပ်ပါ
					this.prizeList = data.map((ob,i) => {
						ob.tempPath = res[i]
						return objectMap(ob, {
							id: 'prizeId',
							tempPath: 'imgSrc'
						})
					  }
					)
					return querySelector(".lottery-wrap")
				}).then(rect => {
					this.canvasWidth = rect.width - 50;
					this.canvasHeight = rect.height - 50;
				}).catch(console.error).finally(() => {
					this.prizeIndex = -1
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: 'ဆုအဆင်သင့်ဖြစ်ပြီ',
						mask: true
					})
				})
				
				// အားလုံးအနိုင်ရမှတ်တမ်းများရတဲ့မီ10ဆောင်းပါး
				getLotteryRecord(this.params).then(({data})=>{
					this.recordList = data.content
				}).catch(console.error)
				
				// ကျန်ရှိသောမဲနှိုက်၏အရေအတွက်ကိုရှာပါ
				queryLotteryCount(this.drawConfigId).then(({data})=>{
					this.count = data.remainingTime
				}).catch(console.error)
			},
			getTempPath(url){
				return new Promise((resolve,reject)=>{
					uni.getImageInfo({
						src: url,
						success(res){
							resolve(res.path)
						},
						fail(err){
							reject(err)
						}
					})
				})
			},
			goHistory(){
				this.$yrouter.push('/subpackage/lotteryDraw/lotteryHistory/lotteryHistory')
			},
			displayDialog(){
				this.isShowDialog = !this.isShowDialog
			},
			goRule() {
				this.$yrouter.push('/subpackage/lotteryDraw/lotteryRule/lotteryRule')
			},
			// အဆိုပါသရေကျစတင်ခဲ့သည်
			handleDrawStart() {
				// ကျပန်းဤနေရာတွင်ထုတ်လုပ်ပြီး prizeId အဆိုပါ simulated backend အားဖြင့်ပြန်ရောက်သည် prizeId
				lotteryDraw({drawConfigId:this.drawConfigId}).then(({data,success,msg})=>{
					this.count && this.count--;
					this.prizeIndex =  this.prizeList.findIndex(v=> v.prizeId == data)
					this.prizeName = this.prizeList[this.prizeIndex].name
					console.log('ဒီမဲနှိုက်အတွက်ဆု =>', this.prizeList[this.prizeIndex])
				}).catch(({msg})=>{
					uni.showToast({
						icon:'none',
						title:msg,
						duration:2000
					})
					this.prizeIndex = -1
				})
			},
			// အဆိုပါမဲနှိုက်ပြီးပါပြီ
			handleDrawEnd() {
				// console.log(this.prizeList[this.prizeIndex])
				this.displayDialog()
			},
			// အဆိုပါမဲနှိုက် turntable ပြီးစီးခဲ့သည်
			handleDrawFinish() {
				console.log('အဆိုပါမဲနှိုက် turntable ပြီးစီးခဲ့သည်')
			}
		}
	}
</script>
