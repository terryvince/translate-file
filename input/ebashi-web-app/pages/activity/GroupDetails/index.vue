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
	
	<!-- 价格分享栏 -->
	<view class='florid-box flex-main-center padding-beside-30 bg-v0'>
		<view class="meta-wrap flex-1">
			<!-- <view class="v-grade flex-main-start fs-32">
				<text>L{{level}}</text>
				<text class="left-10">会员价</text>
			</view> -->
			<view class="flex-main-between">
				<view class="flex-main-start flex-baseline">
					<text class="left-20 fs-28 color-type style-type">拼团</text>
					<text class="left-20" style="font-size: 38rpx;">￥{{ storeInfo.price }}</text>
					<text class="fs-30 left-20 del-price-line">原价{{ `&yen;${storeInfo.productPrice||0}` }}</text>
				</view>
				<!-- <view class="flex-main-start">
					<text>库存{{ storeInfo.stock }}{{ storeInfo.unitName }}</text>
					<text class="left-30">已售{{ storeInfo.sales }}{{ storeInfo.unitName }}</text>
				</view> -->
				<view class="share flex-main-end relative">
					<button type="default" class="hide-full" @click="share()" open-type="share"></button>
					<image src="@/static/share.png" style="width:40rpx;height: 40rpx;"></image>
				</view>
			</view>
		</view>
	</view>
	
	<!-- 商品属性 -->
	<view class="list bg-white">
		<view class="txt-bold fs-32 txt-ellipsis row-2 line-down" style="padding: 38rpx 20rpx 32rpx;" v-text="storeInfo.title"></view>
		<view class="list-item list-item-between fs-24 txt-medium color-number line-down">
			<text>运费：{{storeInfo.isPostage==1?'包邮':storeInfo.postage+'元'}}</text>
			<view>
				<text>库存{{storeInfo.stock}}{{storeInfo.unitName}}</text>
				<text class="left-30">已售{{storeInfo.sales}}{{storeInfo.unitName}}</text>
			</view>
		</view>
		<view @click="selecAttrTap" class="list-item list-item-between">
			<text class="color-text txt-medium">数量选择</text>
			<text class="iconfont icon-jiantou fs-24 color-gray"></text>
		</view>
	</view>
	
    <!-- <view class="wrapper">
      <view class="introduce" v-text="storeInfo.title"></view>
      <view class="label acea-row row-between-wrapper">
        <view v-text="'类型:' + storeInfo.people + '人团'"></view>
        <view v-text="'库存:' + storeInfo.stock + storeInfo.unitName"></view>
        <view v-text="'已拼:' + storeInfo.sales + storeInfo.unitName"></view>
      </view>
    </view> -->
    <view class="notice acea-row row-middle">
      <view class="num font-color-red">
        <text class="iconfont icon-laba"></text>
        已拼{{ storeInfo.sales
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
	
	<!-- 拼团列表 -->
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
                <text>还差</text>
                <text class="font-color-red" v-text="item.count"></text>
                <text>人成团</text>
              </view>
              <count-down
                :isDay="false"
                :tipText="'剩余 '"
                :dayText="false"
                :hourText="':'"
                :minuteText="':'"
                :secondText="false"
                :datatime="item.stopTime/1000"
              ></count-down>
            </view>
            <view class="spellBnt" @click="groupRule(item.id)">
              去拼单
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
	  					  :tipText="'剩余 '"
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
	  			<view class="color-gray fs-24 txt-medium">还差<text class="color-danger">{{item.count}}</text>购买数成团</view>
	  			<button @click="groupRule(item.id)" class="btn btn-mini btn-linear-green">去拼团</button>
	  		</view>
	  	</view>
	  </view>
      <view class="more" v-if="groupList.length > groupListCount" @click="setGroupListCount">
        查看更多
        <text class="iconfont icon-xiangxia"></text>
      </view>
    </view>
	
	<!-- 拼团玩法 -->
	<view class="play-way top-20">
		<view class="list bg-white">
			<view class="list-item line-down bg-white">拼团玩法</view>
		</view>
		<view class="list no-bg">
			<view class="list-item flex-main-between">
				<view class="badge badge-middle badge-orange badge-radius">1.开团/参团</view>
				<view class="iconfont icon-arrow"></view>
				<view class="badge badge-middle badge-red-light badge-radius">2.邀请好友</view>
				<view class="iconfont icon-arrow"></view>
				<view class="badge badge-middle badge-red badge-radius">3.满员发货</view>
			</view>
		</view>
	</view>
	
   <!-- <view class="playWay">
      <view class="title acea-row row-between-wrapper">
        <view>拼团玩法</view>
      </view>
      <view class="way acea-row row-middle">
        <view class="item">
          <text class="num">①</text>开团/参团
        </view>
        <view class="iconfont icon-arrow"></view>
        <view class="item">
          <text class="num">②</text>邀请好友
        </view>
        <view class="iconfont icon-arrow"></view>
        <view class="item">
          <view>
            <text class="num">③</text>满员发货
          </view>
        </view>
      </view>
    </view> -->
	
    <!-- 新版评价 v-if="replyCount"-->
    <user-comment :reply="reply" :reply-count="replyCount" :reply-chance="replyChance" :product-id="storeInfo.productId"></user-comment>
	
	<!-- 店铺介绍 -->
	<shop-intro v-if="shopInfo" :shop-info="shopInfo"></shop-intro>
	
	<!-- 新版产品介绍 -->
	<view class="bg-white">
		<view class="flex-main-center">
			<view class="gd-title fs-32 color-text">商品详情</view>
		</view>
		<view class="width-full">
			<rich-text :nodes="storeInfo.description"></rich-text>
		</view>
		<!-- <view class="width-full" v-html=""></view> -->
	</view>
	
    <!-- <view class="product-intro">
      <view class="title">产品介绍</view>
      <view class="conter" v-html="storeInfo.description"></view>
      <view class="conter" v-html=""></view>
    </view> -->
	
    <view style="height:100rpx;"></view>
    <view class="footer flex-main-between">
	  <view class="flex-main-start flex-1">
		  <view @click="goShopManage()" class="item relative">
			<image src="@/static/icon-shop.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
			<text>店铺</text>
		  </view>
		  <view class="item relative" style="margin-left: 43rpx;">
			<button type="default" class="hide-full" open-type="contact"></button>
			<image src="@/static/gd-kefu.png" class="block" style="height:40rpx;width: 44.6rpx;"></image>
			<text>客服</text>
		  </view>
	  </view>
	  <view class="bnt acea-row flex-none">
		  <view @click="openAlone" class="btn-left" style="background-color: #72B0F6;">
		  	<text>单独购买</text>
		  </view>
		  <view @click="openTeam" class="btn-right" style="background-color: #64CE5E;">
		  	<text>立即开团</text>
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
    //收藏商品
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
      }).then(getStoreInfo).then(res => { // 椅子的店铺id为0，取到的数据为null
			this.shopInfo = res.data;
		})
		// 模拟数据
		// .finally(()=>{
		// 	this.shopInfo = {
		// 		headImage: require('@/static/logo.png'),
		// 		name:'淘宝',
		// 		introduce:'5年老店'
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
		// 			sku: '商品',
		// 			comment: '真的不错哦！',
		// 			picturesArr: [require('@/static/images/logo.png'), require('@/static/images/logo.png')],
		// 			merchantReplyContent: '店员回复'
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
    //将父级向子集多次传送的函数合二为一；
    changeFun: function(opt) {
      if (typeof opt !== "object") opt = {};
      let action = opt.action || "";
      let value = opt.value === undefined ? "" : opt.value;
      this[action] && this[action](value);
    },
	//打开属性插件；
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
    //     title: "每人每次限购1" + that.storeInfo.unitName,
    //     icon: "none",
    //     duration: 2000
    //   });
    // },
	ChangeCartNum: function(changeValue) {
		//changeValue:是否 加|减
		let stock = this.attr.productSelect.stock || 0;
		let num = this.attr.productSelect;
		if (changeValue) { // 有数量
			num.cart_num++;
			if (num.cart_num > stock) {  // 大于库存
				this.$set(this.attr.productSelect, "cart_num", stock);
				this.$set(this, "cartNum", stock);
					return
			}
				if(num.cart_num > this.storeInfo.people) // 大于可购买数
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
