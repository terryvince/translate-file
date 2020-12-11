import { getProvider } from "@/utils";

// ငွေပေးချေမှုစနစ်
export const weappPay = (option) => {
  return new Promise((resolve, reject) => {
    // WeChat Pay ကိုချိတ်ပါ
    // getProvider('payment').then(provider => {
    let orderInfo = {
      appid: option.appid,
      noncestr: option.noncestr,
      package: option.package,
      partnerid: option.partnerid,
      prepayid: option.prepayid,
      sign: option.sign,
      timestamp: option.timestamp + '',
    }
    // သာ interface ကိုခေါ်ပါ
    uni.requestPayment({
      provider: 'wxpay',
      ...option,
      timestamp: orderInfo.timestamp,
      orderInfo,
      success: (success) => {
        console.log(success)
        uni.showToast({
          title: 'ငွေပေးချေမှုအောင်မြင်သော', icon: 'success', duration: 5000,
        });
        let time = setTimeout(() => {
          clearTimeout(time)
          resolve(success)
        }, 3000)
      },
      fail: (error) => {
        console.log(error)
        if (error.errMsg == 'requestPayment:fail cancel') {
          uni.showToast({ title: 'ငွေပေးချေမှုဖျက်သိမ်း', icon: 'none', duration: 5000 });
        }
        reject(error)
      }
    })
    // })
  })
}
