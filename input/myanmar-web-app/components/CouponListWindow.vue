<template>
  <view>
    <view class="coupon-list-window" :class="value === true ? 'on' : ''">
      <view class="title">
        ကူပွန်
        <text class="iconfont icon-guanbi" @click="close"></text>
      </view>
      <view v-if="couponList.length > 0">
        <view class="coupon-list">
          <div
            class="item acea-row row-center-wrapper"
            v-for="coupon in couponList"
            :key="coupon.id"
            @click="click(coupon)"
          >
            <div class="money bg-danger">
              <div>
                ￥<span class="num">{{ coupon.couponPrice }}</span>
              </div>
              <div class="pic-num">ပြည့်ပြည့်စုံစုံ{{ coupon.useMinPrice }}Meta ရရှိနိုင်</div>
            </div>
            <div class="text">
              <div class="condition line1">{{ coupon.couponTitle }}</div>
              <div class="data acea-row row-between-wrapper">
                <div v-if="coupon.endTime === 0">အကန့်အသတ်မဲ့အချိန်</div>
                <div v-else>ဖြတ်တောက်သည်:{{ coupon.endTime }}</div>
                <div
                  class="iconfont icon-xuanzhong1 font-color-red"
                  v-if="coupon.isChecked"
                ></div>
                <div class="iconfont icon-weixuanzhong" v-else></div>
              </div>
            </div>
          </div>
        </view>
        <view class="couponNo bg-color-red" @click="couponNo">ကူပွန်မရှိပါ</view>
      </view>
      <view v-if="!couponList.length && loaded">
        <view class="pictrue">
          <image src="@/static/images/noCoupon.png" class="image" />
        </view>
      </view>
    </view>
    <view class="mask" @touchmove.prevent :hidden="value === false" @click="close"></view>
  </view>
</template>
<style scoped lang="less">
.coupon-list-window .iconfont {
  font-size: 40rpx;
}
.couponNo {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
  width: 690rpx;
  height: 86rpx;
  border-radius: 43rpx;
  text-align: center;
  line-height: 86rpx;
  margin: 60rpx auto;
}
</style>
<script>
import { getOrderCoupon } from "@/api/order";
import DataFormatT from "@/components/DataFormatT";

export default {
  name: "CouponListWindow",
  components: {
    DataFormatT
  },
  props: {
    value: Boolean,
    checked:{
		type:Array,
		default:[]
	},
    price: {
      type: [Number, String],
      default: undefined
    },
    cartid: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      couponList: [],
      loaded: false
    };
  },
  watch: {
    price(n) {
      if (n === undefined || n == null) return;
      this.getCoupon();
    },
    cartid(n) {
      if (n === undefined || n == null) return;
      this.getCoupon();
    }
  },
  mounted: function() {},
  methods: {
    close: function() {
      this.$emit("input", false);
      this.$emit("close");
    },
    getCoupon() {
      getOrderCoupon(this.cartid).then(res => {
		res.data.forEach(v=>v.isChecked = false)
        this.couponList = res.data;
        this.loaded = true;
      });
    },
	check(){
		this.$nextTick(()=>{
			// console.log('checked:',this.checked)
			let ids = this.checked.map(v=>v.id) // ရွေးချယ်သည်idအစုံ
			this.couponList.forEach(v=>{
				v.isChecked = ids.includes(v.id)
			})
		})
	},
    click(coupon) {
	  let list = this.checked.filter(v=>v.id!=0) // ဗလာပစ္စည်းများကိုစစ်ထုတ်ပါ
	  console.log(list)
	  if(list.some(v=>v.id == coupon.id)){  // ဘာမှမလုပ်ရန်ရှိပြီးသားတစ်ခုကိုနှိပ်ပါ
	      // console.log('ကူပွန်idရွေးချယ်ထား:',coupon.id)
		  return
	  }
	  
	  if(list.every(v=>v.merId!=coupon.merId && v.id != coupon.id)){  // ဆိုင်idကွဲပြားခြားနားသည်，ကူပွန်ကိုမရွေးပါကထည့်ပါ
		  // console.log('ဆိုင်idကွဲပြားခြားနားသောနှင့်ကူပွန်idမရွေးရ:',coupon.id)
		  this.$emit("checked", [...list,coupon]); // ဖြည့်စွက်ပါ
		  this.check()
		  return
	  }
	  // console.log('ဆိုင်idတူညီတဲ့အခွအေနေ:',coupon.id,coupon.merId)
	  this.$emit("checked", [...list.filter(v=>v.merId!=coupon.merId),coupon]);
	  this.check()
      // this.$emit("input", false);
    },
    couponNo: function() {
      this.$emit("checked", []);
      this.$emit("input", false);
	  this.check()
    }
  }
};
</script>
