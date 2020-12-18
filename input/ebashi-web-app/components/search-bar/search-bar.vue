<style scoped lang="less">
	.s-header{
		background-color: white;
		padding: 0 20rpx;
		height: 98rpx;
		.s-search{
			background-color: #EEEEEE;
			border: 2rpx solid #EEEEEE;
			border-radius: 50rpx;
			overflow: visible;
			flex: 1;
			box-sizing: border-box;
			height: 64rpx;
			padding-left: 28rpx;
			font-size: 28rpx;
			color: #bbb;
		}
		.s-icon-search{
			width: 22rpx;
			height: 22rpx;
		}
		.s-search-button{
			box-sizing: border-box;
			border: none;
			background: linear-gradient(80deg, #71D676, #5FCB55);
			height: 100%;
			border-radius:50rpx;
			line-height: 1;
			padding: 0 40rpx;
			color: white;
		}
	}
	.s-right-btn{
		margin-left: 32rpx;
		width: 44rpx;
		height: 44rpx;
	}
	.s-y-line{
		height: 26rpx;
	}
	.s-y-line::after{
		background-color: #909090;
	}
</style>
<template>
	<view class="s-header flex-main-center">
		<view class="s-search flex-main-start relative">
			<view @click="search()" class="acea-row row-middle flex-1 height-full">
				<image class="s-icon-search flex-none" src="https://res.sdebs.com/icon-search-gray.png" mode="widthFix"></image>
				<span class="s-y-line gray left-10 flex-none"></span>
				<input type="text" :readonly="readonly" class="left-10 flex-1 height-full" placeholder="搜索请输入关键词" placeholder-class="color-placeholder" v-bind:value="value" @input="$emit('input',$event.target.value)"/>
			</view>
			<view @click.stop="$emit('search')" class="s-search-button flex-main-center flex-none">搜索</view>
		</view>
		<view class="s-right-btn" v-if="$slots.right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * #right 右边按钮的插槽，有则显示，
	 * @search 触发搜索事件
	 * v-model 可以绑定v-model，如果不是只读
	 */
	export default {
		name:'search-bar',
		props:{
			value:{
				type:[String],			// 如果不是只读，输入框可以进行值的输入
				default:''
			},
			readonly: {
				type: [Boolean],
				default: true
			}
		},
		model:{
			prop:'value',
			event:'input'
		},
		data() {
			return {
				
			};
		},
		methods:{
			search(){
				if(!this.readonly){ // 不是只读则不托管事件
					return
				}
				this.$yrouter.push('/pages/shop/GoodSearch/index');
			}
		}
	}
</script>
