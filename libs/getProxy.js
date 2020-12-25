const axios = require('axios')
const cheerio = require('cheerio')
const tunnel = require('tunnel')
const {getAgent} = require('../utils/fakeHeader')

async function getProxy(ip) {
    let html = ''
    let ips = ip.length>0 ? ip : []
    if(ips.length > 0) return checkIp(ips)  // 如果配置了代理池，就直接从代理池读取ip
    console.log('正在获取代理ip中...')
    try{
        const res = await axios.get('https://ip.ihuan.me/')
        html = res.data
        const $ = cheerio.load(html)
        const list = Array.prototype.slice.call($('tbody tr'))
        ips = list.map(el=> $(el.children[0]).text() + ':' + $(el.children[1]).text())
    }catch(err){
        console.error('获取代理ip失败：',err)
    }
    console.log('获取代理ip成功！\n')
    return checkIp(ips)
}

// 检查ip是否有效
async function  checkIp(ips) {
    const target = 'https://ip.cn/api/index?ip=&type=0'
    let validIps = []
    console.log('正在验证代理ip有效性...')
    while(ips.length>0){
        const origin = ips.pop()
        const temps = origin.split(':')
        const host = temps[0]
        const port = temps[1]
        let data = {}
        const tunnelProxy = tunnel.httpsOverHttp({
            proxy: {
                host,
                port,
            },
        });
        try{
            const res = await axios.get(target,{
                timeout: 1000*60,  // 5秒没返回ip就丢弃
                proxy: false,
                httpsAgent: tunnelProxy,
                headers: {'User-Agent': getAgent()}
            })
            data = res.data
        }catch(err){
            console.log(`代理ip ${origin} 无效: `, err.message)
        }
        
        if(data.ip == host){ // ip有效
            console.log(`代理ip ${origin} 有效`)
            validIps.push(origin)
        }
    }
    console.log(`所有代理ip验证完毕! 共${validIps.length}条可用:\n`,validIps)
    return validIps 
}

module.exports = {
    getProxy
}