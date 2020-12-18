<template>
	<view class="goodsType">
		<text class="uni-input" @tap="open">
			{{goodsValue?goodsValue:"请选择商品类型"}}
		</text>
		<uni-popup ref="popup" type="bottom">
			<view class="typeSelect">
				<view class="typeSelect-title">
					<text>请选择商品类型</text>
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
					<button type="primary" @tap="querySubmit()">确定</button>
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
						name: "饲料"
					},
					{
						value: "1",
						name: "种苗"
					},
					{
						value: "2",
						name: "兽药"
					},
					{
						value: "3",
						name: "生鲜"
					},
					{
						value: "4",
						name: "设备"
					},
					{
						value: "5",
						name: "鹅蛋"
					}
				]
			}
		},
		methods: {
			// 选择类型
			open() {
				// 打开弹窗
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
			// 确认选择
			querySubmit() {
				// 关闭弹窗
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
