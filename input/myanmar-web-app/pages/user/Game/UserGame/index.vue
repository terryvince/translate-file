<template>
  <view id="app">
    <view>ကျန်ရှိသောမဲနှိုက်၏နံပါတ်：{{ num }}</view>
    <round-turntable
      ref="roundTurntable"
      :prizeData="prizeData"
      :rotateCircle="rotateCircle"
      :duringTime="duringTime"
      :turntableStyleOption="turntableStyleOption"
      @endRotation="endRotation"
      class="turntable">
      <template v-slot:item v-bind:scope="date" >
        <view class="turntable-name">{{ scope.item.prizeName }}</view>
        <view class="turntable-img">
          <img :src="scope.item.prizeImg">
        </view>
      </template>
    </round-turntable>
    <view @click="startRotation" class="pointer"></view>
  </view>
</template>

<script>
  import roundTurntable from '@/components/game/roundTurntable';

  export default {
    name: 'App',
    components: {
      roundTurntable
    },
    data() {
      return {
        // အဆိုပါ turntable အပေါ်ဆုဒေတာ
        prizeData: [
          {
            id: 1,
            prizeName: '2000Yuan Jingdong ဘောက်ချာ',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/1.png',
          },
          {
            id: 2,
            prizeName: '300Yuan Jingdong ဘောက်ချာ',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/7.png',
          },
          {
            id: 3,
            prizeName: '50Bitcoin',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/3.png',
          },
          {
            id: 4,
            prizeName: '50ယွမ်ဘောက်ချာ',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/4.png',
          },
          {
            id: 5,
            prizeName: '100ယွမ်ဘောက်ချာ',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/5.png',
          },
          {
            id: 6,
            prizeName: '100Bitcoin',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
          }
        ],
        // အလှည့်အရေအတွက်
        rotateCircle: 6,
        // အလှည့်၏ကြာချိန်（s）
        duringTime: 4.5,
        // Turntable စတိုင် options များ
        turntableStyleOption: {
          // နောက်ခံအရောင်
          prizeBgColors: ['#AE3EFF', '#4D3FFF', '#FC262C', '#3A8BFF', '#EE7602', '#FE339F'],
          // အဆိုပါ turntable ၏အပြင်ဘက်နယ်စပ်အရောင်
          borderColor: '#199301',
        },

        // အနိုင်ရဆု၏index
        prizeIndex: -1,
        // အဆိုပါ turntable သော့ခတ်ရန်အသုံးပြုခဲ့သည်，တစ်ချိန်တည်းတွင်လှည့်ရန်ကလစ်များစွာနှိပ်ခြင်းကိုရှောင်ပါ
        isLocking: false,

        // ကျန်ရှိသောမဲနှိုက်၏နံပါတ်
        num: 2,
      }
    },
    methods: {
      startRotation() {
        // ဖွင့်လို့မရဘူးဆိုရင်
        if (!this.canBeRotated()) {
          return false;
        }
        // လှည့်ပါ
        // ပထမဆုံးသော့ခတ်ပါ
        this.isLocking = true;
        // ဘယ်ကိုရပ်ရမလဲ，နောက်ခံနှင့်အတူအပြန်အလှန်သငျ့သညျ，ကျပန်းဤနေရာတွင်ရွေးချယ်ထားကြသည်0~5
        const index = Math.floor(Math.random() * this.prizeData.length);
        // အောင်မြင်ပြီးနောက်အကြိမ်အရေအတွက်ကိုတစ်ကြိမ်လျှော့ချသည်
        this.num--;
        this.prizeIndex = index;
        // subcomponent ပြောပြပါ，လှည့်စတင်ခဲ့သည်
        this.$refs.roundTurntable.rotate(index);
      },
      // လှည့်ပြီးနောက် turntable အားဖြင့်ဖြစ်ပေါ် function ကို
      endRotation() {
        // အနိုင်ရဘို့သိကောင်းစရာများ
        alert(`သင်၏ဆုအပေါ်ဂုဏ်ယူပါတယ်,မင်းရဲ့ဆုက：${this.prizeData[this.prizeIndex].prizeName}`);
        // သော့ခတ်
        this.isLocking = false;
      },
      // ၎င်းကိုလှည့်နိုင်ခြင်းရှိမရှိဆုံးဖြတ်ပါ
      canBeRotated() {
        if (this.num <= 0) {
          alert('နောက်တဖန်အချိန်မရှိ！');
          return false;
        }
        if (this.isLocking) {
          return false;
        }
        return true;
      },
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    .turntable {
      position: absolute;
      left: calc(50% - 200px);
      top: calc(50% - 200px);
      width: 400px;
      height: 400px;
    }
    .turntable-name {
      /*background: pink;*/
      position: absolute;
      left: 10px;
      top: 20px;
      width: calc(100% - 20px);
      font-size: 26px;
      text-align: center;
      color: #fff;
    }

    .turntable-img {
      position: absolute;
      /*ဗဟိုပြုရန်50% - width / 2*/
      left: calc(50% - 80px / 2);
      top: 60px;
      width: 80px;
      height: 80px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }

    .pointer {
      position: absolute;
      left: calc(50% - 46px);
      top: calc(50% - 50px);
      width: 100px;
      height: 100px;
      background-image: url("http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/start.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
</style>
