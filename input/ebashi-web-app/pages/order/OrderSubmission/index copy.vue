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
            <text class="default font-color-red" v-if="addressInfo.isDefault">[默认]</text>
            {{ addressInfo.province }}{{ addressInfo.city}}{{ addressInfo.district }}{{ addressInfo.detail }}
          </view>
        </view>
        <view class="addressCon" v-else>
          <view class="setaddress">设置收货地址</view>
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
        <view>优惠券</view>
        <view class="discount">
          {{ usableCoupon.couponTitle || "请选择" }}
          <text class="iconfont icon-jiantou"></text>
        </view>
      </view>
      <view
        class="item acea-row row-between-wrapper"
        v-if="deduction === false && enableIntegral === true && mode!='vip'"
      >
        <view>积分支付</view>
        <view class="discount">
          <view class="select-btn">
            <view class="checkbox-wrapper">
              <!-- <input type="checkbox" v-model="useIntegral" @click="changeUseIntegral"/> -->
              <checkbox-group @change="changeUseIntegral">
                <label class="well-check">
                  <text class="integral">
                    当前积分
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
		  <view>快递费用</view>
		  <!-- <view class="discount">
			{{
			orderGroupInfo.priceGroup.storePostage > 0
			? orderGroupInfo.priceGroup.storePostage
			: "免运费"
			}}
		  </view> -->
				<view class="discount">
				  {{
				  orderPrice.payPostage > 0
				  ? orderPrice.payPostage
				  : "免运费"
				  }}
				</view>
		</view>
		<view class="item acea-row row-between-wrapper">
		  <view>联系电话</view>
		  <view class="discount">
			<input v-show="addressInfo.phone" type="text" :disabled="true" v-model="addressInfo.phone" />
		  </view>
		</view>
	</view>
      <view v-else>
        <view class="item acea-row row-between-wrapper">
          <view>联系人</view>
          <view class="discount">
            <input type="text" placeholder="请填写您的联系姓名" v-model="contacts" />
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view>联系电话</view>
          <view class="discount">
            <input type="text" placeholder="请填写您的联系电话" v-model="contactsTel" />
          </view>
        </view>
      </view>
      <view class="item">
        <view>备注信息（150字以内）</view>
        <textarea v-model="mark"></textarea>
      </view>
    </view>
	
	<view class="wrapper">
	  <view class="item acea-row row-between-wrapper">
		<view>证件姓名</view>
		<view class="discount">
		  <input v-if="isShowInput" type="text" maxlength="16" v-model="cardName" placeholder="请输入姓名"/>
		</view>
	  </view>
	  <view class="item acea-row row-between-wrapper">
	  		<view>证件类型</view>
	  		<view class="discount">
	  		  <radio-group @change="changeCardType">
	  		  	<label>
	  		  		<radio value="1" :checked="cardType==1"/><text>身份证</text>
	  		  	</label>
	  		  	<label class="left-10">
	  		  		<radio value="2" :checked="cardType==2"/><text>护照</text>
	  		  	</label>
				<label class="left-10">
					<radio value="3" :checked="cardType==3"/><text>港澳通行证</text>
				</label>
	  		  </radio-group>
	  		</view>
	  </view>
	  <view v-if="cardType" class="item acea-row row-between-wrapper">
		<view>证件号码</view>
		<view class="discount">
		  <input v-if="isShowInput3" type="text" maxlength="18" v-model="cardNumber" placeholder-style="color:#999;" placeholder="请输入号码"/>
		</view>
	  </view>
	</view>
	<view class="color-gray top-10 fs-24" style="padding: 0 30rpx;margin-bottom: 20rpx;">
		<view class="flex-main-start">
			<text class="flex-none flex-item-align-start">海关规定：</text>
			<text class="flex-1">跨境上门商品入境时需申报检验，证件信息仅供海关清关时使用。</text>
		</view>
		<view class="flex-main-start" style="color: #e93323;">
			<text class="flex-item-align-start">温馨提示：</text>
			<text>因信息填写有误所导致无法清关的风险将由买家承担。</text>
		</view>
	</view>
	
    <view v-if="mode!='point'" class="wrapper">
      <view class="item">
        <view>支付方式</view>
        <view class="list">
          <view
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="isWeixin"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-weixin2" :class="active === 'weixin' ? 'bounceIn' : ''"></view>微信支付
            </view>
            <view class="tip">微信快捷支付</view>
          </view>
          <view
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="!isWeixin"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-weixin2" :class="active === 'weixin' ? 'bounceIn' : ''"></view>微信支付
            </view>
            <view class="tip">微信快捷支付</view>
          </view>
          <view
            class="payItem acea-row row-middle"
            :class="active === 'yue' ? 'on' : ''"
            @click="payItem('yue')"
          >
            <view class="name acea-row row-center-wrapper">
              <view class="iconfont icon-icon-test" :class="active === 'yue' ? 'bounceIn' : ''"></view>余额支付
            </view>
            <view class="tip">可用余额：{{ userInfo.nowMoney || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
	
    <view class="moneyList">
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.totalPrice !== undefined">
        <view>商品总价：</view>
        <view class="money">￥{{ orderPrice.totalPrice }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.payPostage > 0">
        <view>运费：</view>
        <view class="money">￥{{ orderPrice.payPostage }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.couponPrice > 0">
        <view>优惠券抵扣：</view>
        <view class="money">-￥{{ orderPrice.couponPrice }}</view>
      </view>
      <view class="item acea-row row-between-wrapper" v-if="orderPrice.deductionPrice > 0">
        <view>积分支付：</view>
        <view class="money">-￥{{ orderPrice.deductionPrice }}</view>
      </view>
    </view>
    <view style="height:120rpx"></view>
    <view class="footer acea-row row-between-wrapper">
      <view class="flex-main-start flex-1">
        <view>合计:</view>
        <view class="font-color-red">￥{{ orderPrice.payPrice }}</view>
      </view>
      <view class="settlement flex-none" @click="createOrder">立即结算</view>
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
  content: "快递配送";
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
  content: "到店自提";
  border-width: 0.4 * 100rpx;
}

.order-submission .allAddress .nav .item.on2 {
  position: relative;
}

.order-submission .allAddress .nav .item.on2:before {
  position: absolute;
  bottom: 0;
  content: "到店自提";
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
  content: "快递配送";
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
        payPrice: "计算中"
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
  onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
      console.log("滚动距离为：" + e.scrollTop);
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
	if(that.mode == 'point'){ // 默认勾选积分抵扣
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
          title: "暂无门店信息，您无法选择到店自提！",
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
	  const couponId = this.mode == 'point' ? 0 : this.usableCoupon.id // 积分商城不传优惠券
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
          title: "参数有误",
          icon: "none",
          duration: 2000
        });
        return this.$yrouter.back();
      }
	  // 获取订单数据
      postOrderConfirm(cartIds)
        .then(res => {
          this.offlinePayStatus = res.data.offline_pay_status;
          this.orderGroupInfo = res.data;
          this.deduction = res.data.deduction;
          this.usableCoupon = res.data.usableCoupon || {};
          this.addressInfo = res.data.addressInfo || {};
          this.systemStore = res.data.systemStore || {};
          this.storeSelfMention = res.data.storeSelfMention;
		  this.cardName = this.addressInfo.realName || ''   // 清关人信息
		  this.cardNumber = this.addressInfo.cardNumber || ''
		  this.cardType = this.addressInfo.cardType || ''
          this.computedPrice();
        })
        .catch(() => {
          uni.showToast({
            title: "加载订单数据失败",
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
          couponTitle: "不使用优惠券",
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
	  this.cardName = addressInfo.realName || ''   // 清关人信息
	  this.cardNumber = addressInfo.cardNumber || ''
	  this.cardType = addressInfo.cardType || ''
	  this.computedPrice();
    },
    createOrder() {
      let shipping_type = this.shipping_type;
	  if(this.mode=='point' && this.orderPrice.payPrice>0){
		  uni.showToast({
			icon:'none',
		  	title:'积分不足！'
		  })
		  return
	  }
      if (!this.active) {
        uni.showToast({
          title: "请选择支付方式",
          icon: "none",
          duration: 2000
        });
        return;
      }
      if (!this.addressInfo.id && !this.shipping_type) {
        uni.showToast({
          title: "请选择收货地址",
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
            title: "请填写联系人或联系人电话",
            icon: "none",
            duration: 2000
          });
          return;
        }

        if (!/^1(3|4|5|7|8|9|6)\d{9}$/.test(this.contactsTel)) {
          uni.showToast({
            title: "请填写正确的手机号",
            icon: "none",
            duration: 2000
          });
          return;
        }
        if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.contacts)) {
          uni.showToast({
            title: "请填写您的真实姓名",
            icon: "none",
            duration: 2000
          });
          return;
        }
      }
	  
	  if (!/^[\u4e00-\u9fa5\w]{2,16}$/.test(this.cardName)) {
	    uni.showToast({
	      title: "请填写正确的证件姓名",
	      icon: "none",
	      duration: 2000
	    });
	    return;
	  }
	  
	  if (!this.cardNumber) {
	    uni.showToast({
	      title: "请填写证件号码",
	      icon: "none",
	      duration: 2000
	    });
	    return;
	  }

      uni.showLoading({
        title: "生成订单中"
      });
      let from = {};
      if (this.$deviceType == "app") {
        from.from = "app";
      }
      console.log(this.storeItems, this.systemStore);
	  const couponId = this.mode == 'point' ? 0 : this.usableCoupon.id // 积分商城不传优惠券
      createOrder(this.orderGroupInfo.orderKey, {
		cardNumber: this.cardNumber,	// 清关人姓名和身份证
		cardName:this.cardName,
		cardType:this.cardType,
		type: this.mode == 'point' ? 1 : 0,  // 积分商品要多传个type
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
              // H5支付
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
              // 小程序支付
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
              // APP支付
              weappPay(data.result.jsConfig).finally(() => {
                this.$yrouter.replace({
                  path: "/pages/order/OrderDetails/index",
                  query: {
                    id: data.result.orderId
                  }
                });
              });
              break;
            // 下面为原先微信支付方式，
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
              "创建订单失败",
            icon: "none",
            duration: 2000
          });
        });
    }
  }
};
</script>
