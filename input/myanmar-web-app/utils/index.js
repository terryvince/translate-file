import Vue from 'vue'
// import MpvueRouterPatch from 'mpvue-router-patch'
// Vue.use(MpvueRouterPatch)
import {
	wxappAuth,
	getUserInfo
} from "@/api/user";
import store from "../store";
import dayjs from "dayjs";
import cookie from "@/utils/store/cookie";
import stringify from "@/utils/querystring";
import { VUE_APP_API_URL } from "@/config";

export function dataFormat(time, option) {
	time = +time * 1000;
	const d = new Date(time);
	const now = new Date().getTime();

	const diff = (now - d) / 1000;
	if (diff < 30) {
		return "တရားမျှတ";
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + "လွန်ခဲ့သောမိနစ်အနည်းငယ်က";
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + "တစ်နာရီအကြာ";
	} else if (diff < 3600 * 24 * 2) {
		return "1လွန်ခဲ့သောရက်များ";
	}
	if (option) {
		// return parseTime(time, option);
	} else {
		let timeStr = d.getFullYear() + "နှစ်" + (d.getMonth() + 1) + "လ" + d.getDate() + "နေ့" + d.getHours() + "အချိန်" + d.getMinutes() +
			"မိနစ်"
		return timeStr
	}
}

export function dateFormatT(time) {
	time = +time * 1000;
	const d = new Date(time);

	return (
		d.getFullYear() +
		"/" +
		(d.getMonth() + parseInt(1)) +
		"/" +
		d.getDate()
	);

}

export function trim(str) {
	return String.prototype.trim.call(str);
}

export function isType(arg, type) {
	return Object.prototype.toString.call(arg) === "[object " + type + "]";
}

export function isWeixin() {
	return true
}

export function parseQuery() {
	var pages = getCurrentPages() //တင်ထားသောစာမျက်နှာကိုရယူပါ
	var currentPage = pages[pages.length - 1] //လက်ရှိစာမျက်နှာ၏အရာဝတ္ထုကိုရယူပါ
	var url = currentPage.route //လက်ရှိစာမျက်နှာurl
	var options = currentPage.options //သင်ရလိုလျှင်urlအဆိုပါအတွက် parameters တွေကိုကြည့်ရှုနိုင်ပါသည်options
	return options
}

/*လက်ရှိစာမျက်နှာကိုရယူပါurl*/
export function getCurrentPageUrl() {
	var pages = getCurrentPages() //တင်ထားသောစာမျက်နှာကိုရယူပါ
	var currentPage = pages[pages.length - 1] //လက်ရှိစာမျက်နှာ၏အရာဝတ္ထုကိုရယူပါ
	var url = currentPage.route //လက်ရှိစာမျက်နှာurl
	return url
}

/*parameters များကိုအတူလက်ရှိစာမျက်နှာရယူပါurl*/
export function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages() //တင်ထားသောစာမျက်နှာကိုရယူပါ
	var currentPage = pages[pages.length - 1] //လက်ရှိစာမျက်နှာ၏အရာဝတ္ထုကိုရယူပါ
	var url = currentPage.route //လက်ရှိစာမျက်နှာurl
	var options = currentPage.options //သင်ရလိုလျှင်urlအဆိုပါအတွက် parameters တွေကိုကြည့်ရှုနိုင်ပါသည်options

	//SplicingurlParameters
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}

// clipboard သို့ကူးယူပါ
export const copyClipboard = (data) => {
	uni.setClipboardData({
		data: data,
		success: (res) => {
			uni.showToast({
				title: 'အောင်မြင်စွာကူးယူပါ',
				icon: 'success',
				duration: 2000
			})
		}
	})
}

export const getProvider = (service) => {
	return new Promise((resolve, reject) => {
		// လက်ရှိပတ်ဝန်းကျင်၏ ၀ န်ဆောင်မှုပေးသူကိုရယူပါ
		uni.getProvider({
			service: service || 'oauth',
			success: function (res) {
				// ဒီမှာဖယ်ထုတ်နိုင်ပါတယ်h5
				if (res.provider) {
					resolve(res.provider[0])
				}
			},
			fail() {
				reject('ပတ်ဝန်းကျင်ဆိုင်ရာ ၀ န်ဆောင်မှုပေးသူမရရှိခဲ့ပါ')
			}
		})
	}).catch(error => {
		console.log(error)
	})

}

export const authorize = (authorizeStr) => {
	return new Promise((resolve, reject) => {
		console.log('စစ်ဆေးရေးခွင့်ပြုချက်', `scope.${authorizeStr}`)
		uni.getSetting({
			success(res) {
				console.log(res.authSetting)
				if (res.authSetting[`scope.${authorizeStr}`]) {
					resolve('အောင်မြင်စွာရရှိထားသောခွင့်ပြုချက်')
				} else {
					reject('ခွင့်ပြုချက်ရရှိရန်မအောင်မြင်ပါ')
				}
			},
			fail() {
				reject('ဆက်တင်များကိုမအောင်မြင်ပါ')
			}
		})

	})
}

export const checkAuth = (authorizeStr,tip) => {
	return new Promise((resolve, reject) => {
		authorize(authorizeStr).then(res=>{ // ခွင့်ပြု
			resolve('ခွင့်ပြုချက်ရရှိခဲ့သည်！')
		}).catch(err=>{ // ခွင့်ပြုချက်မရှိ
			uni.authorize({
				scope: `scope.${authorizeStr}`,
				success() {
					resolve('ခွင့်ပြုချက်ရရှိခဲ့သည်！')
				},
				fail(){
					uni.showModal({
						title:'ချက်ချင်း',
						content: tip,
						success(res){
							 if (res.confirm) {
								uni.openSetting({
									success(res) {
										if(res.authSetting[`scope.${authorizeStr}`]){
											resolve('ခွင့်ပြုချက်ရရှိခဲ့သည်!')
											return
										}
										reject('ခွင့်ပြုချက်ကိုသင်ဖျက်သိမ်းလိုက်သည်！');
									}
								})
							} else{
								reject('ခွင့်ပြုချက်ကိုသင်ဖျက်သိမ်းလိုက်သည်！');
							}
						}
					})
				}
			})
			
		})

	})
}

export const login = () => {
	console.log('————————————————————')
	console.log('စတင်ဝင်ရောက်သည်')
	console.log('————————————————————')
	return new Promise((resolve, reject) => {
		console.log('သဘာဝပတ်ဝန်းကျင်ကိုးကားရယူပါ')
		getProvider().then(provider => {
			// login interface ကိုခေါ်ပါ
			console.log('login interface ကိုခေါ်ပါ, ပတ်ဝန်းကျင်:',Vue.prototype.$deviceType)
			if(Vue.prototype.$deviceType == 'h5'){
				wxappAuth({
					code: uni.getStorageSync('wxcode'),
					spread: cookie.get("spread")
				},'h5').then(({data})=>{
					console.log('login interface ကိုအောင်မြင်စွာဟုခေါ်သည်')
					console.log('login အချက်အလက်စုဆောင်းမှုကိုစတင်စတင်ပါ，နှင့်အသုံးပြုသူအသေးစိတ်ကိုရယူပါ')
					uni.hideLoading();
					store.commit("login", data.token, dayjs(data.expires_time));
					store.dispatch('userInfo', true)
					getUserInfo().then(user => {
						console.log('အသုံးပြုသူအချက်အလက်ကိုအောင်မြင်စွာရယူပါ')
						store.dispatch('setUserInfo', user.data)
						resolve(user)
					}).catch(error => {
						console.log('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
						reject('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
					});
				}).catch(error => {
					console.log(error)
					console.log('Login interface ခေါ်ဆိုမှုမအောင်မြင်ပါ')
					reject('Login interface ခေါ်ဆိုမှုမအောင်မြင်ပါ')
				});
				return
			}
			uni.login({
				provider: provider,
				success: function (loginRes) {
					// WeChat login
					console.log('login interface ကိုအောင်မြင်စွာဟုခေါ်သည်')
					let code = loginRes.code;
					console.log('အသုံးပြုသူသတင်းအချက်အလက်ခွင့်ပြုချက်ကိုစတင်စစ်ဆေးပါ', code)
					// ခွင့်ပြုချက်ကိုစစ်ဆေးပါ， အသုံးပြုသူသတင်းအချက်အလက်ခွင့်ပြုချက်ကိုစစ်ဆေးပါ
					authorize('userInfo').then(() => {
						console.log('ခွင့်ပြု')
						console.log('အသုံးပြုသူအချက်အလက်စတင်ရယူပါ')
						uni.getUserInfo({
							provider: provider,
							success: function (user) {
								console.log('အသုံးပြုသူအချက်အလက်ကိုအောင်မြင်စွာရယူပါ')
								console.log('login interface စတင်ခေါ်ဆိုပါ')
								wxappAuth({
									encryptedData: user.encryptedData,
									iv: user.iv,
									code: code,
									spread: cookie.get("spread")
								}).then(({ data }) => {
									console.log('login interface ကိုအောင်မြင်စွာဟုခေါ်သည်')
									console.log('login အချက်အလက်စုဆောင်းမှုကိုစတင်စတင်ပါ，နှင့်အသုံးပြုသူအသေးစိတ်ကိုရယူပါ')
									uni.hideLoading();
									store.commit("login", data.token, dayjs(data.expires_time));
									store.dispatch('userInfo', true)
									getUserInfo().then(user => {
										console.log('အသုံးပြုသူအချက်အလက်ကိုအောင်မြင်စွာရယူပါ')
										store.dispatch('setUserInfo', user.data)
										resolve(user)
									}).catch(error => {
										console.log('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
										reject('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
									});
								}).catch(error => {
									console.log(error)
									console.log('Login interface ခေါ်ဆိုမှုမအောင်မြင်ပါ')
									reject('Login interface ခေါ်ဆိုမှုမအောင်မြင်ပါ')
								});
							},
							fail() {
								console.log('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
								reject('အသုံးပြုသူအချက်အလက်မရရှိခဲ့ပါ')
							}
						});
					}).catch(error => {
						console.log('အသုံးပြုသူခွင့်မပြုပါ')
						reject('အသုံးပြုသူခွင့်မပြုပါ')
					})
				},
				fail() {
					console.log('login interface ကိုခေါ်ဆိုရန်မအောင်မြင်ပါ')
					reject('login interface ကိုခေါ်ဆိုရန်မအောင်မြင်ပါ')
				}
			});
		}).catch(error => {
			reject('ပတ်ဝန်းကျင်ဆိုင်ရာ ၀ န်ဆောင်မှုပေးသူမရရှိခဲ့ပါ')
		})
	})
}

export const handleGetUserInfo = () => {
	getUserInfo().then(res => {
		console.log('အသုံးပြုသူအချက်အလက်ရယူပါ')
		store.dispatch('setUserInfo', res.data)
		var pages = getCurrentPages() //တင်ထားသောစာမျက်နှာကိုရယူပါ

		var currentPage = pages[pages.length - 1] //လက်ရှိစာမျက်နှာ၏အရာဝတ္ထုကိုရယူပါ
		let url = "/pages/home/index"
		let query = {}
		if (currentPage) {
			const {
				redirect,
				...querys
			} = currentPage.options
			// ပြီးခဲ့သည့်စာမျက်နှာကိုရယူပါ
			if (
				currentPage.route != 'pages/Loading/index' &&
				currentPage.route != 'pages/user/Login/index'
			) {
				url = currentPage.route
				query = {
					...querys
				}
			}
			if (currentPage.route == 'pages/authorization/index') {

				url = redirect
				query = {
					...querys
				}
			}

		}
		console.log(url)
		if (url == '/pages/home/index' || url == '/pages/shop/GoodsClass/index' || url == '/pages/shop/ShoppingCart/index' || url == '/pages/user/User/index') {
			switchTab({
				path: `${url}`,
				query
			});
		} else {
			console.log('အသုံးပြုသူအချက်အလက်ရယူပြီးနောက်ပဲ့တင်သံစာမျက်နှာသို့ကူးပါ')
			// ယခင်စာမျက်နှာသို့ပြန်သွားခြင်းကိုတားဆီးရန်မှာခွင့်ပြုချက်စာမျက်နှာဖြစ်သည်，ပထမ ဦး ဆုံးပင်မစာမျက်နှာသို့ redirect，ထပ်ခုန်ပါ
			console.log({
				path: `/${url}`,
				query
			})
			reLaunch({
				path: '/pages/home/index',
				// query
			});

			setTimeout(() => {
				if (url.indexOf('/') == 0) {
					url = url.slice(1)
				}
				push({
					path: `/${url}`,
					query
				})
			})

			// push({
			// 	path: `${url}`,
			// 	query
			// })
		}
	})
}

export function parseUrl(location) {
	if (typeof location === 'string') return location
	const {
		path,
		query
	} = location
	// console.log('ပြောင်းလဲခြင်းမပြုမီ：',query)
	// ？a=b&b=c
	const queryStr = stringify(query)
	// console.log('ပြောင်းလဲပြီးနောက်：',queryStr)

	if (!queryStr) {
		return path
	}

	return `${path}?${queryStr}`
}

export function parseRoute($mp) {
	const _$mp = $mp || {}
	const path = _$mp.page && _$mp.page.route
	return {
		path: `/${path}`,
		params: {},
		query: _$mp.query || _$mp.page.options,
		hash: '',
		fullPath: parseUrl({
			path: `/${path}`,
			query: _$mp.query || _$mp.page.options
		}),
		name: path && path.replace(/\/(\w)/g, ($0, $1) => $1.toUpperCase())
	}
}

export function auth() {
	/**
	 *	ခွင့်ပြုချက်ကိုဆုံးဖြတ်ရန်ဘယ်လို?
	 *	အသုံးပြုသူ system သို့ logged လျှင်，အရာနှစ်ခုစွန့်ခွာလိမ့်မယ်，တစ်ခုကtoken，တစ်ခုကuserInfo
	 *	tokenပြwillနာတစ်ခုရှိတယ်，အဆိုပါ applet အချိန်ကြာမြင့်စွာဖွင့်လှစ်မထားဘူးဆိုရင်，login ပျက်ကွက်ပါလိမ့်မယ်，ခွင့်ပြုချက်စာမျက်နှာသို့ချက်ချင်းခုန်သောစာမျက်နှာကိုဖွင့်သောပြaနာတစ်ခုရှိပါသည်
	 *		ဖြေရှင်းချက်，သိမ်းဆည်းပါtokenဘယ်အချိန်မှာသက်တမ်းကုန်ဆုံးအချိန်ထည့်ပါ，တောင်းဆိုမှုတိုင်းအတွက် cache ကိုရယူပါtoken
	 *	userInfoကန့်သတ်အချိန်အသုံးပြုသူသတင်းအချက်အလက်သာ，သိပ်အသုံးဝင်သည်မဟုတ်
	 * 	ps：တရားစီရင်ဖို့လိုတယ် token တည်ရှိနိုင်သည်
	 */
	if (cookie.get('login_status')) {
		return true
	}
	return false
}


export const handleLoginStatus = (location, complete, fail, success) => {
	// ဝင်ရောက်ခြင်းမရှိဘဲသုံးနိုင်သောစာမျက်နှာများ
	let page = [{
		path: '/pages/Loading/index',
		name: 'loadingစာမျက်နှာ'
	},
	{
		path: '/pages/home/index',
		name: 'နေအိမ်'
	},
	{
		path: '/pages/user/Login/index',
		name: 'ဝင်ပါ'
	},
	{
		path: '/pages/authorization/index',
		name: 'ခွင့်ပြုချက်စာမျက်နှာ'
	},
	]

	// အဲဒါကိုသုံးလို့ရလား
	let isAuth = false

	console.log('ခုန်ရန်အကြောင်း', location, parseUrl(location))

	// မှ location လက်ရှိရယူပါurl，location typeof string || object
	let path = ''
	if (typeof location === 'string') {
		path = location
	} else {
		path = location.path
	}

	// အသုံးပြုသူရှိမရှိဆုံးဖြတ်ပါtoken
	if (!auth()) {
		page.map((item) => {
			if (item.path == path) {
				isAuth = true
			}
		})
	} else {
		isAuth = true
	}

	return new Promise((resolve, reject) => {
		if (isAuth) {
			// ရှိသည်token
			if (path == '/pages/home/index' || path == '/pages/shop/GoodsClass/index' || path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
				// switchTab({
				// 	path: parseUrl(location),
				// })
				// return
			}

			resolve({
				url: parseUrl(location),
				complete,
				fail,
				success
			})
		} else {
			// မဟုတ်ဘူးtoken，ပထမ ဦး စွာအသုံးပြုသူခွင့်ပြုကြောင်းအတည်ပြုပါ，ခွင့်ပြုလျှင်，အလိုအလျောက်လော့အင်လုပ်ပါ
			routerPermissions(parseUrl(location))
			reject()
		}
	}).catch(error => {
		console.log(error)
	})
}

// export function checkPermissions(){

// }

export function routerPermissions(url, type) {
	console.log('routerPermissions', url)
	console.log('————————')
	console.log(url, type, 'routerPermissions')
	console.log('————————')
	let path = url
	if (!path) {
		path = '/' + getCurrentPageUrlWithArgs()
	}
	if (Vue.prototype.$deviceType == 'routine') { // အသုံးအဆောင်များ
		console.log('————————')
		console.log('လောလောဆယ်က WeChat Mini Program ပါ，mini program login method ကိုစတင်လုပ်ပါ')
		console.log('————————')
		// ၎င်းသည် WeChat applet ဖြစ်ပါက，ခွင့်ပြုချက်စာမျက်နှာသို့ကူးယူ
		// ပထမ ဦး စွာအသုံးပြုသူခွင့်ပြုကြောင်းအတည်ပြုပါ，ခွင့်ပြုလျှင်，အလိုအလျောက်လော့အင်လုပ်ပါ
		console.log('————————')
		console.log('ခွင့်ပြုချက်ကိုအတည်ပြုရန်စတင်ပါ')
		console.log('————————')
		authorize('userInfo').then(() => {
			// အလိုအလျောက် log-in ကို
			console.log('————————')
			console.log('အလိုအလျောက် log-in ကို')
			console.log('————————')
			login().then(res => {
				// login အောင်မြင်သည်，ခုန်တက်ဖို့လိုအပ်တဲ့စာမျက်နှာကိုသွားပါ
				console.log('————————')
				console.log('login အောင်မြင်သည်，ဤနေရာသို့သွားရန် - အညွှန်းရှာဖွေရန်')
				console.log('————————')
				store.commit("updateAuthorizationPage", false);
				if (path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
					console.log('————————')
					console.log('လက်ရှိစျေးဝယ်လှည်း，ဒါမှမဟုတ်ကိုယ်ပိုင်စင်တာ')
					console.log('————————')
					return
				}
				if (type == 'reLaunch') {
					reLaunch({
						path,

					})
					return
				}
				if (type == 'replace') {
					replace({
						path,
					})
					return
				}
				{
					push({
						path,
					})
				}
			}).catch(error => {
				console.log('————————')
				console.log('အလိုအလျောက်လော့အင်မအောင်မြင်ပါ，ခွင့်ပြုချက်စာမျက်နှာကိုသွားပါ')
				console.log('————————')
				uni.showToast({
					title: error,
					icon: "none",
					duration: 2000
				});
				reLaunch({
					path: '/pages/authorization/index',
				})
				cookie.set('redirect', path)
			})
		}).catch(error => {
			// login စာမျက်နှာသို့ဝင်ရန်သို့မဟုတ်ခွင့်ပြုချက်စာမျက်နှာသို့သွားပါ
			if (path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
				switchTab({
					path,
				})
				store.commit("updateAuthorizationPage", false);
				return
			}
			reLaunch({
				path: '/pages/authorization/index',
			})
			cookie.set('redirect', path)
		})
	} else {
		// အကယ်၍ ၎င်းသည်သေးငယ်သောပရိုဂရမ်တစ်ခုမဟုတ်ပါကလော့ဂ်အင်စာမျက်နှာသို့သွားပါ
		console.log('လောလောဆယ်ဖြစ်ပါတယ်h5，ပြန်လာပြီ！')
		push({
			path: '/pages/Loading/index',
		})
		cookie.set('redirect', path)
	}

}

export function push(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		uni.navigateTo(params)
	}).catch(error => {
		// ခွင့်တောင်းမှုငြင်းဆိုခြင်း

	})
}

export function replace(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		console.log(params)
		uni.redirectTo(params)
	}).catch(error => {
		// ခွင့်တောင်းမှုငြင်းဆိုခြင်း

	})
}

export function reLaunch(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		console.log(params)
		uni.reLaunch(params)
	}).catch(error => {
		// ခွင့်တောင်းမှုငြင်းဆိုခြင်း

	})
}

export function go(delta) {
	uni.navigateBack({
		delta
	})
}

export function back() {
	uni.navigateBack({
		delta: 1,
		success: function (e) { },
		fail: function (e) { }
	})
}

export function switchTab(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		uni.switchTab(params)
	}).catch(error => {
		// ခွင့်တောင်းမှုငြင်းဆိုခြင်း
	})
}


export const _router = {
	mode: 'history',
	switchTab,
	reLaunch,
	push,
	replace,
	go,
	back
}


export function handleQrCode() {
	try {
		var urlSpread = parseQuery()["q"];
		if (urlSpread) {
			if (urlSpread.indexOf('%3F') != -1) {
				// ပိုစတာ QR ကုဒ်မှတဆင့်ရိုက်ထည့်ပါ
				urlSpread = urlSpread
					.split("%3F")[1]
					.replace(/%3D/g, ":")
					.replace(/%26/g, ",")
					.split(",")
					.map((item, index) => {
						item = item.split(":");
						return `"${item[0]}":"${item[1]}"`;
					})
					.join(",");
				urlSpread = JSON.parse("{" + urlSpread + "}");
				return urlSpread
			} else {
				return handleUrlParam(urlSpread)
			}
		}
		return null
	} catch {
		return null
	}

}

export function handleUrlParam(path) {
	console.log(path)

	var url = path.split("?")[1]; //ရရှိသည်urlin"?"ဇာတ်ကောင်ပြီးနောက် String  
	console.log(url)
	var theRequest = new Object();
	let strs = url.split("&");
	for (var i = 0; i < strs.length; i++) {
		theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	}
	return theRequest;
}

const getImageInfo = (images) => {
	return new Promise((resolve, reject) => {
		let imageAry = {}
		images.map((item, index) => {
			uni.getImageInfo({
				src: item,
				fail: function (res) {
					imageAry[index] = null
					if (imageAry.length == images.length) {
						resolve(imageAry)
					}
				},
				success: function (res) {
					imageAry[index] = res
					if (Object.keys(imageAry).length == images.length) {
						resolve(imageAry)
					}
				}
			})
		})
	})
}


/**
 * မျှဝေတဲ့ပိုစတာကိုရယူပါ
 * @param array store ပိုစတာအကြောင်းအရာ
 * @param string store_name ပစ္စည်းစာသား
 * @param string price စျေးနှုန်း
 * @param function successFn ဖုန်းပြန်ခေါ်ပါ
 * 
 * 
 */
export const PosterCanvas = (store, successCallBack) => {
	uni.showLoading({
		title: 'ပိုစတာမျိုးဆက်',
		mask: true
	});
	getImageInfo([store.image, store.code]).then(res => {
		let contentHh = 48 * 1.3
		const ctx = uni.createCanvasContext('myCanvas')
		ctx.clearRect(0, 0, 0, 0);
		const WIDTH = 747
		const HEIGHT = 1326;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(res[0].path, 0, 0, WIDTH, WIDTH);
		ctx.drawImage(res[1].path, 40, 1064, 200, 200);
		ctx.save();
		let r = 90;
		let d = r * 2;
		let cx = 40;
		let cy = 990;
		ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
		ctx.clip();
		ctx.restore();
		ctx.setTextAlign('center');
		ctx.setFontSize(48);
		ctx.setFillStyle('#000');
		ctx.fillText(store.title, WIDTH / 2, 810 + contentHh);
		ctx.setTextAlign('center')
		ctx.setFontSize(32);
		ctx.setFillStyle('red');
		ctx.fillText('￥' + store.price, WIDTH / 2, 985);
		ctx.setTextAlign('center')
		ctx.setFontSize(22);
		ctx.setFillStyle('#333333');
		ctx.fillText('ချက်ချင်း ၀ ယ်ရန် QR ကုဒ်ကိုခွဲခြားသတ်မှတ်ရန်ကြာမြင့်စွာနှိပ်ပါ', WIDTH / 2, 1167);
		ctx.save();
		ctx.draw(true, () => {
			uni.canvasToTempFilePath({
				canvasId: 'myCanvas',
				fileType: 'png',
				destWidth: WIDTH,
				destHeight: HEIGHT,
				success: function (res) {
					uni.hideLoading();
					successCallBack && successCallBack(res.tempFilePath);
				},
				fail: function (error) {
					console.log(error)
				},

			})
		});

	})

	// uni.getImageInfo({
	//   src: store.image,
	//   fail: function (res) {
	//     uni.showToast({
	//       title: 'ပိုစတာမျိုးဆက်ပျက်',
	//       icon: "none",
	//       duration: 2000
	//     });
	//   },
	//   success: function (res) {

	//   }
	// })
}



export const handleLoginFailure = () => {
	
	// if(store.state.$deviceType === 'h5'){
	// 	console.log('————————')
	// 	console.log('ဆိုင်းအောက်，လက်ရှိစာမျက်နှာကိုတရားဝင်စာမျက်နှာတစ်ခုအဖြစ်မှတ်သားပါ，မျိုးစုံခုန်တားဆီး')
	// 	console.log('————————')
	// 	return
	// }

	console.log('————————')
	console.log('ဆိုင်းအောက်，လက်ရှိစာမျက်နှာကိုတရားဝင်စာမျက်နှာတစ်ခုအဖြစ်မှတ်သားပါ，မျိုးစုံခုန်တားဆီး')
	console.log('————————')

	store.commit("logout");
	store.commit("updateAuthorization", false);

	// token မမှန်ကန်ပါ
	// သင် login စာမျက်နှာသို့မဟုတ်ခွင့်ပြုချက်စာမျက်နှာပေါ်တွင်သင်လက်ရှိရှိနေသည်ကိုဆုံးဖြတ်ပါ，အလယ်တန်းခုန်ခြင်းကိုတားဆီးပါ
	if (store.getters.isAuthorizationPage || getCurrentPageUrl() == '/pages/user/Login/index') {
		console.log(store.getters.isAuthorizationPage, getCurrentPageUrl(), 'ယခုပင် login စာမျက်နှာသို့မဟုတ်ခွင့်ပြုချက်စာမျက်နှာ，နည်းလမ်းဖယ်ထုတ်ပါ')
		return
	}

	console.log('————————')
	console.log('လောလောဆယ်ခွင့်ပြုချက်စာမျက်နှာ')
	console.log(store.getters)
	console.log('————————')
	store.commit("updateAuthorizationPage", true);

	let path = '/' + getCurrentPageUrlWithArgs()

	// သငျသညျအုပ်စုတစ်စုအဖြစ်လာလျှင်စီရင်
	if (getCurrentPageUrl() == 'pages/activity/GroupRule/index' && handleQrCode()) {
		console.log('————————')
		console.log('အဖွဲ့တစ်ဖွဲ့အဖြစ်လာကြ၏')
		console.log('————————')

		let url = handleQrCode();
		console.log(url)
		if (url) {
			path = parseUrl({
				path: `/${getCurrentPageUrl()}`,
				query: {
					id: url.pinkId,
				}
			})
			// cookie.set("spread", url.spread || 0);
		} else {
			console.log('————————')
			console.log('အဖွဲ့တစ်ဖွဲ့အဖြစ်လာကြ၏,သို့သော်အဘယ်သူမျှမ parameters တွေကိုရရှိခဲ့ကြသည်')
			console.log('————————')
			handleNoParameters()
		}
	}

	// စကင်ဖတ်စစ်ဆေးသည့်ညှိနှိုင်းမှုပိုစတာလာလျှင်ဆုံးဖြတ်ပါ
	if (getCurrentPageUrl() == 'pages/activity/DargainDetails/index' && handleQrCode()) {
		console.log('————————')
		console.log('ဒါဟာ scan ဖတ် bargain ပိုစတာများမှလာ၏')
		console.log('————————')
		let url = handleQrCode();
		if (url) {
			path = parseUrl({
				path: `/${getCurrentPageUrl()}`,
				query: {
					id: url.bargainId,
					partake: url.uid
				}
			})
			// cookie.set("spread", url.spread || 0);
		} else {
			handleNoParameters()
			console.log('————————')
			console.log('ဒါဟာ scan ဖတ် bargain ပိုစတာများမှလာ၏,သို့သော်အဘယ်သူမျှမ parameters တွေကိုရရှိခဲ့ကြသည်')
			console.log('————————')


		}
	}

	if (getCurrentPageUrl() == 'pages/shop/GoodsCon/index' && handleQrCode()) {
		console.log('————————')
		console.log('စကင်ဖတ်စစ်ဆေးပြီးထုတ်ကုန်အသေးစိတ်ဖြစ်ပါတယ်')
		console.log('————————')

		let url = handleQrCode();
		console.log(url)
		if (url) {
			path = parseUrl({
				path: `/${getCurrentPageUrl()}`,
				query: {
					id: url.productId,
				}
			})
			cookie.set("spread", url.spread || 0);
		} else {
			handleNoParameters()
			console.log('————————')
			console.log('အဆိုပါစကင်ဖတ်စစ်ဆေးပြီးထုတ်ကုန်အသေးစိတ်ကိုမှလာကြ၏,သို့သော်အဘယ်သူမျှမ parameters တွေကိုရရှိခဲ့ကြသည်')
			console.log('————————')
		}
	}


	console.log('————————')
	console.log(path, 'စာမျက်နှာလိပ်စာကိုပြန်ညွှန်း')
	console.log('————————')
	routerPermissions(path, 'reLaunch')
}

const handleNoParameters = () => {
	uni.showToast({
		title: 'လိုအပ်သော parameters တွေကိုရရှိသောကြသည်မဟုတ်，အိမ်ပြန်ခုန်အကြောင်း',
		icon: 'success',
		duration: 2000
	})
	setTimeout(() => {
		clearTimeout()
		switchTab({
			path: '/pages/home/index',
		});
	}, 1500)
}


export function chooseImage(callback) {
	uni.chooseImage({
		count: 1,
		sourceType: ["album"],
		success: res => {
			uni.getImageInfo({
				src: res.tempFilePaths[0],
				success: image => {
					console.log(image);
					uni.showLoading({ title: "ရုပ်ပုံတင်ခြင်း", mask: true });
					uni.uploadFile({
						url: `${VUE_APP_API_URL}/api/upload`,
						file: image,
						filePath: image.path,
						header: {
							Authorization: "Bearer " + store.getters.token
						},
						name: "file",
						success: res => {
							console.log(res);
							if (callback) {
								callback(JSON.parse(res.data).link)
							}
						},
						fail: err => {
							uni.showToast({
								title: "ပုံတင်ရန်မအောင်မြင်ပါ",
								icon: "none",
								duration: 2000
							});
						},
						complete: res => {
							uni.hideLoading()
						}
					});
				},
				fail: err => {
					uni.showToast({
						title: "ရုပ်ပုံသတင်းအချက်အလက်ရရှိရန်မအောင်မြင်ပါ",
						icon: "none",
						duration: 2000
					});
				}
			});
		}
	});
}
