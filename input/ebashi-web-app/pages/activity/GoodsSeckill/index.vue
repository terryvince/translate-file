<style scoped lang="less">
.timeScroll {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.timeItem {
  font-size: 0.22 * 100rpx;
  color: #282828;
  width: 150rpx;
  text-align: center;
  padding: 0.11 * 100rpx 0;
  background-color: none;

  &.active {
    .time {
      color: #eb3729;
    }

    .state {
      background-color: #eb3729;
      color: #fff;
      opacity: 1;
      border-radius: 30rpx;
      padding: 0 0.2 * 100rpx;
      font-weight: 800;
      height: 0.37 * 100rpx;
      line-height: 0.37 * 100rpx;
    }
  }
}

.timeItem .time {
  font-size: 0.32 * 100rpx;
  font-weight: bold;
  height: 0.37 * 100rpx;
  line-height: 0.37 * 100rpx;
}

.timeItem .state {
  height: 0.37 * 100rpx;
  line-height: 0.37 * 100rpx;
  display: inline-block;
}

.activity {
  color: #333;
}

.flash-sale .list .item .grab {
  background-color: #999;
}
.sec-list{
	background: #FFFFFF;
	border-radius: 20px;
	margin: 20rpx;
	padding: 20rpx;
}
.empty-wrap{
	margin: 20rpx;
	border-radius: 20rpx;
	height: 800rpx;
}
.timeItem.active .state{
	    background-color: #FF9D28;
}
.seckill-box::v-deep .seckill-list .seckill-item{
	margin-bottom: 30rpx;
}
</style>
<template>
  <view class="flash-sale" ref="container">
    <view class="header" v-if="headerImg">
      <image :src="headerImg" />
    </view>
    <scroll-view scroll-y="false" scroll-x="true">
      <view class="timeScroll">
		  <view class="color-text fs-32 txt-medium flex-main-start flex-column left-20 flex-none" style="width: 66rpx;margin-right: 56rpx;">
			  <text>今日</text>
			  <text>爆款</text>
		  </view>
        <view v-for="(item, index) in timeList" :key="index">
          <view v-if="active==index" class="timeItem active" style="margin-right: 56rpx;" @click="setTime(index)">
            <view class="time">{{ item.time }}</view>
            <view class="state">{{ item.state }}</view>
          </view>
          <view v-if="active!=index" class="timeItem" style="margin-right: 56rpx;" @click="setTime(index)">
            <view class="time">{{ item.time }}</view>
            <view class="state">{{ item.state }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-for="(item, index) in timeList" :key="index">
      <view v-if="active == index">
		  <!-- 倒计时 -->
        <view class="countDown font-color-red acea-row row-center-wrapper">
          <view v-if="item.status === 0" class="activity">活动已结束</view>
          <count-down
            :isDay="false"
            :tipText="'距结束仅剩 '"
            :dayText="false"
            :hourText="' : '"
            :minuteText="' : '"
            :secondText="false"
            :datatime="datatime"
            v-if="item.status === 1"
          ></count-down>
          <view v-if="item.status === 2" class="activity">活动即将开始</view>
        </view>
		
		<!-- 商品列表 -->
		<view v-if="seckillList.length>0" class="sec-list bg-white">
			<goodsList :list="seckillList" from="seckill" class="seckill-box"></goodsList>
		</view>
		
        <!-- <view class="list bg-white">
          <view
            class="item acea-row row-between-wrapper"
            v-for="(itemSeckill, indexSeckill) in seckillList"
            :key="indexSeckill"
          >
            <view class="pictrue">
              <image :src="itemSeckill.image" />
            </view>
            <view class="text acea-row row-column-around">
              <view class="line1" v-text="itemSeckill.title"></view>
              <view class="money">
                限时价
                <text class="num font-color-red" v-text="'￥' + itemSeckill.price"></text>
              </view>
              <view class="progress cart-color">
                <view class="bg-red" :style="{ width: loading ? itemSeckill.percent + '%' : '' }"></view>
                <view class="piece font-color-red" v-text="'仅剩' + itemSeckill.stock + '件'"></view>
              </view>
            </view>
            <view
              class="grab bg-color-red"
              v-if="item.status === 1 && itemSeckill.stock > 0"
              @click="goDetail(itemSeckill.id)"
            >马上抢</view>
            <view class="grab" v-if="item.status === 1 && itemSeckill.stock <= 0">已售磬</view>
            <view class="grab bg-color-red" v-if="item.status === 2">即将开始</view>
            <view class="grab bg-color-red" v-if="item.status === 0">已结束</view>
          </view>
        </view> -->
		
		<view v-if="seckillList.length === 0 && page > 1" class="empty-wrap bg-white flex-main-center flex-column">
			<image src="https://res.sdebs.com/sekill-empty.png" mode="widthFix" style="width: 262rpx;"></image>
			<text class="txt-medium fs-28 color-text-secondary top-10">暂无秒杀</text>
		</view>
		
      </view>
    </view>
  </view>
</template>
<script>
import { getSeckillConfig, getSeckillList } from "@/api/activity";
import CountDown from "@/components/CountDown";
// import { Tab, Tabs } from "vant-weapp";
import Loading from "@/components/Loading";

export default {
  name: "GoodsSeckill",
  components: {
    CountDown
  },
  props: {},
  data: function() {
    return {
      headerImg: "",
      timeList: [],
      sticky: false,
      loading: false,
      datatime: 0,
      active: 0,
      seckillList: [],
      status: false, //砍价列表是否获取完成 false 未完成 true 完成
      loadingList: false, //当前接口是否请求完成 false 完成 true 未完成
      page: 1, //页码
      limit: 5, //数量
      title: []
    };
  },
  mounted: function() {
    this.mountedStart();
  },
  onReachBottom() {
    !this.loadingList && this.getSeckillList();
  },
  methods: {
    changeTime: function(index) {
      this.active = index;
      this.getSeckillList();
    },
    mountedStart: function() {
      var that = this;
      uni.showLoading();
      getSeckillConfig().then(res => {
        that.$set(that, "headerImg", res.data.lovely);
        that.$set(that, "timeList", res.data.seckillTime);
        that.$set(that, "active", res.data.seckillTimeIndex);
        let title = [];
        title = res.data.seckillTime.map((item, index) => {
          return {
            name: "div",
            attrs: {
              class: "timeItem"
            },
            children: [
              {
                name: "div",
                attrs: {
                  class: "time"
                },
                children: [
                  {
                    type: "text",
                    text: item.time
                  }
                ]
              },
              {
                name: "div",
                attrs: {
                  class: "state"
                },
                children: [
                  {
                    type: "text",
                    text: item.state
                  }
                ]
              }
            ]
          };
        });
        that.$set(that, "title", title);
        that.datatime = that.timeList[that.active].stop;
        that.getSeckillList(that.datatime);
        that.$nextTick(function() {
          that.sticky = true;
          uni.hideLoading();
        });
      });
    },
    setTime: function(index) {
      var that = this;
      that.page = 1;
      that.loadingList = false;
      that.status = false;
      that.active = index;
      that.datatime = that.timeList[that.active].stop;
      this.seckillList = [];
      that.getSeckillList();
    },
    getSeckillList: function(stopTime) {
      var that = this;
      if (that.loadingList) return;
      if (that.status) return;
      var time = that.timeList[that.active].id;
      getSeckillList(time, {
        page: that.page,
        limit: that.limit
      }).then(res => {
        that.status = res.data.length < that.limit;
		res.data.forEach(v=>v.stop=stopTime)
        that.seckillList.push.apply(that.seckillList, res.data);
        that.page++;
        uni.hideLoading();
      });
    },
    goDetail: function(id) {
      var that = this;
      var time = that.timeList[that.active].stop;
      this.$yrouter.push({
        path: "/pages/activity/SeckillDetails/index",
        query: {
          id,
          time
        }
      });
    }
  }
};
</script>
