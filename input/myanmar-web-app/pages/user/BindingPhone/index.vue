<template>
  <view class="ChangePassword">
    <view class="list">
      <view class="item">
        <input type="number" placeholder="ဖုန်းနံပါတ်ကိုဖြည့်ပါ" v-model="phone" />
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
    <view class="confirmBnt bg-color-red" @click="confirm">အတည်ပြုအတည်ပြုသည်</view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import sendVerifyCode from "@/mixins/SendVerifyCode";
import { required, alpha_num, chs_phone } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";
import { registerVerify, bindingPhone } from "@/api/user";

export default {
  name: "BindingPhone",
  components: {},
  props: {},
  data: function() {
    return {
      captcha: "",
      phone: "" //ဖုန်းနံပါတ်
    };
  },
  mixins: [sendVerifyCode],
  computed: mapGetters(["userInfo"]),
  mounted: function() {},
  methods: {
    async confirm() {
      let that = this;
      const { phone, captcha } = that;
      try {
        await that
          .$validator({
            phone: [
              chs_phone(chs_phone.message("မိုဘိုင်းဖုန်းနံပါတ်")),
              alpha_num(alpha_num.message())
            ],
            captcha: [
              required(required.message("အတည်ပြုရန်ကုတ်")),
              alpha_num(alpha_num.message("အတည်ပြုရန်ကုတ်"))
            ]
          })
          .validate({ phone, captcha });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      bindingPhone({
        phone: this.phone,
        captcha: this.captcha
      })
        .then(res => {
          if (res.data !== undefined && res.data.is_bind) {
            uni.showModal({
              title: "ချက်ချင်း",
              content: "အတည်ပြုအတည်ပြုသည်?",
              success: function(res) {
                if (res.confirm) {
                  bindingPhone({
                    phone: this.phone,
                    captcha: this.captcha,
                    step: 1
                  })
                    .then(res => {
                      uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 2000
                      });
                      that.$yrouter.replace({
                        path: "/pages/user/PersonalData/index"
                      });
                    })
                    .catch(res => {
                      uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 2000
                      });
                      that.$yrouter.replace({
                        path: "/pages/user/PersonalData/index"
                      });
                    });
                } else if (res.cancel) {
                  uni.showToast({
                    title: "အကန့်အသတ်မရှိ",
                    icon: "none",
                    duration: 2000
                  });
                  that.$yrouter.replace({
                    path: "/pages/user/PersonalData/index"
                  });
                }
              }
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
              duration: 2000
            });
            that.$yrouter.replace({ path: "/pages/user/PersonalData/index" });
          }
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
      const { phone } = that;
      try {
        await that
          .$validator({
            phone: [
              required(required.message("မိုဘိုင်းဖုန်းနံပါတ်")),
              chs_phone(chs_phone.message())
            ]
          })
          .validate({ phone });
      } catch (e) {
        return validatorDefaultCatch(e);
      }

      registerVerify({ phone: phone })
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

<style lang="">
</style>
