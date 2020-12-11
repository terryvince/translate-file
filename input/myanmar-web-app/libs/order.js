import { cancelOrder, takeOrder, delOrder, payOrder } from "@/api/order";
import dialog from "@/utils/dialog";
import { weappPay } from "@/libs/wechat";

export function cancelOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: 'ချက်ချင်း',
      content: 'အမိန့်ကိုပယ်ဖျက်ဖို့အတည်ပြုပါ?',
      success(res) {
        if (res.confirm) {
          cancelOrder(orderId)
            .then(res => {
              uni.showToast({
                title: 'အောင်မြင်မှုကိုဖျက်သိမ်းပါ', icon: 'success', duration: 2000
              });
              resolve(res);
            })
            .catch(err => {
              uni.showToast({
                title: 'ပယ်ဖျက်ရန်မအောင်မြင်ပါ', icon: 'none', duration: 2000
              });
              reject(err);
            });
        } else if (res.cancel) {
        }
      }
    })
  });
}

export function takeOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    takeOrder(orderId)
      .then(res => {
        uni.showToast({
          title: 'အောင်မြင်စွာလက်ခံရရှိခဲ့သည်', icon: 'success', duration: 2000
        });
        resolve(res);
      })
      .catch(err => {
        uni.showToast({
          title: 'လက်ခံဖြတ်ပိုင်းမအောင်မြင်ပါ', icon: 'none', duration: 2000
        });
        reject(err);
      });
  });
}

export function delOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    dialog.confirm({
      mes: "အမိန့်ကိုဖျက်ရန်အတည်ပြုပါ?",
      opts() {
        delOrder(orderId)
          .then(res => {
            uni.showToast({
              title: 'အောင်မြင်စွာဖျက်ပစ်လိုက်ပြီ', icon: 'success', duration: 2000
            });
            resolve(res);
          })
          .catch(err => {
            uni.showToast({
              title: 'ဖျက်ရန်ပျက်ကွက်', icon: 'none', duration: 2000
            });
            reject(err);
          });
      }
    });
  });
}

export function payOrderHandle(orderId, type, from) {
  console.log(orderId, type, from, 'ပေးဆောင်')
  return new Promise((resolve, reject) => {
    uni.showLoading({ title: 'တင်နေသည်' })
    payOrder(orderId, type, from)
      .then(res => {
        const data = res.data;
        uni.hideLoading()
        switch (data.status) {
          case "WECHAT_H5_PAY":
            location.replace(data.result.jsConfig.mweb_url);
            reject(data);
            break;
          case "ORDER_EXIST":
          case "EXTEND_ORDER":
          case "PAY_ERROR":
          case "PAY_DEFICIENCY":
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 });
            reject(data);
            break;
          case "SUCCESS":
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 });
            resolve(data);
            break;
          case "WECHAT_PAY":
            weappPay(data.result.jsConfig).then(res => {
              resolve(data);
            });
            break;
          case "WECHAT_APP_PAY":
            weappPay(data.result.jsConfig).then(res => {
              resolve(data);
            });
            break;
        }
      })
      .catch(err => {
        uni.hideLoading()
        uni.showToast({
          title: 'အမိန့်ငွေပေးချေမှုမအောင်မြင်ပါ', icon: 'none', duration: 2000
        });
      });
  });
}
