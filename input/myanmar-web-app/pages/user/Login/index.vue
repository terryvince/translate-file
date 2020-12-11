<template>
  <view class="register absolute">
    <view class="shading">
      <view class="pictrue acea-row row-center-wrapper">
        <image src="@/static/logo.jpg" />
      </view>
    </view>
    <view class="whiteBg" v-if="formItem === 1">
      <view class="title acea-row row-center-wrapper">
        <view
          class="item"
          :class="current === index ? 'on' : ''"
          v-for="(item, index) in navList"
          @click="navTap(index)"
          :key="index"
        >{{ item }}</view>
      </view>
      <view class="list" :hidden="current !== 0">
        <form @submit.prevent="submit">
          <view class="item">
            <view class="acea-row row-between-wrapper">
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-phone_" />
              </svg>-->
              <input type="text" placeholder="မိုဘိုင်းနံပါတ်ကိုထည့်ပါ" v-model="account" required />
            </view>
          </view>
          <view class="item">
            <view class="acea-row row-between-wrapper">
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-code_" />
              </svg>-->
              <input type="password" placeholder="လော့အင်စကားဝှက်ကိုဖြည့်ပါ" v-model="password" required />
            </view>
          </view>
        </form>
      </view>
      <view class="list" :hidden="current !== 1">
        <view class="item">
          <view class="acea-row row-between-wrapper">
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_" />
            </svg>-->
            <input type="text" placeholder="မိုဘိုင်းနံပါတ်ကိုထည့်ပါ" v-model="account" />
          </view>
        </view>
        <view class="item">
          <view class="align-left">
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_1" />
            </svg>-->
            <input type="text" placeholder="အတည်ပြုကုဒ်ဖြည့်ပါ" class="codeIput" v-model="captcha" />
            <button
              class="code"
              :disabled="disabled"
              :class="disabled === true ? 'on' : ''"
              @click="code"
            >{{ text }}</button>
          </view>
        </view>
      </view>
      <view class="logon" @click="loginMobile" :hidden="current !== 1">လော့ဂ်အင်</view>
      <view class="logon" @click="submit" :hidden="current === 1">လော့ဂ်အင်</view>
      <view class="tip">
        အကောင့်မရှိပါ?
        <text @click="formItem = 2" class="font-color-red">ယခုဝင်မည်</text>
      </view>
    </view>
    <view class="whiteBg" v-else>
      <view class="title">အကောင့်တစ်ခုမှတ်ပုံတင်ပါ</view>
      <view class="list">
        <view class="item">
          <view>
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_" />
            </svg>-->
            <input type="text" placeholder="မိုဘိုင်းနံပါတ်ကိုထည့်ပါ" v-model="account" />
          </view>
        </view>
        <view class="item">
          <view class="align-left">
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_1" />
            </svg>-->
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
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_" />
            </svg>-->
            <input type="password" placeholder="သင်၏ login password ကိုဖြည့်ပါ" v-model="password" />
          </view>
        </view>
        <view class="item">
          <view>
            <!-- <svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-phone_" />
            </svg>-->
            <input type="text" placeholder="ဖိတ်ကြားချက်ကုဒ်ထည့်ပါ" v-model="inviteCode" />
          </view>
        </view>
      </view>
      <view class="logon" @click="register">မှတ်ပုံတင်ပြီး</view>
      <view class="tip">
        အကောင့်ရှိပြီးသားလား?
        <text @click="formItem = 1" class="font-color-red">ချက်ချင်း log</text>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>
<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";
import { login, loginMobile, registerVerify, register } from "@/api/user";
import attrs, { required, alpha_num, chs_phone } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";
import dayjs from "dayjs";
import cookie from "@/utils/store/cookie";

import { handleGetUserInfo } from "@/utils";

const BACK_URL = "login_back_url";

export default {
  name: "Login",
  mixins: [sendVerifyCode],
  data: function() {
    return {
      navList: ["အကောင့်ဝင်ပါ"],
      current: 0,
      account: "",
      password: "",
      captcha: "",
      inviteCode: "",
      formItem: 1,
      type: "login"
    };
  },
  methods: {
    async loginMobile() {
      var that = this;
      const { account, captcha } = that;
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
            ]
          })
          .validate({
            account,
            captcha
          });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      loginMobile({
        phone: that.account,
        captcha: that.captcha,
        spread: cookie.get("spread")
      })
        .then(res => {
          var data = res.data;
          that.$store.commit("login", data.token, dayjs(data.expires_time));
          handleGetUserInfo();
        })
        .catch(err => {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    },
    async register() {
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
          .validate({
            account,
            captcha,
            password
          });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      register({
        account: that.account,
        captcha: that.captcha,
        password: that.password,
        inviteCode: that.inviteCode,
        spread: cookie.get("spread")
      })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "success",
            duration: 2000
          });
          that.formItem = 1;
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
          .validate({
            account
          });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      if (that.formItem == 2) that.type = "register";
      await registerVerify({
        phone: that.account,
        type: that.type
      })
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
    },
    navTap: function(index) {
      this.current = index;
    },
    async submit() {
      const { account, password } = this;
      try {
        await this.$validator({
          account: [
            required(required.message("အကောင့်နံပါတ်")),
            attrs.range([5, 16], attrs.range.message("အကောင့်နံပါတ်")),
            alpha_num(alpha_num.message("အကောင့်နံပါတ်"))
          ],
          password: [
            required(required.message("စကားဝှက်")),
            attrs.range([6, 16], attrs.range.message("စကားဝှက်")),
            alpha_num(alpha_num.message("စကားဝှက်"))
          ]
        }).validate({
          account,
          password
        });
      } catch (e) {
        return validatorDefaultCatch(e);
      }

      login({
        username: account,
        password,
        spread: cookie.get("spread")
      })
        .then(({ data }) => {
          this.$store.commit("login", data.token, dayjs(data.expires_time));
          handleGetUserInfo();
          // let replace=this.$yroute.query.replace
          // if(replace){

          // }
          // this.$yrouter.replace({
          // 	path: this.$yroute.query.replace || '/pages/home/index'
          // });
        })
        .catch(err => {
          console.log(err);
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
