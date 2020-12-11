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
				<input type="text" :readonly="readonly" class="left-10 flex-1 height-full" placeholder="ကျေးဇူးပြု၍ ရှာဖွေရန်သော့ချက်စာလုံးကိုရိုက်ထည့်ပါ" placeholder-class="color-placeholder" v-bind:value="value" @input="$emit('input',$event.target.value)"/>
			</view>
			<view @click.stop="$emit('search')" class="s-search-button flex-main-center flex-none">အားရှာဖွေခြင်း</view>
		</view>
		<view class="s-right-btn" v-if="$slots.right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * #right ညာဘက်ခလုတ်ကိုအတွက်အပေါက်，ပြပါ，
	 * @search ရှာဖွေရေးအဖြစ်အပျက်
	 * v-model ခညျြနှောငျနိုင်ပါတယ်v-model，မသာဖတ်ပါ
	 */
	export default {
		name:'search-bar',
		props:{
			value:{
				type:[String],			// မသာဖတ်ပါ，အဆိုပါ input ကို box ကိုတန်ဖိုးရိုက်ထည့်နိုင်ပါတယ်
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
				if(!this.readonly){ // ဖတ်မှသာမဖြစ်လျှင်၊ ဖြစ်ရပ်များကိုအိမ်ရှင်အဖြစ်လက်ခံမည်မဟုတ်ပါ
					return
				}
				this.$yrouter.push('/pages/shop/GoodSearch/index');
			}
		}
	}
</script>
