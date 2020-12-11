/*
 * အမှာစာအတည်ပြုခြင်း
 * */
import request from "@/utils/request";

/**
 * စျေးဝယ်ခြင်းလှည်းမှတဆင့် id မှာယူမည့်သတင်းအချက်အလက်ကိုရယူပါ
 * @param cartId
 * @returns {*}
 */
export function postOrderConfirm(cartId) {
	return request.post("/order/confirm", {
		cartId
	});
}

/**
 * အော်ဒါငွေပမာဏကိုတွက်ချက်ပါ
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
	return request.post("/order/computed/" + key, data);
}

/**
 * သတ်မှတ်ထားသောငွေပမာဏအတွက်ရရှိနိုင်ကူပွန်ကိုရယူပါ
 * @param price
 * @returns {*}
 */
export function getOrderCoupon(cartId) {
	return request.get("/coupons/order/" + cartId);
}

/**
 * အမှာစာများထုတ်လုပ်ခြင်း
 * @param key
 * @param data
 * @returns {*}
 */
export function createOrder(key, data) {
	return request.post("/order/create/" + key, data || {});
}

/**
 * အမှာစာစာရင်း
 * @returns {*}
 */
export function getOrderData() {
	return request.get("/order/data");
}

/**
 * အမိန့်စာရင်း
 * @returns {*}
 */
export function getOrderList(data) {
	return request.get("/order/list", data);
}

/**
 * အော်ဒါဖျက်သိမ်းသည်
 * @returns {*}
 */
export function cancelOrder(id) {
	return request.post("/order/cancel", {
		id
	});
}

/**
 * အမှာစာအသေးစိတ်ကို
 * @returns {*}
 */
export function orderDetail(id) {
	return request.get("/order/detail/" + id);
}

/**
 * ပြန်အမ်းငွေအတွက်အကြောင်းပြချက်
 * @returns {*}
 */
export function getRefundReason() {
	return request.get("/order/refund/reason");
}

/**
 * ပြန်အမ်းငွေတင်ပါ
 * @returns {*}
 */
export function postOrderRefund(data) {
	return request.post("/order/refund/verify", data);
}

/**
 * လက်ခံရရှိကိုအတည်ပြုပါ
 * @returns {*}
 */
export function takeOrder(uni) {
	return request.post("/order/take", {
		uni
	});
}

/**
 * အော်ဒါဖျက်ပါ
 * @returns {*}
 */
export function delOrder(uni) {
	return request.post("/order/del", {
		uni
	});
}

/**
 * အမိန့်မေးမြန်းမှုထောက်ပံ့ပို့ဆောင်ရေးသတင်းအချက်အလက်
 * @returns {*}
 */
export function express(params) {
	return request.post("order/express", params);
}

/**
 * အမိန့်မေးမြန်းမှုထောက်ပံ့ပို့ဆောင်ရေးသတင်းအချက်အလက်
 * @returns {*}
 */
export function payOrder(uni, paytype, from) {
	return request.post("order/pay", {
		uni,
		paytype,
		from
	});
}
/**
 * အမိန့်ဖျက်သိမ်းမှု
 * @returns {*}
 */

export function orderVerific(verifyCode, isConfirm) {
	return request.post("order/order_verific", { verifyCode, isConfirm });
}


export function getExpressName() {
	return request.get("/order/expressName");
}

export function getAdressByStoreId(id) {
	return request.get("/store/find/" + id||1);
}