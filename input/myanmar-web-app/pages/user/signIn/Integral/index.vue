<template>
  <view class="integral-details" ref="container">
    <view class="header">
      <view class="currentScore">လက်ရှိအချက်များ</view>
      <view>{{ info.integral }}</view>
      <view class="line"></view>
      <!--<view class="nav acea-row">-->
      <!--<view class="item">-->
      <!--<view class="num">{{ info.sum_integral }}</view>-->
      <!--<view>စုဆောင်းရမှတ်များ</view>-->
      <!--</view>-->
      <!--<view class="item">-->
      <!--<view class="num">{{ info.deduction_integral }}</view>-->
      <!--<view>တိုးပွားလာသောစားသုံးမှု</view>-->
      <!--</view>-->
      <!--<view class="item">-->
      <!--<view class="num">{{ info.today_integral }}</view>-->
      <!--<view>ဒီနေ့ယူပါ</view>-->
      <!--</view>-->
      <!--</view>-->
    </view>
    <view class="wrapper">
      <view class="nav acea-row">
        <view
          class="item acea-row row-center-wrapper"
          :class="current === navListIndex ? 'on' : ''"
          v-for="(item, navListIndex) in navList"
          :key="navListIndex"
          @click="nav(navListIndex)"
        >
          <text class="iconfont" :class="item.icon"></text>
          {{ item.name }}
        </view>
      </view>
      <view class="list" :hidden="current !== 0">
        <!--<view class="tip acea-row row-middle">-->
        <!--<text class="iconfont icon-shuoming"><text-->
        <!--&gt;ချက်ချင်း：ရမှတ်အဆင့်သည်သင်၏အသင်း ၀ င်မှုအဆင့်ကိုတိုက်ရိုက်ထိခိုက်လိမ့်မည်-->
        <!--</view>-->
        <view
          class="item acea-row row-between-wrapper"
          v-for="(item, listIndex) in list"
          :key="listIndex"
        >
          <view>
            <text class="state">{{ item.title }}</text>
            <view>
              <data-format :date="item.addTime"></data-format>
            </view>
          </view>
          <text class="num" v-if="item.pm == 1">+{{ item.number }}</text>
          <text class="num font-color-red" v-if="item.pm == 0">-{{ item.number }}</text>
        </view>
      </view>
      <!--<view class="list2" :hidden="current !== 1">-->
      <!--<view class="item acea-row row-between-wrapper" @click="goHome()">-->
      <!--<view class="pictrue"><image src="@/static/images/score.png" /></view>-->
      <!--<view class="name">ကုန်ပစ္စည်းများဝယ်ယူခြင်းအတွက်အချက်များ</view>-->
      <!--<view class="earn">ရမှတ်များရယူပါ</view>-->
      <!--</view>-->
      <!--<view-->
      <!--class="item acea-row row-between-wrapper"-->
      <!--@click="goSignIn()"-->
      <!--&gt;-->
      <!--<view class="pictrue"><image src="@/static/images/score.png" /></view>-->
      <!--<view class="name">နေ့စဉ်ဆိုင်းအင်လုပ်ခြင်းသည်အပိုဆုကြေးရနိုင်သည်</view>-->
      <!--<view class="earn">ရမှတ်များရယူပါ</view>-->
      <!--</view>-->
      <!--</view>-->
    </view>
    <Loading :loaded="loaded" :loading="loading"></Loading>
  </view>
</template>
<script>
import { getIntegralList, postSignUser } from "@/api/user";
import Loading from "@/components/Loading";
import DataFormat from "@/components/DataFormat";
export default {
  name: "Integral",
  components: {
    Loading,
    DataFormat
  },
  props: {},
  data: function() {
    return {
      navList: [
        { name: "ရမှတ်ပျက်ပြား", icon: "icon-mingxi" }
        // { name: "တိုးတက်မှုရမှတ်", icon: "icon-tishengfenzhi" }
      ],
      current: 0,
      where: {
        page: 1,
        limit: 15
      },
      data: {
        sign: 1,
        integral: 1,
        all: 1
      },
      list: [],
      info: [],
      loaded: false,
      loading: false
    };
  },
  mounted: function() {
    this.getIntegral();
    this.getInfo();
  },
  onReachBottom() {
    !this.loading && this.getInfo();
  },
  methods: {
    goSignIn() {
      this.$yrouter.push("/pages/user/signIn/Sign/index");
    },
    goHome() {
      this.$yrouter.switchTab("/pages/home/index");
    },
    nav: function(index) {
      this.current = index;
    },
    getInfo: function() {
      let that = this;
      if (that.loaded == true || that.loading == true) return;
      that.loading = true;
      getIntegralList(that.where).then(
        res => {
          that.loading = false;
          that.loaded = res.data.length < that.where.limit;
          that.loadTitle = that.loaded ? "လူတွေမှာအခြေခံကျတယ်" : "ပိုပြီးတင်ရန်တက်ပါ";
          that.where.page = that.where.page + 1;
          that.list.push.apply(that.list, res.data);
        },
        err => {
          uni.showToast({
				title: err.msg || err.response.data.msg|| err.response.data.message,
				icon: 'none',
				duration: 2000
			});
        }
      );
    },
    getIntegral: function() {
      let that = this;
      postSignUser(that.data).then(
        res => {
          that.info = res.data;
        },
        err => {
          uni.showToast({
				title: err.msg || err.response.data.msg|| err.response.data.message,
				icon: 'none',
				duration: 2000
			});
        }
      );
    }
  }
};
</script>
<style lang="less">
.list {
}
</style>
