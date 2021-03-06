# translate-file
批量翻译文件中的中文至其他语言。

### 安装/使用
```bash
npm install
node index.js
```

### 配置
```js
// index.js
const config = {
    debug:false,
    inputPath:path.resolve('./input'),    // 输入
    outputPath:path.resolve('./output'),  // 输出
    exclude:/(node_modules)|(unpackage)/g, // 排除目录
    exts:['.html','.vue','.js'],         // 匹配文件扩展名
    fromReg: /[\u4e00-\u4E27\u4E29-\u9fa5]+/g , // 匹配来源文字的正则，默认转换中文
    from:'auto',               // 翻译来源,可不填，以fromReg匹配的语言为来源
    to:'my',                   // 翻译目标
    retry: 3,                 // 请求失败，重试次数
    concurrency:{              // 并发控制, 大量发送翻译请求到谷歌会报错429 too many request，ip会被限制访问
        count:1,               // 并发数量
        delay:0             // 并发间隔时长
    }
}
```

### 说明
本项目采用google翻译api，未经配置，将出现403禁止访问问题。

如遇到这个问题，请修改`node_modules/google-translate-api/index.js` 域名`https://translate.google.com`为`https://translate.google.cn`, data中的`client`选项改为`gtx`，`node_modules/google-translate-token/index.js` 同样需要修改域名为国内的地址。
如果使用vpn则不需要修改即可使用。

由于谷歌api限制同一个ip请求频繁访问，可能会出现429（too many request）错误，所以你可能需要自行配置index.js中concurrency选项，进行并发控制。默认是一条一条请求。或者使用vpn更换访问ip。
