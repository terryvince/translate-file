<template>
	<view class="addAddress absolute">
		<view class="list">
			<view class="item acea-row row-between-wrapper">
				<view class="name">姓名：</view>
				<input type="text" placeholder="请输入姓名" v-model="userAddress.realName" required />
			</view>
			<view class="item acea-row row-between-wrapper">
				<view class="name">电话：</view>
				<input type="text" placeholder="请输入联系电话" v-model="userAddress.phone" required />
			</view>
			<view @click.stop="getLocation()" class="item acea-row row-between-wrapper">
				<view class="name">定位</view>
				<view class="picker acea-row row-between-wrapper select-value form-control">
					<view class="address">
						<text>{{locationText||'获取定位'}}</text>
						<!-- <CitySelect ref="cityselect" :defaultValue="addressText" :value1="addressText" @callback="result" :items="district"></CitySelect> -->
					</view>
					<view class="iconfont icon-jiantou"></view>
				</view>
			</view>
			<view @click.stop="$refs.cityselect.open" class="item acea-row row-between-wrapper">
				<view class="name">地区</view>
				<view class="picker acea-row row-between-wrapper select-value form-control">
					<view @click.stop="" class="address">
						<CitySelect ref="cityselect" :defaultValue="addressText" :value1="addressText" @callback="result" :items="district"></CitySelect>
					</view>
					<view class="iconfont icon-jiantou"></view>
				</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view class="name">详细地址</view>
				<input type="text" placeholder="请填写具体地址" v-model="userAddress.detail" required />
			</view>
		</view>
		<view class="default acea-row row-middle">
			<view class="select-btn">
				<view class="checkbox-wrapper">
					<checkbox-group @change="ChangeIsDefault">
						<label class="well-check">
							<checkbox value :checked="userAddress.isDefault ? true : false"></checkbox>
							<text class="def">设置为默认地址</text>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view></view>
		<view v-if="id" class="keepBnt button-del" @tap="delAddress">删除地址</view>
		<view class="keepBnt bg-color-green" @tap="submit">立即保存</view>
		<!-- 		<view class="wechatAddress" v-if="isWechat && !id" @click="getAddress">导入微信地址</view> -->
	</view>
</template>


<style lang="less">
	.address {
		text {
			width: 100%;
			display: block;
		}	
	}
	.addAddress{
		padding: 20rpx;
		border-radius: 10rpx;
	}
	.addAddress .list .item .name {
		width: auto;
	}
	.keepBnt{
		margin-top: 20rpx !important; 
	}
	.button-del{
		margin-top: 60rpx !important; 
		margin-bottom: 10rpx !important;
		background-color: #CCCCCC;
	}
	.iconfont {
	    font-size: 26rpx !important;
	    color: #666;
	}
</style>

<script type="text/babel">
	import CitySelect from "@/components/CitySelect";
import { getAddress, postAddress, getCity,  getAddressRemove,
  getAddressDefaultSet} from "@/api/user";
import attrs, { required, chs_phone } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";
// import { openAddress } from "@/libs/wechat";
import { isWeixin,checkAuth } from "@/utils";
export default {
  name: "AddAddress",
  components: {
    CitySelect
  },
  data() {
    return {
      district: [],
      id: 0,
      userAddress: { isDefault: 0 },
      address: {},
      isWechat: isWeixin(),
      addressText: "",
	  location:{
		latitude:'',
		longitude:''
	  },
	  locationText:'',
	  isAuth:false
    };
  },
  mounted: function() {
    let id = this.$yroute.query.id;
    this.id = id;
    this.getUserAddress();
    this.getCityList();
	this.checkPermission().then(res=>{
		console.log(res)
		this.isAuth = true
	  }).catch(err=>{
		this.isAuth = false
		uni.showToast({
			title:err,
			icon:none
		})
	  })
  },
  watch: {
    // addressText(nextModel2) {
    //   console.log(nextModel2, 8585858585);
    // }
  },
  methods: {
	  /**
	   * 删除地址
	   */
	  checkPermission(){
		  // #ifdef MP
		  return checkAuth('userLocation','检测到您未授权获取地理位置，是否跳转到设置页进行授权？')
		  // #endif
		  // #ifdef H5
		  return Promise.resolve('ok')
		  // #endif
	  },
	  delAddress: function(index) {
		  var that = this;
		  uni.showModal({
		        title: '提示',
		        content: '确认删除该地址?',
		        success(res) {
							if (res.confirm) {
										let id = that.id;
										getAddressRemove(id).then(function() {
											uni.showToast({
												title: "删除成功!",
												icon:"success",
												duration: 2000,
												complete: () => {
													uni.navigateBack({
															delta: 1
													});
												}
											});
										});
									}
							}
		   })
	  },
	  /**
	   * 设置默认地址
	   */
	  radioChange: function(id) {
	    getAddressDefaultSet(id).then(res => {
	      this.refresh();
	      uni.showToast({ title: res.msg, icon: "none", duration: 2000 });
	    });
	  },
    getCityList: function() {
      let that = this;
      getCity()
        .then(res => {
          that.district = res.data;
          that.ready = true;
        })
        .catch(err => {
          that.$dialog.error(err.msg);
        });
    },
    getUserAddress: function() {
      if (!this.id) return false;
      getAddress(this.id).then(res => {
		  const {address,latitude,longitude} = res.data
        this.userAddress = res.data;
        
		this.location = {latitude,longitude};
		this.locationText = latitude && longitude ? '已获取（重新获取）': ''
		
		this.addressText = res.data.province + " " + res.data.city + " " + res.data.district;
        this.address.province = res.data.province;
        this.address.city = res.data.city;
        this.address.district = res.data.district;
		this.$forceUpdate()
      });
    },
    getAddress() {},
    async submit() {
      let name = this.userAddress.realName,
        phone = this.userAddress.phone,
        addressText = this.addressText,
		locationText = this.locationText,
        detail = this.userAddress.detail,
        isDefault = this.userAddress.isDefault;
	  if(!locationText && this.isAuth){
		  uni.showToast({
		  	title:'请点击获取位置获取地理位置信息',
			icon:'none'
		  })
		  return
	  }
      try {
        await this.$validator({
          name: [
            required(required.message("姓名")),
            attrs.range([2, 16], attrs.range.message("姓名"))
          ],
          phone: [
            required(required.message("联系电话")),
            chs_phone(chs_phone.message())
          ],
		  locationText: [required("请获取定位")],
          addressText: [required("请选择地区")],
          detail: [required(required.message("具体地址"))]
        }).validate({ name, phone,locationText ,addressText, detail });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
	  const {latitude,longitude} = this.location
      try {
        let that = this,
          data = {
            id: that.id,
            real_name: name,
            phone: phone,
            address:this.address,
			latitude,
			longitude,
            detail: detail,
            is_default: isDefault ? true : false,
            post_code: ""
          };
        postAddress(data).then(function() {
          if (that.id) {
            uni.showToast({
              title: "修改成功",
              icon: "none",
              duration: 2000
            });
          } else {
            uni.showToast({
              title: "添加成功",
              icon: "none",
              duration: 2000
            });
            // that.$yrouter.replace({
            //   path: "/pages/user/PersonalData/index"
            // });
          }
          that.$yrouter.go(-1);
        });
      } catch (err) {
        uni.showToast({
          title: err.msg || err.response.data.msg || err.response.data.message,
          icon: "none",
          duration: 2000
        });
      }
    },
    ChangeIsDefault: function() {
      this.userAddress.isDefault = !this.userAddress.isDefault;
    },
	// 不一定是当前位置的经纬度，所以需要选取
	getLocation(){
		let that = this
		// #ifdef MP
		this.checkPermission().then(res=>{
			console.log(res)
			this.isAuth = true
			uni.chooseLocation({
				success(res){
					const {latitude,longitude} = res
					that.location = {latitude,longitude}
					that.locationText = '已获取（重新获取）'
				},
				fail(err){
					console.error(err)
				}
			})  
		  }).catch(err=>{
			this.isAuth = false
			uni.showToast({
				title:err,
				icon:none
			})
		  })	
		console.log('定位执行')
		// #endif
		// #ifdef H5
		uni.chooseLocation({
			success(res){
				const {latitude,longitude} = res
				console.log('h5获取定位：',res)
				that.location = {latitude,longitude}
				that.locationText = '已获取（重新获取）'
			},
			fail(err){
				console.error(err)
			}
		})
		// #endif
		
	},
    result(values) {
      this.address = {
        province: values.province.name || "",
        city: values.city.name || "",
        district: values.district.name || "",
        city_id: values.city.id
      };
      this.addressText = `${this.address.province}${this.address.city}${this.address.district}`;
    }
  }
};
</script>
