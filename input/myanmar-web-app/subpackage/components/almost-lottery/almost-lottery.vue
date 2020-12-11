<template>
  <view class="almost-lottery" :style="{ width: canvasWidth + 44 + 'px', height: canvasHeight + 44 + 'px'}">
    <view class="almost-lottery-wrap" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}">
      <!-- #ifdef MP-ALIPAY -->
      <canvas :class="className" :id="canvasId" :width="canvasWidth" :height="canvasHeight" :style="{
         width: canvasWidth + 'px',
         height: canvasHeight + 'px'
       }" />
      <!-- #endif -->
      <!-- #ifndef MP-ALIPAY -->
      <canvas :class="className" :canvas-id="canvasId" :width="canvasWidth" :height="canvasHeight" :style="{
         width: canvasWidth + 'px',
         height: canvasHeight + 'px'
       }" />
      <!-- #endif -->
      <image class="canvas-img" :src="canvasImg" :style="{
         width: canvasWidth + 'px',
         height: canvasHeight + 'px',
         transform: `rotate(${canvasAngle + targetAngle}deg)`,
         transitionDuration: `${transitionDuration}s`
       }"
        v-if="canvasImg"></image>
      <view class="almost-lottery__action" @click="handleActionStart">
		  <view class="relative full">
			  <text class="number">{{number}}ဒုတိယအခွင့်အရေး</text>
		  </view>
	  </view>
      <!-- လိုက်ဖက်တဲ့သည် app အဆုံး ctx.measureText လိုအပ်တဲ့တံဆိပ် -->
      <text class="almost-lottery__measureText">{{ measureText }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AlmostLottery',
    props: {
      // canvas width
      canvasWidth: {
        type: Number,
        default: 240
      },
      // canvas အမြင့်
      canvasHeight: {
        type: Number,
        default: 240
      },
      // ဆုစာရင်း
      prizeList: {
        type: Array,
        required: true
      },
      // စာရင်းထဲတွင်အနိုင်ရဆု၏အညွှန်းကိန်း
      prizeIndex: {
        type: Number,
        required: true
      },
      // ဆုပိတ်ပင်တားဆီးမှု၏သက်ဆိုင်ရာနောက်ခံအရောင်
      colors: {
        type: Array,
        default: () => [
          '#FFFFFF',
          '#FFE9AA'
        ]
      },
      // ကာတွန်းအချိန်ကိုလှည့်ပါ ယူနစ်s
      duration: {
        type: Number,
        default: 8
      },
      // တော်လှန်ရေးအရေအတွက်
      ringCount: {
        type: Number,
        default: 8
      },
      // ဖောင့်အရောင်
      fontColor: {
        type: String,
        default: '#C30B29'
      },
      // စာသားအရွယ်အစား
      fontSize: {
        type: Number,
        default: 12
      },
      // ဆုစာသားမျိုးစုံ၏ဖြစ်ရပ်အတွက်လိုင်းအမြင့်
      lineHeight: {
        type: Number,
        default: 16
      },
      // ဆုအမည်နှင့်ကိုက်ညီ key တန်ဖိုး
      strKey: {
        type: String,
        default: 'name'
      },
      // ဆုစာသား၏စုစုပေါင်းအရှည်
      strMaxLen: {
        type: Number,
        default: 12
      },
      // မျိုးစုံသောလိုင်းများအတွက်ဆုစာသား၏ပထမလိုင်း၏အရှည်
      strLineLen: {
        type: Number,
        default: 6
      },
	  number:{
		  type:Number,
		  default: 1
	  }
    },
    data() {
      return {
        // ဆွဲဘုတ်className
        className: 'almost-lottery__canvas',
        // Sketchpad လိုဂို
        canvasId: 'almostLotteryCanvas',
        // ရုပ်ပုံ artboard မှတင်ပို့
        canvasImg: '',
        // ဆုရည်မှန်းချက်အတွက်လိုအပ်သောထောင့်သို့လှည့်ပါ
        targetAngle: 0,
        // ကာတွန်းအချိန်ကိုလှည့်ပါ ယူနစ် s
        transitionDuration: 0,
        // ဒါကြောင့်လှည့်ခြင်းရှိမရှိ
        isRotate: false,
        // လက်ရှိမှာတည်းခိုသောဆု၏အမှတ်စဉ်နံပါတ်
        stayIndex: 0,
        // လက်ရှိအနိုင်ရဆု၏နံပါတ်စဉ်
        targetIndex: 0,
        // ဖြေရှင်းပါ app မထောက်ခံဘူး measureText ပြဿနာ
        measureText: ''
      }
    },
    computed: {
      // ပစ္စည်း pixel သိပ်သည်းဆ
      pixelRatio () {
        return uni.getSystemInfoSync().pixelRatio
      },
      // ဆုစာရင်းအပေါ်အခြေခံပြီးတွက်ချက် canvas လှည့်ထောင့်
      // ခွင့်ပြုပါ Start ခလုတ်ကိုနှိပ်ပါ ဆုဌာနခွဲအလယ်၌ position = 45
      // ခွင့်ပြုပါ Start ခလုတ်ကိုနှိပ်ပါ ဆုဇုန်နယ်နိမိတ်မှာ position = 90
      canvasAngle () {
        let prizeCount = this.prizeList.length
        let position = 90
        if (prizeCount % 4 !== 0) {
          if ( prizeCount % 2 === 0) {
            return 0
          } else {
            return 360 / prizeCount - 90
          }
        } else {
          let num = prizeCount / 4
          return num % 2 === 0 ? position / num : position
        }
      },
      // ပုံဆွဲဘုတ်၏အကျယ်အရဆုစာသားနှင့်ဗဟိုအမှတ်ကြားအကွာအဝေးကိုတွက်ချက်ပါ
      textRadius () {
        return Math.round(this.canvasWidth / 2.4)
      }
    },
    watch: {
      // အနိုင်ရအမှတ်စဉ်နံပါတ်များ၏အပြောင်းအလဲများကိုစောင့်ကြည့်
      prizeIndex (newVal, oldVal) {
        if (newVal > -1) {
          this.targetIndex = newVal
          this.onRotateStart()
        } else {
          console.info('လည်ပတ်၏အဆုံး，prizeIndex ပြန်လည်စတင်')
        }
      }
    },
    methods: {
      // spinning စတင်ပါ
      onRotateStart () {
        // စုစုပေါင်းဆု
        let prizeCount = this.prizeList.length
        let baseAngle = 360 / prizeCount
        let angles = 0
        if (this.targetAngle === 0) {
          // ပထမဆုံးလည်ပတ်
          // ပထမ ဦး ဆုံးဆုကနေကြောင့်ဖြစ်သည်0°အစ，အလျားလိုက်ညာဘက်သို့
          // ပထမ ဦး စွာလည်ပတ်ထောင့် = 270ဒီဂရီ - (နေထိုင်ရန်နံပါတ်-ပစ်မှတ်နံပါတ်) * တစ်ခုချင်းစီကိုဆုကြားကာလ၏ထောင့် - တစ်ခုချင်းစီကိုဆုအကွာအဝေး၏တစ်ဝက်ထောင့် - canvasလည်ပတ်၏ဒီဂရီ
          angles = (270 - (this.targetIndex - this.stayIndex) * baseAngle - baseAngle / 2) - this.canvasAngle
        } else {
          // နောက်ဆက်တွဲလည်ပတ်မှု
          // လှည့်ရန်ဆက်လက် တည်းခိုနေရာနှင့်ပစ်မှတ်အနေအထားအကြားထောင့်ကိုသာတွက်ချက်ရန်လိုသည်
          angles = -(this.targetIndex - this.stayIndex) * baseAngle
        }
        // လက်ရှိနံပါတ်စဉ်ကိုအသစ်ပြောင်းပါ
        this.stayIndex = this.targetIndex
        // လှည့် 8 လက်စွပ်，ပိုအလှည့်，မြန်မြန်လှည့်ပါ
        this.targetAngle += angles + 360 * this.ringCount

        // အဆိုပါ turntable အဆုံးသတ်သည့်အချိန်တွက်ချက်，turntable ရပ်ပြီးနောက်အဆုံးအဖြစ်အပျက်ကိုသေချာစေရန်အချို့သောနှောင့်နှေးမှုများကိုကြိုတင်ထည့်ပါ
        let endTime = this.transitionDuration * 1000 + 100
        let endTimer = setTimeout(() => {
          clearTimeout(endTimer)
          endTimer = null
          
          this.isRotate = false
          this.$emit('draw-end')
        }, endTime)
        
        let resetPrizeTimer = setTimeout(() => {
          clearTimeout(resetPrizeTimer)
          resetPrizeTimer = null
          
          // မဲချခြင်းတစ်ခုပြီးတိုင်းမိဘပူးတွဲမှုကိုပြန်လည်သတ်မှတ်ရမည် prizeIndex
          this.$emit('reset-index')
        }, endTime + 50)
      },
      // ကိုနှိပ်ပါ စတင်ခြင်းကိုစတင်ပါ ခလုတ်
      handleActionStart () {
		if(this.number==0){
			uni.showToast({
				icon:'none',
				title:'ထီတက်ခဲ့သည်！'
			})
			return
		}
        if (this.isRotate) return
        this.isRotate = true
        this.$emit('draw-start')
      },
      // လှည့်လည်
      async onCreateCanvas () {
        // ရရှိသည် canvas ပတ္တူ
        const canvasId = this.canvasId
        const ctx = uni.createCanvasContext(canvasId, this)

        // canvas အကျယ်နှင့်အမြင့်
        let canvasW = this.canvasWidth
        let canvasH = this.canvasHeight
        
        // ဆုအရေအတွက်အပေါ်အခြေခံပြီးတွက်ချက်သည် ထောင့်
        let prizeCount = this.prizeList.length
        let baseAngle = Math.PI * 2 / prizeCount

        // လေဖြတ်အရောင်ထားပါ
        ctx.setStrokeStyle('#FFBE04')
        
        // ဖောင့်နှင့်စာလုံးအရွယ်အစားထားပါ
        // #ifndef MP
        let fontFamily = '-apple-system, BlinkMacSystemFont, \'PingFang SC\', \'Helvetica Neue\', STHeiti, \'Microsoft Yahei\', Tahoma, Simsun, sans-serif'
        ctx.font = `${this.fontSize}px ${fontFamily}`
        // #endif
        // #ifdef MP
        ctx.setFontSize(this.fontSize)
        // #endif

        // မှတ်စု，စတင်နေရာမှဖြစ်ပါသည်0°ထောင့်အနေအထားဆွဲရန်စတင်ပါ。ဘယ်ညာဘက်ကိုအလျားလိုက်ဖြစ်ပါတယ်。
        // သတ်သတ်မှတ်မှတ်အကြောင်းအရာဆွဲပါ
        for (let i = 0; i < prizeCount; i++) {
          // လက်ရှိထောင့်
          let angle = i * baseAngle

          // ပတ္တူ၏လက်ရှိပြည်နယ်သိမ်းဆည်းပါ
          ctx.save()

          // အကြောင်းအရာဆွဲစတင်ပါ
          ctx.beginPath()

          // arc ကိုဆွဲစတင်ပါ
          // x => arc ၏ဗဟို၏ abscissa x
          // y => arc ၏ဗဟို၏ abscissa y
          // radius => အဆိုပါ arc ၏အချင်းဝက်
          // startAngle => အဆိုပါ arc စတင်သည်မှာထောင့်，အဆိုပါယူနစ် radians ဖြစ်ပါတယ်
          // endAngle => အဆိုပါ arc အဆုံးသတ်သောမှာထောင့်，အဆိုပါယူနစ် radians ဖြစ်ပါတယ်
          // anticlockwise(optional ကို) => လမ်းညွှန်ဆွဲခြင်း，true လက်ယာရစ်နာရီ，false လက်ယာရစ်
          let outsideRadius = canvasW / 2
          let insideRadius = 20
          ctx.arc(canvasW * 0.5, canvasH * 0.5, outsideRadius, angle, angle + baseAngle, false)
          ctx.arc(canvasW * 0.5, canvasH * 0.5, insideRadius, angle + baseAngle, angle, true)

          // link line စတင်ပါ
          ctx.stroke()
          // Background block တစ်ခုချင်းစီ၏အရောင်ကိုဖြည့်သည်
          if (this.colors.length === 2) {
            ctx.setFillStyle(this.colors[i % 2])
          } else {
            ctx.setFillStyle(this.colors[i])
          }
          // အရောင်ဖြည့်ပါ
          ctx.fill()

          // ဆုအကြောင်းအရာဆွဲစတင်ပါ
          // အဆိုပါပတ္တူပေါ်တွင် remap (0,0) အနေအထား
          let translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textRadius
          let translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textRadius
          ctx.translate(translateX, translateY)
          
          // ဆုအမည်ဆွဲပါ
          ctx.setFillStyle(this.fontColor)
          let rewardName = this.strLimit(this.prizeList[i][this.strKey])

          // rotateလက်ရှိပုံဆွဲလှည့်ရန်နည်းလမ်း，အဘယ်ကြောင့်ဆိုသော်စာသားသည်လက်ရှိကဏ္ of ၏ဗဟိုမျဉ်းနှင့် ပတ်သတ်၍ ဖြစ်သည်
          ctx.rotate(angle + (baseAngle / 2) + (Math.PI / 2))

          // စာသားအနေအထားကိုသတ်မှတ်နှင့်လိုင်းအားလပ်ချိန်ကိုင်တွယ်
          // ခြုံဖို့လိုအပ်ပါတယ်
          let isLineBreak = rewardName.length > this.strLineLen
          if (isLineBreak) {
            // multi-line text array ကိုရယူပါ
            rewardName = rewardName.substring(0, this.strLineLen) + ',' + rewardName.substring(this.strLineLen)
            let rewardNames = rewardName.split(',')

            // Loop text array，တစ်ခုချင်းစီကိုလိုင်း၏စာသားအကျယ်တွက်ချက်
            for (let j = 0; j < rewardNames.length; j++) {
              if (ctx.measureText && ctx.measureText(rewardNames[j]).width) {
                // စာသားအကျယ်သတင်းအချက်အလက်
                let tempStrSize = ctx.measureText(rewardNames[j])
                ctx.fillText(rewardNames[j], -tempStrSize.width / 2, j * this.lineHeight)
              } else {
                this.measureText = rewardNames[j]

                // စာမျက်နှာအားပြန်လည်ပုံဖော်ရန်စောင့်ပါ
                await this.$nextTick()

                let textWidth = await this.getTextWidth()

                ctx.fillText(rewardNames[j], -textWidth / 2, j * this.lineHeight)
                // console.log(rewardNames[j], textWidth, i)
              }
            }
          } else {
            if (ctx.measureText && ctx.measureText(rewardName).width) {
              // စာသားအကျယ်သတင်းအချက်အလက်
              let tempStrSize = ctx.measureText(rewardName)
              ctx.fillText(rewardName, -tempStrSize.width / 2, 0)
            } else {
              this.measureText = rewardName

              // စာမျက်နှာအားပြန်လည်ပုံဖော်ရန်စောင့်ပါ
              await this.$nextTick()

              let textWidth = await this.getTextWidth()

              ctx.fillText(rewardName, -textWidth / 2, 0)
            }
          }
          
          // ဆုရုပ်ပုံဆွဲပါ
          if (this.prizeList[i].imgSrc) {
			// console.log(this.prizeList[i].imgSrc);
			// ctx.drawImage(this.prizeList[i].imgSrc, 0, 0, 50, 50)
            ctx.drawImage(this.prizeList[i].imgSrc, -16, canvasW / 10, 35, 35)
          }

          ctx.restore()
        }

        // ပုံဆွဲ။ သိမ်းပါ
        ctx.draw(true, () => {
          let drawTimer = setTimeout(() => {
            clearTimeout(drawTimer)
            drawTimer = null
            
            // #ifdef MP-ALIPAY
            // Alipay applet ctx.toTempFilePath emulator အတွက်ပုံမှန်，သို့သော်စက်၏အစစ်အမှန်စက်နှင့်ပြwithနာရှိပါသည်，ပြောင်းပါ ctx.toDataURL
            // ctx.toTempFilePath({
            //   destWidth: this.canvasWidth * this.pixelRatio,
            //   destHeight: this.canvasHeight * this.pixelRatio,
            //   success: (res) => {
            //     // console.log(res.filePath)
            //     this.handlePrizeImg(res.filePath)
            //   }
            // })
            ctx.toDataURL({
              width: this.canvasWidth,
              height: this.canvasWidth,
              destWidth: this.canvasWidth * this.pixelRatio,
              destHeight: this.canvasHeight * this.pixelRatio,
            }).then((dataURL) => {
              // console.log(dataURL)
              this.handlePrizeImg(dataURL)
            })
            // #endif
            // #ifndef MP-ALIPAY
            uni.canvasToTempFilePath({
              destWidth: this.canvasWidth * this.pixelRatio,
              destHeight: this.canvasHeight * this.pixelRatio,
              canvasId: this.canvasId,
              success: (res) => {
                // in H5 ပလက်ဖောင်းအောက်မှာ，tempFilePath အဘို့ base64
                // console.log(res.tempFilePath)
                this.handlePrizeImg(res.tempFilePath)
              }
            }, this)
            // #endif
          }, 500)
        })
      },
      // တင်ပို့ဓာတ်ပုံများကိုလုပ်ငန်းစဉ်
      handlePrizeImg (imgPath) {
        this.canvasImg = imgPath
        this.$emit('finish')
      },
      // သဟဇာတ app အဆုံးကမထောက်ခံဘူး ctx.measureText
      // လူသိများသောပြissuesနာများ：ကန ဦး ပုံဆွဲခြင်း，Low-end Android စက် ပျမ်းမျှအချိန် 2s
      getTextWidth () {
        return new Promise((resolve, reject) => {
          uni.createSelectorQuery().in(this).select('.almost-lottery__measureText').fields({
            size: true,
          }, (res) => {
            resolve(res.width)
          }).exec()
        })
      },
      // စာသားပိုလျှံကိုင်တွယ်
      strLimit (value) {
        let maxLength = this.strMaxLen
        if (!value || !maxLength) return value
        return value.length > maxLength ? value.slice(0, maxLength - 1) + '...' : value
      }
    },
    mounted () {
      this.$nextTick(() => {
        let stoTimer = setTimeout(() => {
          clearTimeout(stoTimer)
          stoTimer = null
          
          this.onCreateCanvas()
          this.transitionDuration = this.duration
        }, 50)	
      })
    }
  }
</script>

<style lang="scss" scoped>
  $lotteryBgUrl: '../../static/almost-lottery/almost-lottery__bg';
  $actionBgUrl: '../../static/almost-lottery/almost-lottery__action';
	.number{
		position: absolute;
		left: 50%;
		transform: translate(-50%,6rpx);
		bottom: 46rpx;
		font-weight: 500;
		font-size: 18rpx;
		color: #A6342E;
	}
  .almost-lottery {
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .almost-lottery {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url($lotteryBgUrl + ".png");

    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
      background-image: url($lotteryBgUrl + "2x.png");
    }

    @media (-webkit-min-device-pixel-ratio: 3),
    (min-device-pixel-ratio: 3) {
      background-image: url($lotteryBgUrl + "3x.png");
    }
  }

  .almost-lottery__canvas {
    position: absolute;
    left: -9999px;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .almost-lottery__action {
    position: absolute;
    top: calc(50% - 62px);
    left: calc(50% - 58px);
    width: 114px;
    height: 114px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url($actionBgUrl + ".png");

    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
      background-image: url($actionBgUrl + "2x.png");
    }

    @media (-webkit-min-device-pixel-ratio: 3),
    (min-device-pixel-ratio: 3) {
      background-image: url($actionBgUrl + "3x.png");
    }
  }

  .almost-lottery__measureText {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    font-size: 12px;
    opacity: 0;
  }

  .canvas-img {
    transition: transform cubic-bezier(.34, .12, .05, .95);
  }
</style>
