const translateOrigin = require('google-translate-api')
const fs = require('fs')
const path = require('path')
const {eachFiles,copyDir} = require('./utils')
const {promisify} = require('util');
const { assert } = require('console');

const config = {
    inputPath:'./input',    // 输入
    outputPath:'./output',  // 输出
    exclude:/node_modules/g, // 排除目录
    exts:['.html','.vue','.js'],         // 匹配文件扩展名
    fromReg: /[\u4e00-\u4E27\u4E29-\u9fa5]+/g , // 匹配来源文字的正则，默认转换中文
    // from:'zh-cn',           // 翻译来源,可不填，以fromReg匹配的语言为来源
    to:'my'                    // 翻译目标
}

const readFile = promisify(fs.readFile)
const writeFile= promisify(fs.writeFile)

function startTranslate(){
    copyDir(config.inputPath,config.outputPath,config.exclude).then(()=>{
        return eachFiles(config.outputPath)
    }).then(files=>{
        // console.log(files)
        const rest =  files.filter(p => config.exts.includes(path.extname(p)))
        let count = 0
        console.log('transforming...')
        rest.map(async p=>{
            const data = await readFile(p,{encoding:'utf-8'})
            const content =  await replaceText(data,p)
            writeFile(p,content).then(()=>{
                if(rest.length == ++count) console.log('All transform done!')
                console.log(`\ntransform progress :${(count / rest.length * 100).toFixed(2)} %\ntransform file '${p}' done!`)
            }).catch(err=>{
                console.log('writeFile fail: ',err)
            })
        })
        
    }).catch(err=>{
        console.log('transform fail: ',err)
    })
}

async function replaceText(str,p){
    var result;
    
    while ((result = config.fromReg.exec(str)) != null)  {
        const length = result[0].length;
        let temp = str.split('')
        let content = ''
        let transConfig = {to: config.to}
        if(config.from) transConfig.from=config.from
        try{
            content = await translate(result[0], config);
            // console.log(result[0])
        } catch(err){
            console.log(`google translate fail:`,err)
        }
        temp.splice(result.index,length, content ? content.text:'')
        str = temp.join('')
        console.log(`transform file: ${p}\ntranslate '${result[0]}' success!`,)
    }
    return str
}

async function translate(...rest){
    let content = ''
    let second = 0
    let another = ''
    let timer = setInterval(async() => {  // 如果10秒后没有内容返回就重试
        if(!content && ++second>=10) {
            console.log(`translate '${rest[0]}' timeout, try again...`)
        }
        if(content) clearInterval(timer)
    }, 1000);
    content = await translateOrigin(...rest)
    return content
}



startTranslate();

