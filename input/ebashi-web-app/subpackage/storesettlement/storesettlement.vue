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
		<!-- 信息 -->
		<view class="storeInfo">
			<!-- 基本信息 -->
			<view class="list">
				<view class="item acea-row row-between-wrapper">
					<view class="name key">姓名：</view>
					<input type="text" placeholder="请输入姓名" v-model="storeInfo.realName" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">店铺名称：</view>
					<input type="text" placeholder="请输入店铺名称" v-model="storeInfo.storeName" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name key">电话：</view>
					<input type="text" placeholder="请输入联系电话" v-model="storeInfo.phone" required />
				</view>
				<!-- 扩大可点击区域 -->
				<view @click="$refs.goodstype.open()" class="item acea-row row-between-wrapper">
					<view class="name key">商品类别</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<!-- 防止内部点击冒泡 -->
						<view class="address" @click.stop="">
							<goodsType ref="goodstype" v-model="storeInfo.category" :goodsValue="typeText" @typeSelect="typeSelect"></goodsType>
						</view>	
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
				<view @click="$refs.cityselect.open()" class="item acea-row row-between-wrapper">
					<view class="name key">地区</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<view class="address" @click.stop="">
							<CitySelect ref="cityselect" :defaultValue="addressText" :value1="storeInfo.addressText" @callback="result"
							 :items="district"></CitySelect>
						</view>
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
			</view>
			<!-- 身份证 -->
			<view class="storeId">
				<view class="idTitle key">
					身份证正反面
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.certificates" @delete="deleteImage" @add="addImage"
					 :limit=2>
					</robby-image-upload>
				</view>
			</view>
			<!-- 营业执照 -->
			<view class="license">
				<view class="licenseTitle">
					营业执照
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageLicense" @delete="deleteImage" @add="addImage"
					 :limit=3>
					</robby-image-upload>
				</view>
			</view>
			<!-- 其他证件 -->
			<view class="orderCertificates">
				<view class="orderTitle">
					其他证件
				</view>
				<view class="photos">
					<!-- :header="{'Request Method':'POST'}" -->
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageOther" @delete="deleteImage" @add="addImage"
					 :limit=3>
					</robby-image-upload>
				</view>
			</view>
			<!-- 店铺LOGO -->
			<view class="storeLogo">
				<view class="logoTitle">
					店铺LOGO
				</view>
				<view class="photos">
					<robby-image-upload :serverUrl='$path("/api/upload")' v-model="storeInfo.imageLogo" @delete="deleteImage" @add="addImage"
					 :limit=1>
					</robby-image-upload>
				</view>
			</view>
			<!-- 文字介绍 -->
			<view class="textIntroduce">
				<view class="textTitle">
					文字介绍
				</view>
				<view class="textContent">
					<textarea v-model="storeInfo.content" placeholder-style="color:#D5D5D5" placeholder="请输入文字介绍" />
					</view>
			</view>
			<!-- 协议 -->
			<view class="agreement">
					<!-- <checkbox style="size: 30rpx;" value="cb" checked="true" />平台协议 -->
				<checkbox-group @change="agreementChange">
					<view class="agreementItem">
						<label>
						<checkbox :checked="platform" value="pt"/>
					</label>
					<text @tap="toPlatform()">平台协议</text>
					</view>
					
					<view class="agreementItem">
						<label>
						<checkbox :checked="industry" value="hy" />
					</label>
					<text @tap="toIndustry()">行业协议</text>
					</view>
					
				</checkbox-group>
			</view>
		</view>
		<!-- 入驻 -->
		<view class="footerBtm">
			<view class="button" @tap="clickSettlement()">
				入驻
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
				// 商品类型
				typeText:"",
				// 地址
				addressText:"",
				// 基本信息
				storeInfo:{
					realName:"",
					storeName:"",
					phone:"",
					category:"",
					addressText:"",
					certificates:[], // 身份证
					imageLicense:[],  // 营业执照
					imageOther:[],  // 其他证件
					imageLogo:"",  // 店铺LOGO
					content:"",  // 文字介绍
				},
				// 地址数据
				district:[],
				// 选择的地址
				address:{},
				// 平台协议
				platform:false,
				// 行业协议
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
			// 获取子组件传递的商品类型
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
			// 获取子组件传递的地址数据
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
			// 获取地址
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
			// 图片
			deleteImage: function(e) {
				console.log(e)
			},
			addImage: function(e) {
				console.log('2',e)
			},
			// 协议选择改变
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
			// 平台协议
			toPlatform(){
				this.$yrouter.push({
					path:"/subpackage/platformProtocol/platformProtocol"
				})
			},
			// 行业协议
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
					  title: "请先选择您要入驻的商品类型！",
					  icon: "none",
					  duration: 2000
					});
				}
			},
			// 入驻
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
						realName:[required(required.message("姓名！")),
						attrs.range([2,16],attrs.range.message("姓名:"))],
						// storeName:[required(required.message("店铺名称！")),
						// attrs.range([2,16],attrs.range.message("店铺名称！"))],
						phone:[required(required.message("联系电话！")),
						chs_phone(chs_phone.message())],
						category:[required("请选择商品类别")],
						addressText:[required("请选择地址")],
						certificates:[{
							required: true,
							message:'请上传身份证',
							type:'array',
							// validator(rule,value){
							// 	return value.length>0
							// }
						}],
						// imageLicense:[{
						// 	required: true,
						// 	message:'请上传营业执照',
						// 	type:'array'}],
						// // imageOther:[{
						// // 	required: true,
						// // 	message:'请上传其他证件',
						// // 	type:'array'}],
						// imageLogo:[{
						// 	required: true,
						// 	message:'请上传店铺Logo',
						// 	type:'array'}],
						// content:[required(required.message("文字介绍！"))],
						platform:[{
							required: true,
							message:'请阅读并勾选相关平台协议！',
							type:'boolean',
							validator(rule,value){
								return value===true
							}
						}],
						industry:[{
							required: true,
							message:'请阅读并勾选相关行业协议！',
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
					this.storeInfo.imageLogo = this.storeInfo.imageLogo ? this.storeInfo.imageLogo.join(",") : ''; // 不是必填项
					postSettlement(this.storeInfo).then(res=>{
						if(res.data=="成功"){
							// uni.showToast({
							//   title: "提交入驻信息成功，请等待客服联系！",
							//   icon: "none",
							//   duration: 2000
							// });
							uni.showModal({
								title:'提示',
								content:'提交入驻信息成功，请等待客服联系！',
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
