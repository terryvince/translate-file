import request from "@/utils/request";

/**
 * နေအိမ်
 * @returns {*}
 */
export function getHomeData() {
  return request.get("index", {}, { login: false });
}

/**
 * ဆောင်းပါး Carousel စာရင်း
 * @returns {*}
 */
export function getArticleBanner() {
  return request.get("/article/banner/list", {}, { login: false });
}

/**
 * ဆောင်းပါးအမျိုးအစားစာရင်း
 * @returns {*}
 */
export function getArticleCategory() {
  return request.get("/article/category/list", {}, { login: false });
}

/**
 * ဆောင်းပါး လူကြိုက်များစာရင်း
 * @returns {*}
 */
export function getArticleHotList() {
  return request.get("/article/hot/list", {}, { login: false });
}

/**
 * ဆောင်းပါးစာရင်း
 * @returns {*}
 */
export function getArticleList(q) {
  return request.get("/article/list/", q, { login: false });
}

/**
 * င်းကိုမျှဝေမည်
 * @returns {*}
 */
export function getShare() {
  return request.get("/share", {}, { login: false });
}

/**
 * ဆောင်းပါးအသေးစိတ်
 * @returns {*}
 */
export function getArticleDetails(id) {
  return request.get("/article/details/" + id, {}, { login: false });
}

/**
 * WeChat ကိုရယူပါsdkဖွဲ့စည်းပုံ
 * @returns {*}
 */
export function getWechatConfig() {
  // return request.get(
  //   "/wechat/config",
  //   { url: document.location.href },
  //   { login: false }
  // );
}

/**
 * WeChat ကိုရယူပါsdkဖွဲ့စည်းပုံ
 * @returns {*}
 */
export function wechatAuth(code, spread, login_type) {
  return request.get(
    "/wechat/auth",
    { code, spread, login_type },
    { login: false }
  );
}
/**
 * курьерကုမ္ပဏီတစ်ခုရယူပါ
 * @returns {*}
 */
export function getLogistics() {
  return request.get("/logistics", {}, { login: false });
}

/**
 * ဓာတ်ပုံတွေရယူပါbase64
 * @retins {*}
 * */
export function imageBase64(image, code) {
  return request.post(
    "/image_base64",
    { image: image, code: code },
    { login: false }
  );
}

export function getCouponsAll({page=1,limit=3}) {
  return request.get("/couponsAll", {
	  page,
	  limit
  }, { login: false });
}

export function getModuleOrder() {
  return request.get("/menu/activity", {}, { login: false });
}
