<style scoped lang="less">
	.content {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding-bottom: 20rpx;

		.title {
			font-size: 28rpx;
			height: 80rpx;
			font-weight: bold;
			border-bottom: 1px solid #f5f5f5;
			margin-left: 20rpx;
		}

		.input {
			padding-top: 20rpx;
			padding-left: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
			background-color: #F0F0F0;
			font-size: 26rpx;
		}
	}

	textarea {
		// background-color: #444444;
		width: 680rpx;
	}

	robby-image-upload::v-deep {

		.imageItem,
		.imageUpload {
			width: 150rpx !important;
			height: 150rpx !important;
			margin: 10rpx !important;
		}
	}

	.photos {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		// min-height: 200rpx;
	}

	.desrc {
		margin-top: 30rpx;
		margin-right: 20rpx;
		justify-content: flex-start;
		display: flex;
		// align-items: center;
		// align-content: center;
		font-size: 24rpx;
		color: #999999;

		.title {
			margin-top: 10rpx;
			margin-left: 20rpx;
			margin-right: 10rpx;
			width: 20rpx;
			height: 20rpx;
			line-height: 20rpx;
			background: #999999;
			border-radius: 50%;
			align-items: center;
			text-align: center;
			font-size: 18rpx;
			color: #FFFFFF;
		}
	}

	.continue {
		margin-top: 80rpx;
		margin-right: 40rpx;
		margin-left: 40rpx;
		height: 100rpx;
		background-color: #5FCB55;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 100rpx;
		border-radius: 8rpx;
		align-items: center;
		text-align: center;
	}
</style>

<template>
	<view>
		<OrderGoods :evaluate="status.type || 0" :cartInfo="orderInfo.cartInfo || []"></OrderGoods>
		<view class="content">
			<view class="title flex-main-start">လျှောက်လွှာအတွက်အကြောင်းပြချက်</view>
			<view class="input">
				<view class="uni-textarea">
					<textarea placeholder="လျှောက်လွှာအတွက်အကြောင်းပြချက်ကိုရိုက်ထည့်ပါ"></textarea>
				</view>
			</view>
		</view>

		<view class="photos">
			<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :limit=4>
			</robby-image-upload>
		</view>

		<view class="desrc">
			<view class="title flex-none">!
			</view>
			<view>
				သိကောင်းစရာများ：
				<view>1.ပြန်လည်သုံးသပ်ပြီးနောက်ကုန်ပစ္စည်း၏ပြန်ပို့သည့်လိပ်စာကို SMS ဖြင့်အကြောင်းကြားလိမ့်မည်，ဒါမှမဟုတ်လျှောက်လွှာမှတ်စုထဲမှာ
				</view>
				<view>စံချိန်တင်အတွက် query.</view>
				<view>2.ပြန်အမ်းငွေကိုအောင်မြင်စွာပြန်အပြီးတွင်ပြုလုပ်ပြီးပါကသင်၏ထောက်ခံစာအကောင့်သို့ပြန်ပေးမည်</view>
			</view>
		</view>

		<view class="continue">
			တင်သွင်း
		</view>
	</view>
</template>

<script>
	import OrderGoods from "@/components/OrderGoods";
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload';
	export default {
		components: {
			robbyImageUpload
		},
		data: function() {
			return {
				orderInfo: {},
				imageData: "",
			};
		},
		methods: {
			deleteImage: function(e) {
				console.log(e)
			},
			addImage: function(e) {
				console.log(e)
			}
		}
	}
</script>
