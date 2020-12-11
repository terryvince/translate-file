<template>
  <view class="deliver-goods">
    <header>
      <view class="order-num acea-row row-between-wrapper">
        <view class="num line1">အမှာစာနံပါတ်：{{ delivery.orderId }}</view>
        <view class="name line1">{{ delivery.nickname }}</view>
      </view>
      <view class="address">
        <view class="name">
          {{ delivery.realName }}
          <text class="phone">{{ delivery.userPhone }}</text>
        </view>
        <view>{{ delivery.userAddress }}</view>
      </view>
      <view class="line">
        <image src="@/static/images/line.jpg" />
      </view>
    </header>
    <view class="wrapper">
      <view class="item acea-row row-between-wrapper">
        <view>Delivery နည်းလမ်း</view>
        <view class="mode acea-row row-middle row-right">
          <view
            class="goods"
            :class="active === typesIndex ? 'on' : ''"
            v-for="(item, typesIndex) in types"
            :key="typesIndex"
            @click="changeType(item, typesIndex)"
          >
            {{ item.title }}
            <text class="iconfont icon-xuanzhong2"></text>
          </view>
        </view>
      </view>
      <view class="list" v-show="active === 0">
        <picker
          mode="selector"
          :range="logistics"
          class="mode"
          range-key="name"
          @change="changeLog"
        >
          <view class="item acea-row row-between-wrapper">
            <view>Courier ကုမ္ပဏီ</view>
            <input
              type="text"
              placeholder="курьерကုမ္ပဏီကိုဖြည့်ပါ"
              disabled="disabled"
              v-model="deliveryNames"
              class="mode"
            />
            <!-- <input type="text" placeholder="курьерကုမ္ပဏီကိုဖြည့်ပါ" v-model="deliveryName" class="mode" /> -->
          </view>
        </picker>
        <view class="item acea-row row-between-wrapper">
          <view>ခြေရာကောက်နိုင်မည့်နံပါတ်</view>
          <input type="text" placeholder="စာပို့နံပါတ်ကိုဖြည့်ပါ" v-model="deliveryId" class="mode" />
        </view>
      </view>
      <view class="list" v-show="active === 1">
        <view class="item acea-row row-between-wrapper">
          <view>Delivery လူ</view>
          <input type="text" placeholder="ပေးပို့သူကိုဖြည့်ပါ" v-model="deliveryName" class="mode" />
        </view>
        <view class="item acea-row row-between-wrapper">
          <view>ပို့ဖုန်း</view>
          <input type="text" placeholder="ပေးပို့ဖုန်းဖြည့်ပါ" v-model="deliveryId" class="mode" />
        </view>
      </view>
    </view>
    <view style="height:100rpx;"></view>
    <view class="confirm" @click="saveInfo">တင်သွင်းမှုအတည်ပြုပါ</view>
  </view>
</template>
<script>
import { getAdminOrderDelivery, setAdminOrderDelivery } from "@/api/admin";
import { getLogistics } from "@/api/public";
import { required } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";

export default {
  name: "GoodsDeliver",
  components: {},
  props: {},
  data: function() {
    return {
      types: [
        {
          type: "express",
          title: "သင်္ဘော"
        }
        // {
        //   type: "send",
        //   title: "ပို့ခြင်း"
        // },
        // {
        //   type: "fictitious",
        //   title: "တင်စရာမလိုပါဘူး"
        // }
      ],
      active: 0,
      order_id: "",
      delivery: [],
      logistics: [],
      delivery_type: "express",
      deliveryName: "",
      deliveryId: "",
      deliveryNames: "ကျေးဇူးပြု။ ရွေးချယ်ပါ"
    };
  },
  watch: {
    "$yroute.query.oid": function(newVal) {
      let that = this;
      if (newVal != undefined) {
        that.order_id = newVal;
        that.getIndex();
      }
    }
  },
  mounted: function() {
    this.order_id = this.$yroute.query.oid;
    this.getIndex();
    this.getLogistics();
  },
  methods: {
    changeLog: function(value) {
      this.deliveryNames = this.logistics[value.detail.value].name;
      this.deliveryName = this.logistics[value.detail.value].id;
    },
    changeType: function(item, index) {
      this.active = index;
      this.delivery_type = item.type;
      this.deliveryName = "";
      this.deliveryId = "";
    },
    getIndex: function() {
      let that = this;
      getAdminOrderDelivery(that.order_id).then(
        res => {
          that.delivery = res.data;
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: "none",
            duration: 2000
          });
        }
      );
    },
    getLogistics: function() {
      let that = this;
      getLogistics().then(
        res => {
          console.log(res.data);
          that.logistics = res.data;
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: "none",
            duration: 2000
          });
        }
      );
    },
    async saveInfo() {
      let that = this,
        delivery_type = that.delivery_type,
        deliveryName = that.deliveryName.toString(),
        deliveryId = that.deliveryId,
        save = {};
      console.log(deliveryName);
      save.orderId = that.order_id;
      save.deliveryType = that.delivery_type;
      switch (delivery_type) {
        case "express":
          try {
            await this.$validator({
              deliveryName: [required(required.message("Courier ကုမ္ပဏီ"))],
              deliveryId: [required(required.message("ခြေရာကောက်နိုင်မည့်နံပါတ်"))]
            }).validate({ deliveryName, deliveryId });
          } catch (e) {
            return validatorDefaultCatch(e);
		  }
          save.deliveryName = deliveryName;
          save.deliveryId = deliveryId;
          that.setInfo(save);
          break;
        case "send":
          try {
            await this.$validator({
              deliveryName: [required(required.message("သင်္ဘောတင်သူ၏အမည်"))],
              deliveryId: [required(required.message("Shipper ဖုန်း"))]
            }).validate({ deliveryName, deliveryId });
          } catch (e) {
            return validatorDefaultCatch(e);
          }
          save.deliveryName = deliveryName;
          save.deliveryId = deliveryId;
          that.setInfo(save);
          break;
      }
    },
    setInfo: function(item) {
      let that = this;
      console.log(item);
      setAdminOrderDelivery(item)
        .then(res => {
          console.log(res);
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
          that.$yrouter.go(-1);
        })
        .catch(err => {
          console.log(err);
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    }
  }
};
</script>
