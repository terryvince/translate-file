<template>
  <view class="evaluate-list" ref="container">
    <view class="header">
      <view class="generalComment acea-row row-between-wrapper">
        <view class="acea-row row-middle font-color-red">
          <text class="evaluate">နိုင်ပြီ</text>
          <view class="start" :class="'star' + replyData.replyStar"></view>
        </view>
        <view>
          <text class="font-color-red">{{ replyData.replyChance || 0 }}%</text>
		  <text>ချီးမွမ်းမှုနှုန်း</text>
        </view>
      </view>
      <view class="nav acea-row row-middle">
        <view
          class="acea-row row-center-wrapper"
          v-for="(item, navListIndex) in navList"
          :key="navListIndex"
          @click="changeType(navListIndex)"
        >
          <view
            class="item"
            :class="currentActive === navListIndex ? 'bg-color-red' : ''"
            v-if="item.num"
          >
		  <text>{{ item.evaluate }}({{ item.num }})</text>
          </view>
        </view>
      </view>
    </view>
    <UserEvaluation :reply="reply"></UserEvaluation>
    <Loading :loaded="loadend" :loading="loading"></Loading>
  </view>
</template>
<script>
import UserEvaluation from "@/components/UserEvaluation";
import { getReplyConfig, getReplyList } from "@/api/store";
import Loading from "@/components/Loading";

export default {
  name: "EvaluateList",
  components: {
    UserEvaluation,
    Loading
  },
  props: {},
  data: function() {
    return {
      product_id: 0,
      replyData: {},
      navList: [
        { evaluate: "အားလုံး", num: 0 },
        { evaluate: "ချီးမွမ်းကြလော့", num: 0 },
        { evaluate: "ပျမ်းမျှ", num: 0 },
        { evaluate: "အနုတ်လက္ခဏာအဆင့်သတ်မှတ်ချက်များ", num: 0 }
      ],
      currentActive: 0,
      page: 1,
      limit: 8,
      reply: [],
      loadTitle: "",
      loading: false,
      loadend: false
    };
  },
  mounted: function() {
    this.product_id = this.$yroute.query.id;
    this.getProductReplyCount();
    this.getProductReplyList();
  },
  onReachBottom() {
    !this.loading && this.getProductReplyList();
  },
  methods: {
    getProductReplyCount: function() {
      let that = this;
      getReplyConfig(that.product_id).then(res => {
        that.$set(that, "replyData", res.data);
        that.navList[0].num = res.data.sumCount;
        that.navList[1].num = res.data.goodCount;
        that.navList[2].num = res.data.inCount;
        that.navList[3].num = res.data.poorCount;
      });
    },
    getProductReplyList: function() {
      let that = this;
      if (that.loading) return; //လာမည့်တောင်းဆိုမှုကိုပိတ်ပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      if (that.loadend) return; //လက်ရှိတောင်းဆိုမှုကိုအဆုံးသတ်ခြင်းကိုတားဆီးပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      that.loading = true;
      let q = { page: that.page, limit: that.limit, type: that.currentActive };
      getReplyList(that.product_id, q).then(res => {
        that.loading = false;
        //apply();jsarray တစ်ခုကိုအခြား array ထဲသို့ထည့်ပါ;
        that.reply.push.apply(that.reply, res.data);
        that.loadend = res.data.length < that.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
        that.page = that.page + 1;
      });
    },
    changeType: function(index) {
      let that = this;
      that.currentActive = index;
      that.page = 1;
      that.loadend = false;
      that.$set(that, "reply", []);
      that.getProductReplyList();
    }
  }
};
</script>
<style scoped lang="less">
.noCommodity {
  height: 8*100rpx;
  background-color: #fff;
}
</style>
