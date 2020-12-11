import request from "@/utils/request";

/*
 * အမျိုးအစားများ
 * */
export function getCategory() {
	return request.get("/category", {}, {
		login: false
	});
}

/*
 * ကုန်ပစ္စည်းအသေးစိတ်
 * */
export function getProductDetail(id, data) {
	return request.get("/product/detail/" + id, data, {
		login: true
	}).then(res=>{
		if(res.data && res.data.storeInfo){
			res.data.storeInfo.sales += res.data.storeInfo.ficti  // အစစ်အမှန်ရောင်းအားပေါင်း virtual အရောင်း
		} 
		return res
	});
}

/*
 * အသင်းဝင်ကတ်ပြားအသေးစိတ်(အသင်းဝင်အခွင့်အရေးများပြသသည်)
 * */
export function getVipDetail(ids) {
	return Promise.all(ids.map(v=>getProductDetail(v,{})))
}

/*
 * ကုန်ပစ္စည်းဖြန့်ဖြူး QR Code ကို
 * */
export function getProductCode(id) {
	return request.get("/product/code/" + id, {}, {
		login: true
	});
}

/*
 * ကုန်ပစ္စည်းစာရင်း page=1&limit=8&keyword=&sid=0&news=0&priceOrder=&salesOrder=&type=0
 * */
export function getProducts(q) {
	return request.get("/products", q, {
		login: false
	}).then(res => {
		res.data && res.data.forEach(v=>{	// Plus အားကို virtual အရောင်း
			v.sales += v.ficti
		})
		return res
	});
}

/*
 * စျေးဝယ်လှည်းအရေအတွက်
 * */
export function getCartNum() {
	return request.get("/cart/count");
}

/*
 * အကြိုက်ဆုံးထဲထည့်ပါ
 * */
export function toCollect(id, category) {
	return request.get("/collect/add/" + id + "/" + category);
}

/*
 * သင့်ကိုအကြံပြုပါသည်
 * */
export function getHostProducts(page, limit) {
	return request.get(
		"/product/hot", {
		page: page,
		limit: limit
	}, {
		login: false
	}
	);
}

/*
 * ဖက်ရှင်ဆိုင်、လူကြိုက်များ、အစစာရင်း
 * */
export function getGroomList(type) {
	return request.get("/groom/list/" + type, {}, {
		login: true
	});
}
/*
 * ထုတ်ကုန်ပိုစတာကိုရယူပါ
 * */
export function getProductPoster(id) {
	return request.get("/product/poster/" + id, {}, {
		login: true
	});
}

/*
 * စျေးဝယ်ခြင်းတောင်း ထည့်သွင်း
 * */
export function postCartAdd(data) {
	return request.post("/cart/add", data);
}

/*
 * စျေးဝယ်ခြင်းတောင်းစာရင်း
 * */
export function getCartList() {
	return request.get("/cart/list");
}

/*
 * စျေးဝယ်ခြင်းတောင်း ဖျက်ပါ
 * */
export function postCartDel(ids) {
	return request.post("/cart/del", {
		ids
	});
}

/*
 * စျေးဝယ်ခြင်းတောင်း ဝယ်ယူထားသောအရေအတွက်
 * */
export function getCartCount(data) {
	return request.get("/cart/count", data);
}

/*
 * စျေးဝယ်ခြင်းတောင်း ထုတ်ကုန်အရေအတွက်ပြုပြင်မွမ်းမံ
 * */
export function changeCartNum(id, number) {
	return request.post("/cart/num", {
		id,
		number
	});
}

/**
 * အကြံပြုထားသောသော့ချက်စာလုံးများကိုရှာဖွေပါ
 */
export function getSearchKeyword() {
	return request.get("/search/keyword", {}, {
		login: false
	});
}

/**
 * ကုန်ပစ္စည်းပြန်လည်သုံးသပ်စာရင်း
 */
export function getReplyList(id, q) {
	return request.get("/reply/list/" + id, q, {
		login: true
	});
}

/**
 * ထုတ်ကုန်ပြန်လည်သုံးသပ်ခြင်းနှင့်ချီးမွမ်းခြင်းအရေအတွက်
 */
export function getReplyConfig(id) {
	return request.get("/reply/config/" + id, {}, {
		login: true
	});
}

/**
 * တစ် ဦး ချင်းထုတ်ကုန်အသေးစိတ်ကိုရရန်စာမျက်နှာကိုပြန်လည်ဆန်းစစ်ပါ
 */
export function postOrderProduct(unique) {
	return request.post("/order/product", {
		unique
	}, {
		login: true
	});
}

/**
 * ပြန်လည်သုံးသပ်စာမျက်နှာတင်သွင်းပါ；
 */
export function postOrderComment(data) {
	return request.post("/order/comment", data, {
		login: true
	});
}

export function storeListApi(data) {
	return request.get("store_list", data, {
		login: false
	});
}

// သတင်းအချက်အလက် Store
export function getStoreInfo(data) {
	return request.get("/store/find/"+data, {},{
		login: true
	});
}

// ကုန်သည်အခြေချခဲ့သည်
export function postSettlement(data) {
	return request.post("storeApply/apply", data,{
		login: true
	});
}


// protocol ကို
export function getProtocol(data) {
	return request.get("storeApply/findAgreement?titles="+data, {},{
		login: true
	});
}
