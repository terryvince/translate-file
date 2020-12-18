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
			<view class="txt-center fs-30 color-text txt-bold">选择升级到</view>
			<view :class="['flex-main-between fs-26 color-text top-56 select',!isShowCurGrade?'active':'']">
				<view class="select-vip gray-block flex-1">
					<text v-show="isShowCurGrade">当前等级</text>
					<text>{{grade}}</text>
				</view>
				<view class="flex-none select-btn" @click="selectList()">选择VIP</view>
			</view>
			<view class="gray-block fs-26 color-text top-28">￥{{price}}</view>
		</view>
		<view class="rules fs-28 color-rule lh-1_8">
			<view>购买规则</view>
			<view>
				1.1注册积分:首次成功注册成为会员,即可获赠100积分(每
				个会员账号仅限获赠一次) 1.2购物积分:会员凡在上述指定
				零售店铺或官方线上渠道通过现金、
			</view>
			<view>
				注意: 会员生日获赠的现金券以电子形式于会员生日当月推
				送至会员账号,具体以系统推送时间为准; 上述现金券使用
				规则以URBAN R...      
			</view>
		</view>
		<view class="fix-bottom">
			<view @click="pay()" class="post-btn bg-danger">支付</view>
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
					// sid: '', //二级分类id
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 2 // 0 普通商品 1积分商品 2会员卡
				},
				price:'0',
				grade:''
			};
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...'
			})
			getProducts(this.params).then(({data}) => {
				data.sort((a,b)=>a.id-b.id)
				this.vipList = data;
				let userInfo = uni.getStorageSync('userInfo')
				this.current = this.vipList.findIndex(v=>v.id==userInfo.level)  // id就是卡的等级
			}).catch(err=>{
				console.error('读取vip列表报错',err);
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
						title:'请先选择要购买的vip等级！'
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
						mode:'vip' // 区别是购买的vip
					  }
					});
				}).catch(err => {
					console.log('加入购物车出错：',err)
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
						title:'当前等级超过vip等级上限！'
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
						self.price = self.price < 0 ? 0 : self.price // 不允许出现负数
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>
