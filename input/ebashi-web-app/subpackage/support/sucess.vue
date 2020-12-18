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
			<view class="title">售后申请提交成功</view>
			<view class="backBtn">返回</view>
		</view>

		<view class="desrc">
			<view class="title flex-none">!
			</view>
			<view>
				温馨提示：
				<view>1.商品寄回地址将在审核通过后以短信形式告知，或在申请记
				</view>
				<view>录中查询.</view>
				<view>2.退货处理成功后退款金额将原路返回到您的支持账户中</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>
