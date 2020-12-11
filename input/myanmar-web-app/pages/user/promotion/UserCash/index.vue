<template>
  <view class="cash-withdrawal">
    <view class="nav acea-row">
      <view
        v-for="(item, navListIndex) in navList"
        class="item font-color-red"
        @click="swichNav(navListIndex, item)"
        :key="navListIndex"
      >
        <view class="line bg-color-red" :class="currentTab === navListIndex ? 'on' : ''"></view>
        <view class="iconfont" :class="item.icon + ' ' + (currentTab === navListIndex ? 'on' : '')"></view>
        <view>{{ item.name }}</view>
      </view>
    </view>
    <view class="wrapper">
      <view :hidden="currentTab !== 0" class="list">
        <view class="item acea-row row-between-wrapper">
          <view class="name">ကျနော်တို့နံပါတ် chat</view>
          <view class="input">
            <input placeholder="ကျေးဇူးပြု၍ WeChat ID ကိုထည့်ပါ" v-model="post.weixin" />
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view class="name">ဆုတ်ခွာ</view>
          <view class="input">
            <input :placeholder="'အနည်းဆုံးထုတ်ယူငွေပမာဏ' + minPrice" v-model="post.money" />
          </view>
        </view>
        <view class="tip">လက်ရှိရရှိနိုင်သောငွေပမာဏ: {{ commissionCount }}</view>
        <view class="bnt bg-color-red" @click="submitted">ဆုတ်ခွာ</view>
      </view>
      <view :hidden="currentTab !== 1" class="list">
        <view class="item acea-row row-between-wrapper">
          <view class="name">အသုံးပြုသူအမည်</view>
          <view class="input">
            <input placeholder="ကျေးဇူးပြု၍ သင့် Alipay Username ကိုဖြည့်ပါ" v-model="post.name" />
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view class="name">အကောင့်နံပါတ်</view>
          <view class="input">
            <input placeholder="ကျေးဇူးပြု၍ သင်၏ Alipay အကောင့်ကိုဖြည့်ပါ" v-model="post.alipay_code" />
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view class="name">ဆုတ်ခွာ</view>
          <view class="input">
            <input :placeholder="'အနည်းဆုံးထုတ်ယူငွေပမာဏ' + minPrice" v-model="post.money" />
          </view>
        </view>
        <view class="tip">လက်ရှိရရှိနိုင်သောငွေပမာဏ: {{ commissionCount }}</view>
        <view class="bnt bg-color-red" @click="submitted">ဆုတ်ခွာ</view>
      </view>
    </view>
  </view>
</template>
<script>
import { getBank, postCashInfo } from "@/api/user";
import { required } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";

export default {
  name: "UserCash",
  components: {},
  props: {},
  data: function() {
    return {
      navList: [
        { name: "WeChat", type: "weixin", icon: "icon-weixin2" },
        { name: "Alipay", type: "alipay", icon: "icon-icon34" }
      ],
      post: {
        extract_type: "weixin",
        alipay_code: "",
        money: "",
        name: "",
        bankname: "",
        cardnum: "",
        weixin: ""
      },
      currentTab: 0,
      minPrice: 0,
      banks: [],
      commissionCount: 0
    };
  },
  mounted: function() {
    this.getBank();
  },
  methods: {
    swichNav: function(index, item) {
      console.log(item);
      this.currentTab = index;
      this.post.extract_type = item.type;
    },
    getBank: function() {
      let that = this;
      getBank().then(
        res => {
          that.banks = res.data.extractBank;
          that.minPrice = res.data.minPrice;
          that.commissionCount = res.data.commissionCount;
        },
        function(err) {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        }
      );
    },
    async submitted() {
      let bankname = this.post.bankname,
        alipay_code = this.post.alipay_code,
        money = this.post.money,
        name = this.post.name,
        cardnum = this.post.cardnum,
        weixin = this.post.weixin,
        that = this;
      // console.log(parseFloat(money))
      if (
        parseFloat(money) > parseFloat(that.commissionCount) ||
        parseFloat(that.commissionCount) == 0
      )
        return that.$dialog.message("မလုံလောက်သောချိန်ခွင်");
      if (parseFloat(money) < parseFloat(that.minPrice))
        return that.$dialog.message("အနည်းဆုံးထုတ်ယူငွေပမာဏ" + that.minPrice);
      //console.log(that.post.extract_type)
      switch (that.post.extract_type) {
        case "alipay":
          // if (!name) {
          //   uni.showToast({
          //     title: "ကျေးဇူးပြု၍ Alipay username ကိုထည့်ပါ",
          //     icon: "none",
          //     duration: 2000
          //   });
          //   return;
          // }
          // if (!alipay_code) {
          //   uni.showToast({
          //     title: "ကျေးဇူးပြု၍ Alipay အကောင့်ကိုထည့်ပါ",
          //     icon: "none",
          //     duration: 2000
          //   });
          //   return;
          // }
          // if (!money) {
          //   uni.showToast({
          //     title: "ငွေထုတ်ယူပါ",
          //     icon: "none",
          //     duration: 2000
          //   });
          //   return;
          // }
          try {
            await this.$validator({
              name: [required(required.message("Alipay အသုံးပြုသူအမည်"))],
              alipay_code: [required(required.message("Alipay အကောင့်"))],
              money: [required(required.message("ထုတ်ယူငွေပမာဏ"))]
            }).validate({ name, alipay_code, money });
            let save = {
              extractType: that.post.extract_type,
              alipayCode: alipay_code,
              name: name,
              money: money
            };
            that.save(save);
          } catch (e) {
            return validatorDefaultCatch(e);
          }
          break;
        case "weixin":
          try {
            await this.$validator({
              weixin: [required(required.message("WeChat ID ကိုထုတ်ယူပါ"))],
              money: [required(required.message("ထုတ်ယူငွေပမာဏ"))]
            }).validate({ weixin, money });
            let save = {
              extractType: that.post.extract_type,
              weixin: weixin,
              money: money
            };
            that.save(save);
          } catch (e) {
            return validatorDefaultCatch(e);
          }
          break;
      }
    },
    save: function(info) {
      postCashInfo(info).then(
        res => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
          this.router.push({ path: "/user/audit" });
        },
        err => {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        }
      );
    }
  }
};
</script>
