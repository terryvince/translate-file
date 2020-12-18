<style lang="less">
	page{
		background-color: #F6F6F6;
	}
</style>
<style lang="less" scoped>
	.group-banner{
		width: 100%;
		height: 220rpx;
		background: url(https://res.sdebs.com/group-list-banner.png)no-repeat center;
		background-size: 100% 100%;
	}
	.group-wrap{
		background-color: white;
		margin: -115rpx 20rpx 23rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		position: relative;
		z-index: 2;
	}
	.group-box::v-deep .group-list .group-item{
		margin-bottom: 30rpx;
	}
</style>
<template>
  <view class="group-list" ref="container">
    <!-- <view class="list" v-if="combinationList.length>0">
      <view
        class="item acea-row row-between-wrapper"
        v-for="(item, combinationListIndex) in combinationList"
        :key="combinationListIndex"
        @click="link(item.id)"
      >
        <view class="pictrue">
          <image :src="item.image" />
        </view>
        <view class="text">
          <view class="line1" v-text="item.title"></view>
          <view class="acea-row">
            <view class="team acea-row row-middle cart-color">
              <view class="iconfont icon-pintuan"></view>
              <view class="num" v-text="item.people + '人团'"></view>
            </view>
          </view>
          <view class="bottom acea-row row-between-wrapper">
            <view class="money">
              ￥
              <text class="num" v-text="item.price"></text>
              <text class="y-money" v-text="'￥' + item.productPrice"></text>
            </view>
            <view class="groupBnt bg-color-red">
              去拼团
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
        </view>
      </view>
      <Loading :loaded="status" :loading="loadingList"></Loading>
    </view> -->
	<view class="group-banner over-hide">
		<view class="flex-main-between color-white txt-medium padding-beside-20" style="margin-top: 36rpx;">
			<text class="fs-32">爆款拼团</text>
			<text class="fs-26">省钱省心限时拼</text>
		</view>
	</view>
	<view class="group-wrap" v-if="combinationList.length>0">
		<goodsList :list="combinationList" from="group" class="group-box"></goodsList>
	</view>
    <view class="noCommodity bg-white" style="padding-bottom: 20rpx;" v-if="combinationList.length === 0">
      <view class="noPictrue">
        <image src="@/static/images/noGood.png" class="image" />
      </view>
    </view>
  </view>
</template>
<script>
import { getCombinationList } from "@/api/activity";
import Loading from "@/components/Loading";

export default {
  name: "GoodsGroup",
  components: {
    Loading
  },
  props: {},
  data: function() {
    return {
      combinationList: [],
      status: false, //砍价列表是否获取完成 false 未完成 true 完成
      loading: false, //当前接口是否请求完成 false 完成 true 未完成
      page: 1, //页码
      limit: 999, //数量
      loadingList: false
    };
  },
  mounted: function() {
    // document.querySelector('body').setAttribute('style', 'background-color:#eb3729');
    this.getCombinationList();
  },
  onReachBottom() {
    !this.loadingList && this.getCombinationList();
  },
  methods: {
    getCombinationList: function() {
      var that = this;
      if (that.loading) return;
      if (that.status) return;
      getCombinationList({ page: that.page, limit: that.limit }).then(res => {
        that.status = res.data.length < that.limit;
        that.combinationList.push.apply(that.combinationList, res.data);
        that.page++;
        that.loading = false;
      });
    },
    link: function(id) {
      this.$yrouter.push({
        path: "/pages/activity/GroupDetails/index",
        query: { id }
      });
    }
  }
};
</script>
