<template>
  <view class="register absolute">
    <view class="shading">
      <view class="pictrue acea-row row-center-wrapper">
        <image src="@/static/logo.jpg" />
      </view>
    </view>
    <view class="whiteBg">
      <view class="title">စကားဝှက်ကိုပြန်လည်ရယူပါ</view>
      <view class="list">
        <view class="item">
          <view>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_" />
            </svg>
            <input type="text" placeholder="မိုဘိုင်းနံပါတ်ကိုထည့်ပါ" v-model="account" />
          </view>
        </view>
        <view class="item">
          <view class="align-left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_1" />
            </svg>
            <input type="text" placeholder="အတည်ပြုကုဒ်ဖြည့်ပါ" class="codeIput" v-model="captcha" />
            <button
              class="code"
              :disabled="disabled"
              :class="disabled === true ? 'on' : ''"
              @click="code"
            >{{ text }}</button>
          </view>
        </view>
        <view class="item">
          <view>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_" />
            </svg>
            <input type="password" placeholder="သင်၏ login password ကိုဖြည့်ပါ" v-model="password" />
          </view>
        </view>
      </view>
      <view class="logon" @click="registerReset">အတည်ပြုပါ</view>
      <view class="tip">
        <text @click="goLogin()" class="font-color-red">ချက်ချင်း log</text>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";
import { registerVerify, registerReset } from "@/api/user";
import { validatorDefaultCatch } from "@/utils/dialog";
import attrs, { required, alpha_num, chs_phone } from "@/utils/validate";

export default {
  name: "RetrievePassword",
  data: function() {
    return {
      account: "",
      password: "",
      captcha: ""
    };
  },
  mixins: [sendVerifyCode],
  methods: {
    goLogin() {
      this.$yrouter.push({ path: "/pages/user/Login/index" });
    },
    async registerReset() {
      var that = this;
      const { account, captcha, password } = that;
      try {
        await that
          .$validator({
            account: [
              required(required.message("မိုဘိုင်းဖုန်းနံပါတ်")),
              chs_phone(chs_phone.message())
            ],
            captcha: [
              required(required.message("အတည်ပြုရန်ကုတ်")),
              alpha_num(alpha_num.message("အတည်ပြုရန်ကုတ်"))
            ],
            password: [
              required(required.message("စကားဝှက်")),
              attrs.range([6, 16], attrs.range.message("စကားဝှက်")),
              alpha_num(alpha_num.message("စကားဝှက်"))
            ]
          })
          .validate({ account, captcha, password });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      registerReset({
        account: that.account,
        captcha: that.captcha,
        password: that.password
      })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "success",
            duration: 2000,
            complete: () => {
              that.$yrouter.push({ name: "Login" });
            }
          });
        })
        .catch(err => {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    },
    async code() {
      var that = this;
      const { account } = that;
      try {
        await that
          .$validator({
            account: [
              required(required.message("မိုဘိုင်းဖုန်းနံပါတ်")),
              chs_phone(chs_phone.message())
            ]
          })
          .validate({ account });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      registerVerify({ phone: that.account })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "success",
            duration: 2000
          });
          that.sendCode();
        })
        .catch(err => {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    }
  }
};
</script>
