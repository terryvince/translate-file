<template>
	<view class="addAddress absolute">
		<view class="list">
			<view class="item acea-row row-between-wrapper">
				<view class="name">နာမည်：</view>
				<input type="text" placeholder="ကျေးဇူးပြု၍ သင့်နာမည်ရေးထည့်ပါ" v-model="userAddress.realName" required />
			</view>
			<view class="item acea-row row-between-wrapper">
				<view class="name">ဖုန်း：</view>
				<input type="text" placeholder="ကျေးဇူးပြုပြီးသင့်ဖုန်းနံပါတ်ကိုရိုက်ထည့်ပါ" v-model="userAddress.phone" required />
			</view>
			<view @click.stop="getLocation()" class="item acea-row row-between-wrapper">
				<view class="name">တည်နေရာ</view>
				<view class="picker acea-row row-between-wrapper select-value form-control">
					<view class="address">
						<text>{{locationText||'တည်နေရာကိုရယူပါ'}}</text>
						<!-- <CitySelect ref="cityselect" :defaultValue="addressText" :value1="addressText" @callback="result" :items="district"></CitySelect> -->
					</view>
					<view class="iconfont icon-jiantou"></view>
				</view>
			</view>
			<view @click.stop="$refs.cityselect.open" class="item acea-row row-between-wrapper">
				<view class="name">ရိယာ</view>
				<view class="picker acea-row row-between-wrapper select-value form-control">
					<view @click.stop="" class="address">
						<CitySelect ref="cityselect" :defaultValue="addressText" :value1="addressText" @callback="result" :items="district"></CitySelect>
					</view>
					<view class="iconfont icon-jiantou"></view>
				</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view class="name">လိပ်စာ</view>
				<input type="text" placeholder="ကျေးဇူးပြု၍ သီးခြားလိပ်စာဖြည့်ပါ" v-model="userAddress.detail" required />
			</view>
		</view>
		<view class="default acea-row row-middle">
			<view class="select-btn">
				<view class="checkbox-wrapper">
					<checkbox-group @change="ChangeIsDefault">
						<label class="well-check">
							<checkbox value :checked="userAddress.isDefault ? true : false"></checkbox>
							<text class="def">ပုံမှန်လိပ်စာအဖြစ်သတ်မှတ်ထားသည်</text>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view></view>
		<view v-if="id" class="keepBnt button-del" @tap="delAddress">လိပ်စာကိုဖျက်ပါ</view>
		<view class="keepBnt bg-color-green" @tap="submit">ယခုသိမ်းဆည်းပါ</view>
		<!-- 		<view class="wechatAddress" v-if="isWechat && !id" @click="getAddress">WeChat လိပ်စာကိုတင်သွင်းပါ</view> -->
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
	   * လိပ်စာကိုဖျက်ပါ
	   */
	  checkPermission(){
		  return checkAuth('userLocation','သင်ပထဝီဝင်တည်နေရာကိုရယူရန်အခွင့်အာဏာမရှိကြောင်းတွေ့ရှိခဲ့သည်，ခွင့်ပြုချက်အတွက် settings စာမျက်နှာကိုသွားမလား？')
	  },
	  delAddress: function(index) {
		  var that = this;
		  uni.showModal({
		        title: 'ချက်ချင်း',
		        content: 'ဒီလိပ်စာကိုဖျက်ရန်အတည်ပြုပါ?',
		        success(res) {
							if (res.confirm) {
										let id = that.id;
										getAddressRemove(id).then(function() {
											uni.showToast({
												title: "အောင်မြင်စွာဖျက်ပစ်လိုက်ပြီ!",
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
	   * ပုံမှန်လိပ်စာကိုသတ်မှတ်ပါ
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
		this.locationText = latitude && longitude ? 'Acquired（ပြန်လည်ရယူရန်）': ''
		
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
		  	title:'ကျေးဇူးပြု၍ တည်နေရာအချက်အလက်ရယူရန် Get Location ကိုနှိပ်ပါ',
			icon:'none'
		  })
		  return
	  }
      try {
        await this.$validator({
          name: [
            required(required.message("နာမည်")),
            attrs.range([2, 16], attrs.range.message("နာမည်"))
          ],
          phone: [
            required(required.message("ဆက်သွယ်ရန်ဖုန်းနံပါတ်")),
            chs_phone(chs_phone.message())
          ],
		  locationText: [required("ကျေးဇူးပြုပြီးတည်နေရာကိုရယူပါ")],
          addressText: [required("ကျေးဇူးပြုပြီးဒေသကိုရွေးပါ")],
          detail: [required(required.message("သီးခြားလိပ်စာ"))]
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
              title: "အောင်မြင်စွာပြုပြင်ပြီးပါပြီ",
              icon: "none",
              duration: 2000
            });
          } else {
            uni.showToast({
              title: "အောင်မြင်စွာထည့်ပြီးပါပြီ",
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
	// လက်ရှိတည်နေရာ၏လတ္တီတွဒ်နှင့်လောင်ဂျီတွဒ်သေချာပေါက်မလိုအပ်ပါ，ဒါကြောင့်သင်ရွေးရန်လိုအပ်သည်
	getLocation(){
		let that = this
		this.checkPermission().then(res=>{
			console.log(res)
			this.isAuth = true
			uni.chooseLocation({
				success(res){
					const {latitude,longitude} = res
					that.location = {latitude,longitude}
					that.locationText = 'Acquired（ပြန်လည်ရယူရန်）'
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
		console.log('ကွပ်မျက် positioning')
		
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
