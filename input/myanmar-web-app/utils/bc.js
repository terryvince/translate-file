//ဌာနခွဲ function ကို，အတိအကျဌာနခွဲရလဒ်ရလေ့ရှိတယ်
//ဖော်ပြချက်：javascriptကွဲပြားခြင်း၏ရလဒ်မှာအမှားများရှိလိမ့်မည်，floating-point နံပါတ်နှစ်ခုကိုစားတဲ့အခါပိုသိသာသွားလိမ့်မယ်。ဒီ function ကပိုမိုတိကျသောဌာနခွဲရလဒ်ကိုပြန်လည်ပေးသည်。
//လွှဲပြောင်း：div(arg1,arg2)
//ပြန်လာတန်ဖိုးကို：arg1ခွဲarg2တိကျသောရလဒ်
export function div(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return mul(r1 / r2, Math.pow(10, t2 - t1));
}
//ပွား function ကို，အတိအကျမြှောက်ရလဒ်ရရန်အသုံးပြုခဲ့သည်
//ဖော်ပြချက်：javascriptမြှောက်ခြင်းရလဒ်တွင်အမှားများရှိလိမ့်မည်，floating-point နံပါတ်နှစ်ခုကိုမြှောက်လိုက်ရင်ပိုပြီးထင်ရှားလာလိမ့်မယ်。ဒီ function ကပိုမိုတိကျသောမြှောက်ကိန်းရလဒ်。
//လွှဲပြောင်း：mul(arg1,arg2)
//ပြန်လာတန်ဖိုးကို：arg1များပြားလာသည်arg2တိကျသောရလဒ်
export function mul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {
    m = 0;
  }
  try {
    m += s2.split(".")[1].length;
  } catch (e) {
    m = m || 0;
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

//ထို့အပြင် function ကို，အတိအကျထပ်ပေါင်းရလဒ်ရလေ့ရှိတယ်
//ဖော်ပြချက်：javascriptထို့အပြင်ရလဒ်အတွက်အမှားများကိုရှိလိမ့်မည်，floating-point နံပါတ်နှစ်ခုကိုထည့်သောအခါပိုသိသာလိမ့်မည်。ဒီ function ကပိုမိုတိကျသောဖြည့်စွက်ရလဒ်ကိုပြန်လည်ရောက်ရှိ。
//လွှဲပြောင်း：add(arg1,arg2)
//ပြန်လာတန်ဖိုးကို：arg1Plus အားarg2တိကျသောရလဒ်
export function add(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m + arg2 * m) / m).toFixed(n);
}

//အနုတ် function ကို，အတိအကျနုတ်ရလဒ်ရလေ့ရှိတယ်
//ဖော်ပြချက်：javascriptထို့အပြင်ရလဒ်အတွက်အမှားများကိုရှိလိမ့်မည်，floating-point နံပါတ်နှစ်ခုကိုထည့်သောအခါပိုသိသာလိမ့်မည်。ဒီ function ကပိုမိုတိကျသောအနုတ်ရလဒ်ကိုပြန်လည်ပေးသည်。
//လွှဲပြောင်း：sub(arg1,arg2)
//ပြန်လာတန်ဖိုးကို：arg1အနုတ်arg2တိကျသောရလဒ်
export function sub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //dynamic ထိန်းချုပ်မှုတိကျစွာအရှည်
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function Compute(value) {
  this.value = value;
}
Object.assign(Compute.prototype, {
  add(v) {
    this.value = add(this.value, v);
    return this;
  },
  sub(v) {
    this.value = sub(this.value, v);
    return this;
  },
  div(v) {
    this.value = div(this.value, v);
    return this;
  },
  mul(v) {
    this.value = mul(this.value, v);
    return this;
  }
});

export default function(value) {
  return new Compute(value);
}
