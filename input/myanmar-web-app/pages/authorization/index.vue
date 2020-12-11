<template>
  <view class="au-container">
	  <view v-if="!token">
	    <!-- အသုံးအဆောင်များ -->
	    <view class='au-header'>
	        <image src='@/static/logo.jpg' />
	      </view>
	      <view class='au-content'>
	        <view>အောက်ပါခွင့်ပြုချက်များအတွက်လျှောက်ထားပါ</view>
	        <text>သင်၏သတင်းအချက်အလက်ကိုရယူပါ(အမည်ပြောင်，Avatar，ဖုန်းနံပါတ်စသည်တို့)</text>
	      </view>
		  <!-- #ifdef MP -->
		  <button class='au-bottom' type='primary' lang="zh_CN" open-type="getUserInfo" @getuserinfo="getUserInfo">ခွင့်ပြုထားသော login</button>
		  <!-- #endif -->
		   <!-- #ifdef H5 -->
		   <button class='au-bottom' type='primary' lang="zh_CN" @click="getUserInfo()">ခွင့်ပြုထားသော login</button>
		   <!-- #endif -->
	       <button class='au-bottom' type='default' @click="back">ခွင့်ပြုချက်မရှိ</button>
	  </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
// အစိတ်အပိုင်း
// import request from "@//api/request";
import { wxappAuth, getUser } from "@/api/user";
import dayjs from "dayjs";
import cookie from "@/utils/store/cookie";
import { login, authorize } from "@/utils";

export default {
  data() {
    return {
      authorize: false
    };
  },
  computed: {
    ...mapState(["isAuthorization", "$deviceType", "token"])
  },
  onShow() {
    // // ပထမ ဦး စွာအသုံးပြုသူခွင့်ပြုကြောင်းအတည်ပြုပါ，ခွင့်ပြုချက်မရှိလျှင်，ခွင့်ပြုချက်ခလုတ်ကိုပြပါ
  },
  onHide() {
    this.updateAuthorizationPage(false);
    this.changeAuthorization(false);
  },
  onUnload() {
    this.updateAuthorizationPage(false);
    this.changeAuthorization(false);
  },
  methods: {
    ...mapActions(["changeAuthorization", "setUserInfo"]),
    ...mapMutations(["updateAuthorizationPage",]),
    
    back() {
      this.$yrouter.switchTab({
        path: "/pages/home/index",
        query: {}
      });
    },
    getUserInfo(data) {
      if (data && data.detail.errMsg == "getUserInfo:fail auth deny") {
        uni.showToast({
          title: "ခွင့်ပြုချက်မရှိ",
          icon: "none",
          duration: 2000
        });
        return;
      }
      uni.showLoading({
        title: "ဝင်ရောက်သည်"
      });
	  // #ifdef H5
	  if(!uni.getStorageSync('wxcode')){  // မဟုတ်ဘူးcodeပြီးပြည့်စုံသော login လုပ်ငန်းစဉ်ကိုတဆင့်သွားပါ
		  this.$yrouter.push({
			  path: '/pages/Loading/index',
		  })
		  return
	  }
	  // #endif
      login()
        .then(res => {
          this.$yrouter.reLaunch({ path: cookie.get("redirect") });
        })
        .catch(error => {
          console.log(error);
          uni.showToast({
            title: error,
            icon: "none",
            duration: 2000
          });
        });
    }
  },
  mounted() {
  }
};
</script>

<style lang="less">
page{
	background-color: white;
}
.au-header {
  margin: 90rpx 0 90rpx 50rpx;
  width: 650rpx;
  height: 300rpx;
  text-align: center;
  line-height: 450rpx;
}
.au-header image {
  border-radius: 10rpx;
  width: 200rpx;
  height: 200rpx;
}
.au-content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;
}
.au-content text {
  display: block;
  margin-top: 40rpx;
  color: #9d9d9d;
}
.au-bottom {
  margin: 70rpx 50rpx;
  border-radius: 80rpx;
  font-size: 35rpx;
  &::after{
	  border: none;
  }
}
</style>
