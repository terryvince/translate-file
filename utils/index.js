const fs = require("fs");
const path = require("path");
const {promisify} = require('util');
function async (arr, callback1, callback2) {
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return callback2(new Error('第一个参数必须为数组'));
  }
  if (arr.length === 0)
      return callback2(null);
  (function walk(i) {
      if (i >= arr.length) {
          return callback2(null);
      }
      callback1(arr[i], function () {
          walk(++i);
      });
  })(0);
}
module.exports = {
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
  eachFiles(dir, callback) {
      var filesArr = [];
      dir = path.join(dir, '/');
      (function dir(dirpath, fn) {
          var files = fs.readdirSync(dirpath);
          async(files, function (item, next) {
              var info = fs.statSync(dirpath + item);
              if (info.isDirectory()) {
                  dir(dirpath + item + '/', function () {
                      next();
                  });
              } else {
                  filesArr.push(dirpath + item);
                  callback && callback(dirpath + item);
                  next();
              }
          }, function (err) {
              !err && fn && fn();
          });
      })(dir);
      return filesArr;
  },
  // 复制目录
  copyDir(srcDir, outDir, exclude) {
    const { resolve, join } = path;
    srcDir = resolve(srcDir); // 改成全路径
    outDir = resolve(outDir); // 改成全路径

    function copy(srcDir, outDir, callback) {
      fs.readdir(srcDir, (err, files) => {
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
              if(exclude && exclude.test(fullPath)){
                return;
              }
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