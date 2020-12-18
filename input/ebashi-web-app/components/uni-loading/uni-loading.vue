<template>
	<view class="load">
		<view class="nullList" v-if="isListNull == true"><image src="../../static/loading.gif" mode="aspectFill"></image>加载中..</view>
		<view class="nullList" v-else>-- 没有更多数据了 --</view>
	</view>
</template>

<script>
	export default {
		name:'Load',
		props:{
			isListNull:{
				type: Boolean,
				default: true
			},
			size:{
				type: Number,
				default: 24
			},
			color:{
				type: String,
				default: '#999aaa'
			},
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
	.nullList{
		width: 100%;
		text-align: center;
		height: 40rpx;
	}
	.nullList image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
