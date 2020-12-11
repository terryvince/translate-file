<style>
	page {
		height: 100%;
		width: 100%;
	}
</style>

<style scoped lang="less">
	.storesettlement {
		width: 100%;
		height: 100%;
		border-radius: 30rpx;
		margin-top: 20rpx;
		// padding: 10rpx;

		.imageBg {
			width: 100%;
			background-size: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: -1;
		}
		.storeInfo{
			margin: 0 20rpx;
			margin-top: 490rpx;
			.acea-row{
				flex-wrap: nowrap;
			}
		}
		.iconfont {
		    font-size: 26rpx !important;
		    color: #666;
		}
		.photos {
			margin: 20rpx 10rpx 0 10rpx;
			background-color: #F5F5F5;
			border-radius: 20rpx;
		}
		.textContent{
			margin: 20rpx 10rpx 10rpx;
			padding: 15rpx;
			background-color: #F5F5F5;
			border-radius: 20rpx;
			textarea{
				width: 100%;
				height: 200rpx;
			}
		}
		.agreement{
			margin-top: 20rpx;
			checkbox-group{
				display: flex;
				justify-content: space-between;
			}
			.agreementItem{
				width: 340rpx;
				height: 80rpx;
				background-color: #fff;
				line-height: 80rpx;
				text-align: center;
				border-radius: 15rpx;
				display: inline-block;
				checkbox{
					transform: scale(0.7);
				}
			}
		}
		.idTitle,.licenseTitle,.orderTitle,.logoTitle,.textTitle{
			padding: 10rpx 10rpx 20rpx;
			border-bottom: 1rpx solid #EBEBEB;
		}
		.footerBtm{
			width: 100%;
			height: 160rpx;
			margin-top: 20rpx;
			background-color: #fff;
			border-top: 1rpx solid #fff;
			.button{
				width: 710rpx;
				height: 98rpx;
				background:linear-gradient(to right,#5FCB55,50%,#71D676);
				font-size: 36rpx;
				color: #fff;
				text-align: center;
				line-height: 98rpx;
				margin: 31rpx 20rpx;
				border-radius: 10rpx;
			}
		}
	}
	.storesettlement .storeInfo .storeId{
		padding: 10rpx 30rpx;
	}
</style>

<template>
	<view class="storesettlement">
		<image class="imageBg" src="https://res.sdebs.com/index-settlement.png" mode="widthFix"></image>
		<!-- သတင်းအချက်အလက် -->
		<view class="storeInfo">
			<!-- အခြေခံအချက်အလက် -->
			<view class="list">
				<view class="item acea-row row-between-wrapper">
					<view class="name key">နာမည်：</view>
					<input type="text" placeholder="ကျေးဇူးပြု၍ သင့်နာမည်ရေးထည့်ပါ" v-model="storeInfo.realName" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">ဆိုင်နာမည်：</view>
					<input type="text" placeholder="ကျေးဇူးပြုပြီးဆိုင်နာမည်ထည့်ပါ" v-model="storeInfo.storeName" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name key">ဖုန်း：</view>
					<input type="text" placeholder="ကျေးဇူးပြုပြီးသင့်ဖုန်းနံပါတ်ကိုရိုက်ထည့်ပါ" v-model="storeInfo.phone" required />
				</view>
				<!-- နှိပ်နိုင်သောareaရိယာကိုချဲ့ထွင် -->
				<view @click="$refs.goodstype.open()" class="item acea-row row-between-wrapper">
					<view class="name key">ကုန်ပစ္စည်းအမျိုးအစား</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<!-- ပြည်တွင်းကလစ်နှိပ်ခြင်းမှကာကွယ်ရန် -->
						<view class="address" @click.stop="">
							<goodsType ref="goodstype" v-model="storeInfo.category" :goodsValue="typeText" @typeSelect="typeSelect"></goodsType>
						</view>	
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
				<view @click="$refs.cityselect.open()" class="item acea-row row-between-wrapper">
					<view class="name key">ရိယာ</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<view class="address" @click.stop="">
							<CitySelect ref="cityselect" :defaultValue="addressText" :value1="storeInfo.addressText" @callback="result"
							 :items="district"></CitySelect>
						</view>
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
			</view>
			<!-- ID ကဒ် -->
			<view class="storeId">
				<view class="idTitle key">
					ID နှင့်ကဒ်ပြားရှေ့
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.certificates" @delete="deleteImage" @add="addImage"
					 :limit=2>
					</robby-image-upload>
				</view>
			</view>
			<!-- လုပ်ငန်းလိုင်စင် -->
			<view class="license">
				<view class="licenseTitle">
					လုပ်ငန်းလိုင်စင်
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageLicense" @delete="deleteImage" @add="addImage"
					 :limit=3>
					</robby-image-upload>
				</view>
			</view>
			<!-- အခြားစာရွက်စာတမ်းများ -->
			<view class="orderCertificates">
				<view class="orderTitle">
					အခြားစာရွက်စာတမ်းများ
				</view>
				<view class="photos">
					<!-- :header="{'Request Method':'POST'}" -->
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageOther" @delete="deleteImage" @add="addImage"
					 :limit=3>
					</robby-image-upload>
				</view>
			</view>
			<!-- ဆိုင်LOGO -->
			<view class="storeLogo">
				<view class="logoTitle">
					ဆိုင်LOGO
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageLogo" @delete="deleteImage" @add="addImage"
					 :limit=1>
					</robby-image-upload>
				</view>
			</view>
			<!-- စာသားဖော်ပြချက် -->
			<view class="textIntroduce">
				<view class="textTitle">
					စာသားဖော်ပြချက်
				</view>
				<view class="textContent">
					<textarea v-model="storeInfo.content" placeholder-style="color:#D5D5D5" placeholder="ကျေးဇူးပြု၍ စာသားဖော်ပြချက်ထည့်ပါ" />
					</view>
			</view>
			<!-- protocol ကို -->
			<view class="agreement">
					<!-- <checkbox style="size: 30rpx;" value="cb" checked="true" />ပလက်ဖောင်းသဘောတူညီချက် -->
				<checkbox-group @change="agreementChange">
					<view class="agreementItem">
						<label>
						<checkbox :checked="platform" value="pt"/>
					</label>
					<text @tap="toPlatform()">ပလက်ဖောင်းသဘောတူညီချက်</text>
					</view>
					
					<view class="agreementItem">
						<label>
						<checkbox :checked="industry" value="hy" />
					</label>
					<text @tap="toIndustry()">စက်မှုသဘောတူညီချက်</text>
					</view>
					
				</checkbox-group>
			</view>
		</view>
		<!-- အခြေချ -->
		<view class="footerBtm">
			<view class="button" @tap="clickSettlement()">
				အခြေချ
			</view>
		</view>
	</view>
</template>

<script>
	import CitySelect from "@/components/CitySelect";
	import goodsType from "@/components/goodsType/goodsType";
	import { getCity} from "@/api/user";
	import { postSettlement,getProtocol} from "@/api/store";
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload';
	import attrs, { required, chs_phone } from "@/utils/validate";
	import { validatorDefaultCatch } from "@/utils/dialog";
	import { chooseImage } from "@/utils";
	export default {
		components: {
			CitySelect,
			goodsType,
			robbyImageUpload
		},
		data:function(){
			return{
				// ထုတ်ကုန်အမျိုးအစားများ
				typeText:"",
				// လိပ်စာ
				addressText:"",
				// အခြေခံအချက်အလက်
				storeInfo:{
					realName:"",
					storeName:"",
					phone:"",
					category:"",
					addressText:"",
					certificates:[], // ID ကဒ်
					imageLicense:[],  // လုပ်ငန်းလိုင်စင်
					imageOther:[],  // အခြားစာရွက်စာတမ်းများ
					imageLogo:"",  // ဆိုင်LOGO
					content:"",  // စာသားဖော်ပြချက်
				},
				// လိပ်စာအချက်အလက်
				district:[],
				// ရွေးချယ်ထားသောလိပ်စာ
				address:{},
				// ပလက်ဖောင်းသဘောတူညီချက်
				platform:false,
				// စက်မှုသဘောတူညီချက်
				industry:false,
			}
		},
		mounted: function() {
			// chooseImage((res)=>{
			// 	console.log(res)
			// })
		  this.getCityList();
		},
		methods:{
			// subcomponent မှထုတ်သောထုတ်ကုန်အမျိုးအစားကိုရယူပါ
			typeSelect(type){
				console.log('100',type);
				let items = type.items;
				let arr = [];
						for(var i=0;i<items.length;i++){
							if(items[i].checked==true){
								arr.push(items[i].name)
								this.storeInfo.category = arr.join("、");
							}
						}
				this.typeText=this.storeInfo.category;
				// console.log('2',this.storeInfo)
			},
			// အဆိုပါ subcomponent အားဖြင့်လွန်လိပ်စာဒေတာရယူပါ
			result(values) {
			  // console.log(this);
			  console.log('1',values);
			  this.address = {
			    province: values.province.name || "",
			    city: values.city.name || "",
			    district: values.district.name || "",
			    city_id: values.city.id
			  };
			  this.addressText = `${this.address.province}${this.address.city}${this.address.district}`;
			  // this.addressText =
			  //   this.address.province + this.address.city + this.address.district;
			  this.storeInfo.addressText = this.addressText;
			},
			// လိပ်စာရယူပါ
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
			// ပုံ
			deleteImage: function(e) {
				console.log(e)
			},
			addImage: function(e) {
				console.log('2',e)
			},
			// protocol ကိုရွေးချယ်ရေးပြောင်းလဲမှု
			agreementChange(e){
				// console.log(e.detail.value)
				var values = e.detail.value;
				for (var i = 0;i< values.length;i++) {
				    if(values.includes("pt")){
				        this.platform = true;
				    }else{
				        this.platform = false;
				    }
				    if(values.includes("hy")){
				        this.industry=true;
				    }else{
				        this.industry=false;
				    }
				}
			},
			// ပလက်ဖောင်းသဘောတူညီချက်
			toPlatform(){
				this.$yrouter.push({
					path:"/subpackage/platformProtocol/platformProtocol"
				})
			},
			// စက်မှုသဘောတူညီချက်
			toIndustry(){
				if(this.storeInfo.category){
					// console.log(this.storeInfo.category)
					let data = this.storeInfo.category.replace(/、/g,",");
					// console.log(data)
					getProtocol(data).then(res=>{
						if(res.success){
							this.$yrouter.push({
								path:"/subpackage/industryProtocol/industryProtocol",
								query:{data:JSON.stringify(res.data)}
							})
						}
					})
				}else{
					uni.showToast({
					  title: "ကျေးဇူးပြု၍ သင်ပထမ ဦး ဆုံးထည့်သွင်းလိုသောကုန်ပစ္စည်းအမျိုးအစားကိုရွေးချယ်ပါ！",
					  icon: "none",
					  duration: 2000
					});
				}
			},
			// အခြေချ
			async clickSettlement(){
				console.log('10',this);
				console.log(this.storeInfo);
				let realName = this.storeInfo.realName,
					storeName = this.storeInfo.storeName,
					phone = this.storeInfo.phone,
					category = this.storeInfo.category,
					addressText = this.storeInfo.addressText,
					certificates = this.storeInfo.certificates,
					imageLicense = this.storeInfo.imageLicense,
					// imageOther = this.storeInfo.imageOther,
					imageLogo = this.storeInfo.imageLogo,
					content = this.storeInfo.content,
					platform=this.platform,
					industry=this.industry;
				// console.log(certificates)
				try{
					await this.$validator({
						realName:[required(required.message("နာမည်！")),
						attrs.range([2,16],attrs.range.message("နာမည်:"))],
						// storeName:[required(required.message("ဆိုင်နာမည်！")),
						// attrs.range([2,16],attrs.range.message("ဆိုင်နာမည်！"))],
						phone:[required(required.message("ဆက်သွယ်ရန်ဖုန်းနံပါတ်！")),
						chs_phone(chs_phone.message())],
						category:[required("ကျေးဇူးပြုပြီးထုတ်ကုန်အမျိုးအစားရွေးပါ")],
						addressText:[required("ကျေးဇူးပြု၍ လိပ်စာရွေးပါ")],
						certificates:[{
							required: true,
							message:'ကျေးဇူးပြု၍ အိုင်ဒီကိုတင်ပါ',
							type:'array',
							// validator(rule,value){
							// 	return value.length>0
							// }
						}],
						// imageLicense:[{
						// 	required: true,
						// 	message:'ကျေးဇူးပြု၍ စီးပွားရေးလိုင်စင်ကိုတင်ပါ',
						// 	type:'array'}],
						// // imageOther:[{
						// // 	required: true,
						// // 	message:'ကျေးဇူးပြုပြီးအခြားစာရွက်စာတမ်းများတင်ပါ',
						// // 	type:'array'}],
						// imageLogo:[{
						// 	required: true,
						// 	message:'ကျေးဇူးပြုပြီးစျေးဝယ်တင်ပါLogo',
						// 	type:'array'}],
						// content:[required(required.message("စာသားဖော်ပြချက်！"))],
						platform:[{
							required: true,
							message:'ကျေးဇူးပြု၍ သက်ဆိုင်ရာပလက်ဖောင်းသဘောတူညီချက်ကိုဖတ်။ စစ်ဆေးပါ！',
							type:'boolean',
							validator(rule,value){
								return value===true
							}
						}],
						industry:[{
							required: true,
							message:'ကျေးဇူးပြု၍ သက်ဆိုင်ရာလုပ်ငန်းဆိုင်ရာသဘောတူညီချက်များကိုဖတ်ပါ！',
							type:'boolean',
							validator(rule,value){
								return value===true
							}
						}]
					}).validate({realName,phone,category,addressText,certificates,platform,industry});
					// storeName imageLicense imageLogo content
				}catch(e){
					// console.log(e.errors);
					return validatorDefaultCatch(e);
				}
				try{
					this.storeInfo.certificates = this.storeInfo.certificates.join(",");
					this.storeInfo.imageLicense = this.storeInfo.imageLicense.join(",");
					this.storeInfo.imageOther = this.storeInfo.imageOther.join(",");
					this.storeInfo.imageLogo = this.storeInfo.imageLogo ? this.storeInfo.imageLogo.join(",") : ''; // မလိုအပ်ဘူး
					postSettlement(this.storeInfo).then(res=>{
						if(res.data=="အောင်မြင်မှု"){
							// uni.showToast({
							//   title: "entry ကိုအချက်အလက်များ၏အောင်မြင်သောတင်သွင်းခဲ့တဲ့，ကျေးဇူးပြု၍ ဖောက်သည်ဝန်ဆောင်မှုကိုဆက်သွယ်ပါရန်စောင့်ပါ！",
							//   icon: "none",
							//   duration: 2000
							// });
							uni.showModal({
								title:'ချက်ချင်း',
								content:'entry ကိုအချက်အလက်များ၏အောင်မြင်သောတင်သွင်းခဲ့တဲ့，ကျေးဇူးပြု၍ ဖောက်သည်ဝန်ဆောင်မှုကိုဆက်သွယ်ပါရန်စောင့်ပါ！',
								showCancel:false
							})
						}
						return this.$yrouter.back()
					})
				}catch(err){
					uni.showToast({
					  title: err.msg || err.response.data.msg || err.response.data.message,
					  icon: "none",
					  duration: 2000
					});
				}
			}
		}
	}
</script>
