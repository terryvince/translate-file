<template>
	<view class="uni-popup-message" :class="'uni-popup__'+[type]">
		<text class="uni-popup-message-text" :class="'uni-popup__'+[type]+'-text'">{{message}}</text>
	</view>
</template>

<script>
	
	/**
	 * PopUp Pop-up အလွှာ-အသိပေးချက်
	 * @description Pop-up အလွှာ-အသိပေးချက်
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] အဓိကစတိုင်
	 *  @value success အောင်မြင်မှု
	 * 	@value warning ချက်ချင်း
	 * 	@value info သတင်း
	 * 	@value error အမှား
	 * @property {String} message မက်ဆေ့ခ်ျကိုချက်ချင်းစာသား
	 * @property {String} duration ပြသရန်အချိန်，အဖြစ်သတ်မှတ်မည် 0 အလိုအလျောက်ပိတ်လိမ့်မည်မဟုတ်ပါ
	 */
	
	export default {
		name: 'UniPopupMessage',
		props: {
			/**
			 * ခေါင်းစဉ် success/warning/info/error	  မူလက success
			 */
			type: {
				type: String,
				default: 'success'
			},
			/**
			 * မက်ဆေ့ခ်ျကိုစာသား
			 */
			message: {
				type: String,
				default: ''
			},
			/**
			 * ပြသရန်အချိန်，အဖြစ်သတ်မှတ်မည် 0 အလိုအလျောက်ပိတ်လိမ့်မည်မဟုတ်ပါ
			 */
			duration: {
				type: Number,
				default: 3000
			}
		},
		inject: ['popup'],
		data() {
			return {}
		},
		created() {
			this.popup.childrenMsg = this
		},
		methods: {
			open() {
				if (this.duration === 0) return
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.popup.close()
				}, this.duration)
			},
			close() {
				clearTimeout(this.popuptimer)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		background-color: #e1f3d8;
		padding: 10px 15px;
		border-color: #eee;
		border-style: solid;
		border-width: 1px;
	}
	.uni-popup-message-text {
		font-size: 14px;
		padding: 0;
	}

	.uni-popup__success {
		background-color: #e1f3d8;
	}

	.uni-popup__success-text {
		color: #67C23A;
	}

	.uni-popup__warn {
		background-color: #faecd8;
	}

	.uni-popup__warn-text {
		color: #E6A23C;
	}

	.uni-popup__error {
		background-color: #fde2e2;
	}

	.uni-popup__error-text {
		color: #F56C6C;
	}

	.uni-popup__info {
		background-color: #F2F6FC;
	}

	.uni-popup__info-text {
		color: #909399;
	}
</style>
