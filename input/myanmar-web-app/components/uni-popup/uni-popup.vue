<template>
	<view v-if="showPopup" class="uni-popup" :class="[popupstyle]" @touchmove.stop.prevent="clear">
		<uni-transition v-if="maskShow" :mode-class="['fade']" :styles="maskClass" :duration="duration" :show="showTrans"
		 @click="onTap" />
		<uni-transition :mode-class="ani" :styles="transClass" :duration="duration" :show="showTrans" @click="onTap">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import uniTransition from '../uni-transition/uni-transition.vue'
	import popup from './popup.js'
	/**
	 * PopUp Pop-up အလွှာ
	 * @description Pop-up layer အစိတ်အပိုင်းများ，မျက်နှာဖုံးကျည်ဆန်ပြproblemနာကိုဖြေရှင်းရန်
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [top|center|bottom] Pop-up နည်းလမ်း
	 * 	@value top ထိပ်တန်းပေါ့ပ်
	 * 	@value center အလယ်မှာ Pop
	 * 	@value bottom အောက်ခြေပေါ့
	 * 	@value message အသိပေးချက်
	 * 	@value dialog Dialog box
	 * 	@value share အောက်ခြေတွင်ဥပမာမျှဝေခြင်း
	 * @property {Boolean} animation = [ture|false] ကာတွန်းဖွင့်ရန်ရှိမရှိ
	 * @property {Boolean} maskClick = [ture|false] မျက်နှာဖုံးကိုနှိပ်လိုက်ရင် Pop-up window ကိုပိတ်ရမလား
	 * @event {Function} change Popup ခလုတ်ကိုဖွင့်ပြီးပိတ်ပါ，e={show: false}
	 */

	export default {
		name: 'UniPopup',
		components: {
			uniTransition
		},
		props: {
			// ကာတွန်းကိုဖွင့်ပါ
			animation: {
				type: Boolean,
				default: true
			},
			// Pop-up အလွှာအမျိုးအစား，optional ကိုတန်ဖိုး，top: ထိပ်ဆုံး pop-up အလွှာ；bottom：အောက်ခြေ Pop-up အလွှာ；center：မျက်နှာပြင်အပြည့် Pop-up အလွှာ
			// message: အသိပေးချက် ; dialog : Dialog box
			type: {
				type: String,
				default: 'center'
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				popup: this
			}
		},
		mixins: [popup],
		watch: {
			/**
			 * မော်နီတာtypeပုံစံ
			 */
			type: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			},
			/**
			 * စောင့်ကြည့်ရေးမျက်နှာဖုံးကလစ်နှိပ်ခြင်းရှိမရှိ
			 * @param {Object} val
			 */
			maskClick(val) {
				this.mkclick = val
			}
		},
		data() {
			return {
				duration: 300,
				ani: [],
				showPopup: false,
				showTrans: false,
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'backgroundColor': 'rgba(0, 0, 0, 0.4)'
				},
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				mkclick: true,
				popupstyle: 'top'
			}
		},
		created() {
			this.mkclick = this.maskClick
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
		},
		methods: {
			clear(e) {
				// TODO nvue bubbling ကိုပယ်ဖျက်ပါ
				e.stopPropagation()
			},
			open() {
				this.showPopup = true
				this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(this.timer)
						this.timer = setTimeout(() => {
							this.showTrans = true
							// fixed by mehaotian သဟဇာတ app အဆုံး
							this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// စိတ်တိုင်းကျပွင့်လင်းဖြစ်ရပ်
						clearTimeout(this.msgtimer)
						this.msgtimer = setTimeout(() => {
							this.customOpen && this.customOpen()
						}, 100)
						this.$emit('change', {
							show: true,
							type: this.type
						})
					})
				})
			},
			close(type) {
				this.showTrans = false
				this.$nextTick(() => {
					this.$emit('change', {
						show: false,
						type: this.type
					})
					clearTimeout(this.timer)
					// စိတ်တိုင်းကျအနီးကပ်ဖြစ်ရပ်
					this.customOpen && this.customClose()
					this.timer = setTimeout(() => {
						this.showPopup = false
					}, 300)
				})
			},
			onTap() {
				if (!this.mkclick) return
				this.close()
			},
			/**
			 * ထိပ်တန်းပေါ့ပ်စတိုင်အပြောင်းအလဲနဲ့
			 */
			top() {
				this.popupstyle = 'top'
				this.ani = ['slide-top']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				}
			},
			/**
			 * အောက်ခြေ Pop-up စတိုင်ကိုင်တွယ်မှု
			 */
			bottom() {
				this.popupstyle = 'bottom'
				this.ani = ['slide-bottom']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
					'bottom': 0
				}
			},
			/**
			 * အလယ်အလတ် popup စတိုင်အပြောင်းအလဲနဲ့
			 */
			center() {
				this.popupstyle = 'center'
				this.ani = ['zoom-out', 'fade']
				this.transClass = {
					'position': 'fixed',
					/* #ifndef APP-NVUE */
					'display': 'flex',
					'flexDirection': 'column',
					/* #endif */
					'bottom': 0,
					'left': 0,
					'right': 0,
					'top': 0,
					'justifyContent': 'center',
					'alignItems': 'center'
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}

	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex ဘေးကင်းလုံခြုံဇုန် setting ကိုစောင့်ပါ，အောက်ခြေလုံခြုံဇုန်လိုက်လျောညီထွေ */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.content-ani {
		// transition: transform 0.3s;
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>
