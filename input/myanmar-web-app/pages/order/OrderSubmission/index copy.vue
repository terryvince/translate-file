<template>
  <view class="order-submission">
    <view class="allAddress" :style="systemStore ? '' : 'padding-top: 0.2*100rpx'">
      <view class="nav acea-row">
        <view
          class="item font-color-red"
          :class="shipping_type === 0 ? 'on' : 'on2'"
          @click="addressType(0)"
          v-if="systemStore"
        ></view>
        <!-- <view
          class="item font-color-red"
          :class="shipping_type === 1 ? 'on' : 'on2'"
          @click="addressType(1)"
          v-if="systemStore"
        ></view> -->
      </view>
      <view
        class="address acea-row row-between-wrapper"
        v-if="shipping_type === 0"
        @click="addressTap"
      >
        <view class="addressCon" v-if="addressInfo.realName">
          <view class="name">
            {{ addressInfo.realName }}
            <text class="phone">{{ addressInfo.phone }}</text>
          </view>
          <view>
            <text class="default font-color-red" v-if="addressInfo.isDefault">[မူလက]</text>
            {{ addressInfo.province }}{{ addressInfo.city}}{{ addressInfo.district }}{{ addressInfo.detail }}
          </view>
        </view>
        <view class="addressCon" v-else>
          <view class="setaddress">ပို့သည့်လိပ်စာကိုသတ်မှတ်ပါ</view>
        </view>
        <view class="iconfont icon-jiantou"></view>
      </view>
      <div class="address acea-row row-between-wrapper" v-else @click="showStoreList">
        <div class="addressCon">
          <div class="name">
            {{ storeItems.name || systemStore.name }}
            <span
              class="phone"
            >{{storeItems.phone || systemStore.phone}}</span>
          </div>
          <div>{{ storeItems.address || systemStore.address }}</div>
        </div>
        <div class="iconfont icon-jiantou"></div>
      </div>
      <view class="line">
        <image src="@/static/images/line.jpg" />
      </view>
    </view>
    <OrderGoods :evaluate="0" :cartInfo="orderGroupInfo.cartInfo"></OrderGoods>
    <view class="wrapper">
      <view class="item acea-row row-between-wrapper" @click="couponTap" v-if="deduction === false && mode!='vip' && mode!='point'">
        <view>ကူပွန်</view>
        <view class="discount">
          {{ usableCoupon.couponTitle || "ကျေးဇူးပြု။ ရွေးချယ်ပါ" }}
          <text class="iconfont icon-jiantou"></text>
        </view>
      </view>
      <view
        class="item acea-row row-between-wrapper"
        v-if="deduction === false && enableIntegral === true && mode!='vip'"
      >
        <view>ငွေပေးချေမှုအချက်များ</view>
        <view class="discount">
          <view class="select-btn">
            <view class="checkbox-wrapper">
              <!-- <input type="checkbox" v-model="useIntegral" @click="changeUseIntegral"/> -->
              <checkbox-group @change="changeUseIntegral">
                <label class="well-check">
                  <text class="integral">
                    လက်ရှိအချက်များ
                    <text class="num font-color-red">{{ userInfo.integral || 0 }}</text>
                  </text>
                  <checkbox value="true" :checked="useIntegral ? true : false"></checkbox>
                </label>
              </checkbox-group>
            </view>
          </view>
        </view>
      </view>

	<view v-if="shipping_type === 0">
		<view class="item acea-row row-between-wrapper">
		  <view>Courier အခကြေးငွေ</view>
		  <!-- <view class="discount">
			{{
			orderGroupInfo.priceGroup.storePostage > 0
			? orderGroupInfo.priceGroup.storePostage
			: "အခမဲ့ပို့ပေးသည်"
			}}
		  </view> -->
				<view class="discount">
				  {{
				  orderPrice.payPostage > 0
				  ? orderPrice.payPostage
				  : "အခမဲ့ပို့ပေးသည်"
				  }}
				</view>
		</view>
		<view class="item acea-row row-between-wrapper">
		  <view>ဆက်သွယ်ရန်ဖုန်းနံပါတ်</view>
		  <view class="discount">
			<input v-show="addressInfo.phone" type="text" :disabled="true" v-model="addressInfo.phone" />
		  </view>
		</view>
	</view>
      <view v-else>
        <view class="item acea-row row-between-wrapper">
          <view>ဆက်သွယ်ရန်ပုဂ္ဂိုလ်</view>
          <view class="discount">
            <input type="text" placeholder="ကျေးဇူးပြု၍ သင်၏အမည်နာမည်ဖြည့်ပါ" v-model="contacts" />
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view>ဆက်သွယ်ရန်ဖုန်းနံပါတ်</view>
          <view class="discount">
            <input type="text" placeholder="ကျေးဇူးပြု၍ သင့်အဆက်အသွယ်နံပါတ်ဖြည့်ပါ" v-model="contactsTel" />
          </view>
        </view>
      </view>
      <view class="item">
        <view>မှတ်ချက်များသတင်းအချက်အလက်（150စကားလုံးများအတွင်း）</view>
        <textarea v-model="mark"></textarea>
      </view>
    </view>
	
	<view class="wrapper">
	  <view class="item acea-row row-between-wrapper">
		<view>ID အမည်</view>
		<view class="discount">
		  <input v-if="isShowInput" type="text" maxlength="16" v-model="cardName" placeholder="ကျေးဇူးပြု၍ သင့်နာမည်ရေးထည့်ပါ"/>
		</view>
	  </view>
	  <view class="item acea-row row-between-wrapper">
	  		<view>လက်မှတ်အမျိုးအစား</view>
	  		<view class="discount">
	  		  <radio-group @change="changeCardType">
	  		  	<label>
	  		  		<radio value="1" :checked="cardType==1"/><text>ID ကဒ်</text>
	  		  	</label>
	  		  	<label class="left-10">
	  		  		<radio value="2" :checked="cardType==2"/><text>နိုင်ငံကူးလက်မှတ်</text>
	  		  	</label>
				<label class="left-10">
					<radio value="3" :checked="cardType==3"/><text>ဟောင်ကောင်နှင့်မကာအို Pass</text>
				</label>
	  		  </radio-group>
	  		</view>
	  </view>
	  <view v-if="cardType" class="item acea-row row-between-wrapper">
		<view>ID နံပါတ်</view>
		<view class="discount">
		  <input v-if="isShowInput3" type="text" maxlength="18" v-model="cardNumber" placeholder-style="color:#999;" placeholder="ကျေးဇူးပြုပြီးနံပါတ်ထည့်ပါ"/>
		</view>
	  </view>
	</view>
	<view class="color-gray top-10 fs-24" style="padding: 0 30rpx;margin-bottom: 20rpx;">
		<view class="flex-main-start">
			<text class="flex-none flex-item-align-start">အကောက်ခွန်စည်းမျဉ်းများ：</text>
			<text class="flex-1">နယ်စပ်ဖြတ်ကျော်တစ်အိမ်မှတစ်အိမ်ကုန်ပစ္စည်းများသည် ၀ င်သည့်အခါစစ်ဆေးရန်ကြေငြာရန်လိုအပ်သည်，အထောက်အထားအချက်အလက်များအကောက်ခွန်ရှင်းလင်းရေးအတွက်သာအသုံးပြုသည်。</text>
		</view>
		<view class="flex-main-start" style="color: #e93323;">
			<text class="flex-item-align-start">သိကောင်းစရာများ：</text>
			<text>မမှန်ကန်သောသတင်းအချက်အလက်ဖြည့်တင်းမှုကြောင့်အကောက်ခွန်များကိုရှင်းလင်းရန်ပျက်ကွက်မှုအန္တရာယ်ကို ၀ ယ်သူက ၀ ယ်သည်。</text>
		</view>
	</view>
	
    <view v-if="mode!='point'" class="wrapper">
      <view class="item">
        <view>ငွေပေးချေစနစ်</view>
        <view class="list">
          <view
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="isWeixin"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-weixin2" :class="active === 'weixin' ? 'bounceIn' : ''"></view>WeChat Pay
            </view>
            <view class="tip">WeChat အမြန်ငွေပေးချေမှု</view>
          </view>
          <view
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="!isWeixin"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-weixin2" :class="active === 'weixin' ? 'bounceIn' : ''"></view>WeChat Pay
            </view>
            <view class="tip">WeChat အမြန်ငွေပေးချေမှု</view>
          </view>
          <view
            class="payItem acea-row row-middle"
            :class="active === 'yue' ? 'on' : ''"
            @click="payItem('yue')"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-icon-test" :class="active === 'yue' ? 'bounceIn' : ''"></view>ငွေလက်ကျန်
            </view>
            <view class="tip">ရရှိနိုင်သောလက်ကျန်ငွေ：{{ userInfo.nowMoney || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
	
    <view class="moneyList">
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
        <view>စုစုပေါင်းကုန်ပစ္စည်းစျေးနှုန်း：</view>
        <view class="money">￥{{ orderPrice.totalPrice }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.payPostage > 0">
        <view>သင်္ဘောဖြင့်ကုန်ပစ္စည်းပို့ခြင်း：</view>
        <view class="money">￥{{ orderPrice.payPostage }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.couponPrice > 0">
        <view>ကူပွန်နှုတ်ယူခြင်း：</view>
        <view class="money">-￥{{ orderPrice.couponPrice }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.deductionPrice > 0">
        <view>ငွေပေးချေမှုအချက်များ：</view>
        <view class="money">-￥{{ orderPrice.deductionPrice }}</view>
      </view>
    </view>
    <view style="height:120rpx"></view>
    <view class="footer acea-row row-between-wrapper">
      <view class="flex-main-start flex-1">
        <view>စုစုပေါင်း:</view>
        <view class="font-color-red">￥{{ orderPrice.payPrice }}</view>
      </view>
      <view class="settlement flex-none" @click="createOrder">ယခုအခြေချ</view>
    </view>
    <CouponListWindow
      v-on:couponchange="changecoupon($event)"
      v-model="showCoupon"
      :price="orderPrice.totalPrice"
      :checked="usableCoupon.id"
      @checked="changeCoupon"
      :cartid="cartid"
    ></CouponListWindow>
    <AddressWindow
      @checked="changeAddress($event)"
      @redirect="addressRedirect"
      v-model="showAddress"
      :checked="addressInfo.id"
      ref="mychild"
    ></AddressWindow>
  </view>
</template>
<style scoped lang="less">
// cover-view.footer cover-view{
// 	overflow: visible;
// }
.order-submission .wrapper .shipping select {
  color: #999;
  padding-right: 0.15 * 100rpx;
}

.order-submission .wrapper .shipping .iconfont {
  font-size: 0.3 * 100rpx;
  color: #515151;
}

.order-submission .allAddress {
  width: 100%;
  background-image: linear-gradient(to bottom, #eb3729 0%, #eb3729 100%);
  background-image: -webkit-linear-gradient(
    to bottom,
    #eb3729 0%,
    #eb3729 100%
  );
  background-image: -moz-linear-gradient(to bottom, #eb3729 0%, #eb3729 100%);
  padding-top: 1 * 100rpx;
}

.order-submission .allAddress .nav {
  margin: 0 auto;
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
}

.order-submission .allAddress .nav .item {
  flex: 1;
  position: relative;
}

.order-submission .allAddress .nav .item.on {
  position: relative;
}

.order-submission .allAddress .nav .item.on:before {
  position: absolute;
  bottom: 0;
  content: "အမြန်ပို့ဆောင်မှု";
  font-size: 0.28 * 100rpx;
  display: block;
  height: 0;
  left: 0;
  right: 0;
  border-width: 0.4 * 100rpx;
  border-style: solid;
  border-color: #fff;
  z-index: 9;
  text-align: center;
  line-height: 0.14 * 100rpx;
}

.order-submission .allAddress .nav .item:nth-of-type(2).on:before {
  content: "စတိုးဆိုင်မှာယူပါ";
  border-width: 0.4 * 100rpx;
}

.order-submission .allAddress .nav .item.on2 {
  position: relative;
}

.order-submission .allAddress .nav .item.on2:before {
  position: absolute;
  bottom: 0;
  content: "စတိုးဆိုင်မှာယူပါ";
  font-size: 0.28 * 100rpx;
  display: block;
  height: 0;
  left: 0;
  right: 0;
  border-width: 0.4 * 100rpx;
  border-style: solid;
  border-color: #d5e6e6;
  text-align: center;
  line-height: 0.14 * 100rpx;
}

.order-submission .allAddress .nav .item:nth-of-type(1).on2:before {
  content: "အမြန်ပို့ဆောင်မှု";
  border-width: 0.4 * 100rpx;
}

.order-submission .allAddress .address {
  width: 6.91 * 100rpx;
  height: 1.5 * 100rpx;
  margin: 0 auto;
  box-sizing: border-box;
}

.order-submission .allAddress .line {
  width: 7.1 * 100rpx;
  margin: 0 auto;
}

.order-submission .wrapper .item .discount input::placeholder {
  color: #71D676;
}
.settlement{
	background-color: ;
}
</style>

<script>
import OrderGoods from "@/components/OrderGoods";
import CouponListWindow from "@/components/CouponListWindow";
import AddressWindow from "@/components/AddressWindow";
import { postOrderConfirm, postOrderComputed, createOrder } from "@/api/order";
import { mapGetters } from "vuex";
import { weappPay } from "@/libs/wechat";
import { isWeixin } from "@/utils";

const NAME = "OrderSubmission",
  _isWeixin = isWeixin();
export default {
  name: NAME,
  components: {
    OrderGoods,
    CouponListWindow,
    AddressWindow
  },
  props: {},
  data: function() {
    return {
      cardName:'',
	  cardNumber:'',
	  cardType:'',
      offlinePayStatus: 2,
      from: this.$deviceType,
      deduction: true,
      enableIntegral: true,
      enableIntegralNum: 0,
      isWeixin: _isWeixin,
      pinkId: 0,
      active: _isWeixin ? "weixin" : "yue",
      showCoupon: false,
      showAddress: false,
      addressInfo: {},
      couponId: 0,
      orderGroupInfo: {
        priceGroup: {}
      },
      usableCoupon: {},
      addressLoaded: false,
      useIntegral: false,
      orderPrice: {
        payPrice: "တွက်ချက်သည်"
      },
      mark: "",
      systemStore: {},
      shipping_type: 0,
      contacts: "",
      contactsTel: "",
      storeSelfMention: 0,
      cartid: "",
	  mode:'',
	  isShowInput:false,
	  isShowInput2:false,
	  isShowInput3:false
    };
  },
  computed: mapGetters(["userInfo", "storeItems"]),
  watch: {
    useIntegral() {
      this.computedPrice();
    },
    $yroute(n) {
      if (n.name === NAME) this.getCartInfo();
    },
    shipping_type() {
      this.computedPrice();
    }
  },
  onPageScroll : function(e) { //nvuescroll scroll ကိုမထောက်ပံ့ပါဘူး，ရရှိနိုင်bindingxအစား
      console.log("စာလိပ်အကွာအဝေးသည်：" + e.scrollTop);
	  this.isShowInput = (e.scrollTop>85)
	  this.isShowInput2 = (e.scrollTop>70)
	  this.isShowInput3 = (e.scrollTop>195)
  },
  mounted: function() {
    let that = this;
    this.$store.dispatch("getUser", true);
    that.getCartInfo();
    console.log(that.$yroute);
    if (that.$yroute.query.pinkid !== undefined) {
      that.pinkId = that.$yroute.query.pinkid;
    }
    if (that.$yroute.query.id !== undefined) {
      that.cartid = that.$yroute.query.id;
      console.log(that.cartid)
    }
	that.mode = that.$yroute.query.mode || ''
	if(that.mode == 'point'){ // အမှတ်နှုတ်ယူခြင်းကိုပုံမှန်အားဖြင့်စစ်ဆေးသည်
		this.useIntegral = 'true'
	}
  },
  methods: {
	changeCardType(e){
		this.cardType = e.detail.value
	},
    showStoreList() {
      this.$store.commit("get_to", "orders");
      this.$yrouter.push({
        path: "/pages/shop/StoreList/index"
      });
    },
    addressType: function(index) {
      if (index && !this.systemStore.id) {
        uni.showToast({
          title: "စတိုးဆိုင်သတင်းအချက်အလက်မရှိပါ，စတိုးဆိုင်မှာကောက်ဖို့သင်ရွေးလို့မရပါဘူး！",
          icon: "none",
          duration: 2000
        });
        return;
      }
      this.shipping_type = index;
    },
    changeUseIntegral: function(e) {
      // this.computedPrice();
      this.useIntegral = e.mp.detail.value[0];
    },
    computedPrice() {
      let shipping_type = this.shipping_type;
	  const couponId = this.mode == 'point' ? 0 : this.usableCoupon.id // အချက်များကုန်တိုက်သည်ကူပွန်များကိုမကျော်ဖြတ်နိုင်ပါ
      postOrderComputed(this.orderGroupInfo.orderKey, {
        addressId: this.addressInfo.id,
        useIntegral: this.useIntegral ? 1 : 0,
        couponId: couponId || 0,
        shipping_type: parseInt(shipping_type) + 1,
		type: this.mode == 'point' ? 1 : 0
      }).then(res => {
        const data = res.data;
        if (data.status === "EXTEND_ORDER") {
          this.$yrouter.replace({
            path: "/pages/order/OrderDetails/index",
            query: {
              id: data.result.orderId
            }
          });
        } else {
          this.orderPrice = data.result;
        }
      });
    },
    getCartInfo() {
      const cartIds = this.$yroute.query.id;
      if (!cartIds) {
        uni.showToast({
          title: "မမှန်ကန်ကြောင်း parameters တွေကို",
          icon: "none",
          duration: 2000
        });
        return this.$yrouter.back();
      }
	  // အမှာစာဒေတာကိုရယူပါ
      postOrderConfirm(cartIds)
        .then(res => {
          this.offlinePayStatus = res.data.offline_pay_status;
          this.orderGroupInfo = res.data;
          this.deduction = res.data.deduction;
          this.usableCoupon = res.data.usableCoupon || {};
          this.addressInfo = res.data.addressInfo || {};
          this.systemStore = res.data.systemStore || {};
          this.storeSelfMention = res.data.storeSelfMention;
		  this.cardName = this.addressInfo.realName || ''   // ရှင်းလင်းရေးသတင်းအချက်အလက်
		  this.cardNumber = this.addressInfo.cardNumber || ''
		  this.cardType = this.addressInfo.cardType || ''
          this.computedPrice();
        })
        .catch(() => {
          uni.showToast({
            title: "အမှာစာဒေတာကိုတင်မရပါ",
            icon: "none",
            duration: 2000
          });
        });
    },
    addressTap: function() {
      this.showAddress = true;
      if (!this.addressLoaded) {
        this.addressLoaded = true;
        this.$refs.mychild.getAddressList();
      }
    },
    addressRedirect() {
      this.addressLoaded = false;
      this.showAddress = false;
    },
    couponTap: function() {
      this.showCoupon = true;
    },
    changeCoupon: function(coupon) {
      if (!coupon) {
        this.usableCoupon = {
          couponTitle: "ကူပွန်မရှိပါ",
          id: 0
        };
      } else {
        this.usableCoupon = coupon;
      }
      this.computedPrice();
    },
    payItem: function(index) {
      this.active = index;
    },
    changeAddress(addressInfo) {
	  console.log('addressInfo:',addressInfo)
      this.addressInfo = addressInfo;
	  this.cardName = addressInfo.realName || ''   // ရှင်းလင်းရေးသတင်းအချက်အလက်
	  this.cardNumber = addressInfo.cardNumber || ''
	  this.cardType = addressInfo.cardType || ''
	  this.computedPrice();
    },
    createOrder() {
      let shipping_type = this.shipping_type;
	  if(this.mode=='point' && this.orderPrice.payPrice>0){
		  uni.showToast({
			icon:'none',
		  	title:'အချက်များမလုံလောက်ပါ！'
		  })
		  return
	  }
      if (!this.active) {
        uni.showToast({
          title: "ကျေးဇူးပြု၍ ငွေပေးချေမှုစနစ်ကိုရွေးချယ်ပါ",
          icon: "none",
          duration: 2000
        });
        return;
      }
      if (!this.addressInfo.id && !this.shipping_type) {
        uni.showToast({
          title: "ကျေးဇူးပြု၍ ပို့ပေးသည့်လိပ်စာကိုရွေးပါ",
          icon: "none",
          duration: 2000
        });
        return;
      }

      if (this.shipping_type) {
        if (
          (this.contacts === "" || this.contactsTel === "") &&
          this.shipping_type
        ) {
          uni.showToast({
            title: "ကျေးဇူးပြု၍ ဆက်သွယ်ရန်ပုဂ္ဂိုလ်သို့မဟုတ်ဖုန်းနံပါတ်ဖြည့်ပါ",
            icon: "none",
            duration: 2000
          });
          return;
        }

        if (!/^1(3|4|5|7|8|9|6)\d{9}$/.test(this.contactsTel)) {
          uni.showToast({
            title: "ကျေးဇူးပြု၍ မှန်ကန်သောဖုန်းနံပါတ်ကိုဖြည့်ပါ",
            icon: "none",
            duration: 2000
          });
          return;
        }
        if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.contacts)) {
          uni.showToast({
            title: "ကျေးဇူးပြု၍ မင်းနာမည်ကိုဖြည့်ပါ",
            icon: "none",
            duration: 2000
          });
          return;
        }
      }
	  
	  if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.cardName)) {
	    uni.showToast({
	      title: "ကျေးဇူးပြု၍ မှန်ကန်သော ID အမည်ဖြည့်ပါ",
	      icon: "none",
	      duration: 2000
	    });
	    return;
	  }
	  
	  if (!this.cardNumber) {
	    uni.showToast({
	      title: "ကျေးဇူးပြု၍ ID နံပါတ်ဖြည့်ပါ",
	      icon: "none",
	      duration: 2000
	    });
	    return;
	  }

      uni.showLoading({
        title: "အမိန့်ထုတ်လုပ်ခြင်း"
      });
      let from = {};
      if (this.$deviceType == "app") {
        from.from = "app";
      }
      console.log(this.storeItems, this.systemStore);
	  const couponId = this.mode == 'point' ? 0 : this.usableCoupon.id // အချက်များကုန်တိုက်သည်ကူပွန်များကိုမကျော်ဖြတ်နိုင်ပါ
      createOrder(this.orderGroupInfo.orderKey, {
		cardNumber: this.cardNumber,	// အကောက်ခွန်ရှင်းလင်းသူ၏အမည်နှင့် ID
		cardName:this.cardName,
		cardType:this.cardType,
		type: this.mode == 'point' ? 1 : 0,  // ထုတ်ကုန်အတွက်အချက်များကိုထပ်မံပေးပို့ပါtype
        realName: this.contacts,
        phone: this.contactsTel,
        addressId: this.addressInfo.id,
        useIntegral: this.useIntegral ? 1 : 0,
        couponId: couponId || 0,
        payType: this.active,
        pinkId: this.pinkId,
        seckillId: this.orderGroupInfo.seckill_id,
        combinationId: this.orderGroupInfo.combination_id,
        bargainId: this.orderGroupInfo.bargain_id,
        from: this.from,
        mark: this.mark || "",
        shippingType: parseInt(shipping_type) + 1,
        storeId: this.storeItems ? this.storeItems.id : this.systemStore.id,
        ...from
      })
        .then(res => {
          uni.hideLoading();
          const data = res.data;
          switch (data.status) {
            case "ORDER_EXIST":
            case "EXTEND_ORDER":
              uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 2000
              });
              this.$yrouter.replace({
                path: "/pages/order/OrderDetails/index",
                query: {
                  id: data.result.orderId
                }
              });
              break;
            case "PAY_DEFICIENCY":
              break;

            case "PAY_ERROR":
              uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 2000
              });
              this.$yrouter.replace({
                path: "/pages/order/OrderDetails/index",
                query: {
                  id: data.result.orderId
                }
              });
              break;
            case "SUCCESS":
              uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 2000
              });
              this.$yrouter.replace({
                path: "/pages/order/OrderDetails/index",
                query: {
                  id: data.result.orderId
                }
              });
              break;
            case "WECHAT_H5_PAY":
              // H5ပေးဆောင်
              this.$yrouter.replace({
                path: "/pages/order/OrderDetails/index",
                query: {
                  id: data.result.orderId
                }
              });
              setTimeout(() => {
                // location.href = data.result.jsConfig.mweb_url;
              }, 100);
              break;
            case "WECHAT_PAY":
              // အသေးစားအစီအစဉ်ငွေပေးချေမှု
              weappPay(data.result.jsConfig).finally(() => {
                this.$yrouter.replace({
                  path: "/pages/order/OrderDetails/index",
                  query: {
                    id: data.result.orderId
                  }
                });
              });
              break;

            case "WECHAT_APP_PAY":
              // APPပေးဆောင်
              weappPay(data.result.jsConfig).finally(() => {
                this.$yrouter.replace({
                  path: "/pages/order/OrderDetails/index",
                  query: {
                    id: data.result.orderId
                  }
                });
              });
              break;
            // အောက်ဖော်ပြပါသည်မူလ WeChat ငွေပေးချေမှုနည်းလမ်းဖြစ်သည်，
            // pay(data.result.jsConfig).finally(() => {
            //   this.$yrouter.replace({
            //     path: "/pages/order/OrderDetails/index" ,query: { id: data.result.orderId}
            //   });
            // });
          }
        })
        .catch(err => {
          uni.hideLoading();
          uni.showToast({
            title:
              err.msg ||
              err.response.data.msg ||
              err.response.data.message ||
              "အမိန့်ကိုဖန်တီးရန်မအောင်မြင်ပါ",
            icon: "none",
            duration: 2000
          });
        });
    }
  }
};
</script>
