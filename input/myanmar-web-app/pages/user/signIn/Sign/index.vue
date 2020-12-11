<template>
	<view class="sign">
		<view class="header bg-color-green">
			<view class="headerCon acea-row row-between-wrapper">
				<view class="left acea-row row-between-wrapper">
					<view class="pictrue">
						<image :src="userInfo.avatar" />
					</view>
					<view class="text">
						<view class="line1">{{ userInfo.nickname }}</view>
						<view class="integral acea-row">
							<text>အရေးပါသော: {{ userInfo.integral }}</text>
						</view>
					</view>
				</view>
				<view @click="goSignRecord()" class="right acea-row row-middle">
					<view class="iconfont icon-caidan"></view>
					<view>အသေးစိတ်</view>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="list acea-row row-between-wrapper">
				<view class="item" v-for="(item, signSystemListIndex) in signSystemList" :key="signSystemListIndex">
					<view :class="signSystemListIndex + 1 === signSystemList.length ? 'rewardTxt' : ''">{{ item.day }}</view>
					<view class="venus" :class=" (signSystemListIndex + 1 === signSystemList.length ? 'reward' : '') +' ' + (sign_index >= signSystemListIndex + 1 ? 'venusSelect' : '')"></view>
					<view class="num" :class="sign_index >= signSystemListIndex + 1 ? 'on' : ''">+{{ item.sign_num }}</view>
				</view>
			</view>
			<!--ထဲသို့ထည့်ပါ but အပေါ် on ရောက်ပြီ-->
			<view class="but bg-color-green" :class="userInfo.is_day_sgin ? 'on' : ''" @click="goSign">{{ userInfo.isDaySign ? "ရောက်ပြီ" : "ယခုဆိုင်းအင်လုပ်ပါ" }}</view>
			<view class="lock"></view>
		</view>
		<view class="wrapper wrapper2">
			<view class="tip">တဖြည်းဖြည်းတိုးပွားလာအတွက် check လုပ်ထားခဲ့သည်</view>
			<view class="list2 acea-row row-center row-bottom">
				<view class="item bg-danger" v-for="(item, signCountIndex) in signCount" :key="signCountIndex">{{ item || 0 }}</view>
				<view class="data">နေ့</view>
			</view>
			<view class="tip2">ဒါကိုဆက်တိုက် Check-in ဟုပြောသည်{{ day }}ပိုလျှံအချက်များရရန်နေ့ရက်များ，ဆိုင်းအင်လုပ်ထားပါ~~~</view>
			<view class="list3">
				<view class="item acea-row row-between-wrapper" v-for="(item, signListIndex) in signList" :key="signListIndex">
					<view>
						<view class="name line1">{{ item.title }}</view>
						<view class="data">{{ item.addTime }}</view>
					</view>
					<view class="num font-color-red">+{{ item.number }}</view>
				</view>
				<view @click="goSignRecord()" class="Loads acea-row row-center-wrapper" v-if="signList.length > 0">
					နောက်ထပ်တင်ရန်နှိပ်ပါ
					<view class="iconfont icon-xiangyou acea-row row-center-wrapper"></view>
				</view>
			</view>
		</view>
		<view class="signTip acea-row row-center-wrapper" :class="active === true ? 'on' : ''">
			<view class="signTipLight loadingpic">
				<image :src="$img_light" />
			</view>
			<view class="signTipCon">
				<view class="state">အောင်မြင်စွာဝင်ရောက်ပါ</view>
				<view class="integral">ရရှိသည်{{ integral }}အရေးပါသော</view>
				<view class="signTipBnt" @click="close">ရလား</view>
			</view>
		</view>
		<view class="mask" @touchmove.prevent :hidden="active === false"></view>
	</view>
</template>
<style scoped lang="less">
	.Loads .iconfont {
		font-size: 0.25*100rpx;
		margin: 0.02*100rpx 0 0 0.1*100rpx;
	}
	.bg-danger {
	    background: #64CE5E !important;
	}
</style>
<script>
	import {
		postSignUser,
		getSignConfig,
		postSignIntegral,
		getSignList
	} from "@/api/user";
	import {
		add
	} from "@/utils/bc";

	export default {
		name: "Sign",
		components: {},
		props: {},
		data: function() {
			return {
				$img_light:'light.png',
				userInfo: {},
				integral: 0,
				signCount: [],
				sign_index: 0,
				signSystemList: [],
				signList: [],
				page: 1,
				limit: 3,
				active: false,
				day: ""
			};
		},
		mounted: function() {
			uni.showLoading({ title: "တင်နေသည်", mask: true });
			this.signUser();
			this.signConfig();
			this.getSignList();
		},
		methods: {
			goSignRecord() {
				this.$yrouter.push("/pages/user/signIn/SignRecord/index");
			},
			// jsနံပါတ်ဖြည့်ပါ0；num：ထလုပ်ရန်လိုအပ်သည်0နံပါတ်，length：အရှည်（ဘယ်နှစ်ယောက်နေရာများ）；
			PrefixInteger: function(num, length) {
				return (Array(length).join("0") + num).slice(-length).split("");
			},
			//ဒစ်ဂျစ်တယ်တရုတ်
			Rp: function(n) {
				var cnum = ["သုည", "တစ်ခု", "နှစ်", "သုံး", "လေး", "ငါး", "ခြောက်", "ခုနှစ်", "ရှစ်", "ကိုး"];
				var s = "";
				n = "" + n; // string ကိုမှနံပါတ်
				for (var i = 0; i < n.length; i++) {
					s += cnum[parseInt(n.charAt(i))];
				}
				return s;
			},
			// အသုံးပြုသူအချက်အလက်ရယူပါ
			signUser: function() {
				let that = this;
				postSignUser({
					sign: 1
				}).then(res => {
					uni.hideLoading();
					res.data.integral = parseInt(res.data.integral);
					var sumSginDay = res.data.sumSignDay;
					that.userInfo = res.data;
					that.signCount = that.PrefixInteger(sumSginDay, 4);
					that.sign_index = parseInt(res.data.signNum);
				});
			},
			// configuration ကိုဆိုင်းအင်
			signConfig: function() {
				let that = this;
				getSignConfig().then(res => {
					that.signSystemList = res.data;
					that.day = that.Rp(that.signSystemList.length);
				});
			},
			//  အသုံးပြုသူဝင်ပါ
			goSign: function() {
				let that = this,
					sumSginDay = that.userInfo.sumSignDay;
				if (that.userInfo.is_day_sgin) {
					uni.showToast({
						title: "သင်ဒီနေ့ဆိုင်းအင်!",
						icon: "none",
						duration: 2000
					});
					return
				}
				postSignIntegral().then(res => {
					that.active = true;
					that.integral = res.data.integral;
					let sign_index = parseInt(that.sign_index + 1);
					that.sign_index =
						sign_index > that.signSystemList.length ? 1 : sign_index;
					that.signCount = that.PrefixInteger(sumSginDay + 1, 4);
					that.userInfo.is_day_sgin = true;
					that.userInfo.integral = add(that.userInfo.integral, res.data.integral);
					that.getSignList();
				});
			},
			//  Check-in စာရင်းရယူပါ;
			getSignList: function() {
				let that = this;
				getSignList(that.page, that.limit).then(res => {
					that.signList = res.data;
				});
			},
			close: function() {
				this.active = false;
			}
		}
	};
</script>
