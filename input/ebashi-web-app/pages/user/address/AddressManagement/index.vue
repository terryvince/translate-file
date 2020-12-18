<template>
	<view class="address-management" :class="addressList.length < 1 && page > 1 ? 'on' : ''" ref="container">
		<view class="list-wrap">
			<view class="item" v-for="(item, addressListIndex) in addressList" :key="addressListIndex">
				<view class="address">
					<view style="margin-right: 100rpx;">
						<view class="consignee">
							{{ item.realName }}
							<text class="phone">{{ item.phone }}</text>
							<!-- <text  class="left-10 bg-color-green color-white padding-5 txt-center  fs-20">默认</text> -->
							<text v-if="item.isDefault==1" class="badge badge-mini-extra badge-primary badge-radius left-10">默认</text>
						</view>
						<view class="address-detail">
							{{' ' + item.province + item.city + item.district + item.detail}}
						</view>
					</view>
			
					<view @click="editAddress(addressListIndex)">
						<image src="https://res.sdebs.com/icon-address-edit.png" mode="" class="address-edit"></image>
					</view>
			
				</view>
			</view>
		</view>
		
		<Loading :loaded="loadend" :loading="loading"></Loading>
		<view class="noCommodity" v-if="addressList.length < 1 && page > 1">
			<view class="noPictrue">
				<image src="@/static/images/noAddress.png" class="image" />
			</view>
		</view>
		<view style="height:100rpx;"></view>
		<view class="footer acea-row row-between-wrapper">
			<view class="addressBnt on bg-primary color-white" @click="addAddress">
				添加收货地址
			</view>
		</view>
	</view>
</template>
<style scoped lang="less">
	.address-management.on {
  background-color: #fff;
  height: 100vh;
}
.address-management{
	// margin: 20rpx;
}
.list-wrap{
	background-color: white;
	overflow: hidden;
	border-radius: 20rpx;
	margin: 20rpx;
}
.item{
	margin-bottom: 0;
	background-color: transparent;
	&:last-child .address{
		border-bottom: none;
	}
}
.phone{
	margin-left: 88rpx !important;
	
}
.phone .consignee{
	font-size: 32rpx !important;
	font-weight: bold !important;
}
.address-detail{
	font-size: 28rpx !important;
	color: #828282;
}
.address{
	position: relative;
}

.address-edit{
	width: 16*2rpx;
	height: 14*2rpx;
	position: absolute;
	right: 20rpx;
	top: 60rpx;
}

</style>
<script type="text/babel">
	import {
  getAddressList,
  getAddressRemove,
  getAddressDefaultSet,
  postAddress
} from "@/api/user";
import Loading from "@/components/Loading";
import { isWeixin } from "@/utils";
// import { openAddress } from "@/libs/wechat";

export default {
  components: {
    Loading
  },
  data() {
    return {
      page: 1,
      limit: 20,
      addressList: [],
      loadTitle: "",
      loading: false,
      loadend: false,
      isWechat: isWeixin()
    };
  },
  mounted: function() {
    this.AddressList();
  },
  onReachBottom() {
    !this.loading && this.AddressList();
  },
  onShow: function() {
    this.refresh();
  },
  methods: {
    refresh: function() {
      this.addressList = [];
      this.page = 1;
      this.loadend = false;
      this.AddressList();
    },
    /**
     * 获取地址列表
     *
     */
    AddressList: function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      getAddressList({ page: that.page, limit: that.limit }).then(res => {
        that.loading = false;
        //apply();js将一个数组插入另一个数组;
        that.addressList.push.apply(that.addressList, res.data);
        that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
        that.page = that.page + 1;
      });
    },
       /**
        * 编辑地址
        */
       editAddress: function(index) {
         this.$yrouter.push({
           path: "/pages/user/address/AddAddress/index",
           query: { id: this.addressList[index].id }
         });
       },
    /**
     * 新增地址
     */
    addAddress: function() {
      this.$yrouter.push({
        path: "/pages/user/address/AddAddress/index"
      });
    },
  }
};
</script>
