<template>
  <view class="distribution-posters">
    <view class="slider-banner banner">
      <swiper indicatorDots="true">
        <block v-for="(item, infoIndex) in info" :key="infoIndex">
          <swiper-item>
            <image
              class="slide-image"
              :src="item.wap_poster"
              mode="widthFix"
              show-menu-by-longpress
            />
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view class="keep bg-color-green" @click="saveImg">ပိုစတာကိုသိမ်းပါ</view>
  </view>
</template>
<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getSpreadImg } from "@/api/user";

export default {
  name: "Poster",
  components: {
    // swiper,
    // swiperSlide
  },
  props: {},
  data: function() {
    return {
      swiperPosters: {
        speed: 1000,
        effect: "coverflow",
        slidesPerView: "auto",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0, // အလှည့်၏ထောင့်
          stretch: -20, // ဆန့်   ဓာတ်ပုံများအကြားဘယ်ဘက်နှင့်ညာဘက်အကွာအဝေးနှင့်သိပ်သည်းဆ
          depth: 100, // အတိမ်အနက်ကို   ရုပ်ပုံများအကြားအပေါ်နှင့်အောက်ပိုင်းအကွာအဝေးနှင့်သိပ်သည်းဆကိုပြောင်းပါ
          modifier: 3, // မှန်ကန်သောတန်ဖိုး တန်ဖိုးပိုကြီးလေယခင်အကျိုးသက်ရောက်မှုပိုမိုသိသာသည်
          slideShadows: false // စာမျက်နှာအရိပ်အကျိုးသက်ရောက်မှု
        },
        observer: true,
        observeParents: true
      },
      info: [],
      activeIndex: 0
    };
  },
  mounted: function() {
    this.getIndex();
    let that = this;
    // this.swiper.on("slideChange", function() {
    //   that.activeIndex = that.swiper.activeIndex;
    // });
  },
  computed: {
    swiper() {
      // return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    getIndex: function() {
      let that = this;
      let from = {};
      if (this.$deviceType == "app") {
        from.from = "app";
      }
      getSpreadImg(from).then(
        res => {
          that.info = res.data;
        },
        err => {
          uni.showToast({
            title: err.msg || err.response.data.msg|| err.response.data.message,
            icon: "none",
            duration: 2000
          });
        }
      );
    },
    downloadIamge: function(imgsrc, name) {
      var that = this;
      this.isDown = true;
      var downloadUrl = imgsrc;

      if (!wx.saveImageToPhotosAlbum) {
        uni.showModal({
          title: "ချက်ချင်း",
          content:
            "လက်ရှိ WeChat ဗားရှင်းသည်အလွန်နိမ့်သည်，ဒီအင်္ဂါရပ်ကို သုံး၍ မရပါ，ကျေးဇူးပြုပြီးနောက်ဆုံး WeChat ဗားရှင်းသို့အဆင့်မြှင့်ပါ。"
        });
        that.openDialogVisible = true;

        return;
      }

      // ဖြတ်သန်းသွားနိုင် wx.getSetting အသုံးပြုသူခွင့်ပြုချက်ရှိမရှိကို ဦး စွာစစ်ဆေးပါ "scope.writePhotosAlbum" ဒီတစ်ခု scope
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            that.openDialogVisible = true;

            // Interface ခေါ်ဆိုမှုစုံစမ်းမှု
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                that.downloadIamge(downloadUrl);
              },
              fail() {
                // အသုံးပြုသူမှခွင့်ပြုချက်ကိုငြင်းပယ်ခဲ့သည်
                // ချိန်ညှိချက်များစာမျက်နှာကိုဖွင့်ပါ
                wx.openSetting({
                  success: function(data) {},
                  fail: function(data) {}
                });
              }
            });
          } else {
			uni.getImageInfo(
				{
					src:downloadUrl,
					success(res){
						console.log(res);
						uni.saveImageToPhotosAlbum({
						  filePath: res.path,
						  success(res) { 
							  uni.showToast({
							  	title:'အောင်မြင်စွာသိမ်းဆည်းပြီးပါပြီ！',
								icon:'none'
							  })
						  }
						})
					}
				}
			);
            
          }
        },
        fail(res) {
          that.openDialogVisible = true;
        }
      });
    },
    saveImg: function() {
      this.downloadIamge(
        this.info[this.activeIndex].wap_poster,
        "poster" + this.activeIndex
      );
    }
  }
};
</script>

<style  lang="less">
page {
  height: 100%;
}
.distribution-posters {
  height: 100%;
}

.banenr {
  height: 100%;
}

.banner swiper {
  height: 100%;
}

.banner .slide-image {
  width: 100%;
  height: auto;
}
</style>
