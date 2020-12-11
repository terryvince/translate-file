<template>
  <view>
    <view class="payment-top acea-row row-column row-center-wrapper">
      <text class="name">ငါ့ဟန်ချက်ညီ</text>
      <view class="pic">
        <text>
          ￥
          <text class="pic-font">{{ now_money || 0 }}</text>
        </text>
      </view>
    </view>
    <view class="recharge">
      <view class="nav acea-row row-around row-middle">
        <view class="item on">အကောင့်ထပ်တိုး</view>
      </view>
      <view class="info-wrapper">
        <view class="picList acea-row row-between mt-20">
          <view
            class="pic-box pic-box-color acea-row row-center-wrapper row-column"
            :class="activePic === index ? 'pic-box-color-active' : ''"
            v-for="(item, index) in picList"
            :key="index"
            @click="picCharge(index, item)"
          >
            <view class="pic-number-pic">
              <text>
                {{ item.value.price }}
                <text class="pic-number">ယွမ်</text>
              </text>
            </view>
            <view class="pic-number" v-if="item.value.give_price > 0">စွန့်ကြဲသည်：{{ item.value.give_price }} ယွမ်</view>
          </view>
          <!-- <view
            class="pic-box pic-box-color acea-row row-center-wrapper"
            @click="picCharge(picList.length, money)"
          >
            <input
              type="number"
              placeholder="အခြား"
              v-model="money"
              class="pic-box-money pic-number-pic"
            />
          </view> -->
        </view>
        <view class="tip">ချက်ချင်း：ငွေဖြည့်ပြီးသည့်နောက်ငွေစာရင်းကိုပြန်လည် ထုတ်ယူ၍ မရပါ</view>
        <view class="pay-btn bg-color-red" @click="recharge">ယခုအားသွင်းပါ</view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import { weappPay } from "@/libs/wechat";
import { rechargeWechat, getRechargeApi } from "@/api/user";
import { add, sub } from "@/utils/bc";

export default {
  name: "Recharge",
  components: {},
  props: {},
  data: function() {
    return {
      active: 0,
      from: this.$deviceType,
      money: "",
      now_money: "",
      picList: [],
      activePic: 0,
      numberPic: "",
      paid_price: "",
      rechar_id: 0
      
    };
  },
  computed: mapGetters(["userInfo"]),
  mounted: function() {
    this.now_money = this.userInfo.nowMoney;
    this.getRecharge();
  },
  methods: {
    /**
     * ငွေဖြည့်ကန့်သတ်ချက်ရွေးချယ်မှု
     */
    getRecharge() {
      getRechargeApi()
        .then(res => {
          this.picList = res.data.recharge_price_ways || [];
          if (this.picList[0]) {
            this.rechar_id = this.picList[0].id;
            this.paid_price = this.picList[0].value.price;
            this.numberPic = this.picList[0].value.give_price;
          }
        })
        .catch(res => {
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    },
    /**
     * ပမာဏရွေးပါ
     */
    picCharge(idx, item) {
      this.activePic = idx;
      if (idx == this.picList.length) {
        this.rechar_id = 0;
        this.paid_price = "";
        this.numberPic = "";
      } else {
        this.money = "";
        this.rechar_id = item.id;
        this.paid_price = item.value.give_price;
        this.numberPic = item.value.price;
      }
    },
    recharge: function() {
      let that = this,
        price = Number(this.money);
      if (this.picList.length == this.activePic && price === 0) {
        uni.showToast({
          title: "သင်ဖြည့်ရန်ငွေပမာဏကိုထည့်ပါ",
          icon: "none",
          duration: 2000
        });
        return;
      } else if (this.picList.length == this.activePic && price < 0.01) {
        uni.showToast({
          title: "ငွေဖြည့်ပမာဏသည်မနည်းပါ0.01",
          icon: "none",
          duration: 2000
        });
        return;
      }
      let prices = "",
        paid_price = "";
      if (price) {
        prices = price;
        paid_price = 0;
      } else {
        prices = that.numberPic;
        paid_price = that.paid_price;
      }
      rechargeWechat({
        price: prices,
        from: that.from,
        paid_price: paid_price,
        rechar_id: that.rechar_id
      })
        .then(res => {
          console.log(res);
          var data = res.data.data;
          weappPay(res.data.data)
            .then(() => {
              prices = add(prices, paid_price);
              that.now_money = add(prices, parseFloat(that.userInfo.nowMoney));
              uni.showToast({
                title: "ငွေပေးချေမှုအောင်မြင်သော",
                icon: "success",
                duration: 2000
              });
              this.$yrouter.back();
            })
            .finally(res => {
              //if(typeof(res) == "undefined") return
              uni.showToast({
                title: res,
                icon: "none",
                duration: 2000
              });
            })
            .catch(function() {
              uni.showToast({
                title: "ငွေပေးချေမှုမအောင်မြင်ပါ",
                icon: "none",
                duration: 2000
              });
            });
        })
        .catch(err => {
          console.log(err);
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
#iframe {
  display: none;
}
.pic-box-color-active {
  background-color: #eb3729 !important;
  color: #fff !important;
}
.picList {
  margin-bottom: 0.3 * 100rpx;
  margin-top: 0.3 * 100rpx;
}
.font-color {
  color: #e83323;
}
.recharge {
  border-radius: 0.1 * 100rpx;
  width: 100%;
  background-color: #fff;
  margin: 0.2 * 100rpx auto 0 auto;
  padding: 0.3 * 100rpx;
  border-top-right-radius: 0.39 * 100rpx;
  border-top-left-radius: 0.39 * 100rpx;
  margin-top: -0.45 * 100rpx;
  box-sizing: border-box;
}
.recharge .nav {
  height: 0.75 * 100rpx;
  line-height: 0.75 * 100rpx;
  padding: 0 1 * 100rpx;
}
.recharge .nav .item {
  font-size: 0.3 * 100rpx;
  color: #333;
}
.recharge .nav .item.on {
  font-weight: bold;
  border-bottom: 0.04 * 100rpx solid #e83323;
}
.recharge .info-wrapper {
}
.recharge .info-wrapper .money {
  margin-top: 0.6 * 100rpx;
  padding-bottom: 0.2 * 100rpx;
  border-bottom: 1px dashed #ddd;
  text-align: center;
}
.recharge .info-wrapper .money span {
  font-size: 0.56 * 100rpx;
  color: #333;
  font-weight: bold;
}
.recharge .info-wrapper .money input {
  display: inline-block;
  width: 3 * 100rpx;
  font-size: 0.84 * 100rpx;
  text-align: center;
  color: #282828;
  font-weight: bold;
  padding-right: 0.7 * 100rpx;
}
.recharge .info-wrapper .money input::placeholder {
  color: #ddd;
}
.recharge .info-wrapper .money input::-webkit-input-placeholder {
  color: #ddd;
}
.recharge .info-wrapper .money input:-moz-placeholder {
  color: #ddd;
}
.recharge .info-wrapper .money input::-moz-placeholder {
  color: #ddd;
}
.recharge .info-wrapper .money input:-ms-input-placeholder {
  color: #ddd;
}
.tip {
  font-size: 0.28 * 100rpx;
  color: #333333;
  font-weight: 800;
  margin-bottom: 0.14 * 100rpx;
}
.recharge .info-wrapper .tips span {
  color: #ef4a49;
}
.recharge .info-wrapper .pay-btn {
  display: block;
  width: 100%;
  height: 0.86 * 100rpx;
  margin: 0.5 * 100rpx auto 0 auto;
  line-height: 0.86 * 100rpx;
  text-align: center;
  color: #fff;
  border-radius: 0.5 * 100rpx;
  font-size: 0.3 * 100rpx;
  font-weight: bold;
}
.payment-top {
  width: 100%;
  height: 3.5 * 100rpx;
  background-color: #eb3729;
}
.payment-top .name {
  font-size: 0.26 * 100rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: -0.38 * 100rpx;
  margin-bottom: 0.3 * 100rpx;
}
.payment-top .pic {
  font-size: 0.32 * 100rpx;
  color: #fff;
}
.payment-top .pic-font {
  font-size: 0.78 * 100rpx;
  color: #fff;
}
.picList .pic-box {
  width: 32%;
  height: auto;
  border-radius: 0.2 * 100rpx;
  margin-top: 0.21 * 100rpx;
  padding: 0.2 * 100rpx 0;
}
.pic-box-color {
  background-color: #f4f4f4;
  color: #656565;
}
.pic-number {
  font-size: 0.22 * 100rpx;
}
.pic-number-pic {
  font-size: 0.38 * 100rpx;
  margin-right: 0.1 * 100rpx;
  text-align: center;
}
.pic-box-money {
  width: 100%;
  display: block;
}
</style>
