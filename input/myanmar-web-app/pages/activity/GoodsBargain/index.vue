<template>
  <view class="bargain-list">
    <!-- <view class="header">
      <image src="@/static/images/cut-bg.png" alt="">
    </view>-->
    <view class="list" v-if="bargainLis.length > 0">
      <view
        class="item acea-row row-between-wrapper"
        v-for="(item, bargainLisIndex) in bargainLis"
        :key="bargainLisIndex"
      >
        <view class="pictrue">
          <image :src="item.image" />
        </view>
        <view class="text acea-row row-column-around">
          <view class="line1" v-text="item.title"></view>
          <view class="num">
            <text class="iconfont icon-pintuan"></text>
            {{ item.people }}လူများပါဝင်နေကြသည်
          </view>
          <view class="money font-color-red">
            ဖြတ်နိုင်ပါတယ်: ￥
            <text class="price">{{item.minPrice}}</text>
          </view>
        </view>
        <view class="cutBnt bg-color-red" @click="goDetail(item.id)">
          <text class="iconfont icon-kanjia"></text>ညှိနှိုင်းမှုတွင်ပါ ၀ င်ပါ
        </view>
      </view>
      <view class="load font-color-red" v-if="!status" @click="getBargainList">နောက်ထပ်တင်ရန်နှိပ်ပါ</view>
    </view>
    <!-- <view class="noCommodity" style="background-color: #fff;" v-if="bargainLis.length === 0">
      <view class="noPictrue">
        <image src="@/static/images/noGood.png" class="image" />
      </view>
    </view> -->
  </view>
</template>
<script>
import { getBargainList } from "@/api/activity";
export default {
  name: "GoodsBargain",
  components: {},
  props: {},
  data: function() {
    return {
      bargainLis: [], //ညှိနှိုင်းစာရင်း
      status: false, //ညှိနှိုင်းစာရင်းပြီးစီးခဲ့ပါသလား။ false ဖျက်သိမ်းခဲ့သည် true သယ်ယူသည်
      loading: false, //လက်ရှိ interface ကိုတောင်းဆိုမှုပြီးစီးသည်ရှိမရှိ false သယ်ယူသည် true ဖျက်သိမ်းခဲ့သည်
      page: 1, //စာမျက်နှာနံပါတ်
      limit: 20 //အရေအတွက်
    };
  },
  mounted: function() {
    this.getBargainList();
  },
  methods: {
    getBargainList: function() {
      var that = this;
      if (that.loading) return;
      if (that.status) return;
      that.loading = true;
      getBargainList({ page: that.page, limit: that.limit }).then(res => {
        that.status = res.data.length < that.limit;
        that.bargainLis.push.apply(that.bargainLis, res.data);
        that.page++;
        that.loading = false;
      });
    },
    goDetail: function(id) {
      this.$yrouter.push({
        path: "/pages/activity/DargainDetails/index",
        query: { id, partake: 0 }
      });
    }
  }
};
</script>

<style >
page{
    background-color: rgb(245, 245, 245);
}
</style>
