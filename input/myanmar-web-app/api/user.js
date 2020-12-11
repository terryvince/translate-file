import request from "@/utils/request";

/**
 * ပြည်နယ်စီးတီးခရိုင်wxappAuth
 */
export function getCity(data) {
	return request.get("/city_list", data, {
		// return request.get("/citys", data, {
		login: false
	});
}

export function district(data) {
	// return request.get("/city_list", data, {
	return request.get("/citys", data, {
		login: false
	});
}

/**
 * အသုံးပြုသူဝင်ပါ
 * @param data object အသုံးပြုသူအကောင့်စကားဝှက်
 */
export function login(data) {
	return request.post("/login", data, {
		login: false
	});
}

/**
 * အသုံးပြုသူဖုန်းနံပါတ်ကိုဝင်ပါ
 * @param data object အသုံးပြုသူဖုန်းနံပါတ် သာလုပ်နိုင်
 */
export function loginMobile(data) {
	return request.post("/login/mobile", data, {
		login: false
	});
}

/**
 * အသုံးပြုသူသည်အတည်ပြုကုဒ်ပို့သည်
 * @param data object အသုံးပြုသူဖုန်းနံပါတ်
 */
export function registerVerify(data) {
	return request.post("/register/verify", data, {
		login: false
	});
}

/**
 * အသုံးပြုသူမိုဘိုင်းဖုန်းနံပါတ်မှတ်ပုံတင်ခြင်း
 * @param data object အသုံးပြုသူဖုန်းနံပါတ် အတည်ပြုရန်ကုတ် စကားဝှက်
 */
export function register(data) {
	return request.post("/register", data, {
		login: false
	});
}

/**
 * စကားဝှက်ကိုပြောင်းလဲရန်အသုံးပြုသူဖုန်းနံပါတ်
 * @param data object အသုံးပြုသူဖုန်းနံပါတ် အတည်ပြုရန်ကုတ် စကားဝှက်
 */
export function registerReset(data) {
	return request.post("/register/reset", data, {
		login: false
	});
}

/*
 * ကူပွန်စာရင်းကိုလက်ခံရရှိသည်，ပင်မစာမျက်နှာသည်ဤ interface လိုအပ်သည်，login မလိုအပ်ပါ，
 * */
export function getCoupon(q) {
	return request.get("/coupons", q, {
		login: false
	});
}

/*
 * ကူပွန်လက်ခံရရှိရန်ကိုနှိပ်ပါ
 * */
export function getCouponReceive(id) {
	return request.post("/coupon/receive", {
		couponId: id
	}, {
		login: true
	});
}

/*
 * ကူပွန်အမြောက်အများအတွက်စုဆောင်းပါ
 * */
export function couponReceiveBatch(couponId) {
	return request.post("/coupon/receive/batch", {
		couponId
	});
}

/*
 * ကျွန်တော့်လျှော့စျေးကူပွန်
 * */
export function getCouponsUser(type) {
	return request.get("/coupons/user/" + type);
}

/*
 * ကိုယ်ပိုင်စင်တာ
 * */
export function getUser() {
	return request.get("/user");
}

/*
 * အသုံးပြုသူအချက်အလက်
 * */
export function getUserInfo() {

	return request.get("/userinfo", {
		login: true
	});
}

/*
 * အသေးစားပရိုဂရမ်ဝင်မည်
 * */
export function wxappAuth(data,from) {
	if(from == 'h5'){
		return request.get("/wechat/auth", data, {
			login: false
		});
	}
	return request.post("/wxapp/auth", data, {
		login: false
	});
}

/*
 * ကိုယ်ပိုင်စင်တာ(function စာရင်း)
 * */
export function getMenuUser() {
	return request.get("/menu/user");
}

/*
 * လိပ်စာစာရင်း
 * */
export function getAddressList(data) {
	return request.get("/address/list", data || {});
}

/*
 * လိပ်စာကိုဖျက်ပါ
 * */
export function getAddressRemove(id) {
	return request.post("/address/del", {
		id: id
	});
}

/*
 * ပုံမှန်လိပ်စာကိုသတ်မှတ်ပါ
 * */
export function getAddressDefaultSet(id) {
	return request.post("/address/default/set", {
		id: id
	});
}

/*
 * ပုံမှန်လိပ်စာကိုရယူပါ
 * */
export function getAddressDefault() {
	return request.get("/address/default");
}

/*
 * လိပ်စာတစ်ခုတည်းရယူပါ
 * */
export function getAddress(id) {
	return request.get("/address/detail/" + id);
}

/*
 * ပြုပြင်သည် လိပ်စာထည့်ပါ
 * */
export function postAddress(data) {
	return request.post("/address/edit", data);
}

/*
 * အကြိုက်ဆုံးထုတ်ကုန်များကိုရယူပါ
 * */
export function getCollectUser(page, limit) {
	return request.get("/collect/user", {
		page: page,
		limit: limit
	});
}

/*
 * အကြိုက်ဆုံးထုတ်ကုန်များကိုဖျက်ပါ
 * */
export function getCollectDel(id, category) {
	return request.post("/collect/del", {
		id: id,
		category: category
	});
}

/*
 * ထုတ်ကုန်များအမြောက်အများစုဆောင်းခြင်း
 * */
export function postCollectAll(data) {
	return request.post("/collect/add", data);
}

/*
 * အကြိုက်ဆုံးထုတ်ကုန်များထည့်ပါ
 * */
export function getCollectAdd(id, category) {
	return request.post("collect/add", {
		id: id,
		category: category
	});
}

/*
 * configuration ကိုဆိုင်းအင်
 * */
export function getSignConfig() {
	return request.get("/sign/config");
}

/*
 * Check-in အတွက် Check-in စာရင်း
 * */
export function getSignList(page, limit) {
	return request.get("/sign/list", {
		page: page,
		limit: limit
	});
}

/*
 * Check-in စာရင်း
 * */
export function getSignMonth(page, limit) {
	return request.get("/sign/month", {
		page: page,
		limit: limit
	});
}

/*
 * ဝင်ရောက်သူအသုံးပြုသူအချက်အလက်
 * */
export function postSignUser(sign) {
	return request.post("/sign/user", sign);
}

/*
 * ဆိုင်းအင်လုပ်ခြင်း
 * */
export function postSignIntegral(sign) {
	return request.post("/sign/integral", sign);
}

/*
 * အရောင်းမြှင့်တင်ရေးအချက်အလက်
 * */
export function getSpreadInfo() {
	return request.get("/commission");
}

/*
 * Promoter စာရင်း
 * */
export function getSpreadUser(screen) {
	return request.post("/spread/people", screen);
}

/*
 * Promoter အမှာစာ
 * */
export function getSpreadOrder(where) {
	return request.post("/spread/order", where);
}

/*
 * ရန်ပုံငွေအသေးစိတ်（types|0=အားလုံး,1=စားသုံးမှု,2=အားသွင်းပါ,3=ပြန်,4=ဆုတ်ခွာ）
 * */
export function getCommissionInfo(q, types) {
	return request.get("/spread/commission/" + types, q);
}

/*
 * အမှတ်စံချိန်
 * */
export function getIntegralList(q) {
	return request.get("/integral/list", q);
}

/*
 * ဘဏ်ထုတ်ယူခြင်း
 * */
export function getBank() {
	return request.get("/extract/bank");
}

/*
 * ထုတ်ယူခြင်းလျှောက်လွှာ
 * */
export function postCashInfo(cash) {
	return request.post("/extract/cash", cash);
}

/*
 * အသင်း ၀ င်စင်တာ
 * */
export function getVipInfo() {
	return request.get("/user/level/grade");
}

/*
 * အသင်းဝင်အဆင့်တာဝန်များ
 * */
export function getVipTask(id) {
	return request.get("/user/level/task/" + id);
}

/*
 * ရန်ပုံငွေစာရင်းဇယား
 * */
export function getBalance() {
	return request.get("/user/balance");
}

/*
 * Active status
 * */
export function getActivityStatus() {
	return request.get("/user/activity", {}, {
		login: false
	});
}

/*
 * Active status
 * */
export function getSpreadImg(data) {

	return request.get("/spread/banner", data);
}

/*
 * အသုံးပြုသူကိုပြုပြင်မွမ်းမံသောအချက်အလက်
 * */
export function postUserEdit(data) {
	return request.post("/user/edit", data);
}

/*
 * အသုံးပြုသူကိုပြုပြင်မွမ်းမံသောအချက်အလက်
 * */
export function getChatRecord(to_uid, data) {
	return request.get("user/service/record/" + to_uid, data);
}

/*
 * အသုံးပြုသူကိုပြုပြင်မွမ်းမံသောအချက်အလက်
 * */
export function serviceList() {
	return request.get("user/service/list");
}

/*
 * တရားဝင်အကောင့်အားသွင်း
 * */
export function rechargeWechat(data) {
	return request.post("/recharge/wechat", data);
}

/*
 * ဆိုင်းအောက်
 * */
export function getLogout() {
	return request.post("/auth/logout");
}

/*
 * လက်ကိုင်ဖုန်းနံပါတ်ကိုချည်ထားပါ
 * */
export function bindingPhone(data) {
	return request.post("wxapp/binding", data);
}

/*
 * h5တရားဝင်အကောင့်ဝင်ပါ
 * */
export function switchH5Login() {
	return request.post("switch_h5", {
		from: "wechat"
	});
}
/*
 * ကမကထများ၏အဆင့်ကိုရယူပါ
 * */
export function getRankList(q) {
	return request.get("rank", q);
}
/*
 * ကော်မရှင်အဆင့်ရယူပါ
 * */
export function getBrokerageRank(q) {
	return request.get("brokerage_rank", q);
}

/**
 * အသင်းဝင်အဆင့်ကိုစစ်ဆေးပါ
 */
export function setDetection() {
	return request.get("user/level/detection");
}


export function getRechargeApi() {
	return request.get("recharge/index");
}

export function postExchangeApi(data) {
	return request.post("/integral/exchange", data);
}

export function getProportionApi() {
	return request.get("/integral/proportion");
}


// 1.ဆုတ်ခွာ2.အရေးပါသော3.ထီ
export function getRuleWitTypeApi(type) {
	return request.get("/yxRule/query", {
		type: type
	});
}

// သမိုင်းရယူပါ limit page
export function getHistroy(q) {
	return request.get("history/user",q).then(res=>{
		res.data && res.data.forEach(v=>{
			v.sales+=v.ficti
		})
		return res
	});
}

// browsing history ထည့်ပါ id
export function addHistroy(data) {
	return request.post("history/add",data,{
		login:true
	});
}

// ကုမ္ပဏီ၏ကိုယ်ရေးအချက်အလက်ကိုရယူပါ
export function getCompanyProfile(q) {
	return request.get("companyProfile/find",q);
}

// တုံ့ပြန်ချက်
export function postAdvice(data) {
	return request.post("/proposal/create",data,{
		login:true
	});
}

// သာလွန်ချည်ထားပါ spread ဖိတ်ကြားချက်ကုဒ်
export function bindSuperior(q) {
	return request.get("/bindSuperior",q);
}

// ကျွန်ုပ်၏မက်ဆေ့ခ်ျစာရင်း
export function getMyMessage() {
	return request.get("information/getInfo");
}

export function getCashOutList(page, limit,type) {
	return request.get("/spread/cashOut/"+type, {
		page: page,
		limit: limit,
	});
}

// ဆိုင်းအောက်
export function logout() {
	return request.get("/quit");
}