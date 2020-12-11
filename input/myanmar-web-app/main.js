import Vue from 'vue'
import App from './App'

// import router from "./router";
import store from "./store";
import schema from "async-validator";
import dialog from "./utils/dialog";
// import cookie from "@/utils/store/cookie";
import dayjs from 'dayjs'

// #ifdef H5
	// Debug module
	import eruda from 'eruda';
	eruda.init()
	// သွင်းခြင်းဝေငှခြင်းအပိုင်း
	// var wx = require('weixin-js-sdk');
	// Vue.prototype.wxReady = new Promise((resolve,reject)=>{
	// 	wx.config({
	// 	  debug: true, // debug mode ကိုဖွင့်ပါ,အားလုံးကိုခေါ်apiပြန်တန်ဖိုးကို client ပေါ်တွင်ဖြစ်လိမ့်မည်alertထွက်လာသည်，ဝင်လာသော parameters တွေကိုကြည့်ရှုရန်，။pcအဆုံးသတ်ဖွင့်，parameter သတင်းအချက်အလက်ရှောက်သွားပါလိမ့်မယ်logနှိပ်ပါ，သာမှာpcဘယ်အချိန်မှာမှသာပုံနှိပ်ပါ。
	// 	  appId: 'wx007347fbd7deb6f9', // လိုအပ်သည်，တရားဝင်အကောင့်၏ထူးခြားသောအမှတ်အသား
	// 	  timestamp: '', // လိုအပ်သည်，လက်မှတ်ထုတ်လုပ်ပြီးသောအခါ Timestamp
	// 	  nonceStr: '', // လိုအပ်သည်，ကျပန်းအမှတ်အသား၏ string ကိုထုတ်လုပ်ပါ
	// 	  signature: '',// လိုအပ်သည်，လက်မှတ်
	// 	  jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // လိုအပ်သည်，အသုံးပြုရန်လိုအပ်သည်JSinterface စာရင်း
	// 	});
	// 	wx.ready(function(){
	// 		resolve(true)
	// 	})
	// 	wx.error(function(res){
	// 		console.error('WeChat အမှားရလဒ်：',res)
	// 		reject(res)
	// 	  // configသတင်းအချက်အလက်စိစစ်အတည်ပြုပျက်ကွက်ကွပ်မျက်ခံရလိမ့်မည်errorfunction ကို，လက်မှတ်သက်တမ်းကုန်ဆုံးပြီးအတည်ပြုမှုမအောင်မြင်ပါက，သီးခြားအမှားမက်ဆေ့ခ်ျများဖွင့်နိုင်သည်config၏debugMode ကိုကြည့်ပါ，ပြန်လာနိုင်သည်resparameters တွေကိုကြည့်ပါ，အဘို့SPAသင်ဒီမှာလက်မှတ်ကို update လုပ်နိုင်ပါတယ်。
	// 	});
	// })
	
// #endif

// // import "@/assets/iconfont/iconfont";
// import "@/assets/iconfont/iconfont.css";
// // import "@/assets/js/media_750";
// // import "vue-ydui/dist/ydui.base.css";
// import "@/assets/css/base.less";
// import "@/assets/css/reset.less";
// import "@/assets/css/style.less";

import {
	parseRoute,
	_router
} from "@/utils";
import {
	VUE_APP_RESOURCES_URL,
	VUE_APP_API_URL,
	VUE_APP_IMAGE_URL
} from "@/config";

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== "production";

Vue.prototype.$validator = function(rule) {
	return new schema(rule);
};

Vue.prototype.toPx = uni.upx2px;

Vue.filter('toFixed',function(value, keepNumber=2){
	// console.log(value, 'လွှဲပြောင်းtoFixedfilter')
	if(typeof value !== 'number'){
		return 'နံပါတ်မဟုတ်ပါ'
	}
	value = +value
	return value.toFixed(keepNumber)
})
// ထက်ပိုကြီးသည်3စကားလုံးပြသမှု*နံပါတ်
Vue.filter('nameFilter',function(value, keepNumber=3){
	// console.log(value, 'လွှဲပြောင်းtoFixedfilter')
	if(typeof value !== 'string'){
		return ''
	}
	return value.split('').reduce((pre,cur,i)=>{
		if(value.length>3 && i>keepNumber-1){ // သုံးယောက်ထက်ပိုပြီး，အောက်ပါ string ကို
			pre+='*'
		} else if(value.length<=3 && i>0){	// ဂဏန်းသုံးလုံးအောက်，ပထမနေရာသာထားပါ，နောက်ကျောအပြည့်*နံပါတ်အစား
			pre+='*'
		} else{
		    pre+=cur
		}
		return pre
	},'')
})

Vue.filter('formatJson',function(value){
	if(typeof value == 'string'){
		let result = ''
		try{
			result = JSON.parse(value)
		}catch(err){
			result = ''
		}
		result = result.district.split('မြို့')
		return result.length > 1 ? result[1] : ''
	}
	return ''
})

Vue.filter('timeFormat',function(value, option){
	// console.log(value, 'လွှဲပြောင်းtimeFormatfilter')
	if(typeof value == 'string' && value.length==10){ // အကယ်unixအချိန်ဇယား
		value *= 1000
	}
	if(!dayjs(value).isValid()){
		return 'ရက်စွဲမဟုတ်ပါ'
	}
	const mode = {
		'date':'YYYY-MM-DD',
		'time':'HH:mm:ss',
		'datetime':'YYYY-MM-DD HH:mm:ss'
	}[option] || 'YYYY-MM-DD HH:mm:ss'
	return dayjs(value).format(mode)
})

const showToast = uni.showToast
uni.showToast = function(...rest){  // ဖြေရှင်းပါloadding နှင့်အတူ Toast တစ်ချိန်တည်းမှာအသုံးပြုတဲ့အခါ，hideLoading bug
	setTimeout(()=>{
		showToast(...rest)
	})
}

// const CACHE_KEY = "clear_0.0.1";

// if (!cookie.has(CACHE_KEY)) {
// 	cookie.clearAll();
// 	cookie.set(CACHE_KEY, 1);
// }


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue(App)

Vue.mixin({
	onLoad() {
		const {
			$mp
		} = this.$root
		this._route = parseRoute($mp)
		// this.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL;
		this._data.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL;
		// this._data.$img_url = VUE_APP_IMAGE_URL;
	},
	// beforeCreate(){
	// 	console.log('options:',this.$options)
	// 	this.$nextTick(()=>{
	// 		let imgKeys = Object.keys(this.$data).filter(v=> v.includes('$img_'))
	// 		imgKeys.map(url=> {
	// 			this[url] = VUE_APP_IMAGE_URL + this.$data[url]
	// 		})
	// 	})
		
	// },
	created(){
		// console.log('--လက်ရှိdataတန်ဖိုး',this._data)
		let imgKeys = Object.keys(this._data).filter(v=> v.includes('$img_'))
		imgKeys.map(url=> {
			this[url] = VUE_APP_IMAGE_URL + this._data[url]
		})
	},
	onShow() {
		_router.app = this
		_router.currentRoute = this._route
	}
})

Object.defineProperty(Vue.prototype, '$yrouter', {
	get() {
		return _router
	}
})

Object.defineProperty(Vue.prototype, '$yroute', {
	get() {
		return this._route
	}
})

Vue.prototype.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL
Vue.prototype.$VUE_APP_API_URL = VUE_APP_API_URL

// #ifdef H5
// H5ကုဒ်နံပါတ်
Vue.prototype.$deviceType = 'h5'
store.commit('updateDevicetype','h5')
// #endif

// #ifdef APP-PLUS
// Appပလက်ဖောင်းကုဒ် compiled
Vue.prototype.$deviceType = 'app'
store.commit('updateDevicetype','app')
Vue.prototype.$platform = uni.getSystemInfoSync().platform
// #endif

// #ifdef MP-WEIXIN
// WeChat applet မှပြုစုသောကုဒ်
Vue.prototype.$deviceType = 'routine'
store.commit('updateDevicetype','routine')
// #endif

// !!! ps  မအကြံပြုပါ template အသုံးပြုခဲ့သည် $deviceType လက်ရှိပတ် ၀ န်းကျင်ကိုစီရင်ရန်，ပေါ်လာဖို့အလွန်ဖွယ်ရှိ $deviceType အဘို့ undefined တရားသဖြင့်စီရင်အမှားများကို ဦး ဆောင်လမ်းပြသောပြနာများ，။ script module ထဲမှာပုံမှန်အသုံးပြုမှု
// သွားရန်အကြံပြုရန် store ရယူသည် $deviceType အာမခံနိုင်ပါတယ် template အတွက်ယူတန်ဖိုးကိုတရားဝင်သည်
// import { mapState, mapMutations, mapActions } from 'vuex';
// computed: {
// 		...mapState(['$deviceType'])
// },

// ဆာဗာလိပ်စာ
Vue.prototype.$path = function(path){
	return VUE_APP_API_URL+path
}
// Vue.prototype.$path = path =>VUE_APP_API_URL+path

app.$mount()
