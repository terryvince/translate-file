<template>
  <view class="cash-audit">
    <view class="pictrue">
      <image src="@/static/images/examine.png" />
    </view>
    <view class="tip">ထုတ်ယူခြင်းလျှောက်လွှာတင်သွင်းခဲ့သည်，လက်စွဲစာအုပ်ပြန်လည်သုံးသပ်ဘို့စောင့်ဆိုင်း</view>
    <view class="time">{{ time }}</view>
    <view class="bnt bg-color-red" @click="goUserPromotion()">ရလား</view>
  </view>
</template>
<script>
export default {
  name: "CashAudit",
  components: {},
  props: {},
  data: function() {
    return {
      time: ""
    };
  },
  mounted: function() {
    let myData = new Date();
    this.time = myData.toLocaleString();
  },
  methods: {
    goUserPromotion() {
      this.$yrouter.push({ path: "/pages/user/promotion/UserPromotion/index" });
    }
  }
};
</script>
