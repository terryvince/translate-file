<template>
	<view>
		<view class="turntable" ref="turntable">
			<view class="myTurntable" :style="{transform: rotateAngle, transition: rotateTransition}">
				<canvas id="canvas" ref="canvas" canvas-id="canvas" type="2d">
					လက်ရှိ browser ဗားရှင်းကအရမ်းနိမ့်သည်，ကျေးဇူးပြုပြီးနောက် browser ကိုစမ်းကြည့်ပါ ဦး
				</canvas>
				<view class="prize-container">
					<view v-for="(item, index) in prizeData" class="item" :key="index" style="getRotateAngle(index)">
						<slot name="item" :data="item"></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'round-turntable',
		mounted() {
			this.init();
		},
		props: {
			prizeData: {
				required: true
			},
			rotateCircle: {
				default: 6
			},
			turntableStyleOption: {
				default: () => {
					return {
						// နောက်ခံအရောင်
						prizeBgColors: ['#AE3EFF', '#4D3FFF', '#FC262C', '#3A8BFF', '#EE7602', '#FE339F'],
						// အဆိုပါ turntable ၏အပြင်ဘက်နယ်စပ်အရောင်
						borderColor: '#199301',
					}
				}
			},
			duringTime: {
				default: 4.5
			}
		},
		data() {
			return {
				// ထောင့်စတင်ပါ
				startRotateDegree: 0,
				rotateAngle: 0,
				rotateTransition: '',
			}
		},
		methods: {
			// အဆိုအရindexတစ်ခုချင်းစီကိုဇယားကွက်အတွက်လှည့်ခံရဖို့ထောင့်၏စတိုင်ကိုတွက်ချက်ပါ
			getRotateAngle(index) {
				const angle = 360 / this.prizeData.length * index + (180 / this.prizeData.length);
				return {
					transform: `rotate(${angle}deg)`
				};
			},
			// အဆိုပါပတ်ပတ်လည် turntable Initializecanvas
			init() {
				// အချက်အလက်အမျိုးမျိုး
				const data = this.turntableStyleOption;
				const prizeNum = this.prizeData.length;
				const {
					prizeBgColors,
					borderColor
				} = data;
				// ပန်းချီဆွဲပါ
				const canvas = this.$refs.canvas;
				const ctx = uni.createCanvasContext('canvas')//canvas.getContext("2d");
				const canvasW = this.$refs.canvas.width = this.$refs.turntable.clientWidth; // အဆိုပါ artboard ၏အမြင့်
				const canvasH = this.$refs.canvas.height = this.$refs.turntable.clientHeight; // အဆိုပါ artboard ၏ width
				// translateပတ္တူပြန်လည် remap ရန်နည်းလမ်း (0,0) အနေအထား
				ctx.translate(0, canvasH);
				// rotateလက်ရှိပုံဆွဲလှည့်ရန်နည်းလမ်း，အဘယ်ကြောင့်ဆိုသော်စာသားသည်လက်ရှိကဏ္ sector အလယ်ဗဟိုသို့ဒေါင်လိုက်ကိုက်ညီသောကြောင့်ဖြစ်သည်！
				ctx.rotate(-90 * Math.PI / 180);
				// Torus ၏အပြင်ဘက်စက်ဝိုင်း၏အချင်းဝက်
				const outRadius = canvasW / 2;
				// လက်စွပ်၏အတွင်းပိုင်းစက်ဝိုင်း၏အချင်းဝက်
				const innerRadius = 0;
				const baseAngle = Math.PI * 2 / prizeNum; // ဆုတစ်ခုစီကရရှိသောထောင့်အရေအတွက်ကိုတွက်ချက်ပါ
				ctx.clearRect(0, 0, canvasW, canvasH); //ပုံမှန်အနက်ရောင်နောက်ခံဖယ်ရှားပါ
				ctx.strokeStyle = borderColor; // ပုံဆွဲမျဉ်း၏အရောင်ကိုသတ်မှတ်ပါ
				for (let index = 0; index < prizeNum; index++) {
					const angle = index * baseAngle;
					ctx.fillStyle = prizeBgColors[index]; //ကဏ္ each တစ်ခုစီ၏အရောင်ကိုသတ်မှတ်ပါ
					ctx.beginPath(); //ပုံဆွဲပါ
					// စံ arc：arc(x,y,radius,startAngle,endAngle,anticlockwise)
					ctx.arc(canvasW * 0.5, canvasH * 0.5, outRadius, angle, angle + baseAngle, false);
					ctx.arc(canvasW * 0.5, canvasH * 0.5, innerRadius, angle + baseAngle, angle, true);
					ctx.stroke(); //ကွင်းဆက်စတင်ပါ
					ctx.fill(); //အရောင်ဖြည့်ပါ
					ctx.save(); //ပတ်ဝန်းကျင်၏လက်ရှိအခြေအနေကိုသိမ်းဆည်းပါ
				}
			},
			// လည်ပါ
			rotate(index) {
				// အချိန်ပြည့်
				const duringTime = this.duringTime;
				const rotateAngle = this.startRotateDegree + this.rotateCircle * 360 + 360 - (180 / this.prizeData.length + 360 /
					this.prizeData.length * index) - this.startRotateDegree % 360;
				this.startRotateDegree = rotateAngle;
				this.rotateAngle = `rotate(${rotateAngle}deg)`;
				this.rotateTransition = `transform ${duringTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
				setTimeout(() => {
					this.$emit('endRotation');
				}, duringTime * 1000 + 500)
			},
		},
	}
</script>

<style scoped lang="scss">
	.turntable {
		/*background-color: red;*/
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		transform: translateZ(0);

		.myTurntable {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.prize-container {
			position: absolute;
			left: 25%;
			top: 0;
			width: 50%;
			height: 50%;

			.item {
				/*background: pink;*/
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				transform-origin: center bottom;
			}
		}
	}
</style>
