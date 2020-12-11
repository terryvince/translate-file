import Fly from "flyio/dist/npm/wx";
import $store from "../store";
import { handleLoginFailure } from "@/utils";
import { VUE_APP_API_URL } from "@/config";
import cookie from "@/utils/store/cookie";


const fly = new Fly()
fly.config.baseURL = VUE_APP_API_URL

fly.interceptors.response.use(
  response => {
    // console.log(response)
    // Timed Refreshaccess-token
    return response;
  },
  error => {
    if (error.toString() == 'Error: Network Error') {
      console.log('————————')
      console.log('တောင်းဆိုမှုပို့ရန်မအောင်မြင်ပါ', error)
      console.log('————————')
      handleLoginFailure();
      return Promise.reject({ msg: "log in ဝင်မထားပါ", toLogin: true });
    }
    if (error.status == 401) {
      console.log('————————')
      console.log('ဝင်ရောက်ခွင့်မမှန်ကန်ပါ 401', error)
      console.log('————————')
      handleLoginFailure();
      return Promise.reject({ msg: "interface စိစစ်အတည်ပြု logged in မရှိပါ", toLogin: true });
    }
    return Promise.reject(error);
  }
);

const defaultOpt = { login: true };

function baseRequest(options) {

  // cache မှရယူပါ token တားဆီး token ပျက်ကွက်ပြီးနောက်တောင်းဆိုမှုကိုဆက်လက်တည်ရှိမည့်အခြေအနေများ
  const token = cookie.get('login_status');

  // ပေါင်းစည်းခဲ့သည် headers
  // interface ကို login လိုအပ်တယ်ဆိုရင်，သယ်ဆောင်သည် token တောင်းဆိုမှုသွားပါ
  options.headers = {
    ...options.headers,
    Authorization: "Bearer " + token,
  }

  // သင်ဝင်ရောက်ကြည့်ရှုရန်လိုအပ်လျှင် interface ကိုမရရှိနိုင် token မမှန်ကန်တဲ့အဖြစ်မှတ်
  if (options.login === true && !token) {
    // login သို့မဟုတ်ခွင့်ပြုချက်စာမျက်နှာသို့သွားပါ
    handleLoginFailure();
    // သတိပေးချက်အမှား
    return Promise.reject({ msg: "log in ဝင်မထားပါ", toLogin: true });
  }
  // ဖွဲ့စည်းပုံတောင်းဆိုမှုအတွက်လိုအပ်သော parameters များကို
  const { url, params, data, login, ...option } = options

  // တောင်းဆိုချက်တစ်ခုစတင်ပါ
  return fly.request(url, params || data, {
    ...option
  }).then(res => {
    const data = res.data || {};
    if (res.status !== 200) {
      return Promise.reject({ msg: "တောင်းဆိုမှုမအောင်မြင်ပါ", res, data });
    }
    console.log(data.status)
    if ([401, 403].indexOf(data.status) !== -1) {
      handleLoginFailure();
      return Promise.reject({ msg: res.msg || res.data.msg, res, data, toLogin: true });
    } else if (data.status === 200) {
      return Promise.resolve(data, res);
    } else {
      return Promise.reject({ msg: res.msg || res.data.msg, res, data });
    }
  });
}

/**
 * http အခြေစိုက်စခန်းအတန်းအစားတောင်းဆိုခြင်း
 * ရည်ညွှန်းစာရွက်စာတမ်းများ https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ["post", "put", "patch"].reduce((request, method) => {
  /**
   *
   * @param url string interface လိပ်စာ
   * @param data object getparameter သည်
   * @param options object axios ဖွဲ့စည်းမှုကို item
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, data, method }, defaultOpt, options)
    );
  };
  return request;
}, {});

["get", "delete", "head"].forEach(method => {
  /**
   *
   * @param url string interface လိပ်စာ
   * @param params object getparameter သည်
   * @param options object axios ဖွဲ့စည်းမှုကို item
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, params, method }, defaultOpt, options)
    );
  };
});

export default request;
