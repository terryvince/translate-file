<template>
  <view class="au-container">
	  <view v-if="!token">
	    <!-- 小程序 -->
	    <view class='au-header'>
	        <image src='@/static/logo.jpg' />
	      </view>
	      <view class='au-content'>
	        <view>申请获取以下权限</view>
	        <text>获得你的信息(昵称，头像，手机号等)</text>
	      </view>
		  <!-- #ifdef MP -->
		  <button class='au-bottom' type='primary' lang="zh_CN" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
		  <!-- #endif -->
		   <!-- #ifdef H5 -->
		   <button class='au-bottom' type='primary' lang="zh_CN" @click="getUserInfo()">授权登录</button>
		   <!-- #endif -->
	       <button class='au-bottom' type='default' @click="back">取消授权</button>
	  </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
// 组件
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
    // // 先校验用户是否授权，如果没有授权，显示授权按钮
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
          title: "取消授权",
          icon: "none",
          duration: 2000
        });
        return;
      }
      uni.showLoading({
        title: "登录中"
      });
	  // #ifdef H5
	  if(!uni.getStorageSync('wxcode')){  // 没有code走完整登录流程
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
