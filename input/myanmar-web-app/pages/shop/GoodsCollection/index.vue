<style lang="less" scoped>
	// Multi-row နှင့် Multicolon layout
	.grid(@count:4,@itemWidth:20,@itemHeight:auto){
		@rest:100 - @itemWidth * @count; // ကျန်ရှိသောနေရာ
		@space: @rest/(@count - 1) * 1%; // အနားသတ်
		display: flex;
		& > view {
			flex: 0 0 @itemWidth * 1%;
			height: @itemHeight;
			margin-right: @space;
			margin-top: @space;
			box-sizing: border-box;
			&:nth-child( @{count}n ){
				margin-right: 0;
			}
			&:nth-child( -n + @{count} ){
				margin-top: 0;
			}
			&:last-child{
				margin-right: auto;
			}
		}
	}
	 .good-list-card{
		 flex-wrap:wrap;
		 .grid(2,48);
		 .list-item{
			 background-color: white;
			 border-radius: 20rpx;
			 overflow: hidden;
			 flex-wrap: wrap;
		 }
		 .img-wrap{
			 width: 100%;
			 height: 345rpx;
			 border-radius:8rpx 4rpx 4rpx 4rpx;
		 }
		 .content{
			 padding: 22rpx 18rpx;
		 }
	 }
	 .top-31{
		 margin-top: 31rpx;
	 }
	 .top-22{
		 margin-top:22rpx;
	 }
	 .top-19{
		 margin-top:19rpx;
	 }
	 .left-6{
		 margin-left: 6rpx;
	 }
	.overlay{
		 background-color: rgba(0,0,0,.6);
		 position: absolute;
		 left: 0;
		 top: 0;
		 right: 0;
		 bottom: 0;
		 .abs-left-top{
			 position: absolute;
			 left: 0;
			 top: 0;
		 }
	}
	.collection-goods{
		padding: 30rpx 25rpx 30rpx;
	}
</style>
<template>
  <view ref="container">
	 <view class="collection-goods">
		 <view v-if="collectProductList.length > 0" class="good-list-card">
		 	<view @click="goGoodsCon(item)" :class="['list-item lh-1']" v-for="(item,i) in collectProductList" :key="i">
		 		<!-- စင်ပေါ်မှကုန်စည် -->
		 		<view class="img-wrap over-hide relative">
		 			<view class="overlay full" v-show="item.isShow == 0">
		 				<image src="@/static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
		 			</view>
		 			<image :src="item.image" class="full"></image>
		 		</view>
		 		<view class="content">
		 			<!-- ထုတ်ကုန်အမည် -->
		 			<view class="fs-26 color-text top-22 txt-medium width-full txt-ellipsis row-2" style="height: 56rpx;">{{item.storeName}}</view>
		 			<view>
		 				<!-- ကုန်ပစ္စည်းစျေးနှုန်း -->
		 				<view class="flex-main-start top-31 fs-22">
		 					<text class="color-danger">¥</text>
		 					<text class="color-danger fs-32">{{item.price|toFixed}} </text>
		 					<text class="color-text-secondary del-line left-6">¥{{item.otPrice|toFixed}}</text>
		 				</view>
		 				<!-- ကုန်သည်ရောင်းခဲ့သည် -->
		 				<view class="fs-20 color-text-secondary top-19 flex-main-between">
		 					<text class="txt-bold">{{item.merName||'ဆိုင်နာမည်အမည်မရှိပါ'}}</text>
							<button class="btn btn-linear-green btn-mini" @tap.stop="delCollection(i)">ဖျက်ပါ</button>
		 				</view>
		 			</view>
		 			<!-- ကုန်ပစ္စည်းအမှတ် -->
		 			<!-- <view v-else class="color-danger txt-heavy fs-28">
		 				{{item.price}}အရေးပါသော 
		 			</view> -->
		 		</view>
		 	</view>
		 </view>
	 </view>
    <!-- <view class="collectionGoods" v-if="collectProductList.length > 0">
      <view
        class="item acea-row row-between-wrapper"
        v-for="(item, collectProductListIndex) in collectProductList"
        :key="collectProductListIndex"
        @click="goGoodsCon(item)"
      >
        <view class="pictrue relative">
		  <view class="overlay full" v-show="item.isShow == 0">
		  	<image src="../../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
		  </view>
          <image :src="item.image" />
        </view>
        <view class="text acea-row row-column-between">
          <view class="infor line1">{{ item.storeName }}</view>
          <view class="acea-row row-between-wrapper">
            <view class="money font-color-red">￥{{ item.price }}</view>
            <view class="delete" @tap.stop="delCollection(collectProductListIndex)">ဖျက်ပါ</view>
          </view>
        </view>
      </view>
    </view> -->
    <Loading :loaded="loadend" :loading="loading"></Loading>
    <view
      class="noCommodity"
      style="background-color:#fff;"
      v-if="collectProductList.length < 1 && page > 1"
    >
      <view class="noPictrue">
        <image src="@/static/images/noCollection.png" class="image" />
      </view>
      <Recommend></Recommend>
    </view>
  </view>
</template>
<script>
import Recommend from "@/components/Recommend";
import { getCollectUser, getCollectDel } from "@/api/user";
import Loading from "@/components/Loading";
export default {
  name: "GoodsCollection",
  components: {
    Recommend,
    Loading
  },
  props: {},
  data: function() {
    return {
      page: 1,
      limit: 20,
      collectProductList: [],
      loadTitle: "",
      loading: false,
      loadend: false
    };
  },
  filters:{
	  toFixed(value, option=2){
	  	if(typeof value !== 'number'){
	  		return 'နံပါတ်မဟုတ်ပါ'
	  	}
	  	value = +value
	  	return value.toFixed(option)
	  }
  },
  mounted: function() {
    this.get_user_collect_product();
  },
  onReachBottom() {
    !this.loading && this.get_user_collect_product();
  },
  methods: {
    goGoodsCon(item) {
	  if(item.isShow ==0){ // အသင့်သုံးရန်ရောင်းသောပစ္စည်း
		  return
	  }
      this.$yrouter.push({
        path: "/pages/shop/GoodsCon/index",
        query: { id: item.pid }
      });
    },
    get_user_collect_product: function() {
      let that = this;
      if (that.loading) return; //လာမည့်တောင်းဆိုမှုကိုပိတ်ပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      if (that.loadend) return; //လက်ရှိတောင်းဆိုမှုကိုအဆုံးသတ်ခြင်းကိုတားဆီးပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
      that.loading = true;
      getCollectUser(that.page, that.limit).then(res => {
        that.loading = false;
        //apply();jsarray တစ်ခုကိုအခြား array ထဲသို့ထည့်ပါ;
        that.collectProductList.push.apply(that.collectProductList, res.data);
        that.loadend = res.data.length < that.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
        that.page = that.page + 1;
      });
    },
    //အကြိုက်ဆုံးများကိုဖျက်ပါ；
    delCollection: function(index) {
      let that = this,
        id = that.collectProductList[index].pid,
        category = that.collectProductList[index].category;
      getCollectDel(id, category).then(function() {
        uni.showToast({
          title: "အောင်မြင်စွာဖျက်ပစ်လိုက်ပြီ",
          icon: "success",
          duration: 2000,
          complete: () => {
            that.collectProductList.splice(index, 1);
            that.$set(that, "collectProductList", that.collectProductList);
          }
        });
      });
    }
  }
};
</script>
