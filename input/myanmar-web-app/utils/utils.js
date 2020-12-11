// node ကိုသတင်းအချက်အလက်ရယူပါ
export const querySelector = (selector) => new Promise((resolve, reject) => {
	const query = uni.createSelectorQuery();
	query.select(selector).boundingClientRect(data => {
		resolve(data)
	}).exec();
})

/** ကူးပြောင်းခြင်းအရာဝတ္ထုkey
 * @param origin {object} -မူရင်းအရာဝတ္ထု
 * @param map {object} -မြေပုံအရာဝတ္ထု {oldKey:newKey}
 * @param isKeepOldKey {boolean} -မူရင်းကိုစောင့်ရှောက်ဖို့ပဲkeyစုစုပေါင်းတန်ဖိုး,မူရင်းကိုမူလအတိုင်းထားပါkey
 * @example objectMap({a:1,b:2,c:3},{b:'မြေပုံb'}) => {a:1,b:2,မြေပုံb:2,c:3}
 * @return {object}
 */
export const objectMap = (origin, map, isKeepOldKey = true) => {
	let target = JSON.parse(JSON.stringify(origin))
	let keys = Object.keys(target);
	keys.map(key => {
		let newKey = map[key]
		if (map[key]) {
			target[newKey] = target[key]
		}
		if (!isKeepOldKey) { // relational မြေပုံမရှိပါkeyပုံသေချန်ထားပါ
			delete target[key]
		}
	})
	return target
}

// နံပါတ်ပေါင်းနိဒါန်း0
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * ရှာဖွေတွေ့ရှိမှုအမျိုးအစား
 * @param {any} value -Detection value
 * @return {string} -စာလုံးအသေး type ကို string ကိုပြန်သွားပါ
 */
export function type(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

/**
 * Countdown တွက်ချက်မှု
 * @param {Date} endDate သတ်မှတ်နောက်ဆုံးအချိန်
 * @param {String} options template string，အလားတူ“ရှိနေသေးတယ်ddနေ့hhနာရီmmမိနစ်ssဒုတိယ”
 */
export function countDown(endDate, options) {
  if (type(endDate) !== 'date') {
    console.error('utils.countDown:parameter အမျိုးအစားအမှား，endDateရက်စွဲအမျိုးအစားတစ်ခုမဟုတ်ပါ!')
    return
  }
  const timeScope = endDate - new Date()
  let day = ~~(timeScope / (60 * 60 * 24 * 1000))
  let hour = ~~((timeScope / (60 * 60 * 1000)) % 24)
  let minute = ~~((timeScope / (60 * 1000)) % 60)
  let second = ~~((timeScope / 1000) % 60)
  if (timeScope <= 0) {
    // နောက်ပြန်ဆွဲခြင်းသည်အနှုတ်မဖြစ်နိုင်ပါ，အများဆုံး0
    day = hour = minute = second = 0
  }
  if (/^[d]+|[h]{2,}|[m]{2,}|[s]{2,}$/.test(options)) {
    return options
      .replace(/d+/, day)
      .replace(/hh/, formatNumber(hour))
      .replace(/mm/, formatNumber(minute))
      .replace(/ss/, formatNumber(second))
  }

  return {
    day: formatNumber(day),
    hour: formatNumber(hour),
    minute: formatNumber(minute),
    second: formatNumber(second)
  } // အဘယ်သူမျှမ template ကို string ကိုလွန်လျှင်，အရာဝတ္ထုတန်ဖိုးကိုတိုက်ရိုက်ပြန်ပို့ပါ
}

export function parseUrl(url){
	let query = {}
	let params = url.split('?')[1].split('&')
	params.forEach(data=>{
		let key = decodeURIComponent(data.split('=')[0])
		let value = decodeURIComponent(data.split('=')[1])
		query[key] = value
	})
	return query
}

export default{
	querySelector,
	objectMap,
	countDown,
	parseUrl
}
