import request from "@/utils/request";

/**
 * စာရင်းစာရင်းသွင်း
 */
export function getCombinationList(data) {
  return request.get("/combination/list", data, { login: false });
}

/**
 * အုပ်စုထုတ်ကုန်အသေးစိတ်
 * @param {*} id
 */
export function getCombinationDetail(id) {
  return request.get("/combination/detail/" + id, {}, { login: true });
}

/**
 * အုပ်စုတစ်ခုနှင့်ဆက်သွယ်ပါ အုပ်စုတစ်စုကိုစတင်ပါ
 * @param {*} id
 */
export function getCombinationPink(id) {
  return request.get("/combination/pink/" + id);
}

/**
 * အုပ်စုတစ်ခုနှင့်ဆက်သွယ်ပါ ခရီးကိုဖျက်သိမ်းပါ
 */
export function getCombinationRemove(data) {
  return request.post("/combination/remove", data);
}

/**
 * ပိုစတာကိုအတူတကွပူးပေါင်းပါ
 * @param {*} id
 */
export function getCombinationPoster(data) {
  return request.post("/combination/poster", data);
}

/**
 * Spike စာရင်းဖွဲ့စည်းပုံ
 */
export function getSeckillConfig() {
  return request.get("/seckill/index", {}, { login: false });
}

/**
 * Spike စာရင်း
 */
export function getSeckillList(time, data) {
  return request.get("/seckill/list/" + time, data, { login: false }).then(res=>{
	  res.data && res.data.forEach(v=>{
		  v.sales+=v.ficti ? v.ficti: 0
	  })
	  return res
  })
}

/**
 * ကုန်ပစ္စည်းအသေးစိတ်ကို Spike
 */
export function getSeckillDetail(id) {
  return request.get("/seckill/detail/" + id, {}, { login: false });
}

/**
 * ညှိနှိုင်းစာရင်း
 * @param {*} data
 */
export function getBargainList(data) {
  return request.get("/bargain/list", data, { login: false });
}

/**
 * ကုန်ပစ္စည်းအသေးစိတ်ကိုညှိနှိုင်းပါ
 */
export function getBargainDetail(id) {
  return request.get("/bargain/detail/" + id);
}

/**
 * ညှိနှိုင်း စောင့်ကြည့်/င်းကိုမျှဝေမည်/ပါဝင်မှုအရေအတွက်
 */
export function getBargainShare(data) {
  return request.post("/bargain/share", data);
}

/**
 * ပွင့်လင်းညှိနှိုင်း
 * @param {*} data
 */
export function getBargainStart(data) {
  return request.post("/bargain/start", data);
}

/**
 * ညှိနှိုင်း သူငယ်ချင်းများကိုညှိနှိုင်းရန်ကူညီပါ
 * @param {*} data
 */
export function getBargainHelp(data) {
  return request.post("/bargain/help", data);
}

/**
 * ညှိနှိုင်း ပမာဏလျှော့ပါ
 * @param {*} data
 */
export function getBargainHelpPrice(data) {
  return request.post("/bargain/help/price", data);
}

/**
 * ညှိနှိုင်း ညှိနှိုင်းမှု၏စုစုပေါင်းအရေအတွက်、ချိန်ခွင်လျှာ、တိုးတက်မှုဘား、စျေးဖြတ်
 * @param {*} data
 */
export function getBargainHelpCount(data) {
  return request.post("/bargain/help/count", data);
}

/**
 * ညှိနှိုင်း ညှိနှိုင်းအသုံးပြုသူအချက်အလက်များကိုဖွင့်ပါ
 * @param {*} data
 */
export function getBargainStartUser(data) {
  return request.post("/bargain/start/user", data);
}

/**
 * ညှိနှိုင်း ညှိနှိုင်း
 * @param {*} data
 */
export function getBargainHelpList(data) {
  return request.post("/bargain/help/list", data);
}

/**
 * Bargain ပိုစတာ
 * @param {*} data
 */
export function getBargainPoster(data) {
  return request.post("/bargain/poster", data);
}

/**
 * ညှိနှိုင်းစာရင်း(ပါဝင်ခဲ့)
 * @param {*} data
 */
export function getBargainUserList(data) {
  return request.get("/bargain/user/list", data);
}

/**
 * Bargain ဖျက်သိမ်းမှု
 */
export function getBargainUserCancel(data) {
  return request.post("/bargain/user/cancel", data);
}

// စာရင်းဆွဲပါ
export function getLotteryImages() {
  return request.get("/drawConfig/list",{},{
	  login:true
  });
}
// ထီစံချိန် page size type 0 အားလုံး 1ပုဂ္ဂိုလ်ရေး
export function getLotteryRecord(data) {
  return request.get("/drawRecord/list",data,{
	  login:true
  });
}
// ဆုစာရင်း
export function getPrizes(id) {
  return request.get("/drawTermConfig/list",{drawConfigId:id},{
	  login:true
  });
}

// ထီ drawConfigId uid
export function lotteryDraw(data) {
  return request.get("/drawRecord/save",data,{
	  login:true
  });
}

// ကျန်ရှိသောမဲနှိုက်၏နံပါတ်
export function queryLotteryCount(id) {
  return request.get("/drawRecord/remainingTime",{drawConfigId:id},{
	  login:true
  });
}

// သင်ထီသေတ္တာကို pop ရန်လိုအပ်ပါသလားစစ်ဆေးပါ
export function queryLotteryDialog() {
  return request.get("/drawConfig/popup",{},{
	  login:false
  });
}