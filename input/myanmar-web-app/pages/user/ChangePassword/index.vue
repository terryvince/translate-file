<template>
  <view class="ChangePassword">
    <view class="phone">
      လက်ရှိဖုန်းနံပါတ်:
      <input type="text" v-model="phone" disabled />
    </view>
    <view class="list">
      <view class="item">
        <input type="password" placeholder="စကားဝှက်အသစ်ထည့်ပါ" v-model="password" />
      </view>
      <view class="item">
        <input type="password" placeholder="စကားဝှက်အသစ်ကိုအတည်ပြုပါ" v-model="password2" />
      </view>
      <view class="item acea-row row-between-wrapper">
        <input type="text" placeholder="အတည်ပြုကုဒ်ဖြည့်ပါ" class="codeIput" v-model="captcha" />
        <button
          class="code font-color-red"
          :disabled="disabled"
          :class="disabled === true ? 'on' : ''"
          @click="code"
        >{{ text }}</button>
      </view>
    </view>
    <view class="confirmBnt bg-color-red" @click="confirm">အပြောင်းအလဲများကိုအတည်ပြုပါ</view>
  </view>
</template>
<style scoped lang="less">
.ChangePassword .phone input {
  width: 2*100rpx;
  text-align: center;
}
</style>
<script>
// import { mapGetters } from "vuex";
import sendVerifyCode from "@/mixins/SendVerifyCode";
import attrs, { required, alpha_num, chs_phone } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";
import { registerReset, registerVerify, getUserInfo } from "@/api/user";

export default {
  name: "ChangePassword",
  components: {},
  props: {},
  data: function() {
    return {
      password: "",
      password2: "",
      captcha: "",
      phone: "", //ဖုန်းနံပါတ်၏ဂဏန်းအနည်းငယ်ကိုဖျောက်ထားပါ；
      yphone: "" //ဖုန်းနံပါတ်；
    };
  },
  mixins: [sendVerifyCode],
  // computed: mapGetters(["userInfo"]),
  mounted: function() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function() {
      let that = this;
      getUserInfo().then(res => {
        that.yphone = res.data.phone;
        let reg = /^(\d{3})\d*(\d{4})$/;
        that.phone = that.yphone.replace(reg, "$1****$2");
      });
    },
    async confirm() {
      let that = this;
      const { password, password2, captcha } = that;
      try {
        await that
          .$validator({
            password: [
              required(required.message("စကားဝှက်")),
              attrs.range([6, 16], attrs.range.message("စကားဝှက်")),
              alpha_num(alpha_num.message("စကားဝှက်"))
            ],
            captcha: [
              required(required.message("အတည်ပြုရန်ကုတ်")),
              alpha_num(alpha_num.message("အတည်ပြုရန်ကုတ်"))
            ]
          })
          .validate({ password, captcha });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      if (password !== password2) return  uni.showToast({
                          title: 'အဲဒီစကားဝှက်နှစ်ခုဟာကိုက်ညီမှုမရှိပါ',
                          icon: "none",
                          duration: 2000
                        }); 
      registerReset({
        account: that.yphone,
        captcha: that.captcha,
        password: that.password
      })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });

          // that.$yrouter.push({ path: "/pages/user/Login/index" });
        })
        .catch(res => {
           uni.showToast({
                          title: res.msg,
                          icon: "none",
                          duration: 2000
                        });
        });
    },
    async code() {
      let that = this;
      const { yphone } = that;
      try {
        await that
          .$validator({
            yphone: [
              required(required.message("မိုဘိုင်းဖုန်းနံပါတ်")),
              chs_phone(chs_phone.message())
            ]
          })
          .validate({ yphone });
      } catch (e) {
        return validatorDefaultCatch(e);
      }

      registerVerify({ phone: yphone })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
          that.sendCode();
        })
        .catch(res => {
           uni.showToast({
                          title: res.msg,
                          icon: "none",
                          duration: 2000
                        });
        });
    }
  }
};
</script>
