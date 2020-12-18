const translate= require('google-translate-api')
const fs = require('fs')
const path = require('path')
const {eachFiles,copyDir,concurrency} = require('./utils')
const {promisify} = require('util');

const config = {
    debug:false,
    inputPath:path.resolve('./input'),    // 输入
    outputPath:path.resolve('./output'),  // 输出
    exclude:/(node_modules)|(unpackage)/g, // 排除目录
    exts:['.html','.vue','.js'],         // 匹配文件扩展名
    fromReg: /[\u4e00-\u4E27\u4E29-\u9fa5]+/g , // 匹配来源文字的正则，默认转换中文
    from:'auto',               // 翻译来源,可不填，以fromReg匹配的语言为来源
    to:'my',                   // 翻译目标
    retry: 10,                 // 请求失败，重试次数
    concurrency:{              // 并发控制, 大量发送翻译请求到谷歌会报错429 too many request，ip会被限制访问
        count:1,               // 并发数量
        delay:0             // 并发间隔时长
    }
}

const readFile = promisify(fs.readFile)
const writeFile= promisify(fs.writeFile)
// const map = {}   //

function startTranslate(){
    copyDir(config.inputPath,config.outputPath,config.exclude).then(()=>{
        return eachFiles(config.outputPath)
    }).then(files=>{
        const rest =  files.filter(p => config.exts.includes(path.extname(p)))
        let count = 0
        console.log('transforming...')

        let tasks = rest.map(p=>async ()=>{ // 组建任务列表
            const data = await readFile(p,{encoding:'utf-8'})
            const  content =  await replaceText(data,p)
            await writeFile(p,content)
            ++count
            // !config.debug && clearConsole()
            console.log(`\ntransform progress : ${(count / rest.length * 100).toFixed(2)}% `)
            return
        })

        return concurrency(tasks,config.concurrency.count,config.concurrency.delay)  // 并发控制
    })
    .then(()=>{
        console.log('All transform done!')
    })
    .catch(err=>{
        console.log('transform fail: \n',err)
    })
}

// 请求频率过高，需要限制下
async function replaceText(str,p){
    let result;
    let transConfig = {to: config.to}
    if(config.from) transConfig.from=config.from
    // await new Promise (async resolve=>{
        while ( (result = config.fromReg.exec(str)) )  {  // 执行一次，游标+1，匹配下一项，而不是没翻译成功的上一项
            const length = result[0].length;
            let temp = str.split('')
            let content = ''
            let count = config.retry
            while(!content && count>0){ // 没有内容 并且还在重连次数内，就重新发送请求
                try{
                    count--
                    content = await translate(result[0], transConfig);
                }catch(err){
                    console.log('google request fail, try to again...')
                }   
            }
            temp.splice(result.index,length, content ? content.text: result[0]) // 翻译失败则原样返回
            str = temp.join('')

            if(!content && count==0){
                console.log(`translate file: ${p}\ntranslate '${result[0]}' fail!\n`)
                // resolve()
                continue;
            }
            config.debug && console.log(`translate file: ${p}\ntranslate '${result[0]}' success!\n`)
            // resolve()
        }
    // })
    return str
}


function clearConsole(){
    // process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
    console.clear()
}


startTranslate();

