<template>
	<view class="goodsType">
		<text class="uni-input" @tap="open">
			{{goodsValue?goodsValue:"ကျေးဇူးပြုပြီးထုတ်ကုန်အမျိုးအစားကိုရွေးပါ"}}
		</text>
		<uni-popup ref="popup" type="bottom">
			<view class="typeSelect">
				<view class="typeSelect-title">
					<text>ကျေးဇူးပြုပြီးထုတ်ကုန်အမျိုးအစားကိုရွေးပါ</text>
				</view>
				<view class="typeSelect-content">
					<view class="uni-list">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd item" v-for="item in items" :key="item.value">
								<view class="checked">
									<checkbox :value="item.value" :checked="item.checked" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="querySubmit" style="margin-top: 20rpx;">
					<button type="primary" @tap="querySubmit()">ဆုံးဖြတ်ရန်</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../uni-popup/uni-popup.vue";
	import uniPopupMessage from "../uni-popup/uni-popup-message.vue";
	import uniPopupDialog from "../uni-popup/uni-popup-dialog.vue";
	export default {
		name: "goodsType",
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props: {
			goodsValue: {
				type: [String],
				default: []
			}
		},
		data() {
			return {
				items: [{
						value: "0",
						name: "အစာကျွေး"
					},
					{
						value: "1",
						name: "ပျိုးပင်"
					},
					{
						value: "2",
						name: "ကုသရေးဆေးဝါးများ"
					},
					{
						value: "3",
						name: "လတ်ဆတ်သော"
					},
					{
						value: "4",
						name: "ပစ္စည်းကိရိယာများ"
					},
					{
						value: "5",
						name: "ငန်းဥ"
					}
				]
			}
		},
		methods: {
			// အမျိုးအစားရွေးပါ
			open() {
				// Popup ဖွင့်ပါ
				this.$refs.popup.open();
			},
			checkboxChange(e) {
				// console.log(e);
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			// ရွေးချယ်မှုကိုအတည်ပြုပါ
			querySubmit() {
				// popup ပိတ်ပါ
				this.$refs.popup.close();
				// console.log('1',this.items)
				this.$emit("typeSelect",{items:this.items});
			}
		}
	}
</script>

<style lang="less">
	.typeSelect {
		padding: 0 60rpx 30rpx;
		background-color: #fff;

		.typeSelect-title {
			text-align: center;
			padding: 20rpx;
			font-size: 40rpx;
		}

		.typeSelect-content {
			.item {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.checked {
					transform: scale(0.7);
				}
			}
		}
	}
</style>
