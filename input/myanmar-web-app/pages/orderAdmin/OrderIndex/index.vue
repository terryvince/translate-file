<template>
  <view class="order-index" ref="container">
    <image src="@/static/images/orderIndex.png" mode="widthFix" class="image" />
    <view class="header acea-row">
      <view class="item" @click="goAdminOrderList(0)">
        <view class="num">{{ census.orderCount.unpaidCount }}</view>
        <view>ငွေပေးချေမှုကိုဆိုင်းငံ့ထား</view>
      </view>
      <view class="item" @click="goAdminOrderList(1)">
        <view class="num">{{ census.orderCount.unshippedCount }}</view>
        <view>ကယ်နှုတ်ခံရဖို့</view>
      </view>
      <view class="item" @click="goAdminOrderList(2)">
        <view class="num">{{ census.orderCount.receivedCount }}</view>
        <view>လက်ခံရရှိရန်</view>
      </view>
      <view class="item" @click="goAdminOrderList(3)">
        <view class="num">{{ census.orderCount.evaluatedCount }}</view>
        <view>မှတ်ချက်</view>
      </view>
      <view class="item" @click="goAdminOrderList(4)">
        <view class="num">{{ census.orderCount.refundCount }}</view>
        <view>ပြန်အမ်းငွေ</view>
      </view>
    </view>
    <view class="wrapper">
      <view class="title">
        <text class="iconfont icon-shujutongji"></text>စာရင်းအင်းများ
      </view>
      <view class="list acea-row">
        <view class="item" @click="goStatistics({type:'price',time:'today'})">
          <view class="num">{{ census.orderTimeCount.todayPrice }}</view>
          <view>ဒီနေ့လည်ပတ်ငွေကြေး</view>
        </view>
        <view class="item" @click="goStatistics({type:'price',time:'yesterday'})">
          <view class="num">{{ census.orderTimeCount.proPrice }}</view>
          <view>မနေ့ကလည်ပတ်ငွေကြေး</view>
        </view>
        <view class="item" @click="goStatistics({type:'price',time:'month'})">
          <view class="num">{{ census.orderTimeCount.monthPrice }}</view>
          <view>ဒီလလည်ပတ်ငွေကြေးကြောင့်</view>
        </view>
        <view class="item" @click="goStatistics({type:'order',time:'today'})">
          <view class="num">{{ census.orderTimeCount.todayCount }}</view>
          <view>ဒီနေ့မှာကြားမှု</view>
        </view>
        <view class="item" @click="goStatistics({type:'order',time:'yesterday'})">
          <view class="num">{{ census.orderTimeCount.proCount }}</view>
          <view>မနေ့ကအမှာစာအရေအတွက်</view>
        </view>
        <view class="item" @click="goStatistics({type:'order',time:'month'})">
          <view class="num">{{ census.orderTimeCount.monthCount }}</view>
          <view>ဒီလမှာကြားမှာ</view>
        </view>
      </view>
    </view>
    <view class="public-wrapper">
      <view class="title">
        <text class="iconfont icon-xiangxishuju"></text>အသေးစိတ်အချက်အလက်
      </view>
      <view class="nav acea-row row-between-wrapper">
        <view class="data">ရက်စွဲ</view>
        <view class="browse">အမိန့်အရေအတွက်</view>
        <view class="turnover">လည်ပတ်ငွေကြေး</view>
      </view>
      <view class="conter">
        <view
          class="item acea-row row-between-wrapper"
          v-for="(item, orderListIndex) in list"
          :key="orderListIndex"
        >
          <view class="data">{{ item.time }}</view>
          <view class="browse">{{ item.count }}</view>
          <view class="turnover">{{ item.price }}</view>
        </view>
      </view>
    </view>
    <Loading :loaded="loaded" :loading="loading"></Loading>
  </view>
</template>
<script>
import { getStatisticsInfo, getStatisticsMonth } from "@/api/admin";
import Loading from "@/components/Loading";
export default {
  name: "OrderIndex",
  components: {
    Loading
  },
  props: {},
  data: function() {
    return {
      census: {
        orderCount: {},
        orderTimeCount: {}
      },
      list: [],
      where: {
        page: 1,
        limit: 15
      },
      loaded: false,
      loading: false
    };
  },
  mounted: function() {
    this.getIndex();
    this.getList();
  },
  onReachBottom() {
    !this.loading && this.getList();
  },
  methods: {
    goStatistics(query) {
      this.$yrouter.push({
        path: "/pages/orderAdmin/Statistics/index",
        query
      });
    },
    goAdminOrderList(types) {
      this.$yrouter.push({
        path: "/pages/orderAdmin/AdminOrderList/index",
        query: { types }
      });
    },
    getIndex: function() {
      var that = this;
      getStatisticsInfo().then(
        res => {
          that.census = res.data;
          that.census.unpaidCount = that.census.orderCount.unpaidCount;
        },
        err => {
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        }
      );
    },
    getList: function() {
      var that = this;
      if (that.loading || that.loaded) return;
      that.loading = true;
      getStatisticsMonth(that.where).then(
        res => {
          that.loading = false;
          that.loaded = res.data.length < that.where.limit;
          that.list.push.apply(that.list, res.data);
          that.where.page = that.where.page + 1;
        },
        err => {
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        },
        300
      );
    }
  }
};
</script>
