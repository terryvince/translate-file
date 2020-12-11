<style lang="less">
	@import "@/assets/css/public.less";
	.continue{
		.fade(#eb3723)
	}
</style>
<template>
	<view class="apply-return">
		<view class="goodsStyle acea-row row-between" v-for="cart in orderInfo.cartInfo" :key="cart.id">
			<view class="pictrue">
				<image :src="cart.productInfo.image" class="image" />
			</view>
			<view class="text acea-row row-between">
				<view class="name line2">{{ cart.productInfo.storeName }}</view>
				<view class="money">
					<view>
						￥{{
            cart.productInfo.attrInfo
            ? cart.productInfo.attrInfo.price
            : cart.productInfo.price
            }}
					</view>
					<view class="num">x{{ cart.cartNum }}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item acea-row row-between-wrapper">
				<view>ပြန်ရောက်ကုန်ပစ္စည်းအရေအတွက်</view>
				<view class="num">{{ orderInfo.totalNum }}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>ငွေပြန်အမ်းငွေ</view>
				<view class="num">￥{{ orderInfo.payPrice }}</view>
			</view>

			<picker :value="reason" :range="reasonList" @change="changeReason">
				<view class="item acea-row row-between-wrapper">
					<view>ပြန်လာဘို့အကြောင်းပြချက်</view>
					<view class="num">{{reason}}</view>
					<text class="iconfont icon-jiantou"></text>
				</view>
			</picker>

			<view class="item acea-row row-between-wrapper">
				<view>ပြန်အမ်းငွေနည်းလမ်း</view>
				<radio-group @change="radioChange">
					<view class="flex-main-start">
						<label class="radio right-10 flex-main-start" v-model="refund_type">
							<radio :value="0" :checked="refund_type == 0" />ပြန်အမ်းငွေသာ</label>
						<block v-if="status!=0">
							<label class="radio flex-main-start">
								<radio :value="1" :checked="refund_type == 1" />ပြန်အမ်းငွေ</label>
						</block>
					</view>
				</radio-group>
			</view>

			<template v-if="refundStatus == 3  || refundStatus == 4 ">
				<view class="item flex-main-between row">
					<view class="col-7">ကုန်ပစ္စည်းလက်ခံသူကုန်သည်</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realName}}
					</text>
				</view>
				<view class="item flex-main-between row">
					<view class="col-7">ဖုန်းလက်ခံရရှိသည့်ကုန်သည်</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realPhone}}
					</text>
				</view>
				<view class="item flex-main-between row">
					<view class="col-7">ကုန်သွယ်ပို့ဆောင်ရေးလိပ်စာ</view>
					<text class="txt-right col-17" style="color:#999;">
						{{postInfo.realAddress}}
					</text>
				</view>

				<view class="item acea-row row-between-wrapper">
					<view>တင်ပို့နံပါတ်</view>
					<input type="text" class="txt-right " v-model="refundDeliveryId" placeholder="ပြန်လာကုဒ်ကိုရိုက်ထည့်ပါ" />
				</view>

				<picker :range="expressList" range-key="name" value="id" @change="changeExpress">
					<view class="item acea-row row-between-wrapper">
						<view>ထောက်ပံ့ပို့ဆောင်ရေးကုမ္ပဏီ</view>
						<view class="num">{{express.name}}</view>
						<text class="iconfont icon-jiantou"></text>
					</view>
				</picker>
			</template>

			<view class="item textarea acea-row row-between">
				<view>လမ်းညွှန်လက်စွဲ</view>
				<textarea placeholder="မှတ်ချက်တွေဖြည့်ပါ，100စကားလုံးများအတွင်း" class="num" v-model="refund_reason_wap_explain"></textarea>
			</view>
		</view>
		<block v-if="!(refundStatus == 2 || refundStatus == 4 || refundStatus == 1)">
			<view class="returnBnt bg-color-red" @click="submit">
				{{refundStatus == 3?"ပြန်လာအတည်ပြုပါ":"ပြန်အမ်းငွေတောင်းခံပါ"}}
			</view>
		</block>
		<block v-else>
			<view class="returnBnt bg-color-red continue">
				ပြန်အမ်းငွေလုပ်ငန်းများ
			</view>
		</block>
	</view>
</template>

<script>
	// import {
	// 	getAddress
	// } from "@/api/user";
	import {
		orderDetail,
		getRefundReason,
		postOrderRefund,
		getExpressName,
		getAdressByStoreId
	} from "@/api/order";
	import {
		trim
	} from "@/utils";
	import {
		VUE_APP_API_URL
	} from "@/config";

	export default {
		name: "goodsReturn",
		components: {
			// VueCoreImageUpload
		},
		data() {
			return {
				url: `${VUE_APP_API_URL}/upload/image`,
				headers: {
					Authorization: "Bearer " + this.$store.state.token
				},
				id: 0,
				status: 0,
				refundStatus: 0,
				refund_type: 0,
				refundDeliveryId: "",
				orderInfo: {},
				reasonList: [],
				reason: "",
				expressList: [],
				express: {},
				refund_reason_wap_explain: "",
				refund_reason_wap_img: [],
				postInfo: {},
				isPoint: true
			};
		},
		methods: {
			radioChange: function(evt) {
				console.log(evt)
				this.refund_type = evt.target.value;
			},
			changeExpress(e) {
				this.express = this.expressList[e.mp.detail.value];
			},
			changeReason(e) {
				this.reason = this.reasonList[e.mp.detail.value];
			},
			imageuploaded(res) {
				if (res.status !== 200) {
					uni.showToast({
						title: err.msg || err.response.data.msg || err.response.data.message,
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.refund_reason_wap_img.push(res.data.url);
			},
			getOrderDetail() {
				orderDetail(this.id)
					.then(res => {
						this.orderInfo = res.data;
						this.isPoint = !!res.data.useIntegral;
						return getAdressByStoreId(res.data.merId)
					})
					.then(res=>{
						this.postInfo = res.data;
					})
					.catch(err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					});
			},
			getRefundReason() {
				getRefundReason().then(res => {
					this.reasonList = res.data;
				});

				getExpressName().then(res => {
					this.expressList = res.data;
				});
			},
			submit() {
				if(this.isPoint){
					uni.showToast({
						title:'ထုတ်ကုန်များကိုပြန်ပို့လို့မရပါ!',
						icon:'none'
					})
					return
				}
				const refund_reason_wap_explain = trim(this.refund_reason_wap_explain),
					text = this.reason;
				if (!text) {
					uni.showToast({
						title: "ပြန်အမ်းငွေအတွက်အကြောင်းပြချက်ကိုရွေးချယ်ပါ",
						icon: 'none',
						duration: 2000
					});
					return
				}
				//0 ပြန်အမ်းငွေသာ 1ပြန်အမ်းငွေ
				var refund_type = this.refund_type;
				var refundDeliveryId = "";
				var refundDeliveryName = "";
				var refundDeliverySn = "";
				if (this.refundStatus === 3 || this.refundStatus === '3') {
					refundDeliveryName = this.express.name;
					refundDeliverySn = this.express.code;
					refundDeliveryId = this.refundDeliveryId;
					if (!refundDeliveryName) {
						uni.showToast({
							title: "ကျေးဇူးပြုပြီးထောက်ပံ့ပို့ဆောင်ရေးကုမ္ပဏီတစ်ခုရွေးပါ",
							icon: 'none',
							duration: 2000
						});
						return
					}
					if (!refundDeliveryId) {
						uni.showToast({
							title: "ကျေးဇူးပြု၍ ထောက်ပံ့ပို့ဆောင်ရေးနံပါတ်ဖြည့်ပါ",
							icon: 'none',
							duration: 2000
						});
						return
					}
				}
				var info = {
					text,
					uni: this.orderInfo.orderId,
					refund_reason_wap_img: this.refund_reason_wap_img.join(","),
					refund_reason_wap_explain: refund_reason_wap_explain,
					refund_type: refund_type,
					refundDeliveryName: refundDeliveryName,
					refundDeliveryId: refundDeliveryId,
					refundDeliverySn: refundDeliverySn,
				};
				console.log(info);
				postOrderRefund(info)
					.then(res => {
						uni.showToast({
							title: res.msg,
							icon: "success",
							duration: 2000
						});
						setTimeout(() => {
							this.$yrouter.back();
						}, 1500);
					})
					.catch(err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: 'none',
							duration: 2000
						});
					});
			}
		},
		mounted() {
			console.log(this.$yroute.query);
			this.id = this.$yroute.query.id || 0;
			this.status = this.$yroute.query.status || 0;
			if(this.$yroute.query.refundType>-1){
				this.refund_type = this.$yroute.query.refundType
			}

			//0ပြန်အမ်းငွေမရပါ 1လျှောက်ထားခြင်း 2ပြန်အမ်း 3ပြန်လာမှုကိုစောင့်ဆိုင်းနေသည် 4ဝယ်သူတင်ပို့လိုက်ပြီ
			this.refundStatus = this.$yroute.query.refundStatus || 0;
			this.reason = this.$yroute.query.refundReasonWap || "";
			this.refund_reason_wap_explain = this.$yroute.query.refundReasonWapExplain || "";
			this.refundDeliveryId = this.$yroute.query.refundDeliveryId || "";
			this.express.name = this.$yroute.query.refundDeliveryName || "";

			if (this.refundStatus === 3 || this.refundStatus === '3') {
				this.refund_type = 1;
			}
			this.getOrderDetail();
			this.getRefundReason();
		}
	};
</script>
