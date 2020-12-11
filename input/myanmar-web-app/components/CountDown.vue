<template>
  <view class="time">
    <text v-if="rtipText">{{ rtipText }}</text> 
    <text class="styleAll" v-if="risDay === true">{{ rday }}</text>
    <text class="timeTxt" v-if="rdayText">{{ rdayText }}</text>
    <text class="styleAll">{{ hour }}</text>
    <text class="timeTxt" v-if="rhourText">{{ rhourText }}</text>
    <text class="styleAll">{{ minute }}</text>
    <text class="timeTxt" v-if="rminuteText">{{ rminuteText }}</text>
    <text class="styleAll">{{ second }}</text>
    <text class="timeTxt" v-if="rsecondText">{{ rsecondText }}</text>
  </view>
</template>
<script>
export default {
  name: "CountDown",
  props: [
    //အကွာအဝေးစတင်ချက်ချင်းစာသား
    'tipText',
    'dayText',
    'hourText',
    'minuteText',
    'secondText',
    'datatime',
    'isDay'
  ],
  data: function() {
    return {
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
      rtipText: "နှစ်သစ်ကြိုဆိုပွဲ",
      rdayText: "နေ့",
      rhourText: "အချိန်",
      rminuteText: "မိနစ်",
      rsecondText: "ဒုတိယ",
      rdatatime: 0,
      risDay: true
    };
  },
  created: function() {
    // this.show_time();
  },
  mounted: function() {
    this.rtipText = this.$props.tipText;
    this.rdayText = this.$props.dayText;
    this.rhourText = this.$props.hourText;
    this.rminuteText = this.$props.minuteText;
    this.rsecondText = this.$props.secondText;
    this.rdatatime = this.$props.datatime;
    this.risDay = this.$props.isDay;
    this.show_time();
  },
  methods: {
    show_time: function() {
      let that = this;
      this.runTime();
      setInterval(this.runTime, 1000);
    },
    runTime() {
      let that = this;
      //အချိန်လုပ်ဆောင်ချက်
      let intDiff = that.datatime - Date.parse(new Date()) / 1000; //ဒေတာအတွက် timestamp ၏အချိန်ကွာခြားချက်ကိုရယူပါ；
      let day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (intDiff > 0) {
        //ကူးပြောင်းချိန်
        if (that.isDay === true) {
          day = Math.floor(intDiff / (60 * 60 * 24));
        } else {
          day = 0;
        }
        hour = Math.floor(intDiff / (60 * 60)) - day * 24;
        minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
        second =
          Math.floor(intDiff) -
          day * 24 * 60 * 60 -
          hour * 60 * 60 -
          minute * 60;
        if (hour <= 9) hour = "0" + hour;
        if (minute <= 9) minute = "0" + minute;
        if (second <= 9) second = "0" + second;
        that.day = day;
        that.hour = hour;
        that.minute = minute;
        that.second = second;
      } else {
        that.day = "00";
        that.hour = "00";
        that.minute = "00";
        that.second = "00";
      }
    }
  }
};
</script>
