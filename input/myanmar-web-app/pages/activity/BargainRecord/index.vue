<template>
  <view class="bargain-record" ref="container">
    <view class="item" v-for="(item, bargainrecordIndex) in bargain" :key="bargainrecordIndex">
      <view class="picTxt acea-row row-between-wrapper">
        <view class="pictrue">
          <image :src="item.image" />
        </view>
        <view class="text acea-row row-column-around">
          <view class="line1">{{ item.title }}</view>
          <count-down
            :isDay="true"
            :tipText="'နှစ်သစ်ကြိုဆိုပွဲ '"
            :dayText="' နေ့ '"
            :hourText="' အချိန် '"
            :minuteText="' မိနစ် '"
            :secondText="' ဒုတိယ'"
            :datatime="item.datatime"
          ></count-down>
          <view class="money font-color-red">
            ဖြတ်ယူ
            <text class="symbol">￥</text>
            <text class="num">{{ item.residuePrice }}</text>
          </view>
        </view>
      </view>
      <view class="bottom acea-row row-between-wrapper">
        <view class="purple" v-if="item.status === 1">တိုးတက်မှုအတွက်လှုပ်ရှားမှု</view>
        <view class="success" v-else-if="item.status === 3">အောင်မြင်သောညှိနှိုင်းမှု</view>
        <view class="end" v-else>ဒီဖြစ်ရပ်ပြီးသွားပါပြီ</view>
        <view class="acea-row row-middle row-right">
          <view
            class="bnt cancel"
            v-if="item.status === 1"
            @click="getBargainUserCancel(item.bargainId)"
          >ဖြစ်ရပ်ဖျက်သိမ်း</view>
          <view
            class="bnt bg-color-red"
            v-if="item.status === 1"
            @click="goDetail(item.bargainId)"
          >ညှိနှိုင်းဆက်လက်</view>
          <view class="bnt bg-color-red" v-else @click="goList">တစ်ခုထပ်ဖွင့်</view>
        </view>
      </view>
    </view>
    <Loading :loaded="status" :loading="loadingList"></Loading>
  </view>
</template>
<script>
import CountDown from "@/components/CountDown";
import { getBargainUserList, getBargainUserCancel } from "@/api/activity";
import Loading from "@/components/Loading";

export default {
  name: "BargainRecord",
  components: {
    CountDown,
    Loading
  },
  props: {},
  data: function() {
    return {
      bargain: [],
      status: false, //ညှိနှိုင်းစာရင်းပြီးစီးခဲ့ပါသလား။ false ဖျက်သိမ်းခဲ့သည် true သယ်ယူသည်
      loadingList: false, //လက်ရှိ interface ကိုတောင်းဆိုမှုပြီးစီးသည်ရှိမရှိ false သယ်ယူသည် true ဖျက်သိမ်းခဲ့သည်
      page: 1, //စာမျက်နှာနံပါတ်
      limit: 20 //အရေအတွက်
    };
  },
  mounted: function() {
    this.getBargainUserList();
  },
  onReachBottom() {
    !this.loadingList && this.getBargainUserList();
  },
  methods: {
    goDetail: function(id) {
      this.$yrouter.push({
        path: "/pages/activity/DargainDetails/index",
        query: { id, partake: 0 }
      });
    },
    goList: function() {
      this.$yrouter.push({
        path: "/pages/activity/GoodsBargain/index"
      });
    },
    getBargainUserList: function() {
      var that = this;
      if (that.loadingList) return;
      if (that.status) return;
      getBargainUserList({ page: that.page, limit: that.limit })
        .then(res => {
          that.status = res.data.length < that.limit;
          that.bargain.push.apply(that.bargain, res.data);
          that.page++;
          that.loadingList = false;
        })
        .catch(res => {
           uni.showToast({
                          title: res.msg,
                          icon: "none",
                          duration: 2000
                        });
        });
    },
    getBargainUserCancel: function(bargainId) {
      var that = this;
      getBargainUserCancel({ bargainId: bargainId })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "success",
            duration: 2000
          });
          that.status = false;
          that.loadingList = false;
          that.page = 1;
          that.bargain = [];
          that.getBargainUserList();
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
