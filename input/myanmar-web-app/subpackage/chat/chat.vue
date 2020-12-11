<template>
	<view>
		<chat></chat>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sign: "bfbc8b1ce23a245f920fde1a998e0d45429ded9c832370d2d07896c53f066cbc60f6ae8281c10ec4ca06fdc4d5a21e68c9263dc4588f8d52e5a7db03e1247fa2",
			}
		},

		onLoad() {
			if (this.$yroute.query.sign !== undefined) {
				if (this.$yroute.query.sign.length) {
					this.sign = this.$yroute.query.sign;
				}

				console.log(this.sign)
			}

			var plugin = requirePlugin("myPlugin");
			plugin.init({
				sign: this.sign, //ဖြတ်သန်းရမယ်，ကုမ္ပဏီချန်နယ်ထူးခြားတဲ့အမှတ်အသား
				// token: '', //မလိုအပ်ဘူး
				// uid: '',   //ထူးခြားသောအသုံးပြုသူ ID，မဖြည့်ပါနဲ့，ပုံမှန်အားဖြင့်ဗလာဖြစ်သည်
				// title: '', //မလိုအပ်ဘူး，မဖြည့်လျှင်，ပုံမှန်အားဖြင့် configuration ခေါင်းစဉ်ကိုရယူပါ
				// isRMB: '', //ထုတ်ကုန်သည် RMB ပြသလား￥,ပုံသေဖော်ပြချက်，falseမပြနဲ့
				// data: {    //parameter သည်c1,c2,c3,c4,c5အသုံးပြုသူအချက်အလက်များကိုထုတ်လွှင့်ရန်အသုံးပြုသည်，parameter သည်d1,d2,d3,d4,d5ထုတ်ကုန်သတင်းအချက်အလက်ထုတ်လွှင့်ရန်အသုံးပြုခဲ့သည်，ပုံမှန်အားဖြင့်ဗလာဖြစ်သည်
				//     c1: '',
				//     c2: '',
				//     c3: '',
				//     c4: '',
				//     c5: '',
				//     d1: '', //ကုန်ပစ္စည်းအကြောင်းအရာ
				//     d2: '', //စျေးနှုန်း
				//     d3: '', //မူလစျေးနှုန်း
				//     d4: '', //ထုတ်ကုန်ပုံ link ကိုပြသ
				//     d5: '', //ကုန်စည်ဒိုင် Jump ကို
				//     d6: '', //ကုန်ပစ္စည်းid
				//     data: ''//စာဝှက်ထားတဲ့ string,မလိုအပ်ဘူး
				// },
				viewUrl(res) { //link ကိုခုန်ရန်လိုအပ်သည်，သင်ပြင်ဆင်ရန်လိုအပ်သည်web-view
					if (res) {
						wx.navigateTo({
							url: '/subpackage/webview/index?href=' + res
						})
					}
				},
				setTitle(res) { //ခေါင်းစဉ်ကိုသတ်မှတ်မည်
					if (res) {
						wx.setNavigationBarTitle({
							title: res
						})
					}
				},
				setBarColor(res) { //လမ်းညွှန်ဘား၏နောက်ခံအရောင်ကိုသတ်မှတ်ပါ
					if (res) {
						wx.setNavigationBarColor({
							frontColor: '#ffffff',
							backgroundColor: res
						})
					}
				},
				success(res) { //စတင်အောင်မြင်သောအခါခေါ်
					if (res.data == 'success') {
						console.log('success');
					}
				},
				fail(res) { //စတင်ကျရှုံးသောအခါခေါ်
					if (res.data == 'initError') {
						console.log('initError');
					}
				},
				leave(res) { //စကားဝိုင်းစာမျက်နှာချန်ထားပါ
					if (res) {
						console.log(res);
					}
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
