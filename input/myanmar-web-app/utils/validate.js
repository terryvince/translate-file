const bindMessage = (fn, message) => {
  fn.message = field => message.replace("%s", field || "");
};

export function required(message, opt = {}) {
  return {
    required: true,
    message,
    type: "string",
    ...opt
  };
}

bindMessage(required, "ကျေးဇူးပြု၍ ရိုက်ထည့်ပါ%s");

export function url(message, opt = {}) {
  return {
    type: "url",
    message,
    ...opt
  };
}

bindMessage(url, "ကျေးဇူးပြု၍ မှန်ကန်သော link ကိုထည့်ပါ");

export function email(message, opt = {}) {
  return {
    type: "email",
    message,
    ...opt
  };
}

bindMessage(email, "ကျေးဇူးပြု၍ မှန်ကန်သောအီးမေးလ်လိပ်စာထည့်ပါ");

/**
 * အတည်ပြုလယ်ပြင်အက္ခရာများလုံးဝထားရှိရမည်。
 *
 * @param message
 * @returns {*}
 */
export function alpha(message) {
  return attrs.pattern(/^[\w]+$/, message);
}

bindMessage(alpha, "%sစာတစ်စောင်ဖြစ်ရမယ်");

/**
 * အက္ခရာများသာပါဝင်နိုင်သည်、ဒီဂျစ်တယ်，လည်းပဲ - နှင့်အတူ _
 *
 * @param message
 * @returns {*}
 */
export function alpha_dash(message) {
  return attrs.pattern(/^[\w\d_-]+$/, message);
}

bindMessage(alpha_dash, "%sအက္ခရာများသာပါဝင်နိုင်သည်、ဒီဂျစ်တယ်，လည်းပဲ - နှင့်အတူ _");

/**
 * လုံးဝအက္ခရာများဖြစ်ရမည်、ဒီဂျစ်တယ်
 *
 * @param message
 * @returns {*}
 */
export function alpha_num(message) {
  return attrs.pattern(/^[\w\d]+$/, message);
}

bindMessage(alpha_num, "%sအက္ခရာများသာပါဝင်နိုင်သည်、ဒီဂျစ်တယ်");
/**
 * မှန်ကန်သောပမာဏ
 *
 * @param message
 * @returns {*}
 */
export function num(message) {
  return attrs.pattern(
    /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
    message
  );
}

bindMessage(num, "%sမမှန်ကန်သောပုံစံ");

/**
 * တရုတ်ဇာတ်ကောင်တွေသာဖြစ်နိုင်တယ်
 * @param message
 * @returns {*}
 */
export function chs(message) {
  return attrs.pattern(/^[\u4e00-\u9fa5]+$/, message);
}

bindMessage(chs, "%sတရုတ်ဇာတ်ကောင်တွေသာဖြစ်နိုင်တယ်");

/**
 * တရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、စာ
 * @param message
 * @returns {*}
 */
export function chs_alpha(message) {
  return attrs.pattern(/^[\u4e00-\u9fa5\w]+$/, message);
}

bindMessage(chs_alpha, "%sတရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、စာ");

/**
 * တရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、ပေးစာနှင့်နံပါတ်များ
 * @param message
 * @returns {*}
 */
export function chs_alpha_num(message) {
  return attrs.pattern(/^[\u4e00-\u9fa5\w\d]+$/, message);
}

bindMessage(chs_alpha_num, "%sတရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、ပေးစာနှင့်နံပါတ်များ");

/**
 * တရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、စာ、ဒီဂျစ်တယ်，လည်းပဲ - နှင့်အတူ _
 * @param message
 * @returns {*}
 */
export function chs_dash(message) {
  return attrs.pattern(/^[\u4e00-\u9fa5\w\d-_]+$/, message);
}

bindMessage(chs_dash, "%sတရုတ်စာလုံးတွေသာပါဝင်နိုင်တယ်、စာ、ဒီဂျစ်တယ်，လည်းပဲ - နှင့်အတူ _");

/**
 * ဖုန်းနံပါတ်အတည်ပြုခြင်း
 * @param message
 * @returns {*}
 */
export function chs_phone(message) {
  return attrs.pattern(/^1(3|4|5|7|8|9|6)\d{9}$/i, message);
}
bindMessage(chs_phone, "ကျေးဇူးပြု၍ မှန်ကန်သောဖုန်းနံပါတ်ထည့်ပါ");

const baseAttr = {
  min: "%sအနည်းဆုံးအရှည်ဖြစ်ပါတယ်:min",
  max: "%sအများဆုံးအရှည်က:max",
  length: "%sအရှည်ရှိရမည်:length",
  range: "%sအရှည်က:range",
  pattern: "$sမှားယွင်းတဲ့ပုံစံ"
};

const attrs = Object.keys(baseAttr).reduce((attrs, key) => {
  attrs[key] = (attr, message = "", opt = {}) => {
    const _attr =
      key === "range" ? { min: attr[0], max: attr[1] } : { [key]: attr };

    return {
      message: message.replace(
        `:${key}`,
        key === "range" ? `${attr[0]}-${attr[1]}` : attr
      ),
      type: "string",
      ..._attr,
      ...opt
    };
  };
  bindMessage(attrs[key], baseAttr[key]);
  return attrs;
}, {});

export default attrs;
