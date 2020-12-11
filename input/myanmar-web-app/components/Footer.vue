<template>
  <view>
    <view class="footer-bg"></view>
    <view id="footer" :class="[isIpx ? 'iphonex-footer' : '', 'acea-row row-middle'] ">
      <view
        class="item"
        :class="{ on: footerIndex == tabtarIndex }"
        v-for="(item, footerIndex) in footerList"
        :key="footerIndex"
      >
        <view
          class="iconfont"
          :class="item.icon1 + ' ' + (footerIndex == tabtarIndex ? item.icon2 : '')"
        ></view>
        <view>{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Footer",
  props: {},
  data: function() {
    return {
      footerList: [
        {
          name: "နေအိမ်",
          icon1: "icon-shouye-xianxing",
          icon2: "icon-shouye",
          url: "/pages/home/index"
        },
        {
          name: "ခွဲခြား",
          icon1: "icon-yingyongchengxu-xianxing",
          icon2: "icon-yingyongchengxu",
          url: "/pages/shop/GoodsClass/index"
        },
        {
          name: "စျေးဝယ်ခြင်းတောင်း",
          icon1: "icon-caigou-xianxing",
          icon2: "icon-caigou",
          url: "/pages/shop/ShoppingCart/index"
        },
        {
          name: "သတ္တုတွင်း",
          icon1: "icon-yonghu-xianxing",
          icon2: "icon-yonghu",
          url: "/pages/user/User/index"
        }
      ],
      isIpx: false
    };
  },
  computed: {
    ...mapState(["tabtarIndex"])
  },
  methods: {
  },
  mounted() {
    
  }
};
</script>
