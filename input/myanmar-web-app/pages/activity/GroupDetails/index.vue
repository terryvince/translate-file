<style scoped lang="less">
.product-con .wrapper {
  padding-bottom: 0.26 * 100rpx;
}
.noscroll {
  height: 100%;
  overflow: hidden;
}
.product-con .footer-group .bnt {
  // flex:1;
  width: 43%;
}
.product-con .footer-group .bnt.bg-color-violet {
  background-color: #fa8013;
}

.style-type{
	padding:0 8rpx;
	background-color: #fff;
	border-radius: 6rpx;
}
.bg-v0{
	background:linear-gradient(90deg,#71D676,#60CB56);
}
.florid-box{
	font-size: 24rpx;
	color: white;
	height: 100rpx;
	
}

.avatar-wrap{
	width: 118rpx;
	height: 118rpx;
}


.gd-intro {
	padding: 64rpx 0 38rpx;
}

.gd-title {
	font-weight: bold;
	text-align: center;
	width: 280rpx;
	background: url('@/static/images/gd-detail-bg.png')no-repeat center;
	background-size: 280rpx 4rpx;
}

.btn-left {
	border-radius: 50rpx 0 0 50rpx;
}

.btn-right {
	border-radius: 0 50rpx 50rpx 0;
}
</style>
<template>
  <view :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']" v-show="domStatus">
	  <!-- swiper -->
    <product-con-swiper :imgUrls="imgUrls" themeColor="#00C9AE"></product-con-swiper>
	
	<!-- စျေးနှုန်းခွဲဝေမှုဘား -->
	<view class='florid-box flex-main-center padding-beside-30 bg-v0'>
		<view class="meta-wrap flex-1">
			<!-- <view class="v-grade flex-main-start fs-32">
				<text>L{{level}}</text>
				<text class="left-10">အသင်းဝင်ကြေး</text>
			</view> -->
			<view class="flex-main-between">
				<view class="flex-main-start flex-baseline">
					<text class="left-20 fs-28 color-type style-type">အုပ်စုတစ်ခုနှင့်ဆက်သွယ်ပါ</text>
					<text class="left-20" style="font-size: 38rpx;">￥{{ storeInfo.price }}</text>
					<text class="fs-30 left-20 del-price-line">မူလစျေးနှုန်း{{ `&yen;${storeInfo.productPrice||0}` }}</text>
				</view>
				<!-- <view class="flex-main-start">
					<text>ကုန်ပစ္စည်းလက်ဝယ်ရှိ{{ storeInfo.stock }}{{ storeInfo.unitName }}</text>
					<text class="left-30">ရောင်းချခဲ့သည်{{ storeInfo.sales }}{{ storeInfo.unitName }}</text>
				</view> -->
				<view class="share flex-main-end relative">
					<button type="default" class="hide-full" @click="share()" open-type="share"></button>
					<image src="@/static/share.png" mode="widthFix" style="width:40rpx;"></image>
				</view>
			</view>
		</view>
	</view>
	
	<!-- ကုန်စည် attribute တွေ -->
	<view class="list bg-white">
		<view class="txt-bold fs-32 txt-ellipsis row-2 line-down" style="padding: 38rpx 20rpx 32rpx;" v-text="storeInfo.title"></view>
		<view class="list-item list-item-between fs-24 txt-medium color-number line-down">
			<text>သင်္ဘောဖြင့်ကုန်ပစ္စည်းပို့ခြင်း：{{storeInfo.isPostage==1?'အခမဲ့ပို့ပေးသည်':storeInfo.postage+'ယွမ်'}}</text>
			<view>
				<text>ကုန်ပစ္စည်းလက်ဝယ်ရှိ{{storeInfo.stock}}{{storeInfo.unitName}}</text>
				<text class="left-30">ရောင်းချခဲ့သည်{{storeInfo.sales}}{{storeInfo.unitName}}</text>
			</view>
		</view>
		<view @click="selecAttrTap" class="list-item list-item-between">
			<text class="color-text txt-medium">အရေအတွက်ရွေးချယ်ရေး</text>
			<text class="iconfont icon-jiantou fs-24 color-gray"></text>
		</view>
	</view>
	
    <!-- <view class="wrapper">
      <view class="introduce" v-text="storeInfo.title"></view>
      <view class="label acea-row row-between-wrapper">
        <view v-text="'ပုံစံ:' + storeInfo.people + 'လူအုပ်စု'"></view>
        <view v-text="'ကုန်ပစ္စည်းလက်ဝယ်ရှိ:' + storeInfo.stock + storeInfo.unitName"></view>
        <view v-text="'စာလုံးပေါင်း:' + storeInfo.sales + storeInfo.unitName"></view>
      </view>
    </view> -->
    <view class="notice acea-row row-middle">
      <view class="num font-color-red">
        <text class="iconfont icon-laba"></text>
        စာလုံးပေါင်း{{ storeInfo.sales
        }}{{ storeInfo.unitName }}
        <text class="line">|</text>
      </view>
      <view class="swiper-no-swiping swiper">
        <swiper class="swiper-wrapper" :options="swiperTip" :autoplay="true" :interval="3000">
          <block v-for="(item, itemNewIndex) in itemNew" :key="itemNewIndex">
            <swiper-item>
              <view class="line1">{{ item }}</view>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>
	
	<!-- စာရင်းစာရင်းသွင်း -->
    <view class="assemble">
      <!-- <view v-for="(item, groupListindex) in groupList" :key="groupListindex">
        <view class="item acea-row row-between-wrapper" v-if="groupListindex < groupListCount">
          <view class="pictxt acea-row row-between-wrapper">
            <view class="pictrue">
              <image :src="item.avatar" class="image" />
            </view>
            <view class="text line1" v-text="item.nickname"></view>
          </view>
          <view class="right acea-row row-middle">
            <view>
              <view class="lack">
                <text>မဆိုးပါဘူး</text>
                <text class="font-color-red" v-text="item.count"></text>
                <text>အုပ်စုများမှလူများ</text>
              </view>
              <count-down
                :isDay="false"
                :tipText="'ကျန် '"
                :dayText="false"
                :hourText="':'"
                :minuteText="':'"
                :secondText="false"
                :datatime="item.stopTime/1000"
              ></count-down>
            </view>
            <view class="spellBnt" @click="groupRule(item.id)">
              မှာယူပါ
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
        </view>
      </view> -->
	  <view class="list list-middle bg-white">
	  	<view v-for="(item, groupListindex) in groupList" :key="groupListindex" v-if="groupListindex < groupListCount" class="list-item list-item-between line-down">
	  		<view class="left-wrap flex-main-start">
	  			<view class="avatar-wrap">
	  				<image :src="item.avatar" class="width-full" mode="widthFix"></image>
	  			</view>
	  			<view class="avatar-text left-15">
	  				<view class="badge badge-mini-extra badge-primary badge-radius">{{addressObj|formatJson}}</view>
	  				<view class="fs-28 txt-medium color-text">{{item.nickname}}</view>
	  				<view class="color-gray fs-24 txt-medium flex-main-start">
	  					<text class="iconfont icon-shijian right-5"></text>
	  					<count-down
	  					  :isDay="false"
	  					  :tipText="'ကျန် '"
	  					  :dayText="false"
	  					  :hourText="':'"
	  					  :minuteText="':'"
	  					  :secondText="false"
	  					  :datatime="item.stopTime/1000"
	  					></count-down>
	  				</view>
	  			</view>
	  		</view>
	  		<view class="right-wrap flex-main-between flex-column flex-item-align-stretch">
	  			<view class="color-gray fs-24 txt-medium">မဆိုးပါဘူး<text class="color-danger">{{item.count}}</text>နံပါတ်ကိုအုပ်စုတစ်ခုထဲဝယ်ပါ</view>
	  			<button @click="groupRule(item.id)" class="btn btn-mini btn-linear-green">join ဖို့သွားပါ</button>
	  		</view>
	  	</view>
	  </view>
      <view class="more" v-if="groupList.length > groupListCount" @click="setGroupListCount">
        ထပ်မံကြည့်ရှုပါ
        <text class="iconfont icon-xiangxia"></text>
      </view>
    </view>
	
	<!-- အသင်းကစား -->
	<view class="play-way top-20">
		<view class="list bg-white">
			<view class="list-item line-down bg-white">အသင်းကစား</view>
		</view>
		<view class="list no-bg">
			<view class="list-item flex-main-between">
				<view class="badge badge-middle badge-orange badge-radius">1.အုပ်စုတစ်စုကိုစတင်ပါ/အဖွဲ့ထဲဝင်ပါ</view>
				<view class="iconfont icon-arrow"></view>
				<view class="badge badge-middle badge-red-light badge-radius">2.သူငယ်ချင်းများကိုဖိတ်ကြားသည်</view>
				<view class="iconfont icon-arrow"></view>
				<view class="badge badge-middle badge-red badge-radius">3.ပို့ကုန်အပြည့်</view>
			</view>
		</view>
	</view>
	
   <!-- <view class="playWay">
      <view class="title acea-row row-between-wrapper">
        <view>အသင်းကစား</view>
      </view>
      <view class="way acea-row row-middle">
        <view class="item">
          <text class="num">①</text>အုပ်စုတစ်စုကိုစတင်ပါ/အဖွဲ့ထဲဝင်ပါ
        </view>
        <view class="iconfont icon-arrow"></view>
        <view class="item">
          <text class="num">②</text>သူငယ်ချင်းများကိုဖိတ်ကြားသည်
        </view>
        <view class="iconfont icon-arrow"></view>
        <view class="item">
          <view>
            <text class="num">③</text>ပို့ကုန်အပြည့်
          </view>
        </view>
      </view>
    </view> -->
	
    <!-- သုံးသပ်ချက်အသစ် v-if="replyCount"-->
    <user-comment :reply="reply" :reply-count="replyCount" :reply-chance="replyChance" :product-id="storeInfo.productId"></user-comment>
	
	<!-- မိတ်ဆက်မိတ်ဆက် -->
	<shop-intro v-if="shopInfo" :shop-info="shopInfo"></shop-intro>
	
	<!-- ထုတ်ကုန်အသစ်မိတ်ဆက် -->
	<view class="bg-white">
		<view class="flex-main-center">
			<view class="gd-title fs-32 color-text">ကုန်ပစ္စည်းအသေးစိတ်</view>
		</view>
		<view class="width-full">
			<rich-text :nodes="storeInfo.description"></rich-text>
		</view>
		<!-- <view class="width-full" v-html=""></view> -->
	</view>
	
    <!-- <view class="product-intro">
      <view class="title">ကုန်ပစ္စည်းအကြောင်းအရာ</view>
      <view class="conter" v-html="storeInfo.description"></view>
      <view class="conter" v-html=""></view>
    </view> -->
	
    <view style="height:100rpx;"></view>
    <view class="footer flex-main-between">
	  <view class="flex-main-start flex-1">
		  <view @click="goShopManage()" class="item relative">
			<image src="@/static/icon-shop.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
			<text>ဆိုင်</text>
		  </view>
		  <view class="item relative" style="margin-left: 43rpx;">
			<button type="default" class="hide-full" open-type="contact"></button>
			<image src="@/static/gd-kefu.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
			<text>ဧည့်ဝန်ဆောင်မှု</text>
		  </view>
	  </view>
	  <view class="bnt acea-row flex-none">
		  <view @click="openAlone" class="btn-left" style="background-color: #72B0F6;">
		  	<text>တစ် ဦး ချင်းစီစျေးဝယ်</text>
		  </view>
		  <view @click="openTeam" class="btn-right" style="background-color: #64CE5E;">
		  	<text>ယခုအဖွဲ့ကိုစတင်ပါ</text>
		  </view>
	  </view>
    </view>
    <ProductWindow v-if="cartNum" v-on:changeFun="changeFun" :attr="attr" :cartNum="cartNum"></ProductWindow>
    <StorePoster
      v-on:setPosterImageStatus="setPosterImageStatus"
      :posterImageStatus="posterImageStatus"
      :posterData="posterData"
    ></StorePoster>
  </view>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";

import ProductConSwiper from "@/components/ProductConSwiper";
import CountDown from "@/components/CountDown";
import UserEvaluation from "@/components/UserEvaluation";
import ProductWindow from "@/components/ProductWindow";
import StorePoster from "@/components/StorePoster";
import { getCombinationDetail } from "@/api/activity";
import { postCartAdd,getStoreInfo } from "@/api/store";
import { imageBase64 } from "@/api/public";
import cookie from "@/utils/store/cookie.js"
import {
  getCoupon,
  getCollectAdd,
  getCollectDel,
  getUserInfo
} from "@/api/user";
const NAME = "GroupDetails";

export default {
  name: "GroupDetails",
  components: {
    ProductConSwiper,
    CountDown,
    UserEvaluation,
    // swiper,
    // swiperSlide,
    ProductWindow,
    StorePoster
  },
  props: {},
  data: function() {
    return {
      domStatus: false,
      posterData: {
        image: "",
        title: "",
        price: "",
        code: ""
      },
      posterImageStatus: false,
      reply: [],
      replyCount: 0,
      replyChance: 0,
      imgUrls: [],
      storeInfo: {},
      itemNew: {},
      groupListCount: 2,
      groupList: {},
	  tempName:'',
	  shopInfo:{},
      swiperTip: {
        direction: "vertical",
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
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
      cartNum: 1,
      userCollect: false,
	  addressObj:null
    };
  },
  watch: {
    $yroute: function(n) {
      var that = this;
      if (n.name === NAME) {
        that.mountedStart();
      }
    }
  },
  onShow: function() {
    this.mountedStart();
  },
  onShareAppMessage() {
  	return {
	  title: this.storeInfo.title,
	  path: `/pages/activity/GroupDetails/index?id=${this.$yroute.query.id}&time=${this.$yroute.query.time}&from=share&mode=${this.$yroute.query.mode}`
	};
  },
  methods: {
	share(){
		// #ifdef MP
		return;
		// #endif
		// #ifdef H5
			// to do
		// #endif
	},
	goShopManage() {
		this.$yrouter.push({
			path: "/subpackage/shop/shop",
			query: {
				merId: this.storeInfo.merId
			}
		});
	},
    openAlone: function() {
      this.$yrouter.push({
        path: "/pages/shop/GoodsCon/index",
        query: { id: this.storeInfo.productId }
      });
      // this.$yrouter.replace({ path: "/detail/" + this.storeInfo.productId });
    },
    //အကြိုက်ဆုံးကုန်ပစ္စည်း
    setCollect: function() {
      let that = this,
        id = that.storeInfo.id,
        category = "product";
      if (that.userCollect) {
        getCollectDel(id, category).then(function() {
          that.userCollect = !that.userCollect;
        });
      } else {
        getCollectAdd(id, category).then(function() {
          that.userCollect = !that.userCollect;
        });
      }
    },
    mountedStart: function() {
      var that = this;
      let id = that.$yroute.query.id;
      getCombinationDetail(id).then(res => {
        that.userCollect = res.data.userCollect;
        res.data.storeInfo.description = res.data.storeInfo.description.replace(
          /\<img/gi,
          '<img style="max-width:100%;height:auto;"'
        );
        that.$set(that, "storeInfo", res.data.storeInfo);
        that.$set(that, "imgUrls", res.data.storeInfo.sliderImageArr);
        that.$set(that, "itemNew", res.data.pinkOkList);
        that.$set(that, "groupList", res.data.pink);
        that.$set(that, "reply",res.data.reply ? [res.data.reply]:[]);
        that.$set(that, "replyCount", res.data.replyCount);
        that.$set(that, "replyChance", res.data.replyChance);
		that.$set(that, "tempName", res.data.tempName);
		that.$set(that, "addressObj", res.data.addressObj);
        that.setProductSelect();
        that.posterData.image = that.storeInfo.image;
        if (that.storeInfo.title.length > 30) {
          that.posterData.title = that.storeInfo.title.substring(0, 30) + "...";
        } else {
          that.posterData.title = that.storeInfo.title;
        }
        that.posterData.price = that.storeInfo.price;
        that.posterData.code = that.storeInfo.code_base;
        that.domStatus = true;
		return Promise.resolve(res.data.storeInfo.merId)
        //that.getImageBase64();
      }).then(getStoreInfo).then(res => { // ကုလားထိုင်ဆိုင်idအဘို့0，ရရှိသောအချက်အလက်များမှာnull
			this.shopInfo = res.data;
		})
		// ခြင်း simulation ဒေတာ
		// .finally(()=>{
		// 	this.shopInfo = {
		// 		headImage: require('@/static/logo.png'),
		// 		name:'Taobao',
		// 		introduce:'5ဆိုင်ဟောင်း'
		// 	};
		// 	that.$set(that, "groupList", [
		// 		{
		// 			avatar:require('@/static/logo.png'),
		// 			nickname:'hzz',
		// 			count:'3',
		// 			stopTime:+new Date()
		// 		},
		// 		{
		// 			avatar:require('@/static/logo.png'),
		// 			nickname:'terry',
		// 			count:'4',
		// 			stopTime:+new Date()
		// 		}
		// 	]);
		// 	that.$set(that, "reply",[
		// 		{
		// 			avatar: require('@/static/images/logo.png'),
		// 			nickname: 'dsfsdf',
		// 			star: 3,
		// 			createTime: '2019-12-01 10:00:00',
		// 			sku: 'ကုန်ပစ္စည်း',
		// 			comment: 'တကယ်ကောင်းတယ်！',
		// 			picturesArr: [require('@/static/images/logo.png'), require('@/static/images/logo.png')],
		// 			merchantReplyContent: 'စာရေးပြန်ကြားချက်'
		// 		}
		// 	]);
		// })
    },
    getImageBase64: function() {
      let that = this;
      imageBase64(this.posterData.image, that.posterData.code).then(res => {
        that.posterData.image = res.data.image;
        that.posterData.code = res.data.code;
      });
    },
    setPosterImageStatus: function() {
      // var sTop = document.body || document.documentElement;
      // sTop.scrollTop = 0;
      this.posterImageStatus = !this.posterImageStatus;
    },
    groupRule: function(id) {
      var that = this;
      that.$yrouter.push({
        path: "/pages/activity/GroupRule/index",
        query: { id }
      });
    },
    goReply: function() {
      var that = this;
      that.$yrouter.push({
        path: "/pages/shop/EvaluateList/index",
        query: { id: that.storeInfo.product_id }
      });
    },
    setGroupListCount: function() {
      this.groupListCount = this.groupListCount + 2;
    },
    //မိဘမှအစုအဝေးတစ်ခုသို့လွှဲပြောင်းမှုအမျိုးမျိုး၏လုပ်ဆောင်ချက်များကိုတစ်ခုသို့ပေါင်းစပ်ပါ；
    changeFun: function(opt) {
      if (typeof opt !== "object") opt = {};
      let action = opt.action || "";
      let value = opt.value === undefined ? "" : opt.value;
      this[action] && this[action](value);
    },
	//Properties Properties ကိုဖွင့်ပါ；
	selecAttrTap: function() {
		this.attr.cartAttr = true;
		this.isOpen = true;
	},
    changeattr: function(res) {
      var that = this;
      that.attr.cartAttr = res;
	  this.isOpen = false;
    },
    // ChangeCartNum: function(res) {
    //   var that = this;
    //   that.attr.productSelect.cart_num = 1;
    //   that.cartNum = 1;
    //   uni.showToast({
    //     title: "လူတစ် ဦး ချင်းစီအားအချိန်အလိုက် ၀ ယ်ယူကန့်သတ်ချက်1" + that.storeInfo.unitName,
    //     icon: "none",
    //     duration: 2000
    //   });
    // },
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
				if(num.cart_num > this.storeInfo.people) // ရရှိနိုင်ပါသည်ထက်
				{
					this.$set(this.attr.productSelect, "cart_num", this.storeInfo.people);
					this.$set(this, "cartNum", this.storeInfo.people);
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
    setProductSelect: function() {
      var that = this;
      var attr = that.attr;
      attr.productSelect.image = that.storeInfo.image;
      attr.productSelect.store_name = that.storeInfo.title;
      attr.productSelect.price = that.storeInfo.price;
      attr.productSelect.stock = that.storeInfo.stock;
      attr.cartAttr = false;
      that.$set(that, "attr", attr);
	  cookie.set('pink_attr',attr)
    },
    openTeam: function() {
      var that = this;
      if (that.attr.cartAttr == false) {
        that.attr.cartAttr = !this.attr.cartAttr;
      } else {
        var data = {};
        data.productId = that.storeInfo.productId;
        data.cartNum = that.attr.productSelect.cart_num;
        data.uniqueId = that.attr.productSelect.unique;
        data.combinationId = that.storeInfo.id;
        data.new = 1;
        postCartAdd(data)
          .then(res => {
            that.$yrouter.push({
              path: "/pages/order/OrderSubmission/index",
              query: { id: res.data.cartId }
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
      }
    }
  }
};
</script>
