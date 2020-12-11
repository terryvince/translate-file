import message from './message.js';
// အဓိပ္ပါယ်ဖွင့်ဆိုချက် type ပုံစံ:Popup အမျိုးအစား：top/bottom/center
const config = {
	// ထိပ်တန်းပေါ့ပ်
	top:'top',
	// အောက်ခြေပေါ့
	bottom:'bottom',
	// စင်တာပေါ်လာပါ
	center:'center',
	// အသိပေးချက်
	message:'top',
	// Dialog box
	dialog:'center',
	// င်းကိုမျှဝေမည်
	share:'bottom',
}

export default {
	data(){
		return {
			config:config
		}
	},
	mixins: [message],
}
