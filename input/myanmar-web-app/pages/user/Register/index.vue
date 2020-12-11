<template>
  <view class="register absolute">
    <view class="shading">
      <view class="pictrue acea-row row-center-wrapper">
        <image src="@/static/logo.jpg" />
      </view>
    </view>
    <view class="whiteBg">
      <view class="title">အကောင့်တစ်ခုမှတ်ပုံတင်ပါ</view>
      <view class="list">
        <view class="item">
          <view>
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_" />
            </svg> -->
            <input type="text" placeholder="မိုဘိုင်းနံပါတ်ကိုထည့်ပါ" />
          </view>
        </view>
        <view class="item">
          <view class="align-left">
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-code_1" />
            </svg> -->
            <input type="text" placeholder="အတည်ပြုကုဒ်ဖြည့်ပါ" class="codeIput" />
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
            </svg> -->
            <input type="text" placeholder="သင်၏ login password ကိုဖြည့်ပါ" />
          </view>
        </view>
      </view>
      <view class="logon">မှတ်ပုံတင်ပြီး</view>
      <view class="tip">
        အကောင့်ရှိပြီးသားလား?
        <text @click="goLogin()" class="font-color-red">ချက်ချင်း log</text>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";

export default {
  name: "Register",
  mixins: [sendVerifyCode],
  methods: {
    code: function() {
      this.sendCode();
    },
    goLogin() {
      this.$yrouter.push({ path: "/pages/user/Login/index" });
    }
  }
};
</script>
