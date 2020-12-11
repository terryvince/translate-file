<style scoped lang="less">
	.vip-pay{
		padding-bottom: 125rpx;
	}
	.swiper{
		height: 317rpx;
		margin: 48rpx 0 38rpx;
	}
	swiper-item{
		display: flex;
		align-items: center;
	}
	.swiper-item{
		transform: scaleY(.9);
		transition: transform .5s linear;
		&.active{
			transform: scaleY(1);
		}
	}
	.white-block{
		margin: 0 20rpx 32rpx;
		height:382rpx;
		background:#fff;
		border-radius:10rpx;
		padding: 37rpx 20rpx 41rpx;
	}
	.top-56{
		margin-top: 56rpx;
	}
	.gray-block{
		background: #F5F5F5;
		height: 96rpx;
		padding: 0 25rpx;
		display: flex;
		justify-content: start;
		align-items: center;
		box-shadow:0 2rpx 10rpx 0 rgba(77,76,80,0.32);
		border-radius:10rpx;
	}
	.select-btn{
		height: 96rpx;
		width: 120rpx;
		background: #F5F5F5;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 36rpx 0 33rpx;
		margin-left: 11rpx;
		box-sizing: border-box;
		box-shadow:0 2rpx 10rpx 0 rgba(77,76,80,0.32);
		border-radius:10rpx;
	}
	.top-28{
		margin-top: 28rpx;
	}
	.color-rule{
		color:#A7A7A7;
	}
	.rules{
		margin: 32rpx 25rpx;
	}
	.select{
		&.active{
			.select-vip,.select-btn{
				background:linear-gradient(90deg,rgba(219,197,155,1),rgba(201,165,109,1));
			}
		}
	}
</style>
<template>
	<view class="vip-pay">
		<view class="relative">
			<swiper class="swiper" @change="change" :touchable="false" :disable-touch="true" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" previous-margin="40rpx" next-margin="40rpx">
				<swiper-item v-for="(item,i) in vipList" :key="i">
					<view :class="['swiper-item full', current == i ? 'active': '']">
						<vip-card :item="item" :isShowExp="false"></vip-card>
					</view>
				</swiper-item>
			</swiper>
			<view class="hide-full"></view>
		</view>
		<view class="white-block">
			<view class="txt-center fs-30 color-text txt-bold">အဆင့်မြှင့်တင်ရန်ရွေးချယ်ပါ</view>
			<view :class="['flex-main-between fs-26 color-text top-56 select',!isShowCurGrade?'active':'']">
				<view class="select-vip gray-block flex-1">
					<text v-show="isShowCurGrade">လက်ရှိအဆင့်</text>
					<text>{{grade}}</text>
				</view>
				<view class="flex-none select-btn" @click="selectList()">ရွေးချယ်ပါVIP</view>
			</view>
			<view class="gray-block fs-26 color-text top-28">￥{{price}}</view>
		</view>
		<view class="rules fs-28 color-rule lh-1_8">
			<view>ဝယ်ယူစည်းမျဉ်းများ</view>
			<view>
				1.1မှတ်ပုံတင်ပါ:အသင်း ၀ င်အဖြစ်ပထမဆုံးအကြိမ်အဖြစ်မှတ်ပုံတင်ပါ,လက်ခံရရှိရန်100အရေးပါသော(တစ်ခုချင်းစီကို
				အသင်း ၀ င်အကောင့်များကိုတစ်ကြိမ်သာပေးနိုင်ပါသည်) 1.2စျေးဝယ်အချက်များ:အထက်တွင်ဖော်ပြထားသောအဖွဲ့ဝင်များ
				လက်လီအရောင်းဆိုင်များသို့မဟုတ်တရားဝင်အွန်လိုင်းလိုင်းများတွင်ငွေသား、
			</view>
			<view>
				မှတ်စု: အသင်းဝင်များအားသူတို့၏မွေးနေ့များတွင်ပေးသောငွေကူပွန်များကိုသူတို့၏မွေးနေ့ဖြစ်သောလတွင်အီလက်ထရောနစ်နည်းဖြင့်တွန်းပို့လိမ့်မည်
				အသင်းဝင်အကောင့်သို့ပို့ပါ,တိကျသောအချိန်သည်စနစ်တွန်းအားပေးရန်ဖြစ်သည်; အထက်ပါငွေသားကူပွန်ကိုသုံးခြင်း
				စည်းကမ်းများURBAN R...      
			</view>
		</view>
		<view class="fix-bottom">
			<view @click="pay()" class="post-btn bg-danger">ပေးဆောင်</view>
		</view>
	</view>
</template>

<script>
	import VipCard from '../../components/vipCard/index.vue';
	import { getProducts,getProductDetail,postCartAdd } from "@/api/store";
	export default {
		components:{
			VipCard
		},
		data() {
			return {
				current:0,
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				vipList:[],
				isShowCurGrade:true,
				payForm:{
					id:''
				},
				addCartForm:{
					productId: '',
					cartNum: 1,
					new: 1,
					uniqueId: ''
				},
				params:{
					page: 1,
					limit: 99,
					// keyword: '',
					// sid: '', //အလယ်တန်းခွဲခြားid
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 2 // 0 အထွေထွေကုန်ပစ္စည်း 1ကုန်ပစ္စည်းအမှတ် 2အသင်း ၀ င်ကဒ်
				},
				price:'0',
				grade:''
			};
		},
		onLoad(){
			uni.showLoading({
				title:'တင်နေသည်...'
			})
			getProducts(this.params).then(({data}) => {
				data.sort((a,b)=>a.id-b.id)
				this.vipList = data;
				let userInfo = uni.getStorageSync('userInfo')
				this.current = this.vipList.findIndex(v=>v.id==userInfo.level)  // idကဒ်၏အဆင့်ဖြစ်ပါတယ်
			}).catch(err=>{
				console.error('ဖတ်ပါvipစာရင်းအမှား',err);
			}).finally(uni.hideLoading)
		},
		methods:{
			change(e){
				this.current = e.detail.current
			},
			pay(){
				if(!this.payForm.id){
					uni.showToast({
						icon:'none',
						title:'ကျေးဇူးပြုပြီးသင်ဝယ်ချင်သောအရာကိုရွေးပါvipအတန်း！'
					})
					return
				}
				uni.showLoading();
				getProductDetail(this.payForm.id).then(({data}) => {
					let keys = Object.keys(data.productValue)
					let unique = ''
					if (keys.length>0) {
						let attr = data.productValue[keys[0]] || {}
					    unique = attr.unique||''
					}
					this.addCartForm.productId = this.payForm.id
					this.addCartForm.uniqueId = unique
					return Promise.resolve(unique)
				}).then(id => postCartAdd(this.addCartForm)).then(({data})=>{
					this.$yrouter.push({
					  path: "/pages/order/OrderSubmission/index",
					  query: {
					    id: data.cartId,
						mode:'vip' // ခြားနားချက်ကိုဝယ်သည်vip
					  }
					});
				}).catch(err => {
					console.log('စျေးဝယ်ခြင်းထဲသို့ထပ်ထည့်ခြင်းအမှား：',err)
				}).finally(uni.hideLoading)
			},
			selectList(){
				let self= this;
				let level = this.vipList[this.current].id;
				let list = this.vipList.filter(v=>v.id>level).map(v=>v.storeName)
				console.log(level,list)
				if(list.length==0){
					uni.showToast({
						icon:'none',
						title:'လက်ရှိအဆင့်ကကျော်ပါတယ်vipအထက်ကန့်သတ်ချက်！'
					})
					return
				}
				uni.showActionSheet({
				    itemList: list,
				    success: function (res) {
						const list = self.vipList.filter(v=>v.id>level)
						self.isShowCurGrade = false
						self.payForm.id = list[res.tapIndex].id
						self.grade = list[res.tapIndex].storeName
						self.price = list[res.tapIndex].price - self.vipList[self.current].price
						self.price = self.price < 0 ? 0 : self.price // အနှုတ်နံပါတ်များကိုခွင့်မပြုပါ
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>
