<template>
	<view class="Null">
		<view class="null-model">
			<view class="null-img">
				<image src="../../subpackage/static/null.png" mode=""></image>
			</view>
			<view class="null-text">{{ title }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Null',
		props:{
			title:{
				type: String,
				default: '-- 暂无更多数据 --'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.null-model{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 9999;
		width: 100%;
	}
	.null-img{
		margin: 0 auto;
		width: 200rpx;
		height: 120rpx;
	}
	.null-img image{
		width: 100%;
		height: 100%;
	}
	.null-text{
		margin-top: 40rpx;
		font-size: 28rpx;
		color: #999999;
		text-align: center;
	}
</style>
