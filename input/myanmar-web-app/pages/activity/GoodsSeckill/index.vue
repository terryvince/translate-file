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
			  <text>ဒီနေ့</text>
			  <text>ပေါက်ကွဲမှု</text>
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
		  <!-- နှစ်သစ်ကြိုဆိုပွဲ -->
        <view class="countDown font-color-red acea-row row-center-wrapper">
          <view v-if="item.status === 0" class="activity">ဒီဖြစ်ရပ်ပြီးသွားပါပြီ</view>
          <count-down
            :isDay="false"
            :tipText="'သာအဆုံးတိုင်အောင်ကျန်ရစ်၏ '"
            :dayText="false"
            :hourText="' : '"
            :minuteText="' : '"
            :secondText="false"
            :datatime="datatime"
            v-if="item.status === 1"
          ></count-down>
          <view v-if="item.status === 2" class="activity">လှုပ်ရှားမှုစတင်တော့မည်ဖြစ်သည်</view>
        </view>
		
		<!-- ကုန်ပစ္စည်းစာရင်း -->
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
                ကန့်သတ်အချိန်စျေးနှုန်း
                <text class="num font-color-red" v-text="'￥' + itemSeckill.price"></text>
              </view>
              <view class="progress cart-color">
                <view class="bg-red" :style="{ width: loading ? itemSeckill.percent + '%' : '' }"></view>
                <view class="piece font-color-red" v-text="'left သာ' + itemSeckill.stock + 'အပိုင်းအစများ'"></view>
              </view>
            </view>
            <view
              class="grab bg-color-red"
              v-if="item.status === 1 && itemSeckill.stock > 0"
              @click="goDetail(itemSeckill.id)"
            >အခုဖမ်းပါ</view>
            <view class="grab" v-if="item.status === 1 && itemSeckill.stock <= 0">chime ရောင်းခဲ့သည်</view>
            <view class="grab bg-color-red" v-if="item.status === 2">စတင်ရန်အကြောင်း</view>
            <view class="grab bg-color-red" v-if="item.status === 0">ကျော်လွန်</view>
          </view>
        </view> -->
		
		<view v-if="seckillList.length === 0 && page > 1" class="empty-wrap bg-white flex-main-center flex-column">
			<image src="https://res.sdebs.com/sekill-empty.png" mode="widthFix" style="width: 262rpx;"></image>
			<text class="txt-medium fs-28 color-text-secondary top-10">အဘယ်သူမျှမဆူး</text>
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
      status: false, //ညှိနှိုင်းစာရင်းပြီးစီးခဲ့ပါသလား။ false ဖျက်သိမ်းခဲ့သည် true သယ်ယူသည်
      loadingList: false, //လက်ရှိ interface ကိုတောင်းဆိုမှုပြီးစီးသည်ရှိမရှိ false သယ်ယူသည် true ဖျက်သိမ်းခဲ့သည်
      page: 1, //စာမျက်နှာနံပါတ်
      limit: 5, //အရေအတွက်
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
        that.getSeckillList();
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
    getSeckillList: function() {
      var that = this;
      if (that.loadingList) return;
      if (that.status) return;
      var time = that.timeList[that.active].id;
      getSeckillList(time, {
        page: that.page,
        limit: that.limit
      }).then(res => {
        that.status = res.data.length < that.limit;
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
