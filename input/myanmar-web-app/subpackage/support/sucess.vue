<style scoped lang="less">
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

	.header {
		.icon {
			width: 177rpx;
			height: 177rpx;
			margin-top: 80rpx;
			margin-bottom: 20rpx;
		}

		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-bottom: 40rpx;
		}

		.backBtn {
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			align-items: center;
			text-align: center;
			color: #999999;
			font-size: 24rpx;
			border: solid 1rpx #C0C0C0;
		}
	}
</style>

<template>
	<view>

		<view class="flex-cross-center header flex-column">
			<image class="icon" src="https://res.sdebs.com/icon-sucess.png" mode=""></image>
			<view class="title">ရောင်းချပြီးနောက်လျှောက်လွှာကိုအောင်မြင်စွာတင်သွင်းသည်</view>
			<view class="backBtn">ပြန်လာ</view>
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
	</view>
</template>

<script>
</script>
