<style scoped lang="less">
	.payment-status {
		margin-left: auto !important;

		.iconfont {
			text-shadow: 0 4px 0 #00C65D;
		}
	}

	.cart-color {
		color: #00C65D !important;
		border: 1px solid #00C65D !important;
	}
</style>

<template>
	<view class="payment-status">
		<!--ပျက်ကွက်တွင်： အသုံးပြုသည်icon-iconfontguanbi failအစားထိုးicon-duihao2 bg-color-red-->
		<view class="iconfont icon-duihao2 bg-color-green"></view>
		<!-- ပျက်ကွက်တွင်：အမိန့်ငွေပေးချေမှုမအောင်မြင်ပါ -->
		<view class="status">အော်ဒါငွေပေးချေမှုအောင်မြင်ပါသည်</view>
		<view class="wrapper">
			<view class="item acea-row row-between-wrapper">
				<view>အမှာစာနံပါတ်</view>
				<view class="itemCom">{{orderNo}}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>မှာယူမည့်အချိန်</view>
				<view class="itemCom">{{createTime}}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>ငွေပေးချေစနစ်</view>
				<view class="itemCom">WeChat Pay</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>ငွေပေးချေမှုပမာဏ</view>
				<view class="itemCom">¥{{payMoney}}</view>
			</view>
			<!--ဤအရာကိုကျရှုံးမှုသို့ထည့်ပါ  -->
			<!--<view class='item acea-row row-between-wrapper'>-->
			<!--<view>ကျရှုံးမှုအတွက်အကြောင်းပြချက်</view>-->
			<!--<view class='itemCom'>အကောင့်လက်ကျန်မလုံလောက်ခြင်း</view>-->
			<!--</view>-->
		</view>
		<!--ပျက်ကွက်တွင်： ပြန်လည်ဝယ်ယူ -->
		<view class="returnBnt bg-color-green" @click="orderAction">အမိန့်ကိုကြည့်ရန်ပြန်သွားပါ</view>
		<view class="returnBnt cart-color" @click="homeAction">ပင်မစာမျက်နှာသို့ပြန်သွားရန်</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo: "",
				createTime: "",
				payMoney: "0.00"
			}
		},
		mounted: function() {
			let that = this;

			if (that.$yroute.query.orderNo !== undefined) {
				that.orderNo = that.$yroute.query.orderNo;
			}
			if (that.$yroute.query.createTime !== undefined) {
				that.createTime = that.$yroute.query.createTime;
			}
			if (that.$yroute.query.payMoney !== undefined) {
				that.payMoney = that.$yroute.query.payMoney;
			}
		},
		methods: {
			orderAction: function() {
				this.$yrouter.replace({
					path: "/pages/order/MyOrder/index",
					query: {
						type: 0
					}
				});
			},
			homeAction: function() {
				this.$yrouter.switchTab({
					path: "/pages/home/index",
					query: {}
				});
			}
		}
	}
</script>
