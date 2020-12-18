<template>
	<view class="info-img">
		<image :src="image" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: ''
			}
		},
		methods: {

		},
		onShow() {
			this.image = this.$yroute.query.image;
			console.log(this.image);
		}
	}
</script>

<style scoped>
	.info-img {
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.info-img image {
		width: 100%;
		height: auto;
	}
</style>
