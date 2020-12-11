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
		padding: 20rpx 0;
		border-radius: 20rpx;
		position: relative;
		z-index: 2;
	}
	.tips-warp {
	  text-align: center;
	  margin-top: 20rpx;
	}
	.gray-bar{
		width: 100%;
		height: 5rpx;
		background: #F5F5F5;
		border-radius: 1rpx;
	}
	.count-down{
		font-size: 28rpx;
		font-weight: 400;
		color: #282828;
	}
	.font-color-red{
		color: #FF3E3A;
	}
	.gray-block{
		margin:45rpx 20rpx 0;
		background-color: #F6F6F6;
		padding:30rpx 0 30rpx;
	}
	.group-con .wrapper .list .pictrue {
		margin: 0 0 29rpx 25rpx;
	}
	.group-con .wrapper .teamBnt {
	    margin-top: 99rpx;
		border-radius: 20rpx;
	}
	.group-con .wrapper .list .pictrue image {
	    border: 2rpx solid transparent;
	}
	.bg-color-green{
		background: linear-gradient(180deg, #71D676, #5FCB55);
	}
</style>
<template>
	<view class="group-list group-con" ref="container">
		<view class="group-banner over-hide">
			<view class="flex-main-between color-white txt-medium padding-beside-20" style="margin-top: 36rpx;">
				<text class="fs-32">ပေါက်ကွဲစေတတ်သောပူးပေါင်းဆောင်ရွက်မှု</text>
				<text class="fs-26">ပိုက်ဆံချွေတာပါ၊</text>
			</view>
		</view>
		<view class="group-wrap" v-if="storeCombination">
			<!-- စာရင်းသို့ပြောင်းပါ，အစိတ်အပိုင်းစတိုင်ကိုငှားခြင်း -->
			<view class="padding-beside-20">
				<goodsList :list="[storeCombination]" from="group"></goodsList>
				<!-- အောင်မြင်မှုအမှတ်အသား，မလိုပါဘူး -->
				<!-- <view v-if="pinkBool === -1" class="iconfont icon-pintuanshibai"></view>
				<view v-else-if="pinkBool === 1" class="iconfont icon-pintuanchenggong font-color-red"></view> -->
			</view>
			<view class="gray-bar top-20"></view>
			<view class="wrapper">
			  <view class="title acea-row row-center-wrapper">
			    <view class="line"></view>
			    <view class="name acea-row row-center-wrapper">
			      <text class="count-down">{{countdown}}</text>
				  <!-- <count-down
			        :isDay="false"
			        :tipText="false"
			        :dayText="false"
			        :hourText="' : '"
			        :minuteText="' : '"
			        :secondText="false"
			        :datatime="pinkT.stopTime/1000"
			      ></count-down> -->
			    </view>
			    <view class="line"></view>
			  </view>
			  <view class="tips-warp">
			    <text class="tips font-color-red" v-if="pinkBool === 1">သင့်ရဲ့အောင်မြင်သောပူးပေါင်းအပေါ်ဂုဏ်ယူပါတယ်</text>
			    <text class="tips" v-else-if="pinkBool === -1">မဆိုးပါဘူး{{ count }}ဝယ်ယူမှုအရေအတွက်，အုပ်စုမအောင်မြင်ပါ</text>
			    <text class="tips font-color-red" v-else-if="pinkBool === 0">အုပ်စုတစ်စုသို့ဝင်ရောက်ခြင်း，မဆိုးပါဘူး{{ count }}အုပ်စုတစ်စုကိုဝယ်ယူခြင်းတွင်အောင်မြင်ခဲ့သည်</text>
			  </view>
			  
			  <!-- Ash block -->
			  <view class="gray-block">
				  <view
				    class="list acea-row row-middle no-margin"
				    :class="[pinkBool === 1 || pinkBool === -1 ? 'result' : '',iShidden ? 'on' : '']"
				  >
				    <view class="pictrue">
				      <image :src="pinkT.avatar" />
				    </view>
				    <view class="acea-row row-middle" v-if="pinkAll.length > 0">
				      <view class="pictrue" v-for="(item, pinkAllIndex) in pinkAll" :key="pinkAllIndex">
				        <image :src="item.avatar" />
				      </view>
				    </view>
				    <view class="pictrue" v-for="countIndex in count" :key="countIndex">
				      <image class="img-none" src="@/static/images/vacancy.png" />
				    </view>
				  </view>
				  <view
				    v-if="(pinkBool === 1 || pinkBool === -1) && count > 9"
				    class="lookAll acea-row row-center-wrapper"
				    @click="lookAll"
				  >
				    {{ iShidden ? "ဝေးထားပါ" : "အားလုံးကိုကြည့်သည်" }}
				    <text class="iconfont" :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'"></text>
				  </view>
			  </view>
			  
			  <!-- @click="goPoster" -->
			  <view
			    class="teamBnt bg-color-green"
			    v-if="userBool === 1 && isOk == 0 && pinkBool === 0"
			  >
			  <button type="default" class="hide-full" open-type="share"></button>
			  သူငယ်ချင်းများကိုဖိတ်ကြားပါ
			  </view>
			  <view
			    class="teamBnt bg-color-green"
			    v-else-if="userBool === 0 && pinkBool === 0 && count > 0"
			    @click="open()"
			  >ငါအုပ်စုထဲဝင်ချင်တယ်</view>
			  <view
			    class="teamBnt bg-color-green"
			    v-if="pinkBool === 1 || pinkBool === -1"
			    @click="goDetail(storeCombination.id)"
			  >ထပ်မံစတင်ပါ</view>
			  <view class="cancel" @click="getCombinationRemove" v-if="pinkBool === 0 && userBool === 1">
			    <text class="iconfont icon-guanbi3"></text>
			    <text>ခရီးကိုဖျက်သိမ်းပါ</text>
			  </view>
			  <view class="lookOrder" v-if="pinkBool === 1" @click="goOrder">
			    <text>အမှာစာသတင်းကိုကြည့်ပါ</text>
			    <text class="iconfont icon-xiangyou"></text>
			  </view>
			</view>
		</view>
		<ProductWindow v-if="cartNum" v-on:changeFun="changeFun" :attr="attr" :cartNum="cartNum" type="group"></ProductWindow>
	</view>
</template>
<script>
// import CountDown from "@/components/CountDown";
import { getCombinationPink, getCombinationRemove } from "@/api/activity";
import { postCartAdd } from "@/api/store";
import { isWeixin, parseQuery, handleQrCode } from "@/utils/index";
import {countDown} from "@/utils/utils.js";
import ProductWindow from "@/components/ProductWindow";
import cookie from "@/utils/store/cookie.js"

const NAME = "GroupRule";
export default {
  name: NAME,
  components: {
    // CountDown
	ProductWindow
  },
  props: {},
  data: function() {
    return {
      currentPinkOrder: "", //လက်ရှိအဖွဲ့လိုက်အမှာစာ
      isOk: 0, //ဤအဖွဲ့တွင်ပါ ၀ င်မှုရှိ၊ မရှိအကဲဖြတ်ပါ
      pinkBool: 0, //အဖွဲ့အောင်မြင်သောရှိမရှိဆုံးဖြတ်ပါ|0=ပျက်ကွက်,1=အောင်မြင်မှု
      userBool: 0, //လက်ရှိအသုံးပြုသူအုပ်စုတွင်ရှိမရှိဆုံးဖြတ်ရန်|0=မရှိပါ,1=in
      pinkAll: [], //အဖွဲ့ဝင်
      pinkT: {}, //ခေါင်းဆောင်သတင်းအချက်အလက်
      storeCombination: [], //အုပ်စုလိုက်ထုတ်ကုန်များ
      pinkId: 0,
      count: 0, //ကျန်ရှိနေသေးသောသင်တန်းသားများကို
      iShidden: false,
	  countdown:'ကျန်00:00:00 အဆုံး',
	  cartNum:1,
	  attr: {
	    cartAttr: false,
	    productSelect: {
	      image: "",
	      store_name: "",
	      price: "",
	      stock: "",
	      unique: "",
	      cart_num: 1
	    }
	  },
    };
  },
  watch: {
    $yroute(n) {
      var that = this;
      if (n.name === NAME) {
        that.pinkId = that.$yroute.query.id;
        that.getCombinationPink();
      }
    }
  },
  mounted: function() {
    var that = this;
    let url = handleQrCode();
    if (url) {
      that.pinkId = url.pinkId;
    } else {
      that.pinkId = that.$yroute.query.id;
    }
    that.getCombinationPink();
	if(cookie.get('pink_attr')){  // အုပ်စုထုတ်ကုန်များအကြောင်းသတင်းအချက်အလက်ရရှိရန်အတွက်,ယခင်စာမျက်နှာသာရှိ，cache မှယူပါ
		this.attr = cookie.get('pink_attr')
	}
  },
  onShareAppMessage() {
  	return {
  	  title: this.storeInfo.title,
  	  path: `/pages/activity/GroupRule/index?pinkId=${this.pinkId}&from=share`
  	};
  },
  methods: {
	  changeattr: function(res) {
	    this.attr.cartAttr = res;
	    this.isOpen = false;
	  },
	  ChangeCartNum: function(changeValue) {
	  	//changeValue:ဟုတ်လား ပေါင်း|နည်းသော
	  	let stock = this.attr.productSelect.stock || 0;
	  	let num = this.attr.productSelect;
	  	if (changeValue) { // အရေအတွက်ရှိတယ်
	  		num.cart_num++;
	  		if (num.cart_num > stock) {  // စာရင်းထက်ပို
	  			this.$set(this.attr.productSelect, "cart_num", stock);
	  			this.$set(this, "cartNum", stock);
				return
	  		}
			if(num.cart_num > this.count) // ရရှိနိုင်ပါသည်ထက်
			{
				this.$set(this.attr.productSelect, "cart_num", this.count);
				this.$set(this, "cartNum", this.count);
				return;
			}
			
			this.$set(this.attr.productSelect, "cart_num", num.cart_num);
			this.$set(this, "cartNum", num.cart_num);
	  	} else {
	  		num.cart_num--;
	  		if (num.cart_num < 1) {
	  			this.$set(this.attr.productSelect, "cart_num", 1);
	  			this.$set(this, "cartNum", 1);
	  		} else {
	  			this.$set(this.attr.productSelect, "cart_num", num.cart_num);
	  			this.$set(this, "cartNum", num.cart_num);
	  		}
	  	}
	  },
	  //မိဘမှအစုအဝေးတစ်ခုသို့လွှဲပြောင်းမှုအမျိုးမျိုး၏လုပ်ဆောင်ချက်များကိုတစ်ခုသို့ပေါင်းစပ်ပါ；
	  changeFun: function(opt) {
	    if (typeof opt !== "object") opt = {};
	    let action = opt.action || "";
	    let value = opt.value === undefined ? "" : opt.value;
	    this[action] && this[action](value);
	  },
	  open(){
		  this.attr.cartAttr = true;
		  this.isOpen = true;
	  },
    pay: function() {
      var that = this;
      var data = {};
      data.productId = that.storeCombination.productId;
      data.cartNum = this.cartNum;
      data.uniqueId = "";
      data.combinationId = that.storeCombination.id;
      data.new = 1;
      postCartAdd(data)
        .then(res => {
          that.$yrouter.push({
            path: "/pages/order/OrderSubmission/index",
            query: {
              id: res.data.cartId,
              pinkid: that.pinkId
            }
          });
        })
        .catch(err => {
          uni.showToast({
            title:
              err.msg || err.response.data.msg || err.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    },
    // goPoster: function() {
    //   var that = this;
    //   this.$yrouter.push({
    //     path: "/pages/activity/Poster/index",
    //     query: {
    //       id: that.pinkId,
    //       type: 1
    //     }
    //   });
    // },
    goOrder: function() {
      var that = this;
      this.$yrouter.push({
        path: "/pages/order/OrderDetails/index",
        query: {
          id: that.currentPinkOrder
        }
      });
    },
    //စာရင်းစာရင်းသွင်း
    goList: function() {
      this.$yrouter.push({
        path: "/pages/activity/GoodsGroup/index"
      });
    },
    //အသေးစိတ်အတွက်ဆက်သွယ်ပါ
    goDetail: function(id) {
      this.$yrouter.push({
        path: "/pages/activity/GroupDetails/index",
        query: {
          id
        }
      });
    },
    //သတင်းအချက်အလက်လာရောက်ပူးပေါင်း
    getCombinationPink: function() {
      var that = this;
      getCombinationPink(that.pinkId).then(res => {
        that.$set(that, "storeCombination", res.data.storeCombination);
        that.$set(that, "pinkT", res.data.pinkT);
        that.$set(that, "pinkAll", res.data.pinkAll);
        that.$set(that, "count", res.data.count);
        that.$set(that, "userBool", res.data.userBool);
        that.$set(that, "pinkBool", res.data.pinkBool);
        that.$set(that, "isOk", res.data.isOk);
        that.$set(that, "currentPinkOrder", res.data.currentPinkOrder);
      })
	  // ခြင်း simulation ဒေတာ
	  .finally(()=>{
		 //  that.$set(that, "storeCombination", {
		 //  	image:require('@/static/logo.png'),
		 //  	title:'သို့သော်လူတိုင်းက Roddick တွင် ၁၆ မှတ်ရှိသည်ဟုထင်ကြသည်',
		 //  	price:100,
		 //  	people:2
		 //  });
		 //  that.$set(that, 'count',  10);
		 //  // that.$set(that, 'pinkBool',  1);
		 //  that.$set(that, "pinkAll", [
		 //  		  {avatar:require('@/static/logo.png')},
		 //  		  {avatar:require('@/static/logo.png')}
		 //  ]);
		 //  that.$set(that,'pinkT',{
		 //  		  avatar:require('@/static/logo.png'),
		 //  		  stopTime: +new Date() + (1000 * 60)
		 //  })
		 //  that.$set(that, "userBool", 1);
		  // နှစ်သစ်ကြိုဆိုပွဲကိုသတ်မှတ်ပါ
		  clearInterval(this.timer);
		  this.timer = setInterval(()=>{
			  this.countdown = countDown(new Date(this.pinkT.stopTime), 'ကျန်hh:mm:ss အဆုံး')
		  },1000)
		  this.$once('hook:beforeDestroy',()=> clearInterval(this.timer))
	  })
	  
    },
    //အုပ်စုဖျက်သိမ်းခြင်း
    getCombinationRemove: function() {
      var that = this;
      getCombinationRemove({
        id: that.pinkId,
        cid: that.storeCombination.id
      })
        .then(res => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
        })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          });
        });
    },
    lookAll: function() {
      this.iShidden = !this.iShidden;
    }
  }
};
</script>
