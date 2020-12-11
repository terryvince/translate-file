<template>
  <view>
    <view class="coupon-list-window" :class="coupon.coupon === true ? 'on' : ''">
      <view class="title">
        ကူပွန်
        <text class="iconfont icon-guanbi" @click="close"></text>
      </view>
      <view class="coupon-list" v-if="coupon.list.length > 0">
        <view
          class="item acea-row row-center-wrapper"
          v-for="(item, couponpopIndex) in coupon.list"
          :key="couponpopIndex"
          @click="getCouponUser(couponpopIndex, item.id)"
        >
          <view class="money">
            ￥
            <text class="num">{{ item.coupon_price }}</text>
          </view>
          <view class="text">
            <view class="condition line1">စျေးဝယ်ခြင်းအပြည့်{{ item.use_min_price }}Meta ရရှိနိုင်</view>
            <view class="data acea-row row-between-wrapper">
              <view v-if="item.end_time === 0">အကန့်အသတ်မဲ့အချိန်</view>
              <view v-else>{{ item.start_time }}-{{ item.end_time }}</view>
              <view
                class="bnt acea-row row-center-wrapper"
                :class="!item.is_use ? 'bg-color-red' : 'gray'"
              >{{ !item.is_use ? "အခုရပြီ" : "လက်ခံရရှိခဲ့သည်" }}</view>
            </view>
          </view>
        </view>
      </view>
      <!--ကူပွန်မရှိပါ-->
      <view class="pictrue" v-else>
        <image src="@/static/images/noCoupon.png" class="image" />
      </view>
    </view>
    <view class="mask" @touchmove.prevent :hidden="coupon.coupon === false" @click="close"></view>
  </view>
</template>
<script>
import { getCouponReceive } from "@/api/user";
export default {
  name: "CouponPop",
  props: {
    coupon: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {
    close: function() {
      this.$emit("changeFun", { action: "changecoupon", value: false }); //$emit():မှတ်ပုံတင်ခြင်းကိစ္စ；
    },
    getCouponUser: function(index, id) {
      let that = this,
        list = that.coupon.list;
      if (list[index].is_use === true) return;
      getCouponReceive(id).then(function() {
        uni.showToast({
          title: "လက်ခံရရှိခဲ့သည်",
          icon: "none",
          duration: 2000
        });
        that.$set(list[index], "is_use", true);
        that.$emit("changefun", { action: "currentcoupon", value: index });
        that.$emit("changeFun", { action: "changecoupon", value: false });
      });
    }
  }
};
</script>
