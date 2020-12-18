<style scoped lang="less">
.lottie-bg {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

#lottie {
  width: 60%;
  display: block;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  margin: auto;
}
</style>
<template>
  <view class="lottie-bg">
    <view id="lottie">
      <image
        :src="$img_loading"
        rel="preload"
        mode="widthFix"
        style="width: 100%;"
      />
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
import { parseQuery, login, handleQrCode } from "@/utils";
import { parseUrl} from "@/utils/utils.js";

export default {
  name: "Loading",
  data() {
    return {
		$img_loading:'loading.gif'
	};
  },
  onShow() {
    var url = handleQrCode();
    // 判断是否是分销
    if (url) {
      var spread = cookie.get("spread");
      let urlSpread = parseInt(url.spread);
      if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
        cookie.set("spread", urlSpread || 0);
      } else if (spread === 0 || typeof spread !== "number") {
        cookie.set("spread", urlSpread || 0);
      }
    }
    if (this.$store.getters.token) {
      this.toLaunch();
      return;
    }
    cookie.get("spread");
    // return
	// this.toLaunch();
    if (this.$deviceType == "app") {
      // this.toLaunch();
      this.$yrouter.switchTab({
        path: "/pages/home/index"
      });
      return;
    }
	
	if(this.$deviceType == "h5") {
		const hasCode = location.href.includes('code')
		if(!hasCode){ // 没有code就获取code
			this.getCodeApi()
			return
		}
		uni.setStorageSync('wxcode',parseUrl(location.href).code) // 有code就设置code
	}
	
    login().finally(() => {
      this.$yrouter.switchTab({
        path: "/pages/home/index"
      });
    });
  },
  methods: {
    ...mapActions(["changeAuthorization", "setUserInfo"]),
	// 授权
	getCodeApi() {
	  const redirect_uri = encodeURIComponent(location.href)
	  // const redirect_uri = encodeURIComponent('https://apis.huacunkj.com/ebashih5')
	  const scope = 'snsapi_userinfo'
	  const appid = 'wx007347fbd7deb6f9'
	  const state = ''
	  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
	  console.log('重定向url:',decodeURIComponent(redirect_uri))
	  window.location.replace(url)
	},
    toLaunch() {
      console.log("loading home");
      this.changeAuthorization(false);
      this.$yrouter.switchTab({
        path: "/pages/home/index"
      });
    }
  }
};
</script>
