<template>
  <view class="sharing-packets" :class="state === true ? 'on' : ''">
    <view
      class="iconfont icon-guanbi acea-row row-center-wrapper"
      @click="closeShare"
    ></view>
    <view class="line"></view>
    <view class="sharing-con" @click="goShare">
      <image src="@/static/images/red-packets.png" class="image" />
      <view class="text font-color-red">
        <view>အသင်းဝင်</view>
        <view class="money"><text class="label">￥</text>{{ priceName }}</view>
        <view class="tip">ကော်မရှင်အမိန့်အပေါ်သို့ပြန်</view>
        <view class="shareBut">ယခုမျှဝေပါ</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "ShareRedPackets",
  props: {
    priceName: {
      type: [String, Number],
      default: ""
    }
  },
  data: function() {
    return {
      state: false
    };
  },
  mounted: function() {},
  methods: {
    goShare: function() {
      this.$emit("changeFun", { action: "shareCode", value: false });
    },
    closeShare: function() {
      this.state = true;
    }
  }
};
</script>
