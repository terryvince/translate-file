const fs = require("fs");
const path = require("path");
const {promisify} = require('util');

module.exports = {
    /**
     * 并发控制
     * @param {function[]} arr 任务函数列表，每个函数应该返回一个promise
     * @param {number} count 每次并发数量
     * @param {number} delay 每次并发间隔时长
     * @param {function} callback -每次并发调用的回调，可省
     * @return {Promise} -返回一个带有响应结果数组的promise
     */ 
    async concurrency(arr,count,delay,callback){
      let curIndex = 0
      let allResult = []
      while(arr.length>0){
          let list = arr.splice(curIndex,count)
          let result = []
          try{
            result = await Promise.all(list.map(fn=>fn())) // 执行任务队列
          }catch(e){
            throw new Error(e.message)
          }
          allResult = allResult.concat(result)
          result.map(res=> callback && callback(res)) // 调用回调，返回结果
          await new Promise(r=>setTimeout(r,delay)) // 休眠指定时长
      }
      return allResult
  },
  // 检查path目录或文件是否存在
  exists(path){
    return new Promise((resolve,reject) => {
      promisify(fs.stat)(path).then(stat => resolve(true)).catch(err => {
        if(err && err.code === "ENOENT"){
          resolve(false) // 文件不存在
          return
        }
        reject(err) // 发生错误
      })
    })
  },
  // 遍历目录，取得所有文件的path
  eachFiles(root) {
      let results = [];
      +function getfiles(root){
          let dirs = fs.readdirSync(root);
          dirs.forEach(name=>{
              let curPath = path.resolve(root, name);
              let stats = fs.statSync(curPath);
              if(stats.isFile()){
                results.push(curPath);
              }
              if(stats.isDirectory()){
                getfiles(curPath);
              }
          })
      }(root);
      return results;
    },
  // 复制目录
  copyDir(srcDir, outDir, exclude) {
    const { resolve, join } = path;
    srcDir = resolve(srcDir); // 改成全路径
    outDir = resolve(outDir); // 改成全路径

    function copy(srcDir, outDir, callback) {
      fs.readdir(srcDir, (err, files) => {
        files = files.filter(file=>!exclude.test(file))  // 不复制排除目录
        if (err) return callback(err);
        var count = 0;
        var checkEnd = function () {
          ++count == files.length && callback();
        };

        files.forEach((file) => {
          var curPath = resolve(srcDir, file);

          fs.stat(curPath, (err, stats) => {
            if (err) return callback(err);
            let tempPath = curPath.replace(srcDir, ""); //取得目录层级

            let fullPath = join(outDir, tempPath);

            if (stats.isDirectory()) {
              fs.mkdir(fullPath, function (err) {
                //创建目录后继续复制该目录下的文件
                if (err) return callback(err);
                copy(curPath, fullPath, checkEnd);
              });
              return;
            }

            let readable = fs.createReadStream(curPath);
            let writable = fs.createWriteStream(fullPath);
            readable.pipe(writable);
            checkEnd();
          });
        });
        //为空时直接回调
        files.length === 0 && callback();
      });
    }

    return new Promise((resolve, reject) => {
      fs.stat(outDir, (err) => {
        if (err && err.code === "ENOENT") {
          // 如果输出目录不存在就先创建目录
          fs.mkdirSync(outDir);
        }
        copy(srcDir, outDir, (err) => {
            if(err) return reject(err)
            resolve()
        })
      })
    })
  },
};