<template>
  <view class="sign-record" ref="container">
    <view class="list">
      <view class="item" v-for="(item, signListIndex) in signList" :key="signListIndex">
        <view class="data">{{ item.time }}</view>
        <view class="listn">
          <view
            class="itemn acea-row row-between-wrapper"
            v-for="(itemn, indexn) in item.list"
            :key="indexn"
          >
            <view>
              <view class="name line1">{{ itemn.title }}</view>
              <view>{{ itemn.addTime }}</view>
            </view>
            <view class="num font-color-red">+{{ itemn.number }}</view>
          </view>
        </view>
      </view>
    </view>
    <Loading :loaded="loadend" :loading="loading"></Loading>
  </view>
</template>
<script>
import { getSignMonth } from "@/api/user";
import Loading from "@/components/Loading";
export default {
  name: "SignRecord",
  components: {
    Loading
  },
  props: {},
  data: function() {
    return {
      page: 1,
      limit: 3,
      signList: [],
      loading: false,
      loadend: false,
      active: false
    };
  },
  mounted: function() {
    this.signListTap();
  },
    onReachBottom() {
    !this.loading && this.signListTap();
  },
  methods: {
    signListTap: function() {
      let that = this;
      if (that.loading) return; //လာမည့်တောင်းဆိုမှုကိုပိတ်ပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      if (that.loadend) return; //လက်ရှိတောင်းဆိုမှုကိုအဆုံးသတ်ခြင်းကိုတားဆီးပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      that.loading = true;
      getSignMonth(that.page, that.limit).then(res => {
        that.loading = false;
        //apply();jsarray တစ်ခုကိုအခြား array ထဲသို့ထည့်ပါ;
        that.signList.push.apply(that.signList, res.data);
        that.loadend = res.data.length < that.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
        that.page = that.page + 1;
      });
    }
  }
};
</script>
