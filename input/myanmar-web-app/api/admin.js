import request from "@/utils/request";

/**
 * စာရင်းအင်းအချက်အလက်များ
 */
export function getStatisticsInfo() {
  return request.get("/admin/order/statistics", {}, { login: true });
}
/**
 * လစဉ်စာရင်းဇယားများကိုမှာယူပါ
 */
export function getStatisticsMonth(where) {
  return request.get("/admin/order/data", where, { login: true });
}
/**
 * လစဉ်စာရင်းဇယားများကိုမှာယူပါ
 */
export function getAdminOrderList(where) {
  return request.get("/admin/order/list", where, { login: true });
}
/**
 * အမိန့်ပြောင်းလဲမှုစျေးနှုန်း
 */
export function setAdminOrderPrice(data) {
  return request.post("/admin/order/price", data, { login: true });
}
/**
 * အမှာစာများ
 */
export function setAdminOrderRemark(data) {
  return request.post("/admin/order/remark", data, { login: true });
}
/**
 * အမှာစာအသေးစိတ်ကို
 */
export function getAdminOrderDetail(orderId) {
  return request.get("/admin/order/detail/" + orderId, {}, { login: true });
}
/**
 * အမိန့်တင်ပို့သတင်းအချက်အလက်ဝယ်ယူ
 */
export function getAdminOrderDelivery(orderId) {
  return request.get(
    "/admin/order/detail/" + orderId,
    {},
    { login: true }
  );
}

/**
 * အမိန့်ပေးပို့သိမ်းဆည်းပါ
 */
export function setAdminOrderDelivery(data) {
  return request.post("/admin/order/delivery/keep", data, { login: true });
}
/**
 * အော်ဒါဇယား
 */
export function getStatisticsTime(data) {
  return request.get("/admin/order/time", data, { login: true });
}
/**
 * အော့ဖ်လိုင်းငွေပေးချေမှုအတွက်အတည်ပြုငွေပေးချေမှု
 */
export function setOfflinePay(data) {
  return request.post("/admin/order/offline", data, { login: true });
}
/**
 * အမိန့်အတည်ပြုချက်ပြန်အမ်းငွေ
 */
export function setOrderRefund(data) {
  return request.post("/admin/order/refund", data, { login: true });
}
