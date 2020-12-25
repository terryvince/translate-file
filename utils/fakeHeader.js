/**
 * 如果反爬机制比较厉害，可能需要设置cookie，和Referer，如果限制ip访问频率，需要用到代理ip
 */

// 随机User-Agent，变的更像浏览器访问
function getAgent(){
    return "Mozilla/5.0 (WindowsNT10.0;Win64;x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/" + 85 + Math.round(Math.random() * 10) + ".0.3497." + Math.round(Math.random() * 100) + " Safari/537.36"
}
// X-Forwarded-For:getIp()  不一定有用,这个请求头到达服务器经过了几个代理ip，第一个ip为客户端的ip
function getIp() {
    return (
        Math.floor(Math.random() * (10 - 255) + 255) +
        "." +
        Math.floor(Math.random() * (10 - 255) + 255) +
        "." +
        Math.floor(Math.random() * (10 - 255) + 255) +
        "." +
        Math.floor(Math.random() * (10 - 255) + 255)
    );
}

module.exports = {
    getAgent,
    getIp
}