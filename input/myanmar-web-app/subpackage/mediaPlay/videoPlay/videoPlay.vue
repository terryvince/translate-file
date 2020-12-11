<style lang="less">
page {
  background-color: #F8F8F8;
  height: 100%;
  font-size: 32rpx;
  line-height: 1.6;
}

.page-body {
  padding: 20rpx 0;
}
.tc{
  text-align: center;
}

.page-body-button {
  margin-bottom: 30rpx;
}
</style>
<template>
	<view class="page-body">
		<view class="page-section tc">
			<video class="width-full" id="myVideo" :src="src"
			 @error="videoErrorCallback" @fullscreenchange="fullscreenchange" :show-center-play-btn="true" :show-play-btn="true" controls></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			};
		},
		onShareAppMessage() {
			return {
				title: 'video',
				path: 'page/component/pages/video/video'
			}
		},
		onLoad(){
			this.src = this._route.query.url
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
			this.videoContext.play()
			this.videoContext.requestFullScreen()
		},
		onUnload(){
			this.videoContext.exitFullScreen()
		},
		methods:{
			videoErrorCallback(e) {
				console.log(e.detail.errMsg)
			},
			fullscreenchange(e){
				console.log(e)
			}
		}
	}
</script>
