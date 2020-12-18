// 获取节点信息
export const querySelector = (selector) => new Promise((resolve, reject) => {
	const query = uni.createSelectorQuery();
	query.select(selector).boundingClientRect(data => {
		resolve(data)
	}).exec();
})

/** 转换对象的key
 * @param origin {object} -原始对象
 * @param map {object} -映射关系对象 {oldKey:newKey}
 * @param isKeepOldKey {boolean} -是否保留原有的key和值,默认保留原有的key
 * @example objectMap({a:1,b:2,c:3},{b:'映射b'}) => {a:1,b:2,映射b:2,c:3}
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
		if (!isKeepOldKey) { // 没有指定关系映射key将默认保留
			delete target[key]
		}
	})
	return target
}

// 数字加前导0
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 类型检测
 * @param {any} value -检测值
 * @return {string} -返回小写的类型字符串
 */
export function type(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

/**
 * 倒计时计算
 * @param {Date} endDate 截止时间
 * @param {String} options 模板字符串，类似“距离结束还有dd天hh小时mm分钟ss秒”
 */
export function countDown(endDate, options) {
  if (type(endDate) !== 'date') {
    console.error('utils.countDown:参数类型错误，endDate不是一个日期类型!')
    return
  }
  const timeScope = endDate - new Date()
  let day = ~~(timeScope / (60 * 60 * 24 * 1000))
  let hour = ~~((timeScope / (60 * 60 * 1000)) % 24)
  let minute = ~~((timeScope / (60 * 1000)) % 60)
  let second = ~~((timeScope / 1000) % 60)
  if (timeScope <= 0) {
    // 倒计时不能为负数，最多为0
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
  } // 如果没传模板字符串，直接返回对象值
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
