<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">{{title}}</text>
		</view>
		<view class="uni-dialog-content">
			<text class="uni-dialog-content-text" v-if="mode === 'base'">{{content}}</text>
			<input v-else class="uni-dialog-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus" >
		</view>
		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">ပယ်ဖျက်</text>
			</view>
			<view class="uni-dialog-button uni-border-left" @click="onOk">
				<text class="uni-dialog-button-text uni-button-color">ဆုံးဖြတ်ရန်</text>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp Pop-up အလွှာ-Dialog စတိုင်
	 * @description Pop-up အလွှာ-Dialog စတိုင်
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input mode ထဲမှာပုံမှန်တန်ဖိုး
	 * @property {String} placeholder input mode ထဲမှာ Input prompt ကို
	 * @property {String} type = [success|warning|info|error] အဓိကစတိုင်
	 *  @value success အောင်မြင်မှု
	 * 	@value warning ချက်ချင်း
	 * 	@value info သတင်း
	 * 	@value error အမှား
	 * @property {String} mode = [base|input] mode ကို、
	 * 	@value base အခြေခံပေးတဲ့ dialog
	 * 	@value input input ပေးတဲ့ dialog
	 * @property {String} content ဆွေးနွေးမှုအကြောင်းအရာ
	 * @property {Boolean} beforeClose ဖျက်သိမ်းမှုဖြစ်ရပ်ကြားဖြတ်ဖို့ရှိမရှိ
	 * @event {Function} confirm အစပျိုးရန် confirm ခလုတ်ကိုနှိပ်ပါ
	 * @event {Function} close အစပျိုးရန် Cancel ကိုနှိပ်ပါ
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: 'အကြောင်းအရာဖြည့်ပါ'
			},
			/**
			 * ဆွေးနွေးမှုဆောင်ပုဒ် success/warning/info/error	  မူလက success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * Dialog မုဒ် base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * ဆွေးနွေးမှုခေါင်းစဉ်
			 */
			title: {
				type: String,
				default: 'ချက်ချင်း'
			},
			/**
			 * ဆွေးနွေးမှုအကြောင်းအရာ
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * ကြားဖြတ်ဖျက်သိမ်းမှုဖြစ်ရပ် ，အဆိုပါ Cancel ဖြစ်ရပ်ကြားဖြတ်လျှင်，နားထောင်ရမယ်closeအဖြစ်အပျက်，လုပ်သည် done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// ဒိုင်ယာလော့ခ်မျက်နှာဖုံးသည် နှိပ်၍ မရပါ
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * အတည်ပြုခလုတ်ကိုနှိပ်ပါ
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					if (this.mode === 'input') this.val = this.value
				}, this.mode === 'input' ? this.val : '')
			},
			/**
			 * ပယ်ဖျက်ရန်ခလုတ်ကိုနှိပ်ပါ
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>
