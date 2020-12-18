<style lang="less" scoped>
	.gd-swiper{
		height: 500rpx;
		width: 100%;
	}
</style>
<template>
	<swiper class="gd-swiper bg-white" @change="handleChange" :indicator-dots="true" :autoplay="autoplay" :duration="duration" :indicator-color="indicatorColor"
	 :indicator-active-color="themeColor">
		<swiper-item v-for="(url,i) in imgUrls" :key="i">
			<view class="swiper-item full over-hide">
				<image :src="url" class="full" mode="scaleToFill"></image>
			</view>
		</swiper-item>
	</swiper>
</template>
<script>
export default {
  name: "ProductConSwiper",
  props: {
    imgUrls: {
      type: Array,
      default: () => []
    },
	themeColor: {  // 主题色，小圆点的激活色
		type: String,
		default: '#64CE5E'
	},
	autoplay: {
		type: Boolean,
		default: false
	},
	duration:{
		type: Number,
		default: 1000
	},
	indicatorColor:{
		type: String,
		default: '#FEF2F2'
	}
  },
  data() {
    return {
		currents: 1
      }
  },
  mounted() {},
  methods: {
    handleChange(event) {
      this.currents = event.mp.detail.current + 1;
    }
  }
};
</script>
