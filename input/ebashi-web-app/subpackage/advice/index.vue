<style scoped lang="less">
	page {
		background: #FFFFFF;
		padding: 26rpx 0;
	}

	textarea {
		display: block;
		// margin: 20rpx 20rpx 0;
		background: white;
		font-size: 28rpx;
		// padding: 52rpx 31rpx;
		// box-sizing: border-box;
		width: auto;
		height: 100px;
	}

	.images {
		width: 100%;
		height: 100%;
		background-color: #fff;
		// border-radius: 30rpx;
		// margin-top: 20rpx;
		// padding: 10rpx;
	}

	.photos {
		margin: 20rpx 10rpx 0 10rpx;
		// background-color: #F5F5F5;
		// background-color: #FFFFFF;
		// border-radius: 20rpx;
	}

	.orderTitle {
		background-color: #F5F5F5;
		font-size: 30rpx;
		color: #999999;
		padding: 20rpx 10rpx 20rpx;
		border-bottom: 1rpx solid #EBEBEB;
	}
</style>

<template>
	<view class="over-hide">
		<view>
			<view class="orderTitle">
				问题和意见
			</view>
			<view style="padding: 20rpx; background-color: #FFFFFF;">
				<textarea maxlength="255" class="boder-radius" v-model="text" placeholder="请填写问题描述,以便我们为您提供更好的帮助" />
				</view>
		</view>
		<!-- 其他证件 -->
		<view class="images">
			<view class="orderTitle">
				图片（选填、提供问题截图）
			</view>
			<view class="photos">
				<!-- :header="{'Request Method':'POST'}" -->
				<robby-image-upload :serverUrl='$path("/api/upload")' v-model="images" @delete="deleteImage" @add="addImage"
				 :limit=3>
				</robby-image-upload>
			</view>
		</view>
		<view class="fix-bottom">
			<view @click="post()" class="post-btn bg-color-green">立即提交</view>
		</view>
	</view>	
</template>

<script>
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload';
	import {postAdvice} from '@/api/user.js'
	export default {
		data() {
			return {
				text:"",
				images:[]
			};
		},
		methods:{
			// 图片
			deleteImage: function(e) {
				console.log(e)
			},
			addImage: function(e) {
				console.log('2',e)
			},
			post(){
				if(!this.text){
					uni.showToast({
						icon:'none',
						title:'请填写您的反馈建议'
					})
					return
				}
				uni.showLoading({
					title:'正在提交中...'
				})
				let images = this.images.join(",");
				postAdvice({
					content:this.text,
					image:images,
				}).then(()=>{
					uni.showToast({
					  title: "提交成功!",
					  icon:"success",
					  duration: 2000,
					  complete: () => {
						uni.navigateBack({
							delta: 1
						});
					  }
					});
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon:'none',
						title:'提交失败!'
					})
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
