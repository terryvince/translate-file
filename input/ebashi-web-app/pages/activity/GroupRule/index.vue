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
				<text class="fs-32">爆款拼团</text>
				<text class="fs-26">省钱省心限时拼</text>
			</view>
		</view>
		<view class="group-wrap" v-if="storeCombination">
			<!-- 改成列表，借用组件样式 -->
			<view class="padding-beside-20">
				<goodsList :list="[storeCombination]" from="group"></goodsList>
				<!-- 拼团成功的标记，不需要了 -->
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
			    <text class="tips font-color-red" v-if="pinkBool === 1">恭喜您拼团成功</text>
			    <text class="tips" v-else-if="pinkBool === -1">还差{{ count }}购买数，拼团失败</text>
			    <text class="tips font-color-red" v-else-if="pinkBool === 0">拼团中，还差{{ count }}购买数拼团成功</text>
			  </view>
			  
			  <!-- 灰块 -->
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
				    {{ iShidden ? "收起" : "查看全部" }}
				    <text class="iconfont" :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'"></text>
				  </view>
			  </view>
			  
			  <!-- @click="goPoster" -->
			  <view
			    class="teamBnt bg-color-green"
			    v-if="userBool === 1 && isOk == 0 && pinkBool === 0"
			  >
			  <button type="default" class="hide-full" open-type="share"></button>
			  邀请好友参团
			  </view>
			  <view
			    class="teamBnt bg-color-green"
			    v-else-if="userBool === 0 && pinkBool === 0 && count > 0"
			    @click="open()"
			  >我要参团</view>
			  <view
			    class="teamBnt bg-color-green"
			    v-if="pinkBool === 1 || pinkBool === -1"
			    @click="goDetail(storeCombination.id)"
			  >再次开团</view>
			  <view class="cancel" @click="getCombinationRemove" v-if="pinkBool === 0 && userBool === 1">
			    <text class="iconfont icon-guanbi3"></text>
			    <text>取消开团</text>
			  </view>
			  <view class="lookOrder" v-if="pinkBool === 1" @click="goOrder">
			    <text>查看订单信息</text>
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
      currentPinkOrder: "", //当前拼团订单
      isOk: 0, //判断拼团是否完成
      pinkBool: 0, //判断拼团是否成功|0=失败,1=成功
      userBool: 0, //判断当前用户是否在团内|0=未在,1=在
      pinkAll: [], //团员
      pinkT: {}, //团长信息
      storeCombination: [], //拼团产品
      pinkId: 0,
      count: 0, //拼团剩余人数
      iShidden: false,
	  countdown:'剩余00:00:00 结束',
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
		// console.log(1,url.pinkId)
      that.pinkId = url.pinkId;
    } else {
		// console.log(2,that.$yroute.query.id)
      that.pinkId = that.$yroute.query.id;
    }
	// console.log(that.pinkId)
    that.getCombinationPink();
	if(cookie.get('pink_attr')){  // 为了获取拼团商品的信息,只有上个页面有，从缓存中取
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
			if(num.cart_num > this.count) // 大于可购买数
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
	  //将父级向子集多次传送的函数合二为一；
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
    //拼团列表
    goList: function() {
      this.$yrouter.push({
        path: "/pages/activity/GoodsGroup/index"
      });
    },
    //拼团详情
    goDetail: function(id) {
      this.$yrouter.push({
        path: "/pages/activity/GroupDetails/index",
        query: {
          id
        }
      });
    },
    //拼团信息
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
	  // 模拟数据
	  .finally(()=>{
		 //  that.$set(that, "storeCombination", {
		 //  	image:require('@/static/logo.png'),
		 //  	title:'可是大家看法罗迪克十六分',
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
		  // 设置倒计时
		  clearInterval(this.timer);
		  this.timer = setInterval(()=>{
			  this.countdown = countDown(new Date(this.pinkT.stopTime), '剩余hh:mm:ss 结束')
		  },1000)
		  this.$once('hook:beforeDestroy',()=> clearInterval(this.timer))
	  })
	  
    },
    //拼团取消
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
